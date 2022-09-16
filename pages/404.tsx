import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Footer from "components/global/footer";

import styles from "styles/pages/home.module.scss";
import { APP_TITLE, FRONTEND_BASE_URL, IN_DEV_ENV } from "lib/data";

export default function ErrorPage({}) {
	return (
		<div className={`page_wrapper`}>
			<div className={`${styles.screen_one}`}>
				<div
					className={`${styles.centered} ${styles.box} ${styles.wide}`}
				>
					<h1 className={styles.headline}>404 ! Page Not found.</h1>
					<Link href="/">
						<a className={styles.button}>Back to Home</a>
					</Link>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `${APP_TITLE} | Page Not Found.`,
		description: `Page Not Found`,
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
