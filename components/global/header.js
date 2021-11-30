import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";

import progress_styles from "styles/common/progress.module.scss";
import styles from "components/global/header.module.scss";

import { IN_DEV_ENV } from "lib/data";
import { setLoggedIn } from "lib/redux/features/userSlice";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function Header({ dispatch, Moralis, authenticate }) {
	const router = useRouter();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isTopLoading = useSelector((state) => state.ui.isTopLoading);
	const [menuOpen, setMenuOpen] = useState(false);

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
				<a className={`${styles.logo_font} ${!menuOpen ? styles.active : ""}`}>
				<span className={styles.logo_icon} />
				cryptostamping
				</a>
			</Link>
			<div className={`${styles.buttons} ${menuOpen ? styles.active : ""}`}>
				<Link href="/start">
				<a className={`${styles.button_font} ${router.pathname === "/start" && styles.active}`}>Start Using</a>
				</Link>
				<Link href="/create">
				<a className={`${styles.button_font} ${router.pathname === "/create" && styles.active}`}>For Developers</a>
				</Link>
				<a href="https://twitter.com/cutoutsnft" target="_blank" rel="noreferrer"
				className={`${styles.button_font}`}>Follow Twitter</a>
				<a href="https://discord.gg/XNNZ96b5V3" target="_blank" rel="noreferrer"
				className={`${styles.button_font}`}>Join Discord</a>
			</div>
			<div onClick={() => setMenuOpen(!menuOpen)} className={`d-block d-lg-none`}>
				<span className={`${styles.menu_icon} ${!menuOpen ? styles.menu : styles.close}`} />
			</div>
		</div>
	);
}

export default Header;

/*

<Link href="/registry">
				<a className={`${styles.button_font} ${router.pathname === "/registry" && styles.active}`}>Registry</a>
				</Link>
				<Link href="/community">
				<a className={`${styles.button_font} ${router.pathname === "/community" && styles.active}`}>Community</a>
				</Link>
				*/
