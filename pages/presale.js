import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Link from "next/link";

import WalletSidebar from "components/modals/wallet_sidebar";
import AuctionBlock from "components/home/auctionblock";
import Header from "components/global/header";
import Footer from "components/global/footer";
import PlaceBidPopup from "components/home/placebidpopup";

import styles from "styles/pages/faq.module.scss";
import { FRONTEND_BASE_URL, presale_faqs } from "lib/data";
import { DATE_LAUNCH } from "lib/data";
import { getVideoDisplayLink } from "lib/utils";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
} from "lib/redux/features/uiSlice";

import {
	getCurrentStampDay,
	getCutOutReleaseDate,
	getCutOutAvailability,
	getCutOutAvailStock,
	getCutOutLinkStyle,
	useTimer,
	isPrime,
} from "lib/utils";

export default function PreSalepage({}) {
	const dispatch = useDispatch();

	const { Moralis, authenticate, isAuthenticated, user } = useMoralis();
	const [threeFAQ, setThreeFAQ] = useState([]);
	const toggleFaQ = (number) => {
		const faqs = [...threeFAQ];
		if (faqs.includes(number)) faqs.splice(faqs.indexOf(number), 1);
		else faqs.push(number);
		setThreeFAQ(faqs);
	};

	const { timer: preSaleCount } = useTimer(DATE_LAUNCH);

	const [showPlacebid, setShowPlaceBid] = useState(false);
	const clickPlaceBid = (cutout) => {
		console.log(cutout);
		//setCutOut(cutout);
		//setShowPlaceBid(true);
	};

	const { data, error, isLoading } = useMoralisQuery("CutOut", (query) =>
		query.ascending("cutout_no").limit(100)
	);

	const [cutouts, setCutouts] = useState([]);
	const [cutOut, setCutOut] = useState({});
	useEffect(() => {
		if (data) {
			let _coutouts = [];
			for (var i = 0; i < data.length; i++) {
				_coutouts.push(data[i].toJSON());
			}
			setCutouts(_coutouts);
		} else {
			setCutouts([]);
		}
	}, [data, error]);

	return (
		<div className={`${styles.container}`}>
			<Header dispatch={dispatch} Moralis={Moralis} />
			<div className={`${styles.screen} ${styles.screen_one}`}>
				<div className={styles.banner_box}>
					<p className={styles.banner_text}>
						PRE &nbsp;&nbsp; SALE &nbsp;&nbsp; ENDS
						&nbsp;&nbsp; ON &nbsp;&nbsp; NOV 18, 2021.
					</p>
				</div>
			</div>
			<div
				className={`${styles.screen} ${styles.screen_three} ${styles.screen_presales}`}
			>
				<div className={styles.display_grid}>
					{cutouts.map((cutout) => {
						return (
							<div key={cutout.cutout_no} className="col-sm-4 col-md-4 col-xl-2">
								<div
									onClick={() => clickPlaceBid(cutout)}
									className={styles.display_box}
								>
									<video
										className={styles.stamp_display_vid}
										src={getVideoDisplayLink(cutout.cutout_no)}
										controls={false}
										autoPlay={true}
										poster={"/images/blank_background.jpeg"}
										muted
										loop
										playsInline
									/>
									<p className={styles.current_availability}>
										{getCutOutAvailability(
											cutout.count,
											cutout.available
										)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className={`${styles.screen} ${styles.screen_three} ${styles.reverse_order}`}>
				<div className={styles.three_faq_block}>
					<div>
						<h4 className={`${styles.two_title} ${styles.faq}`}>
							Pre Sale Rules & Guidelines
						</h4>
						{presale_faqs.map((faq) => {
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
						<Link href="/roadmap">
							<a
								className={`${styles.read_more} ${styles.complete}`}
							>
								<span
									className={`${styles.icon} ${styles.icon_roadmap}`}
								/>
								RoadMap
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
				{preSaleCount.seconds && (
				<div className={`${styles.presale_box} d-none`}>
					<h4 className={styles.stamp_descr}>
						 E N D S &nbsp;&nbsp;&nbsp; I N
					</h4>
					<div className={styles.timer_block}>
						{preSaleCount.days > 0 && (
							<div className={styles.timer_bit}>
								<p className={styles.timer_count}>
									{preSaleCount.days}
								</p>
								<p className={styles.timer_tag}>Days</p>
							</div>
						)}
						{preSaleCount.days > 0 && preSaleCount.hours > 0 && (
							<div className={styles.timer_bit}>
								<p className={styles.timer_count}>
									{preSaleCount.hours}
								</p>
								<p className={styles.timer_tag}>Hours</p>
							</div>
						)}
						<div className={styles.timer_bit}>
							<p className={styles.timer_count}>
								{preSaleCount.minutes}
							</p>
							<p className={styles.timer_tag}>Mins</p>
						</div>
						<div className={styles.timer_bit}>
							<p className={styles.timer_count}>
								{preSaleCount.seconds}
							</p>
							<p className={styles.timer_tag}>Secs</p>
						</div>
					</div>
				</div>
			)}
			</div>
			<PlaceBidPopup
				show={showPlacebid}
				setShow={setShowPlaceBid}
				cutOut={cutOut}
			/>
			<Footer />
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cut Outs | Presale.`,
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
