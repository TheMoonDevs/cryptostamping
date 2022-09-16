/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, memo, CSSProperties } from "react";
import Link from "next/link";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Footer from "components/global/footer";
import cardstyles from "styles/common/card.module.scss";
import styles from "styles/pages/start.module.scss";
import styles_home from "styles/pages/home.module.scss";
import { FRONTEND_BASE_URL, usecaseCards } from "lib/data";
import { useImageFade } from "lib/utils";
import { useAppDispatch, useAppSelector } from "lib/redux/store";

const renderCard = memo(
	({ index, style, data }: {index: number, style:CSSProperties, data: any}) => (
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

export default function IntroPage({ Moralis, authenticate, user }) {
	const dispatch = useAppDispatch();
	const listRef = useRef();

	const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

	return (
		<div className={`${styles.container} page_wrapper`}>
			<div id="slideshow" className={`${styles_home.screen_three} pt-0`}>
				<div className={`col-12 col-md-5`}>
					<div
						className={`d-block pl-0 pl-xl-5 ml-2 ml-md-5 pt-2 pt-md-5`}
					>
						<h1 className={styles_home.headline}>
							Restructuring the digital world for years to come.
						</h1>
						<p className={styles_home.description}>
							From websites that are dynamic, to something as
							complex as metaverse, One-day digital stamps will
							become a commonality & the official standard to add
							value to any & all digital content.
						</p>
					</div>
				</div>
				<div className={`col-12 col-md-7`}>
					<img
						className={styles_home.square_image}
						src="/images/cryptostamping/screen_9.jpg"
						alt=""
					/>
				</div>
			</div>
			<div
				id="utility"
				className={`${styles_home.screen_three} ${styles_home.dark_bg}`}
			>
				<div className={`col-12 col-xl-7`}>
					<img
						className={styles_home.square_image}
						src="/images/cryptostamping/screen_5.jpg"
						alt=""
					/>
				</div>
				<div className={`col-12 col-xl-5`}>
					<div
						className={`d-block px-1 px-md-5 mx-1 mx-md-5 mt-4 mb-4 mt-lg-0 mb-lg-5 mb-xl-0`}
					>
						<h1 className={styles_home.headline}>
							Please show your support by adding in.
						</h1>
						<p className={styles_home.description}>
							Embed on your website to get support from famous
							NFTs & increase your project/content valuation, just like above.
						</p>
						<Link href="/how-it-works">
							<a
								className={`${styles_home.button} ${styles_home.dark} mt-3`}
							>
								Embed Now
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.screen_one}>
				<div className={`container d-flex justify-content-center mb-0`}>
					<h1 className={styles_home.headline2}>
						DIFFERENT &nbsp;&nbsp; USE-CASES
					</h1>
				</div>
				<div className="d-block w-100 container px-0">
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
					<Link href="/stamps">
						<a className={`${styles_home.button} mx-3`}>
							Get Started
						</a>
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
