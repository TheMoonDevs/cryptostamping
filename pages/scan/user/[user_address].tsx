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
	supportedMainChains,
	supportedTestChains,
	getChainObject,
	getChainFromSymbol,
	isTestnet,
	ChainProps,
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

const StampCard = ({ stamp, stampset }) => {
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
							{printAddress(stamp.owner_address)}
						</p>
					</div>
					<div className="d-flex flex-column align-items-end ml-2">
						<p className={stamp_styles.title}>
							{stamp.rarity_used} / {stamp.rarity}
						</p>
						<p className={stamp_styles.subtitle}>
							{getRandPrice()} ETH
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

const StamperCard = ({ stamper, stampset }) => {
	const fadeBinding = useImageFade();
	return (
		<Link href={`/scan/user/${stamper?.wallet_address}`}>
			<a className={stamp_styles.stamp_card}>
				<div className={stamp_styles.stamp_imgbox}>
					{stamper?.user_meta?.image && (
						<img
							className={`${stamp_styles.stamping_square}`}
							src={stamper.user_meta?.image}
							alt=""
							{...fadeBinding}
						/>
					)}
					{!stamper?.user_meta?.image && (
						<Blockies
							seed={stamper?.wallet_address?.toLowerCase()}
							size={8}
							scale={8}
							className={`${stamp_styles.stamping_square}`}
						/>
					)}
				</div>
				<div className={stamp_styles.stamp_infobox}>
					<div className="d-block">
						<p className={stamp_styles.title}>
							{stamper?.user_meta?.name}
						</p>
						<p className={stamp_styles.subtitle}>
							{printAddress(stamper?.wallet_address)}
						</p>
					</div>
					<div className="d-flex flex-column align-items-end ml-2">
						<p className={stamp_styles.title}></p>
						<p className={stamp_styles.subtitle}></p>
					</div>
				</div>
			</a>
		</Link>
	);
};

const ErrorCard = ({ user_address, tab, testnet }) => {
	return (
		<div className={`d-block p-5`}>
			<p className={stamping_styles.stamping_descr_large}>
				{"There are no results here."}
			</p>
			<div className={styles.bulletin}>
				<p className={stamping_styles.web_descr}>
					<span
						className={`${styles.inline_icon} ${styles.icon_bulletin}`}
					></span>
					{
						"The owner of this wallet address might not have yet used cryptostamping."
					}
				</p>
				<p className={stamping_styles.web_descr}>
					<span
						className={`${styles.inline_icon} ${styles.icon_bulletin}`}
					></span>
					{
						"The owner of this wallet address does not own any registered NFTs."
					}
				</p>
				<p className={stamping_styles.web_descr}>
					<span
						className={`${styles.inline_icon} ${styles.icon_bulletin}`}
					></span>
					{
						"please switch to testnet in the scenario that you were looking for testnet results."
					}
				</p>
				{testnet === "true" &&
				<Link
					href={`/scan/user/${user_address}?${
						tab ? "tab=" + tab + "&" : ""
					}`}
				>
					<a className={`${styles.fetch_btn}`}>Switch to Mainnet.</a>
				</Link>
				}
				{testnet !== "true" &&
				<Link
					href={`/scan/user/${user_address}?${
						tab ? "tab=" + tab + "&" : ""
					}testnet=true`}
				>
					<a className={`${styles.fetch_btn}`}>Switch to testnet.</a>
				</Link>
				}
			</div>
		</div>
	);
};

const StampingPost = ({ stamping, stampset }) => {
	const fadeBinding = useImageFade();
	return (
		<div className={stamping_styles.stamping_card}>
			<div className="d-block">
				{stamping.metadata?.stamp_vid && (
					<video
						className={`${stamping_styles.stamping_mini} ${stamping_styles.visible}`}
						src={stamping.metadata?.stamp_vid}
						controls={false}
						autoPlay={true}
						poster={`/images/blank_background.svg`}
						muted
						loop
						playsInline
					/>
				)}
				{!stamping.metadata?.stamp_vid && (
					<img
						className={`${stamping_styles.stamping_mini}`}
						src={
							stamping.metadata?.stamp || stamping.metadata?.image
						}
						alt=""
						{...fadeBinding}
					/>
				)}
			</div>
			<div className={stamping_styles.stamping_infobox}>
				<div className="d-flex w-100 justify-content-between align-items-center mb-3">
					<div className="d-block flex-grow-1">
						<Link
							href={`/scan/${stamping.chain}/${stamping.token_address}/${stamping.token_id}`}
						>
							<a className={stamping_styles.stamping_link}>
								{stamping.metadata?.name}
							</a>
						</Link>
						<div className="d-flex align-items-center">
							<Link
								href={`/scan/${stamping.chain}/${stamping.token_address}`}
							>
								<a
									className={`${stamping_styles.url} ${stamping_styles.blue_link}`}
								>
									{stamping.token_meta?.title ||
										stamping.token_name}
									{stamping.token_meta?.verified && (
										<span
											className={`${styles.inline_icon} ${styles.icon_verified}`}
										>
											{" "}
										</span>
									)}
								</a>
							</Link>
							<p className={stamping_styles.url}>
								&nbsp;.&nbsp;
								<span className={stamping_styles.light}>
									{prettyPrintDate(stamping.createdAt)}
								</span>{" "}
							</p>
						</div>
					</div>
					<div className={"d-flex flex-column align-items-end"}>
						<div className="d-flex align-items-center mb-2">
							<p className={card2styles.subtitle}>
								{getRandPrice()} ETH
							</p>
							<span
								className={`${card2styles.icon} ${card2styles.icon_padded_r}
							${stamping.chain} ml-2 mr-0`}
							/>
						</div>
						<p className={card2styles.address}>
							STAMPING LIMIT: {stamping.rarity}
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

export default function UserPage({ }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {Moralis, isInitialized} = useMoralis();

	const filters:ChainProps[] = [...availableMainChains, ...availableTestChains];
	const { tab, user_address, testnet }= router.query;
	const tabs = [
		{ name: "Stamping History", logo: styles.icon_history, id: "history" },
		{ name: "Explore NFTs", logo: styles.icon_explore, id: "explore" },
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
		return tabs[0];
	};

	const [currentTab, setCurrentTab] = useState(getTabFromId(tab));
	const [stampset, setStampset] = useState([]);
	const [stamps, setStamps] = useState([]);
	const [stamps_count, setStampsCount] = useState(0);
	const [stamping_count, setStampingCount] = useState(0);
	const [stamper, setStamper] = useState(null);
	const [stampings, setStampings] = useState([]);
	const {
		value: searchText,
		bind: bindSearch,
		setValue: setSearch,
	} = useInputText();

	useEffect(() => {
		const _getTabFromId = (tab_in) => {
			for (const _tab of tabs) {
				if (_tab.id === tab_in) {
					return _tab;
				}
			}
			return tabs[0];
		};
		setCurrentTab(_getTabFromId(tab));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	useEffect(() => {
		if (user_address != null) {
			/* STAMPINGS & COUNT */
			MoralisQuery(Moralis, {
				className: "Stamping",
				matches: [
					{
						name: "user_address",
						value: user_address.toString().toUpperCase(),
						type: "i",
					},
				],
				containedIn: [
					{
						name: "chain",
						value: testnet
							? supportedTestChains
							: supportedMainChains,
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 30,
				exec: "find",
			})
				.then((response) => {
					setStampings(Array.from(response, (x:any) => x.toJSON()));
				})
				.catch((error) => {});

			MoralisQuery(Moralis, {
				className: "Stamping",
				matches: [
					{
						name: "user_address",
						value: user_address.toString().toUpperCase(),
						type: "i",
					},
				],
				containedIn: [
					{
						name: "chain",
						value: testnet
							? supportedTestChains
							: supportedMainChains,
					},
				],
				exec: "count",
			})
				.then((response) => {
					setStampingCount(response);
				})
				.catch((error) => {});

			/* STAMPS & COUNT */
			MoralisQuery(Moralis, {
				className: "Stamp",
				matches: [
					{
						name: "owner_address",
						value: user_address.toString().toUpperCase(),
						type: "i",
					},
				],
				containedIn: [
					{
						name: "chain",
						value: testnet
							? supportedTestChains
							: supportedMainChains,
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 30,
				exec: "find",
			})
				.then((response) => {
					setStamps(Array.from(response, (x:any) => x.toJSON()));
				})
				.catch((error) => {});
			MoralisQuery(Moralis, {
				className: "Stamp",
				matches: [
					{
						name: "owner_address",
						value: user_address.toString().toUpperCase(),
						type: "i",
					},
				],
				containedIn: [
					{
						name: "chain",
						value: testnet
							? supportedTestChains
							: supportedMainChains,
					},
				],
				exec: "count",
			})
				.then((response) => {
					console.log(response);
					setStampsCount(response);
				})
				.catch((error) => {});

			/* STAMPER */
			MoralisQuery(Moralis, {
				className: "Stamper",
				matches: [
					{
						name: "wallet_address",
						value: user_address.toString().toUpperCase(),
						type: "i",
					},
				],
				limit: 1,
				exec: "find",
			})
				.then((response) => {
					setStamper(response[0].toJSON());
				})
				.catch((error) => {});
		}
	}, [user_address, testnet, isInitialized, Moralis]);

	const getLogoForSymbol = (_symbol) => {
		for (const chain of filters) {
			if (chain.symbol === _symbol) return chain.logo;
		}
		return "all";
	};

	return (
		<div className={`page_wrapper`}>
			{testnet && (
				<div className={styles.header_toast}>
					<h4 className={`${styles.tag_value} ${styles.med}`}>
						You`&apos;re currently viewing in Testnet Mode.
					</h4>
					<Link
						href={`/scan/user/${user_address}?${
							tab ? "tab=" + tab + "&" : ""
						}`}
					>
						<a
							className={`${stamping_styles.url} ${stamping_styles.blue_link} ml-4`}
						>
							Switch to Mainnet.
						</a>
					</Link>
				</div>
			)}
			<div className={`${styles.container}`}>
				<div className={`col-2 px-0`}>
					<div className={styles.tabs_bar}>
						<div
							className={`d-flex align-items-start justify-content-center mb-3`}
						>
							<StamperCard
								stamper={stamper}
								stampset={stampset}
							/>
							<div
								className={`${styles.buttons_list} ${styles.vert} my-0`}
							>
								<div
									className={`${styles.button_item} ${styles.vert}`}
								>
									<h4
										className={`${styles.tag_value} ${styles.med}`}
									>
										{stamping_count}
									</h4>
									<h4
										className={`${styles.tag_name} ${styles.med}`}
									>
										stampings
									</h4>
								</div>
								<div
									className={`${styles.button_item} ${styles.vert}`}
								>
									<h4
										className={`${styles.tag_value} ${styles.med}`}
									>
										{stamps_count}
									</h4>
									<h4
										className={`${styles.tag_name} ${styles.med}`}
									>
										NFTs
									</h4>
								</div>
								<div
									className={`${styles.button_item} ${styles.vert} ${styles.bottom}`}
								>
									<Blockies
										seed={user_address?.toString().toLowerCase()}
										size={8}
										scale={3}
										className={styles.tag_logo}
									/>
									<Link href={`/scan/user/${user_address}`}>
										<a
											className={`${styles.tag_subname} ${card2styles.address}`}
										>
											{printAddress(user_address)}
										</a>
									</Link>
								</div>
							</div>
						</div>
						<div className={styles.vert_list}>
							{tabs.map((tab) => {
								return (
									<Link
										key={tab.id}
										href={`/scan/user/${user_address}?tab=${
											tab.id
										}${testnet ? "&testnet=true" : ""}`}
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
							{stampings?.length > 0 && (
								<div className={styles.vert_list}>
									{stampings.map((stamping) => {
										return (
											<StampingPost
												key={stamping.objectId}
												stamping={stamping}
												stampset={stampset}
											/>
										);
									})}
								</div>
							)}
							{stampings.length == 0 && (
								<ErrorCard
									tab={tab}
									testnet={testnet}
									user_address={user_address}
								/>
							)}
						</div>
					</div>
				)}
				{currentTab?.id === "explore" && (
					<div className={`col-8 px-0`}>
						<div className={styles.history_box}>
							<div className={styles.grid_list}>
								{stamps.map((stamp) => {
									return (
										<StampCard
											key={stamp.objectId}
											stamp={stamp}
											stampset={stampset}
										/>
									);
								})}
							</div>
							{stamps.length == 0 && (
								<ErrorCard
									tab={tab}
									testnet={testnet}
									user_address={user_address}
								/>
							)}
						</div>
					</div>
				)}
				{currentTab?.id === "transaction" && (
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
	const user_address = params.user_address;
	/* meta tags that need to be passed to the header */
	const header = {
		title: `View this collection on Cryptostamping`,
		description: `View this collection on Cryptostamping. A stamping enabled collection can let its NFT owners stamp their NFT on websites, posts, articles etc..`,
		url: `${FRONTEND_BASE_URL}/scan/${user_address}`,
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
