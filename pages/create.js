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
import { FRONTEND_BASE_URL } from "lib/data";
import { useImageFade } from "lib/utils";

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setTopLoading } from "lib/redux/features/uiSlice";

export default function Soonpage({}) {
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
				className={styles.fill_banner}
				src="/images/cards/comingsoon1.png"
				alt=""
				{...useImageFade()} />
			</div>
			<Footer />
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cryptostamping | Developer Docs.`,
		description: `Use your NFT to stamp on websites, posts, articles, videos, games, anywhere on internet.`,
		url: `${FRONTEND_BASE_URL}/create`,
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
