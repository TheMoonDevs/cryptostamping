import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import Link from "next/link";

import WhitelistSidebar from "components/modals/whitelist";
import WalletSidebar from "components/modals/wallet_sidebar";
import TrailerSidebar from "components/modals/trailer";
import InvestBlock from "components/home/investblock";
import Header from "components/global/header";
import Footer from "components/global/footer";
import Navigation from "components/global/navigation";
import FAQ from "components/home/faq";

import styles from "styles/pages/invest.module.scss";
import { FRONTEND_BASE_URL, investFAQs } from "lib/data";

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setTopLoading } from "lib/redux/features/uiSlice";

export default function InvestPage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user, auth } = useMoralis();

	useEffect(() => {
		if (auth.state === "error" || auth.state === "unauthenticated") {
			dispatch(setLoggedIn(false));
			dispatch(setTopLoading(false));
		}
		if (auth.state === "authenticated") {
			dispatch(setLoggedIn(true));
			dispatch(setTopLoading(false));
		}
	}, [auth]);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const [highlightBlock, setHighlightBlock] = useState(true);

	return (
		<div className={`${styles.container}`}>
			<WalletSidebar />
			<TrailerSidebar />
			<WhitelistSidebar />
			<Header
				dispatch={dispatch}
				Moralis={Moralis}
				authenticate={authenticate}
			/>
			<div className={`${styles.screen} ${styles.screen_one}`}>
				<div className={styles.banner_box}>
					<p className={styles.banner_text}>
						JOIN &nbsp;&nbsp; HISTORY &nbsp;&nbsp; IN
						&nbsp;&nbsp; ITS &nbsp;&nbsp; MAKING.
					</p>
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_invest}`}>
				
				<div className={styles.invest_container}>
				<div className={styles.invest_block}>
					<InvestBlock
						highlightBlock={highlightBlock}
						setHighlightBlock={setHighlightBlock}
					/>
				</div>
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_three}`}>
				<div className={styles.faq_block}>
					<FAQ
						item={{
							title: "An Investor's bulletin",
							list: investFAQs,
						}}
						initialFAQ={[]}
					/>
					<Navigation
						buttons={["home", "faqs", "whitepaper", "roadmap"]}
					/>
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
		title: `Cut Outs | Invest Now & Join History.`,
		description: `Invest in a longstanding project that will live through ages.`,
		url: "https://cutoutsnft.com/invest",
		robots: "index,follow",
		image: "https://cutoutsnft.com/images/invest.jpg",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}

/*
<video
					className={styles.invest_video}
					src={"/videos/site_stamp.mp4"}
					controls={false}
					autoPlay={true}
					poster={"/images/blank_background.svg"}
					muted
					loop
					playsInline
				/>
				*/
