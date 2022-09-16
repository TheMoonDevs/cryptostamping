/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

import Footer from "components/global/footer";
import styles from "styles/pages/home.module.scss";
import { FRONTEND_BASE_URL, mainFAQs } from "lib/data"
import { backers,articles } from "lib/data";
import { useAppDispatch, useAppSelector } from "lib/redux/store";
import Image from "next/image";
import { useImageFade, useNextImageImageFade } from "lib/utils";

export default function Homepage({}) {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

	return (
		<div className={`${styles.container}`}>
			<div id="landing" className={styles.screen_one}>
				<img
					className={`${styles.home_banner} d-none d-md-block`}
					src="/images/websitebg.png"
					alt=""
				/>
				<div className={styles.centered}>
					<div id="cryptostamping_v1" data-view="button"></div>
					<link
						href="https://embed.cryptostamping.org/widgets.css"
						rel="stylesheet"
					/>
					<Script src="https://embed.cryptostamping.org/widgets.js"></Script>
					<p className={styles.tagtext}>
						OPEN-SOURCE . OWNERLESS . DECENTRALIZED
					</p>
					<p className={styles.header}>
						Use your NFT to stamp on websites, posts, articles,
						videos, games, anywhere on internet.
					</p>
					<Link href="/intro">
						<a className={styles.button}>Explore Use-Cases.</a>
					</Link>
				</div>
			</div>
			<div
				id="utility"
				className={`${styles.screen_three} ${styles.dark_bg}`}
			>
				<div className={`col-12 col-xl-7`}>
					<img
						className={styles.square_image}
						src="/images/cryptostamping/screen_5.jpg"
						alt=""
					/>
				</div>
				<div className={`col-12 col-xl-5`}>
					<div
						className={`d-block px-1 px-md-5 mx-1 mx-md-5 mt-4 mb-4 mt-lg-0 mb-lg-5 mb-xl-0`}
					>
						<h1 className={styles.headline}>
							A Standard <br />
							utility to all NFTs
						</h1>
						<p className={styles.description}>
							Cryptostamping is an open-source & decentralized
							system that allows web3 users to stamp their NFTs on
							websites through an authentic means.
						</p>
						<Link href="/how-it-works">
							<a
								className={`${styles.button} ${styles.dark} mt-3`}
							>
								How it works ?
							</a>
						</Link>
					</div>
				</div>
			</div>
			<img
				className={`${styles.fill_image} ${styles.right_fix} d-block d-md-none mb-5`}
				src="/images/cryptostamping/screen_4.jpg"
				alt=""
			/>
			<div
				id="install"
				className={`${styles.screen_one} ${styles.landscape_fix}`}
			>
				<img
					className={`${styles.fill_image} ${styles.static_image} d-none d-md-block`}
					src="https://cryptostamping.org/images/cryptostamping/screen_4.jpg"
					alt=""
				/>
				<div className={`${styles.left_align} ${styles.box}`}>
					<div className={`d-block container`}>
						<div className={`col-12 col-md-6`}>
							<h1 className={styles.headline}>
								Install Cryptostamping <br /> to your Browser
							</h1>
							<p className={styles.description}>
								Stamp & comment on any webpage and similarly
								view all stamps on any webpage.
								<br />
							</p>
							<div
								className={`${styles.bulletin} d-none d-lg-block`}
							>
								<p
									className={`${styles.description} ${styles.small} `}
								>
									<span
										className={`${styles.inline_icon} ${styles.icon_bulletin}`}
									></span>
									{
										"100% Authentic with On-Chain verification."
									}
								</p>
								<p
									className={`${styles.description} ${styles.small}`}
								>
									<span
										className={`${styles.inline_icon} ${styles.icon_bulletin}`}
									></span>
									{
										"Secure settings for Message Signing with your crypto-wallet."
									}
								</p>
								<p
									className={`${styles.description} ${styles.small}`}
								>
									<span
										className={`${styles.inline_icon} ${styles.icon_bulletin}`}
									></span>
									{
										"Open source software & Complete User-end control."
									}
								</p>
							</div>
							<div className={`d-flex mt-5`}>
								<a
									href="https://chrome.google.com/webstore/detail/cryptostamping/dbpfclpmhfidhfbcgiaejhiebmhdgkgd"
									target="_blank"
									rel="noreferrer"
									className={`${styles.button} ${styles.blue} mr-4`}
								>
									Add to Browser
								</a>
								<div
									className={`${styles.browser_icon} ${styles.icon_chrome}`}
								></div>
								<div
									className={`${styles.browser_icon} ${styles.icon_brave}`}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img
				className={`${styles.fill_image} ${styles.left_fix} ${styles.large} d-block d-md-none`}
				src="/images/cryptostamping/screen_2.jpg"
				alt=""
			/>
			<div
				id="social"
				className={`${styles.screen_one} ${styles.landscape_fix}`}
			>
				<img
					className={`${styles.fill_image} ${styles.static_image}  d-none d-md-block`}
					src="/images/cryptostamping/screen_2.jpg"
					alt=""
				/>
				<div className={`${styles.centered} ${styles.box}`}>
					<h1 className={styles.headline}>Create a Web3 following</h1>
					<p className={`${styles.description} ${styles.resp_fix}`}>
						Cryptostamping marks the beginning of what would be a
						decentralized social networking that is both ownerless &
						open source.
					</p>
					<Link href="/stamps">
						<a className={styles.button}>Explore Stamps.</a>
					</Link>
				</div>
			</div>
			<img
				className={`${styles.fill_image} ${styles.right_fix} ${styles.large} d-none d-md-none`}
				src="/images/cryptostamping/screen_2.jpg"
				alt=""
			/>
			<div className={`${styles.screen_three} container d-none`}>
				<div className={`col-5`}>
					<div className={`d-block pr-5 mr-5`}>
						<h1 className={styles.headline}>
							The NFT filter <br /> of Internet
						</h1>
						<p className={styles.description}>
							Just Imagine if the ever-growing internet with all
							its spams and bots had a $value$ filter.
						</p>
					</div>
				</div>
				<div className={`col-7`}>
					<img
						className={styles.square_image}
						src="/images/cryptostamping/screen_3.jpg"
						alt=""
					/>
				</div>
			</div>
			<div id="slideshow" className={`${styles.screen_three} container d-none`}>
				<div className={`col-12 col-md-7`}>
					<img
						className={styles.square_image}
						src="/images/cryptostamping/screen_1.jpg"
						alt=""
					/>
				</div>
				<div className={`col-12 col-md-5`}>
					<div className={`d-block pl-0 pl-xl-5 ml-2 ml-md-5 mb-5 mb-md-0`}>
						<h1 className={styles.headline}>
							The NFT filter <br /> of Internet
						</h1>
						<p className={styles.description}>
							Introducing an easy means of authentic opinions from
							web3 users & a way overall for internet users to
							qualitatively differentiate from the common.
						</p>
					</div>
				</div>
			</div>
			<div className={`container d-flex mt-5 mb-0`}>
				<h1 className={styles.headline2}>
					LATEST &nbsp;&nbsp; NEWS &nbsp;&nbsp; & &nbsp;&nbsp; UPDATES
				</h1>
			</div>
			<div className={`${styles.screen_three} container pt-0 pt-md-5`}>
				{articles.map((article, index) => {
					return (
						<div key={article.link} className={`col-12 col-md-4 py-4 py-md-0 px-lg-1`}>
							<a
								className={styles.article_card}
								href={article.link}
								target="_blank"
								rel="noreferrer"
							>
								<img
									className={styles.article_image}
									src={article.image}
									alt=""
								/>
								<div className={`d-block p-3`}>
									<h1 className={styles.headline_article}>
										{article.title}
									</h1>
									<p className={styles.description_article}>
										{article.description}
									</p>
								</div>
							</a>
						</div>
					);
				})}
			</div>
			<div className={`container d-flex mt-md-5 mb-0`}>
				<h1 className={styles.headline2}>
					BACKED &nbsp;&nbsp; & &nbsp;&nbsp; SUPPORTED &nbsp;&nbsp; BY
				</h1>
			</div>
			<div
				className={`${styles.screen_three} justify-content-start container pt-5`}
			>
				{backers.map((backer, index) => {
					return (
						<div key={backer.link} className={`col-4 col-md-3 col-lg-2`}>
							<a
								className={styles.logo_card}
								href={backer.link}
								target="_blank"
								rel="noreferrer"
							>
								<img
									className={styles.square_image}
									src={backer.image}
									alt=""
								/>
								<p className={styles.description_article}>
									{backer.description}
								</p>
							</a>
						</div>
					);
				})}
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
		description: `Use your NFT to stamp on websites, posts, articles, videos, games, anywhere on internet.`,
		url: `${FRONTEND_BASE_URL}`,
		robots: "index,follow",
		image: `${FRONTEND_BASE_URL}/images/cryptostamping/screen_7.jpg`,
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}
