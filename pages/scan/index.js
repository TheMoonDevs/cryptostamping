import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMoralisQuery } from "react-moralis";

import Tooltip from "components/modals/tooltip";
import PageLoader from "components/global/pageloader";

import cardstyles from "styles/common/card.module.scss";
import card2styles from "styles/common/card2.module.scss";
import styles from "styles/pages/scan.module.scss";

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
} from "lib/utils";
import { MoralisQuery } from "lib/moralis";

const StampingBar = ({ stamping }) => {
	const fadeBinding = useImageFade();
	return (
		<div key={stamping.objectId} className={styles.stamping_block}>
			<img
				className={styles.stamping_logo}
				src={stamping.web_meta?.logo || "/icons/public.svg"}
				alt={""}
			/>
			<div className="d-block">
				<a
					className={styles.stamping_link}
					href={stamping.url}
					target={"_blank"}
					rel={"noreferrer"}
				>
					{stamping.url ? decodeURI(stamping.url) : "WARNING: ERROR"}
				</a>
				<p className={styles.stamping_title}>{stamping.title}</p>
				<p className={styles.stamping_date}>
					<b>Stamp Time:</b> {prettyPrintDate(stamping.createdAt)}{" "}
					&nbsp;&nbsp;&nbsp; <b>Owned by:</b>{" "}
					<a
						className={`${styles.light_link}`}
						href={`/scan/user/${stamping.user_address}`}
					>
					{printAddress(stamping.user_address)}
					</a>
					&nbsp;&nbsp;&nbsp;
					<br />
					<b>Token: &nbsp;</b>
					<a
						className={`${styles.light_link}`}
						href={`/scan/${stamping.chain}/${stamping.token_address}/${stamping.token_id}`}
					>
						{stamping.token_name}---
						{printAddress(stamping.token_address)}--
						{stamping.token_id}{" "}
					</a>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<b>Price:</b>{" "}
					{getRandPrice(stamping.metadata?.name?.length)} ETH
					&nbsp;&nbsp;&nbsp;
					<b>Rarity Limit:</b> {stamping.rarity} <br />
				</p>
			</div>
			<div className={styles.stamping_rightblock}>
				{stamping.metadata?.stamp_vid && (
					<video
						className={`${styles.stamping_stamp} ${styles.visible}`}
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
						className={`${styles.stamping_stamp}`}
						src={
							stamping.metadata?.stamp || stamping.metadata?.image
						}
						alt=""
						{...fadeBinding}
					/>
				)}
			</div>
		</div>
	);
};

const StampsetBar = ({ stampset }) => {
	const fadeBinding = useImageFade();
	return (
		<div key={stampset.objectId} className={styles.stamping_block}>
			<img
				className={`${styles.stamping_logo} ${styles.fill}`}
				src={stampset.images_meta?.logo || "/icons/public.svg"}
				alt={""}
			/>
			<div className="d-block">
				<a
					className={`${styles.stamping_link} ${styles.stamping_title}`}
					href={`/scan/${stampset.chain}/${stampset.token_address}`}
				>
					{stampset.title}
				</a>
				<p className={styles.stamping_date}>
					<b>Listed At:</b> {prettyPrintDate(stampset.createdAt)}{" "}
					&nbsp;&nbsp;&nbsp; <b>Owned by:</b>{" "}
					<a
						className={`${styles.light_link}`}
						href={`/scan/user/${stampset.owner_meta?.address}`}
					>
					{printAddress(stampset.owner_meta?.address)}
					</a>
					&nbsp;&nbsp;&nbsp; <br />
					<b>Token: </b>
					<a
						className={`${styles.light_link}`}
						href={`/scan/${stampset.chain}/${stampset.token_address}`}
					>
						{printAddress(stampset.token_address)}
					</a>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<b>Price:</b> {getRandPrice(stampset.title?.length)} ETH
					&nbsp;&nbsp;&nbsp;
					<b>Rarity:</b> {stampset.rarity} <br />
				</p>
			</div>
		</div>
	);
};

