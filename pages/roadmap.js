import React, { useState, useEffect, useRef } from "react";
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
import { FRONTEND_BASE_URL, roadmap_faqs, roadmap_times } from "lib/data";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
} from "lib/redux/features/uiSlice";

export default function PreSalepage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user } = useMoralis();

	return (
		<div className={`${styles.container}`}>
			<Header dispatch={dispatch} Moralis={Moralis} />
			<div className={`${styles.screen} ${styles.screen_one}`}>
				<div className={styles.banner_box}>
					<p className={styles.banner_text}>
						CUT OUTS Q4, 2021 ROADMAP
					</p>
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_three}`}>
				<div className={styles.faq_block}>
					<div>
						<FAQ
							item={
								{title: "Cutouts Q4, 2021 Roadmap",
								list: roadmap_times}}
							initialFAQ={[]}
						/>
					</div>
					<Navigation
						buttons={["home", "faqs", "whitepaper", "invest"]}
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
		title: `Cut Outs | Roadmap.`,
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

/*

			<div className={`${styles.screen} ${styles.screen_three}`}>
				<div className={styles.three_faq_block}>
					<div>
						<h4 className={`${styles.two_title} ${styles.faq}`}>
							Cutouts, Future Plans & Goals.
						</h4>
						{roadmap_faqs.map((faq) => {
							return (
								<div key={faq.id}>
									<div
										onClick={() => {
											toggleFaQ(faq.id);
										}}
										className={`${styles.three_title} ${styles.top}`}
									>
										{faq.question}{" "}
										<span
											className="ml-2"
											role="img"
											aria-label={faq.id}
										>
											{faq.emoji}
										</span>
										<span
											className={`${styles.expand_icon} ${
												!threeFAQ.includes(faq.id) &&
												styles.active
											}`}
										></span>
									</div>
									<p
										className={`${
											styles.three_description
										} ${
											!threeFAQ.includes(faq.id) &&
											styles.active
										}`}
									>
										{faq.answer}
									</p>
								</div>
							);
						})}
					</div>
					<div className={styles.bottom_buttons}>
						<Link href="/">
							<a
								className={`${styles.read_more} ${styles.complete}`}
							>
								<span
									className={`${styles.icon} ${styles.icon_home}`}
								/>
								Home
							</a>
						</Link>
						<Link href="/faq">
							<a
								className={`${styles.read_more} ${styles.complete}`}
							>
								<span
									className={`${styles.icon} ${styles.icon_question}`}
								/>
								FAQ's
							</a>
						</Link>
					</div>
				</div>
			</div>
			*/
