import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import Link from "next/link";

import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Header from "components/global/header";
import Footer from "components/global/footer";
import Navigation from "components/global/navigation";
import FAQ from "components/home/faq";


import cardstyles from "styles/common/card.module.scss";
import styles from "styles/pages/start.module.scss";
import { FRONTEND_BASE_URL, stampCollectionCards } from "lib/data";

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setTopLoading } from "lib/redux/features/uiSlice";

const renderCard = memo(
	({ index, style, data }) => (
		<div className={cardstyles.card_container} style={style}>
			<a href={data[index].link} target="_blank" rel="noreferrer">
			<div className={cardstyles.card}>
				<img
					className={cardstyles.image}
					src={data[index].image}
					alt=""
				/>
				<div className={cardstyles.infobox}>
					<h2>{data[index]?.title}</h2>
					<p>{data[index]?.message}</p>
				</div>
			</div>
			</a>
		</div>
	),
	areEqual
);
renderCard.displayName = "card";

export default function Homepage({}) {
	const dispatch = useDispatch();
	const listRef = useRef();

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
				src="/images/cards/timer.png"
				alt="" />
				<div className={styles.left}>
					<h1 className={styles.header}>Beta Testing begins on Dec 20. You can apply to join the fun & earn a Beta Contribution Badge.</h1>
					<p className={styles.boldtag}>
					Apply before Dec 18.
					</p>
				</div>
				<div className={styles.right}>
					<h1 className={styles.header}>Official Plugin & Embed will launch on Jan 10. Though you can actually pre-buy stamps & be ahead of the Game.</h1>
					<p 
					className={styles.boldtag}>
					Scroll to know more.
					</p>
				</div>
				<div className={styles.bottom}>
				<a className={`${styles.button} mx-3`}
				 href="https://forms.gle/EK8BDkD1rxuKes2Y7" target="_blank" rel="noreferrer">
						Apply for Beta Testing.
					</a>
				</div>
			</div>
			<div className={styles.screen_one}>
				<h4 className={styles.tagtext}>BUY &nbsp;&nbsp; STAMPS</h4>
				<div className="d-block w-100 container mt-3 mt-md-5 px-0">
					<AutoSizer disableHeight>
						{({ width }) => (
							<List
								ref={listRef}
								height={450}
								className={cardstyles.list_box}
								itemCount={stampCollectionCards.length}
								itemData={stampCollectionCards}
								itemSize={400}
								width={width}
								layout="horizontal"
							>
								{renderCard}
							</List>
						)}
					</AutoSizer>
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
		description: `Start using now.`,
		url: `${FRONTEND_BASE_URL}/start`,
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
