import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import Link from "next/link";

import WalletSidebar from "components/modals/wallet_sidebar";
import AuctionBlock from "components/home/auctionblock";
import Header from "components/global/header";
import Footer from "components/global/footer";
import Navigation from "components/global/navigation";
import FAQ from "components/home/faq";

import styles from "styles/pages/faq.module.scss";
import { FRONTEND_BASE_URL, faqs } from "lib/data";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
} from "lib/redux/features/uiSlice";

export default function FAQpage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user } = useMoralis();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isWalletOpen = useSelector((state) => state.ui.isWalletOpen);
	const isMarketOpen = useSelector((state) => state.ui.isMarketOpen);

	

	return (
		<div className={`${styles.container}`}>
			<Header dispatch={dispatch} Moralis={Moralis} />
			<div className={`${styles.screen} ${styles.screen_one}`}>
				<div className={styles.banner_box}>
					<p className={styles.banner_text}>
						
					</p>
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_three}`}>
				<div className={styles.faq_block}>
					{faqs.map((item) => {
						return (
							<FAQ key={item.title} item={item} initialFAQ={[]}/>
						);
					})}
					<Navigation buttons={["home", "invest", "whitepaper", "roadmap"]}/>
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
		title: `Cut Outs | FAQ's.`,
		description: `You can use cut-outs as a digital stamp in your social posts, announcements, articles, and even official documents.`,
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
