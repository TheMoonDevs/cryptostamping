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
import { FRONTEND_BASE_URL, usecaseCards } from "lib/data";
import { useImageFade } from "lib/utils"

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setTopLoading } from "lib/redux/features/uiSlice";

const renderCard = memo(
	({ index, style, data }) => (
		<div className={cardstyles.card_container} style={style}>
			<div className={cardstyles.card}>
				<img
					className={cardstyles.image}
					src={data[index].image}
					alt=""
					{...useImageFade()}
				/>
				<div className={cardstyles.infobox}>
					<h2>{data[index]?.title}</h2>
					<p>{data[index]?.message}</p>
				</div>
			</div>
		</div>
	),
	areEqual
);
renderCard.displayName = "card";

export default function Homepage({Moralis, authenticate, user}) {
	
	const dispatch = useDispatch();
	const listRef = useRef();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);


	return (
		<div className={`${styles.container}`}>
			<div className={styles.screen_one}>
				<div className="d-block w-100 container mt-5 px-0">
					<AutoSizer disableHeight>
						{({ width }) => (
							<List
								ref={listRef}
								height={450}
								className={cardstyles.list_box}
								itemCount={usecaseCards.length}
								itemData={usecaseCards}
								itemSize={400}
								width={width}
								layout="horizontal"
							>
								{renderCard}
							</List>
						)}
					</AutoSizer>
				</div>
				<div className="d-flex justify-content-center flex-wrap mt-4">
					<Link href="/">
					<a className={`${styles.button} mx-3`}>
						Back to Home
					</a>
					</Link>
					<Link href="/start">
					<a className={`${styles.button} mx-3`}>
						Start Using Stamps
					</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cryptostamping | Explore Use-Cases.`,
		description: ``,
		url: `${FRONTEND_BASE_URL}/intro`,
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
