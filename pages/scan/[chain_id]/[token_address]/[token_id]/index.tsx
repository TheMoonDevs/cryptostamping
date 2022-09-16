/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Blockies from "react-blockies";

import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMoralis, useMoralisQuery } from "react-moralis";

import Tooltip from "components/modals/tooltip";
import PageLoader from "components/global/pageloader";

import card2styles from "styles/common/card2.module.scss";
import styles from "styles/pages/stampset.module.scss";
import stamping_styles from "components/views/card_stamping.module.scss";
import stamp_styles from "components/views/card_stamp.module.scss";

import { useInputText } from "lib/form";
import {
	APP_TITLE,
	FRONTEND_BASE_URL,
	IN_DEV_ENV,
	stampCollectionCards,
	availableMainChains,
	availableTestChains,
	getChainObject,
	getChainFromSymbol,
	isTestnet,
} from "lib/data";
import {
	useImageFade,
	printAddress,
	prettyPrintDate,
	getRandPrice,
	printPrice,
} from "lib/utils";
import { MoralisQuery } from "lib/moralis";
import { useAppDispatch } from "lib/redux/store";

const StampCard = ({ stamp, stampset, currentChain }) => {
	const fadeBinding = useImageFade();
	return (
		<Link
			href={`/scan/${stamp.chain}/${stamp.token_address}/${stamp.token_id}`}
		>
			<a className={stamp_styles.stamp_card}>
				<div className={stamp_styles.stamp_imgbox}>
					{stamp.metadata?.stamp_vid && (
						<video
							className={`${stamp_styles.stamping_med} ${stamp_styles.visible}`}
							src={stamp.metadata?.stamp_vid}
							controls={false}
							autoPlay={true}
							poster={`/images/blank_background.svg`}
							muted
							loop
							playsInline
						/>
					)}
					{!stamp.metadata?.stamp_vid && (
						<img
							className={`${stamp_styles.stamping_med}`}
							src={stamp.metadata?.stamp || stamp.metadata?.image}
							alt=""
							{...fadeBinding}
						/>
					)}
				</div>
				<div className={stamp_styles.stamp_infobox}>
					<div className="d-block">
						<p className={stamp_styles.title}>
							{stamp.metadata?.name}
						</p>
						<p className={stamp_styles.subtitle}>
							{stampset.title}
							{stampset.owner_meta?.verified && (
								<span
									className={`${styles.inline_icon} ${styles.icon_verified}`}
								>
									{" "}
								</span>
							)}
						</p>
					</div>
					<div className="d-flex flex-column align-items-end ml-2"></div>
				</div>
			</a>
		</Link>
	);
};

const StampingPost = ({ index, stamp, stamping, stampset, currentChain }) => {
	const fadeBinding = useImageFade();
	return (
		<div className={stamping_styles.stamping_card}>
			<div className={stamping_styles.stamping_infobox}>
				<div className="d-flex w-100 justify-content-between align-items-center">
					<div className="d-block flex-grow-1">
						<div className="d-flex align-items-center">
							<p className={stamping_styles.url}>
								{stamping.url
									? decodeURI(stamping.url)?.substring(0, 30)
									: "WARNING: ERROR"}
								.. &nbsp;.&nbsp;
								<span className={stamping_styles.light}>
									{prettyPrintDate(stamping.createdAt)}
								</span>{" "}
							</p>
							<Link href={`/scan/user/${stamp.owner_address}`}>
								<a className={card2styles.address}>
									{printAddress(stamping.user_address)}
								</a>
							</Link>
						</div>
					</div>
					<div className={"d-flex flex-column align-items-end"}>
						<div className="d-flex align-items-center mb-2">
							<p className={card2styles.subtitle}>
								#{stamp.rarity_used - index}
							</p>
							<span
								className={`${card2styles.icon} ${card2styles.icon_padded_r}
							${stamping_styles.icon_rank} ml-2 mr-0`}
							/>
						</div>
						<p className={card2styles.address}>
							{getRandPrice(stampset.title)} ETH
						</p>
					</div>
				</div>
				<p className={stamping_styles.stamping_descr_large}>
					{stamping.comment ? stamping.comment : "Stamped ."}
				</p>
				<a
					href={stamping.url}
					target={"_blank"}
					rel={"noreferrer"}
					className={stamping_styles.web_card}
				>
					{stamping.web_meta?.image && (
						<img
							className={stamping_styles.web_image}
							src={stamping.web_meta?.image}
							alt={""}
						/>
					)}
					<div className={stamping_styles.web_left_block}>
						<div className="d-flex align-items-center w-100">
							<img
								className={stamping_styles.web_logo}
								src={
									stamping.web_meta?.logo ||
									"/icons/public.svg"
								}
								alt={""}
							/>
							<div className={stamping_styles.web_info}>
								<p className={stamping_styles.title}>
									{stamping.title}
								</p>
								<p className={stamping_styles.url}>
									{stamping.url
										? decodeURI(stamping.url)
										: "WARNING: ERROR"}
								</p>
							</div>
						</div>
						<p className={stamping_styles.web_descr}>
							{stamping.web_meta?.description ||
								stamping.metadata?.description}
						</p>
					</div>
					<div className={stamping_styles.web_right_block}>
						<span className={stamping_styles.web_right_icon} />
					</div>
				</a>
			</div>
		</div>
	);
};

