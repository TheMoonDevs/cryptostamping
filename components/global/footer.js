import React, { useState, useEffect, useRef } from "react";
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
			<h4 className={styles.four_title}>
				The digital world in the future will be divided into two. <br />{" "}
				One is worthless, one is Crypto-Stamped.
			</h4>
			<div className={styles.add_stamp}>
				<span className={styles.add_icon} />
			</div>
			<div className={styles.social_links}>
				<a href="https://twitter.com/cutoutsnft"
				target="_blank"
				rel="noreferrer"
				className={styles.link_text}>
					twitter
				</a>
				<a href="https://discord.gg/XNNZ96b5V3"
				target="_blank"
				rel="noreferrer"
				className={styles.link_text}>
					discord
				</a>
				<a href="https://cutoutsnft.medium.com"
				target="_blank"
				rel="noreferrer"
				className={styles.link_text}>
					medium
				</a>
			</div>
		</div>
	);
}

export default Footer;
