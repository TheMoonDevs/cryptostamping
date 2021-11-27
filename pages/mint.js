import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";

import WalletSidebar from "components/modals/wallet_sidebar";
import Header from "components/global/header";

import styles from "styles/pages/mint.module.scss";
import { getPinataPostPromise } from "lib/api";
import {
	FRONTEND_BASE_URL,
	IN_DEV_ENV,
	forceTESTNET,
	MINTING_CONTRACT_ADDRESS,
} from "lib/data";
import { useChain } from "lib/web3";
import { useInputText, useInputObject } from "lib/form";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
} from "lib/redux/features/uiSlice";

export default function Homepage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user } = useMoralis();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { chainId, setChainId, addChain } = useChain();

	const FIELDS = [
		"cutout_no",
		"title",
		"description",
		"availability",
		"rarity",
		"opensea_link",
		"vid_link",
		"img_link",
		"json_link",
	];

	const {
		objectValue: moralisCutOut,
		setObjectValue: setMoralisCutOut,
		binding,
	} = useInputObject({}, FIELDS);

	const [progress, setProgress] = useState("");
	const [cutOutId, setCutOutId] = useState();
	const [cutOutFile, setCutOutFile] = useState();
	const [contractID, setContractID] = useState(MINTING_CONTRACT_ADDRESS);

	const addToMoralis = async (newMorailCutOut) => {

		const CutOut = Moralis.Object.extend("CutOut");
		let cutOut = cutOutFile;
		
		let saveData = newMorailCutOut?.target ? 
			moralisCutOut : newMorailCutOut;

		if (
			!cutOutId ||
			!cutOutFile ||
			parseInt(cutOutFile?.get("cutout_no")) !== parseInt(saveData.cutout_no)
		) {
			const confirm = await window.confirm(
				"Trying to add a New doc. Continue?"
			);
			if (confirm) cutOut = new CutOut();
			else return;
		}
		if (saveData.cutout_no) saveData.cutout_no = parseInt(saveData.cutout_no);
		if (saveData.rarity) saveData.rarity = parseFloat(saveData.rarity);
		dispatch(setTopLoading(true));
		setProgress("saving data......");
		console.log(saveData);
		cutOut.save(saveData).then(
			(cutout) => {
				dispatch(setTopLoading(false));
				setMoralisCutOut(cutout.toJSON());
				setCutOutId(cutout.id);
				setCutOutFile(cutout);
				setProgress("saved data!");
				alert("Saved cutout " + cutout.get("title"));
			},
			(error) => {
				dispatch(setTopLoading(false));
				setProgress("data-save error!");
				alert("Error in trying to save");
			}
		);
	};

	const retieveFromMoralis = async (evt) => {
		dispatch(setTopLoading(true));
		setProgress("retrieving");
		const CutOut = Moralis.Object.extend("CutOut");
		const query = new Moralis.Query(CutOut);
		query.equalTo("cutout_no", parseInt(moralisCutOut.cutout_no));
		const result = await query.first();
		console.log(result);
		if (result) {
			setMoralisCutOut(result.toJSON());
			setCutOutId(result.id);
			setCutOutFile(result);
			setProgress("retrieved!");
			dispatch(setTopLoading(false));
		} else {
			setMoralisCutOut({});
			setCutOutId(null);
			setCutOutFile(null);
			setProgress("no file exists to retrieve!");
			dispatch(setTopLoading(false));
		}
	};

	const getPlaceHolder = (field) => {
		if (field === "availability") {
			return "presale / sold /locked";
		}
		if (field === "rarity") {
			return "Rarity = 0.1 ~ 10.0";
		}
		return field;
	};

	const [selectedVidFile, setSelectedVidFile] = useState();
	const [selectedImgFile, setSelectedImgFile] = useState();
	const changeHandler = (event, type) => {
		if (type === "vid_link") setSelectedVidFile(event.target.files[0]);
		else if (type === "img_link") setSelectedImgFile(event.target.files[0]);
	};

	const uploadIPFS = async (type) => {
		let data;
		if (type === "vid_link") data = selectedVidFile;
		else if (type === "img_link") data = selectedImgFile;
		let file;
		if (type === "json_link")
			file = new Moralis.File(`${parseInt(moralisCutOut.cutout_no)}.json`, {
				base64: btoa(JSON.stringify(moralisCutOut)),
			});
		else file = new Moralis.File(data.name, data);
		dispatch(setTopLoading(true));
		setProgress("uploading to ipfs");
		console.log(data);
		file
			.saveIPFS()
			.then((response) => {
				const update_object = { ...moralisCutOut };
				update_object[type] = response.ipfs();
				setMoralisCutOut(update_object);
				setProgress("pinning on Pinata!");
				return [
					getPinataPostPromise("/pinning/pinByHash", {
						hashToPin: response.hash(),
					}),
					update_object,
				];
			})
			.then((responses) => {
				console.log(responses[0].data);
				setProgress("pinned.");
				return addToMoralis(responses[1]);
			})
			.then(() => {})
			.catch((error) => {
				console.log(error);
				setProgress("ipfs upload error.");
				alert("there was an error!");
				dispatch(setTopLoading(false));
			});
	};

	if (!IN_DEV_ENV) {
		return <div>404 ! Page not found.</div>;
	}

	const getTransactionHistory = async () => {
		console.log("fetching..");
		const item = {
			contract: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
			token_id: "2324",
		};
		const options = {
			address: item.contract,
			token_id: item.token_id,
			chain: "eth",
			order: "block_timestamp.DESC",
			limit: "10",
		};
		let tokenIdOwners;
		try {
			tokenIdOwners = await Moralis.Web3API.token.getWalletTokenIdTransfers(
				options
			);
		} catch (e) {
			return;
		}
		console.log(tokenIdOwners);
	};

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.screen} ${styles.screen_one}`}>
				<Header dispatch={dispatch} Moralis={Moralis} />
				<div className={styles.banner_box}>
					<p className={styles.banner_text}>
						MINTING SETUP ON {forceTESTNET ? "TESTNET" : "MAINNET"}
					</p>
					<p className={`${styles.banner_text} ${styles.idtext}`}>
						Connected to chainID {chainId} <br />
						and User ID {user.get("accounts").toString()} <br />
						Doing currently - {progress}
					</p>
				</div>
				<div className={styles.mint_container}>
					<div className={`${styles.mint_screen}`}>
						<div className="d-flex justify-content-start pl-3 pr-3">
							<div>
								<p className={styles.banner_subtext}>
									Moralis DB | {moralisCutOut.title}
								</p>
								<p className={styles.idtext}>Moralis Record Id. {cutOutId}</p>
							</div>
							<div
								onClick={retieveFromMoralis}
								className={`ml-auto mr-4 ${styles.input_btn} ${styles.btn_submit} 
							`}
							>
								<p className={`${styles.input_text}`}>
									Retrieve Stamp {moralisCutOut.cutout_no}
								</p>
							</div>
							<div
								onClick={addToMoralis}
								className={`${styles.input_btn} ${styles.btn_submit} 
							${cutOutId ? styles.green : styles.yellow}`}
							>
								<span
									className={`${styles.input_icon} ${styles.icon_add}
							`}
								/>
								<p className={`${styles.input_text}`}>
									{cutOutId ? "Save to Database" : "Add to Database"}
								</p>
							</div>
						</div>
						<div
							className={`row ${cutOutId ? styles.active : styles.disactive}`}
						>
							{FIELDS.map((field) => {
								return (
									<div className="col-6" key={field}>
										<p onClick={retieveFromMoralis} className={styles.subtext}>
											{field}
										</p>
										<div className={styles.input_btn}>
											<span className={styles.input_icon} />
											<input
												className={`${styles.input_text}`}
												type="text"
												autoComplete="off"
												placeholder={getPlaceHolder(field)}
												{...binding(field)}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className={styles.mint_screen}>
						<p className={styles.banner_subtext}>IPFS File Upload</p>
						<div className="d-flex">
							<div className={styles.input_btn}>
								<input
									type="file"
									name="file"
									onChange={(evt) => changeHandler(evt, "vid_link")}
								/>
							</div>
							<div
								onClick={() => uploadIPFS("vid_link")}
								className={`${styles.input_btn} ${styles.btn_submit} 
							${cutOutId ? styles.yellow : ""}`}
							>
								<span
									className={`${styles.input_icon} ${styles.icon_upload}
							`}
								/>
								<p className={`${styles.input_text}`}>Upload Video</p>
							</div>
						</div>
						<div className="d-flex mb-4">
							<div className={styles.input_btn}>
								<input
									type="file"
									name="file"
									onChange={(evt) => changeHandler(evt, "img_link")}
								/>
							</div>
							<div
								onClick={() => uploadIPFS("img_link")}
								className={`${styles.input_btn} ${styles.btn_submit} 
							${cutOutId ? styles.yellow : ""}`}
							>
								<span
									className={`${styles.input_icon} ${styles.icon_upload}
							`}
								/>
								<p className={`${styles.input_text}`}>Upload Image</p>
							</div>
						</div>
						<p className={styles.banner_subtext}>IPFS JSON Upload</p>
						<div
							onClick={() => uploadIPFS("json_link")}
							className={`${styles.input_btn} ${styles.btn_submit} 
							${cutOutId ? styles.yellow : ""} mb-4`}
						>
							<span
								className={`${styles.input_icon} ${styles.icon_upload}
							`}
							/>
							<p className={`${styles.input_text}`}>
								Upload Data & Get Token URI
							</p>
						</div>
						<p className={styles.banner_subtext}>Minting on Contract</p>
						<div className={styles.idtext}>
							Check before minting.
							<a
								href={moralisCutOut.json_link}
								target="_blank"
								rel="noreferrer"
								className={styles.link}
							>
								You're minting this token URI
							</a>
						</div>
						<div className="d-flex">
							<div className={styles.input_btn}>
								<input
									className={`${styles.input_text}`}
									type="text"
									autoComplete="off"
									value={contractID}
									placeholder="Contract ID: 0x"
									onChange={(evt) => {
										setContractID(evt.target.value);
									}}
								/>
							</div>
							<div
								onClick={() => mintToken(contractID)}
								className={`${styles.input_btn} ${styles.btn_submit} 
							${cutOutId ? styles.green : ""}`}
							>
								<span
									className={`${styles.input_icon} ${styles.icon_add}
							`}
								/>
								<p className={`${styles.input_text}`}>Mint Token</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cut Outs | The first ever collection of digital stamps.`,
		description: `You can use cut-outs as a digital stamp in your social posts, announcements, articles, and even official documents. The required resources and methods will be made available to the owner immediately after purchase.`,
		url: FRONTEND_BASE_URL,
		robots: "index,follow",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}
