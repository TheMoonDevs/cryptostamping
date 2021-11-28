import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";

import progress_styles from "styles/common/progress.module.scss";
import styles from "components/global/header.module.scss";

import { IN_DEV_ENV } from "lib/data";
import { setLoggedIn } from "lib/redux/features/userSlice";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function Header({ dispatch, Moralis, authenticate }) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isTopLoading = useSelector((state) => state.ui.isTopLoading);

	const handleLogin = () => {
		if (isLoggedIn) return;
		const default_account = localStorage.getItem("default_account");
		dispatch(setTopLoading(true));
		const signingMessage =
			'Welcome to Cryptostamping! \n\n Click "Sign" to sign in. No password needed! \n\nThis request will not trigger a blockchain transaction or cost any gas fees.';
		authenticate({ signingMessage });
	};

	return (
		<div className={styles.header}>
			<Link href="/">
				<a className={styles.logo_font}>cryptostamping</a>
			</Link>
			<div className={styles.buttons}>
				<Link href="/start">
				<a className={styles.button_font}>Start Using</a>
				</Link>
				<Link href="/learn">
				<a className={styles.button_font}>For Developers</a>
				</Link>
				<Link href="/registry">
				<a className={styles.button_font}>Registry</a>
				</Link>
				<Link href="/community">
				<a className={styles.button_font}>Community</a>
				</Link>
			</div>
		</div>
	);
}

export default Header;