export default function CollectionPage({  }) {
	const dispatch = useAppDispatch();
	const {Moralis, isInitialized} = useMoralis();
	const router = useRouter();

	const filters = [...availableMainChains, ...availableTestChains];
	const { tab, chain_id, token_address, token_id } = router.query;
	const tabs = [
		{
			name: "View Collection",
			logo: styles.icon_back,
			id: "collection",
		},
		{ name: "Stamping History", logo: styles.icon_history, id: "history" },
		{ name: "Stamp Details", logo: styles.icon_personal, id: "owner" },
		{
			name: "Transactions",
			logo: styles.icon_transactions,
			id: "transaction",
		},
	];
	const getTabFromId = (tab_in) => {
		for (const _tab of tabs) {
			if (_tab.id === tab_in) {
				return _tab;
			}
		}
		return tabs[1];
	};

	const chain_obj = getChainFromSymbol(chain_id);
	const [currentChain, setCurrentChain] = useState(
		chain_obj || availableMainChains[0]
	);
	const [currentTab, setCurrentTab] = useState(getTabFromId(tab));
	const [stampset, setStampset]: [stampset:any,setStampset:any] = useState({});
	const [stamp, setStamp]: [stamp:any,setStamp:any] = useState([]);
	const [stamps, setStamps] = useState([]);
	const [stampings, setStampings] = useState([]);

	const {
		value: searchText,
		bind: bindSearch,
		setValue: setSearch,
	} = useInputText();

	useEffect(() => {
		const chain_obj = getChainFromSymbol(chain_id);
		if (chain_obj) setCurrentChain(chain_obj);
	}, [chain_id]);

	useEffect(() => {
		const _getTabFromId = (tab_in) => {
			for (const _tab of tabs) {
				if (_tab.id === tab_in) {
					return _tab;
				}
			}
			return tabs[1];
		};
		setCurrentTab(_getTabFromId(tab));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	useEffect(() => {
		if(!isInitialized) return;
		if (token_address != null && token_id != null) {
			console.log(currentChain?.symbol, token_address, token_id);

			//LOAD STAMPING HISTORY
			MoralisQuery(Moralis, {
				className: "Stamping",
				equalTo: [
					{ name: "chain", value: currentChain?.symbol || "all" },
					{
						name: "token_address",
						value: token_address.toString().toUpperCase(),
					},
					{
						name: "token_id",
						value: token_id,
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 30,
				exec: "find",
			})
				.then((response) => {
					console.log(response);
					setStampings(Array.from(response, (x: any) => x.toJSON()));
				})
				.catch((error) => {});

			// LOAD STAMP
			MoralisQuery(Moralis, {
				className: "Stamp",
				equalTo: [
					{ name: "chain", value: currentChain?.symbol || "all" },
					{
						name: "token_address",
						value: token_address.toString().toUpperCase(),
					},
					{
						name: "token_id",
						value: token_id,
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 1,
				exec: "find",
			})
				.then((response) => {
					setStamp(response[0].toJSON());
				})
				.catch((error) => {});

			//LOAD COLLECTION DETAILS
			MoralisQuery(Moralis, {
				className: "Stampset",
				equalTo: [
					{ name: "chain", value: currentChain?.symbol || "all" },
				],
				matches: [
					{
						name: "token_address",
						value: token_address.toString().toUpperCase(),
						type: "i",
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 1,
				exec: "find",
			})
				.then((response) => {
					setStampset(response[0].toJSON());
				})
				.catch((error) => {});
		}
	}, [currentChain, token_address, token_id, isInitialized, Moralis]);

	const {
		data: stamps_data,
		error: stamps_error,
		isLoading: stamps_loading,
	} = useMoralisQuery(
		"Stamp",
		(query) => {
			query.equalTo("chain", currentChain ? currentChain.symbol : "all");
			query.equalTo("token_address", token_address.toString().toUpperCase());
			query.descending("createdAt");
			query.limit(30);
			return query;
		},
		[currentChain, token_address, isInitialized]
	);

	useEffect(() => {
		if (stamps_data.length <= 0) setStamps([]);
		else setStamps(Array.from(stamps_data, (x: any) => x.toJSON()));
	}, [stamps_data]);

	const getLogoForSymbol = (_symbol) => {
		for (const chain of filters) {
			if (chain.symbol === _symbol) return chain.logo;
		}
		return "all";
	};

	return (
		<div className={`page_wrapper`}>
			<div className={`${styles.container}`}>
				<div className={`col-2 px-0`}>
					<div className={styles.tabs_bar}>
						<div
							className={`d-flex align-items-stretch justify-content-center`}
						>
							<StampCard
								stamp={stamp}
								stampset={stampset}
								currentChain={currentChain}
							/>
							{stampset.objectId && (
								<div
									className={`${styles.buttons_list} ${styles.vert}`}
								>
									<div
										className={`${styles.button_item} ${styles.vert}`}
									>
										<h4
											className={`${styles.tag_value} ${styles.med}`}
										>
											{stamp.rarity_used} / {stamp.rarity}
										</h4>
										<h4
											className={`${styles.tag_name} ${styles.med}`}
										>
											stampings
										</h4>
									</div>
									<div
										className={`${styles.button_item} ${styles.vert} ${styles.end}`}
									>
										<h4
											className={`${styles.tag_value} ${styles.med}`}
										>
											<span
												className={`${styles.inline_icon} ${currentChain.logo}`}
											/>
											{printPrice(
												Moralis,
												stampset.avg_price ||
													stampset.mint_price
											)}
										</h4>
										<h4
											className={`${styles.tag_name} ${styles.med}`}
										>
											floor price
										</h4>
									</div>
									<div
										className={`${styles.button_item} ${styles.vert} ${styles.bottom}`}
									>
										<Blockies
											seed={stamp.owner_address?.toLowerCase()}
											size={8}
											scale={3}
											className={styles.tag_logo}
										/>
										<Link
											href={`/scan/user/${stamp.owner_address}`}
										>
											<a
												className={`${styles.tag_subname} ${card2styles.address}`}
											>
												{printAddress(
													stamp.owner_address
												)}
											</a>
										</Link>
										<h4
											className={`${styles.tag_name} ${styles.med}`}
										>
											owner
										</h4>
									</div>
								</div>
							)}
						</div>
						<div className={styles.vert_list}>
							{tabs.map((tab) => {
								return (
									<Link
										key={tab.id}
										href={
											tab.id === "collection"
												? `/scan/${chain_id}/${token_address}?tab=explore`
												: `/scan/${chain_id}/${token_address}/${token_id}?tab=${tab.id}`
										}
									>
										<a
											className={`diva ${
												styles.tab_item
											} ${
												currentTab.id === tab.id &&
												styles.active
											}`}
										>
											<span
												className={`${styles.tab_icon} ${tab.logo}`}
											></span>
											{tab.name}
										</a>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
				{currentTab?.id === "history" && (
					<div className={`col-6 px-0`}>
						<div className={styles.history_box}>
							<div className={styles.vert_list}>
								{stampings.map((stamping, index) => {
									return (
										<StampingPost
											index={index}
											key={stamping.objectId}
											stamp={stamp}
											stamping={stamping}
											stampset={stampset}
											currentChain={currentChain}
										/>
									);
								})}
							</div>
						</div>
					</div>
				)}
				{currentTab?.id === "transaction" && (
					<div className={`col-6 px-0`}></div>
				)}
				{currentTab?.id === "owner" && (
					<div className={`col-6 px-0`}></div>
				)}
				{currentTab?.id !== "explore" && (
					<div className={`col-2 px-0`}>
						<div className={styles.right_bar}></div>
					</div>
				)}
			</div>
		</div>
	);
}

/* Static Site Genration */
export async function getServerSideProps({ params }) {
	const chain_id = params.chain_id;
	const token_address = params.token_address;
	const token_id = params.token_id;
	/* meta tags that need to be passed to the header */
	const header = {
		title: `View Stamping History`,
		description: `View the stamping history of a NFT.`,
		url: `${FRONTEND_BASE_URL}/scan/${chain_id}/${token_address}/${token_id}`,
		robots: "index,follow",
	};

	return {
		props: {
			header,
			footer: false,
			header_type: "normal",
		},
	};
}