export default function ScanPage({ Moralis, authenticate, user }) {
	const dispatch = useDispatch();
	const router = useRouter();

	const filters = [...availableMainChains, ...availableTestChains];
	const { chain_id } = router.query;

	const {
		value: searchText,
		bind: bindSearch,
		setValue: setSearch,
	} = useInputText();
	const chain_obj = getChainFromSymbol(chain_id);
	const [currentFilter, setCurrentFilter] = useState(chain_obj || filters[0]);
	const [stampings, setStampings] = useState([]);
	const [stamping_count, setStampingCount] = useState(0);
	const [stampsets, setStampsets] = useState([]);

	useEffect(() => {
		console.log(chain_id);
		const chain_obj = getChainFromSymbol(chain_id);
		if (chain_obj) setCurrentFilter(chain_obj);
	}, [chain_id]);

	useEffect(() => {
		MoralisQuery(Moralis, {
				className: "Stamping",
				equalTo: [
					{
						name: "chain",
						value: currentFilter ? currentFilter.symbol : "all"
					},
				],
				exec: "count",
			})
				.then((response) => {
					setStampingCount(response);
				})
				.catch((error) => {});
	},[currentFilter])

	const {
		data: stamping_data,
		error: stamping_error,
		isLoading: stamping_loading,
	} = useMoralisQuery(
		"Stamping",
		(query) => {
			query.equalTo("chain", currentFilter ? currentFilter.symbol : "all");
			query.descending("createdAt");
			query.limit(10);
			return query;
		},
		[currentFilter]
	);

	useEffect(() => {
		if (stamping_data.length <= 0) setStampings([]);
		else setStampings(Array.from(stamping_data, (x) => x.toJSON()));
	}, [stamping_data]);

	const {
		data: stampsets_data,
		error: stampsets_error,
		isLoading: stampsets_loading,
	} = useMoralisQuery(
		"Stampset",
		(query) => {
			query.equalTo("enabled", true);
			query.equalTo("chain", currentFilter ? currentFilter.symbol : "all");
			query.descending("createdAt");
			query.limit(10);
			return query;
		},
		[currentFilter]
	);
	useEffect(() => {
		if (stampsets_data.length <= 0) setStampsets([]);
		else setStampsets(Array.from(stampsets_data, (x) => x.toJSON()));
	}, [stampsets_data]);

	const getLogoForSymbol = (_symbol) => {
		for (const chain of filters) {
			if (chain.symbol === _symbol) return chain.logo;
		}
		return "all";
	};

	return (
		<div className={`page_wrapper`}>
			<div className={`${styles.header}`}>
				<div className="d-block">
					<h3 className={styles.header_title}>
						{" "}
						Cryptostamping Scanner{" "}
					</h3>
					<p className={styles.header_subtitle}>
						{" "}
						Search which NFTs are making an impact on Internet.{" "}
					</p>
					<div className={styles.input_btn}>
						<Tooltip
							delay={0}
							position={"bottom center"}
							on={["click"]}
							popupClass={styles.popup_box}
							closeOnClick={true}
							trigger={
								<div>
									<a className={`${styles.btn_filter}`}>
										<span
											className={`${styles.tab_icon} ${
												styles.head
											} ${currentFilter.logo} ${
												getChainObject(
													currentFilter.chainId,
													"testnet"
												) && styles.grey
											}`}
										></span>
										{currentFilter.name} Chain
										<span
											className={`${styles.icon_arrow}`}
										/>
									</a>
								</div>
							}
						>
							<div className={styles.vert_list}>
								{filters.map((filter) => {
									return (
										<Link 
										key={filter.symbol}
										href={`/scan/${filter.symbol}`}>
										<a
											className={`diva ${
												styles.hover_color
											} ${
												currentFilter.symbol ===
													filter.symbol &&
												styles.active
											}`}
										>
											{filter.name}
											<span
												className={`${
													styles.tab_icon
												} ${filter.logo} ${
													getChainObject(
														filter.chainId,
														"testnet"
													) && styles.grey
												}`}
											></span>
										</a>
										</Link>
									);
								})}
							</div>
						</Tooltip>
						<input
							className={`${styles.input_text}`}
							type="text"
							autoComplete="off"
							placeholder={
								"Search by Token Address / User Address / Web URL"
							}
							{...bindSearch}
						/>
						<div className={styles.input_icon_btn}>
							<span
								className={`${styles.input_icon} ${styles.icon_search}`}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={`col-8 pl-0`}>
					<div className={styles.info_block}>
						<div className={styles.info_header}>
							<h4>
								{" "}
								Latest Stampings of {currentFilter.name} NFTs on
								Web{" "}
							</h4>
							<p>{stamping_count} stampings</p>
						</div>
						<div className={styles.stamping_list}>
							{stampings.map((stamping) => (
								<StampingBar
									key={stamping.objectId}
									stamping={stamping}
								/>
							))}
						</div>
					</div>
				</div>
				<div className={`col-4 pr-0`}>
					<div className={styles.info_block}>
						<div className={styles.info_header}>
							<h4>
								{" "}
								Latest NFT Collections listed from{" "}
								{currentFilter.name}
							</h4>
						</div>
						<div className={styles.stamping_list}>
							{stampsets.map((stampset) => (
								<StampsetBar
									key={stampset.objectId}
									stampset={stampset}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* Static Site Genration */
export async function getServerSideProps({params}) {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Scanner | Search Stamp Collections, Stamping History, User Holdings`,
		description: `Etherscan for all things stamping related.`,
		url: `${FRONTEND_BASE_URL}/scan`,
		robots: "index,follow",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}
