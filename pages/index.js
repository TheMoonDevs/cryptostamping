import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import Link from "next/link";

import WhitelistSidebar from "components/modals/whitelist";
import WalletSidebar from "components/modals/wallet_sidebar";
import TrailerSidebar from "components/modals/trailer";
import AuctionBlock from "components/home/auctionblock";
import Header from "components/global/header";
import Footer from "components/global/footer";
import Navigation from "components/global/navigation";
import FAQ from "components/home/faq";

import styles from "styles/pages/home.module.scss";
import { FRONTEND_BASE_URL, mainFAQs } from "lib/data";

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setTopLoading } from "lib/redux/features/uiSlice";

export default function Homepage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user, auth } = useMoralis();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	return (
		<div className={`${styles.container}`}>
			<Header
				dispatch={dispatch}
				Moralis={Moralis}
				authenticate={authenticate}
			/>
			<div className={styles.screen_one}>
				<p className={styles.smalltext}>
					opensource . ownerless . decentralized
				</p>
				<p className={styles.header}>
					 Use your NFT to stamp on websites, posts, articles, videos, games, anywhere on internet.
				</p>
				<Link  href="/intro">
				<a className={styles.button}>
				Explore Use-Cases.
				</a>
				</Link>
			</div>
			<Footer />
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cryptostamping | Opensource, Ownerless & Decentralized.`,
		description: ``,
		url: "https://cutoutsnft.com",
		robots: "index,follow",
		image: "https://cutoutsnft.com/images/cover.jpg",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};

	/*


						<Link href="/presale">
						<a
							className={`${styles.read_more} ${styles.complete}`}
						>
							<span
								className={`${styles.icon} ${styles.icon_presale}`}
							/>
							Pre Sale
						</a>
						</Link>
						*/
}
