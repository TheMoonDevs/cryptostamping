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
		if (
			default_account &&
			window.ethereum.selectedAddress &&
			default_account !== window.ethereum.selectedAddress
		) {
			alert(
				"please signin with your default account before you can connect this account!"
			);
			return;
		}
		dispatch(setTopLoading(true));
		const signingMessage =
			'Welcome to Cut Outs! \n\n Click "Sign" to sign in. No password needed! \n\nThis request will not trigger a blockchain transaction or cost any gas fees.';
		authenticate({ signingMessage })
			.then(function (response) {
				if (window.ethereum.selectedAddress)
					localStorage.setItem(
						"default_account",
						window.ethereum.selectedAddress
					);
			})
			.catch(function () {
				dispatch(setTopLoading(false));
			});
	};

	const openWallet = () => {
		if (isLoggedIn)
			dispatch(setSidebarOpen({ type: "Wallet", open: true }));
	};

	return (
		<div className={styles.header}>
			<div className={styles.logo_box}>
				<Link href="/">
					<a>
						<span className={styles.logo_icon} />
					</a>
				</Link>
			</div>
			<div className={styles.user_box}>
				{isLoggedIn && (
					<div className={styles.login_btn} onClick={openWallet}>
						<span className={styles.logout_icon} />
					</div>
				)}
				{!isLoggedIn && isTopLoading && (
					<div className={styles.login_btn}>
						<span
							className={`${progress_styles.progress_spinner} ${progress_styles.black} ${styles.spinner_in_btn} ${progress_styles.active}`}
						/>
					</div>
				)}
				{!isLoggedIn && !isTopLoading && (
					<div className={styles.login_btn} onClick={handleLogin}>
						<span className={styles.login_icon} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
