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
	const cutOut = useSelector((state) => state.ui.cutOut);

	return (
		<div className={`${styles.container}`}>
			<WalletSidebar  />
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
						THE &nbsp;&nbsp; FIRST-EVER &nbsp;&nbsp; DIGITAL
						&nbsp;&nbsp; STAMP &nbsp;&nbsp; COLLECTION
					</p>
				</div>
				<AuctionBlock
					dispatch={dispatch}
					Moralis={Moralis}
					authenticate={authenticate}
				/>
			</div>
			<div className={`${styles.screen} ${styles.screen_two}`}>
				<div className={styles.two_infobox}>
					<h4 className={styles.two_tag}>What are Digital Stamps?</h4>
					<h2 className={styles.two_title}>
						The NFT filter in <br /> Digital World.
					</h2>
					<p className={styles.two_description}>
						For misfits, trend setters, risk takers, tech lovers,
						and anyone who wants to add real value to their
						websites, articles, emails, videos, posts, games, almost
						anything. <br /> <br /> Just Imagine if the ever-growing
						digital world with all its spams and bots had a{" "}
						<i>$value$</i> filter.
					</p>
				</div>
				<div className={styles.two_videobox}>
					<video
						className={styles.two_video}
						src={`/videos/site_cryptostamps.mp4`}
						controls={false}
						autoPlay={true}
						muted
						loop
					/>
				</div>
			</div>
			<div
				className={`${styles.screen} ${styles.screen_two} ${styles.screen_white}`}
			>
				<div className={styles.two_imagebox}>
					<img
						className={styles.two_image}
						src="/images/cutouts_oneditionperday.png"
						alt=""
					/>
				</div>
				<div className={styles.two_centerinfobox}>
					<h2 className={`${styles.two_title} ${styles.black}`}>
						Setting the Trend.
					</h2>
					<p className={`${styles.two_description} ${styles.black}`}>
						As the first ever Crypto Stamp collection, every new Cut
						Out that will be sold on auction is making history here.{" "}
						<br /> <br />
						There is a lot of thinking going in, to keep every stamp
						unique, to introduce inspiring use cases for crypto
						Stamps, which is why there are only so few <b>
							(999)
						</b>{" "}
						like forever into the future.
					</p>
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_three}`}>
				<div className={styles.faq_block}>
					<FAQ 
					item={{
						title: "Know what you're investing in.",
						list: mainFAQs
					}}
					initialFAQ={["i2","i3","i4","i5","i6","i7"]} />
					<Navigation buttons={["invest", "whitepaper", "faqs", "roadmap"]} />
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
		title: `Cut Outs | The first ever collection of digital stamps.`,
		description: `For misfits, trend setters, risk takers, tech lovers, and anyone who wants to add real value to their websites, articles, emails, videos, posts, games, almost anything. welcome to #web3 & #cryptostamping`,
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
