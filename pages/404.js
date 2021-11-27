import React, { useState, useEffect, useRef } from "react";

import styles from "styles/pages/mint.module.scss";
import { FRONTEND_BASE_URL, IN_DEV_ENV } from "lib/data";

export default function ErrorPage({}) {
	

	return (
		<div className={`${styles.container}`}>
			404 ! Page Not found.
		</div>
	);
}

/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Cut Outs | Page Not Found.`,
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
