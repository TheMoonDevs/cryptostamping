import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image"
import Footer from "components/global/footer";
import styles from "styles/pages/home.module.scss";
import { FRONTEND_BASE_URL } from "lib/data";
import { useImageFade, useNextImageImageFade } from "lib/utils";
import { useAppDispatch, useAppSelector } from "lib/redux/store";

export default function Soonpage({Moralis, authenticate, user}) {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.screen_one}>
				<Image 
				src="/images/cards/comingsoon1.png"
				alt=""
				layout="fill"
				{...useNextImageImageFade(styles.fill_banner)}
				/>
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
