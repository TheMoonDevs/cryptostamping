/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

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
							{printAddress(stamp.owner_address)}
						</p>
					</div>
					<div className="d-flex flex-column align-items-end ml-2">
						<p className={stamp_styles.title}>{stamp.rarity_used} / {stamp.rarity}</p>
						<p className={stamp_styles.subtitle}>
							{getRandPrice()} ETH
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

const StampingPost = ({ stamping, stampset, currentChain }) => {
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
							<p className={stamping_styles.url}>
								{stampset.title} &nbsp;.&nbsp;
								<span className={stamping_styles.light}>
									{prettyPrintDate(stamping.createdAt)}
								</span>{" "}
							</p>
						</div>
						<Link href={`/user/${stamping.user_address}`}>
							<a className={`${card2styles.address} ml-0`}>
								OWNER: {printAddress(stamping.user_address)}
							</a>
						</Link>
					</div>
					<div className={"d-flex flex-column align-items-end"}>
						<div className="d-flex align-items-center mb-2">
							<p className={card2styles.subtitle}>
								{getRandPrice()} ETH
							</p>
							<span
								className={`${card2styles.icon} ${card2styles.icon_padded_r}
							${currentChain?.logo} ml-2 mr-0`}
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
							{stamping.web_meta?.description || stamping.metadata?.description}
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

export default function CollectionPage({}) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {Moralis, isInitialized} = useMoralis();

	const filters = [...availableMainChains, ...availableTestChains];
	const { tab, chain_id, token_address } = router.query;
	const tabs = [
		{ name: "Explore NFTs", logo: styles.icon_explore, id: "explore" },
		{ name: "All Stampings", logo: styles.icon_history, id: "history" },
		{
			name: "All Transactions",
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

	const chain_obj = getChainFromSymbol(chain_id);
	const [currentChain, setCurrentChain] = useState(
		chain_obj || availableMainChains[0]
	);
	const [currentTab, setCurrentTab] = useState(getTabFromId(tab));
	const [stampset, setStampset]: [stampset:any,setStampset:any] = useState({});
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
			return tabs[0];
		};
		setCurrentTab(_getTabFromId(tab));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	useEffect(() => {
		if(!isInitialized) return;
		if (token_address != null) {
			console.log(currentChain?.symbol, token_address);
			MoralisQuery(Moralis, {
				className: "Stamping",
				equalTo: [
					{ name: "chain", value: currentChain?.symbol || "all" },
					{
						name: "token_address",
						value: token_address.toString().toUpperCase(),
					},
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 30,
				exec: "find",
			})
				.then((response) => {
					console.log(response);
					setStampings(Array.from(response, (x:any) => x.toJSON()));
				})
				.catch((error) => {});
			MoralisQuery(Moralis, {
				className: "Stampset",
				equalTo: [
					{ name: "chain", value: currentChain?.symbol || "all" },
				],
				matches: [
					{ name: "token_address", value: token_address.toString().toUpperCase(), type: "i" },
				],
				sort: { order: "descending", name: "createdAt" },
				limit: 30,
				exec: "find",
			})
				.then((response) => {
					setStampset(response[0].toJSON());
				})
				.catch((error) => {});
		}
	}, [currentChain, token_address, isInitialized, Moralis]);

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
		else setStamps(Array.from(stamps_data, (x) => x.toJSON()));
	}, [stamps_data]);

	const getLogoForSymbol = (_symbol) => {
		for (const chain of filters) {
			if (chain.symbol === _symbol) return chain.logo;
		}
		return "all";
	};

	return (
		<div className={`page_wrapper`}>
			<div className={`${styles.header}`}>
				<div className={styles.banner}>
					<img
						className={styles.image_banner}
						src={stampset.images_meta?.banner}
						alt={""}
					/>
				</div>
				<div className={styles.header_info}>
					<div className={styles.info_start}></div>
					<div className={styles.info_middle}>
						<img
							className={styles.image_logo}
							src={stampset.images_meta?.logo}
							alt={""}
						/>
						<div
							className={"d-flex flex-column align-items-center"}
						>
							{stampset && (
								<h1 className={styles.header_title}>
									{stampset.title}
								</h1>
							)}
							{stampset.owner_meta && (
								<p className={styles.header_subtitle}>
									Created by&nbsp;
									<a
										className={styles.header_link}
										href={stampset.links_meta?.website}
										target="_blank"
										rel="noreferrer"
									>
										{stampset.owner_meta?.name}
										{stampset.owner_meta?.verified && (
											<span
												className={`${styles.inline_icon} ${styles.icon_verified}`}
											>
												{" "}
											</span>
										)}
									</a>
								</p>
							)}
							{stampset.objectId && (
								<div className={styles.buttons_list}>
									<div className={styles.button_item}>
										<h4 className={styles.tag_value}>
											{stampset.max_supply}
										</h4>
										<h4 className={styles.tag_name}>
											max. supply
										</h4>
									</div>
									<div className={styles.button_item}>
										<h4 className={styles.tag_value}>
											{stampset.max_rarity}
										</h4>
										<h4 className={styles.tag_name}>
											max. rarity
										</h4>
									</div>
									<div
										className={`${styles.button_item} ${styles.end}`}
									>
										<h4 className={styles.tag_value}>
											<span
												className={`${styles.inline_icon} ${currentChain.logo}`}
											/>
											{printPrice(
												Moralis,
												stampset.avg_price ||
													stampset.mint_price
											)}
										</h4>
										<h4 className={styles.tag_name}>
											floor price
										</h4>
									</div>
								</div>
							)}
							<p className={styles.header_descr}>
								{stampset.description}
							</p>
						</div>
					</div>
					<div className={styles.info_end}>
						{stampset && (
							<div
								className={`${styles.buttons_list} ${styles.mini}`}
							>
								{stampset.links_meta?.discord && (
									<a
										href={`https://discord.gg/${stampset.links_meta?.discord}`}
										target="_blank"
										rel="noreferrer"
										className={`${styles.button_item} ${styles.mini}`}
									>
										<div className={styles.tag_value}>
											<span
												className={`${styles.tag_icon} discord`}
											/>
										</div>
									</a>
								)}
								{stampset.links_meta?.instagram && (
									<a
										href={`https://instagram.com/${stampset.links_meta?.instagram}`}
										target="_blank"
										rel="noreferrer"
										className={`${styles.button_item} ${styles.mini}`}
									>
										<div className={styles.tag_value}>
											<span
												className={`${styles.tag_icon} instagram`}
											/>
										</div>
									</a>
								)}
								{stampset.links_meta?.twitter && (
									<a
										href={`https://twitter.com/@${stampset.links_meta?.twitter}`}
										target="_blank"
										rel="noreferrer"
										className={`${styles.button_item} ${styles.mini}`}
									>
										<div className={styles.tag_value}>
											<span
												className={`${styles.tag_icon} twitter`}
											/>
										</div>
									</a>
								)}
								{isTestnet(stampset.chain) && (
									<a
										href={`https://opensea.io/collection/${stampset.token_address}`}
										target="_blank"
										rel="noreferrer"
										className={`${styles.button_item} ${styles.mini}`}
									>
										<div className={styles.tag_value}>
											<span
												className={`${styles.tag_icon} ${styles.blue} opensea`}
											/>
										</div>
									</a>
								)}
								{stampset.links_meta?.website && (
									<a
										href={`${stampset.links_meta?.website}`}
										target="_blank"
										rel="noreferrer"
										className={`${styles.button_item} ${styles.mini} ${styles.end}`}
									>
										<div className={styles.tag_value}>
											<span
												className={`${styles.tag_icon} new_tab`}
											/>
										</div>
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{stampset.objectId &&
			<div className={`${styles.container}`}>
				<div className={`col-2 px-0`}>
					<div className={styles.tabs_bar}>
						<div className={styles.vert_list}>
							{tabs.map((tab) => {
								return (
									<Link
										key={tab.id}
										href={`/scan/${chain_id}/${token_address}?tab=${tab.id}`}
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
							<a
								key={"official"}
								href={`${stampset.links_meta?.website}`}
								target="_blank"
								className={`diva ${styles.tab_item}`} rel="noreferrer"
							>
								<span
									className={`${styles.tab_icon} ${styles.icon_open}`}
								></span>
								Official site
							</a>
						</div>
					</div>
				</div>
				{currentTab?.id === "history" && (
					<div className={`col-6 px-0`}>
						<div className={styles.history_box}>
							<div className={styles.vert_list}>
								{stampings.map((stamping) => {
									return (
										<StampingPost
											key={stamping.objectId}
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
				{currentTab?.id !== "explore" && (
					<div className={`col-2 px-0`}>
						<div className={styles.right_bar}></div>
					</div>
				)}
			</div>
			}
		</div>
	);
}

/* Static Site Genration */
export async function getServerSideProps({ params }) {
	const chain_id = params.chain_id;
	const token_address = params.token_address;
	/* meta tags that need to be passed to the header */
	const header = {
		title: `View this collection on Cryptostamping`,
		description: `View this collection on Cryptostamping. A stamping enabled collection can let its NFT owners stamp their NFT on websites, posts, articles etc..`,
		url: `${FRONTEND_BASE_URL}/scan/${chain_id}/${token_address}`,
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
