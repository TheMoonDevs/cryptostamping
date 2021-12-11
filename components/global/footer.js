import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";

import styles from "components/global/footer.module.scss";

import { IN_DEV_ENV } from "lib/data";
import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
} from "lib/redux/features/uiSlice";

function Footer({}) {
	return (
		<div className={`${styles.screen} ${styles.screen_four}`}>
			<div className={styles.social_links}>
				<a href="https://gitcoin.co/grants/4292/cryptostamping"
				target="_blank"
				rel="noreferrer"
				className={styles.link_text}>
					fund
				</a>
				<a href="https://reddit.com/r/cryptostamping"
				target="_blank"
				rel="noreferrer"
				className={styles.link_text}>
					talk
				</a>
				<Link href="/contribute">
				<a 
				className={styles.link_text}>
					build
				</a>
				</Link>
			</div>
		</div>
	);
}

export default Footer;
