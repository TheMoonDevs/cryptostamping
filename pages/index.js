import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import Script from "next/script";

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
				<img
					className={styles.home_banner}
					src="/images/websitebg.png"
					alt=""
				/>
				<div className={styles.centered}>
					<div id="cryptostamping_v1" data-view="button"></div>
					<link
						href="https://embed.cryptostamping.org/widgets.css"
						rel="stylesheet"
					/>
					<Script src="https://embed.cryptostamping.org/widgets.js"></Script>
					<p className={styles.tagtext}>
						OPEN-SOURCE . OWNERLESS . DECENTRALIZED
					</p>
					<p className={styles.header}>
						Use your NFT to stamp on websites, posts, articles,
						videos, games, anywhere on internet.
					</p>
					<Link href="/intro">
						<a className={styles.button}>Explore Use-Cases.</a>
					</Link>
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
		title: `Cryptostamping | Opensource, Ownerless & Decentralized.`,
		description: `Use your NFT to stamp on websites, posts, articles, videos, games, anywhere on internet.`,
		url: `${FRONTEND_BASE_URL}`,
		robots: "index,follow",
		image: `${FRONTEND_BASE_URL}/images/cover.jpg`,
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}
