import React, { useState, useEffect, useRef } from "react";

import styles from "styles/pages/home.module.scss";
import { APP_TITLE, FRONTEND_BASE_URL, IN_DEV_ENV } from "lib/data";


export default function ExtensionPage({}) {
}


/* Static Site Genration */
export async function getStaticProps() {
	/* meta tags that need to be passed to the header */
	const header = {
		title: `Install Browser Extension | Cryptostamping`,
		description: ``,
		url: `${FRONTEND_BASE_URL}/extension/privacy`,
		robots: "noindex,nofollow",
	};

	return {
		props: {
			header,
			header_type: "normal",
		},
	};
}