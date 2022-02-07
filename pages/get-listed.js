import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMoralisQuery } from "react-moralis";

import Footer from "components/global/footer";
import Tooltip from "components/modals/tooltip";
import PageLoader from "components/global/pageloader";

import cardstyles from "styles/common/card.module.scss";
import card2styles from "styles/common/card2.module.scss";
import styles from "styles/pages/home.module.scss";
import scan_styles from "styles/pages/scan.module.scss";

import { useInputText } from "lib/form";
import {
	APP_TITLE,
	FRONTEND_BASE_URL,
	IN_DEV_ENV,
	stampCollectionCards,
	supportedMainChains,
	availableMainChains,
	availableTestChains,
	getChainObject,
	getChainFromSymbol,
	isTestnet,
} from "lib/data";
import { MoralisQuery } from "lib/moralis";

export default function ListingPage({ Moralis, authenticate, user }) {
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

	return (
		<div className={`page_wrapper`}>
			<div className={`${styles.screen_one}`}>
				<div
					className={`${styles.centered} ${styles.box} ${styles.wide}`}
				>
					<h1 className={styles.headline}>
						Get Listed on Cryptostamping
					</h1>
					<p className={`${styles.description} ${styles.resp_fix}`}>
						The world's first utility protocol for crypto
						collectibles and NFTs. <br /> Enable functionality to
						your digital assets & enter the web3 game.
					</p>
					<div className={`d-flex justify-content-center align-items-center mt-5`}>
						<div className={`${scan_styles.input_btn} mt-0`}>
							<Tooltip
								delay={0}
								position={"bottom center"}
								on={["click"]}
								popupClass={scan_styles.popup_box}
								closeOnClick={true}
								trigger={
									<div>
										<a
											className={`${scan_styles.btn_filter}`}
										>
											<span
												className={`${
													scan_styles.tab_icon
												} ${scan_styles.head} ${
													currentFilter.logo
												} ${
													getChainObject(
														currentFilter.chainId,
														"testnet"
													) && scan_styles.grey
												}`}
											></span>
											{currentFilter.name} Chain
											<span
												className={`${scan_styles.icon_arrow}`}
											/>
										</a>
									</div>
								}
							>
								<div className={scan_styles.vert_list}>
									{filters.map((filter) => {
										return (
											<Link
												key={filter.symbol}
												href={`/scan/${filter.symbol}`}
											>
												<a
													className={`diva ${
														scan_styles.hover_color
													} ${
														currentFilter.symbol ===
															filter.symbol &&
														scan_styles.active
													}`}
												>
													{filter.name}
													<span
														className={`${
															scan_styles.tab_icon
														} ${filter.logo} ${
															getChainObject(
																filter.chainId,
																"testnet"
															) &&
															scan_styles.grey
														}`}
													></span>
												</a>
											</Link>
										);
									})}
								</div>
							</Tooltip>
							<input
								className={`${scan_styles.input_text}`}
								type="text"
								autoComplete="off"
								placeholder={"Paste your Token Address"}
								{...bindSearch}
							/>
						</div>
						<div className={`${styles.button} ml-4`}>Add</div>
					</div>
					<p className={`${styles.tagtext} ${styles.small} mt-4`}>
						*Feature &nbsp;&nbsp; launches &nbsp;&nbsp; on
						&nbsp;&nbsp; March &nbsp;&nbsp; 31*
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `${APP_TITLE} | Get Listed.`,
		description: `Get your NFT collection listed on cryptostamping & avail features to your NFT users.`,
		url: FRONTEND_BASE_URL,
		robots: "noindex,nofollow",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}
