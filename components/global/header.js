import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";

import progress_styles from "styles/common/progress.module.scss";
import styles from "components/global/header.module.scss";

import Tooltip from "components/modals/tooltip";

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
				<a
					className={`${styles.logo_font} ${
						!menuOpen ? styles.active : ""
					}`}
				>
					<span className={styles.logo_icon} />
					cryptostamping
				</a>
			</Link>
			<div
				className={`${styles.buttons} ${menuOpen ? styles.active : ""}`}
			>
				<Tooltip
					delay={0}
					position={"bottom center"}
					on={["click"]}
					popupClass={styles.popup_box}
					closeOnClick={true}
					trigger={
						<div>
							<a
								className={`${styles.button_font} ${
									router.pathname === "/start" && styles.open
								}`}
							>
								Get Started
								<span className={`${styles.icon_arrow}`} />
							</a>
						</div>
					}
				>
					<div className={styles.vert_list}>
						<Link href="/stamps">
							<a className={`diva ${styles.hover_color}`}>
								Explore Stamps
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_explore}`}
								/>
							</a>
						</Link>
						<a
							href="https://chrome.google.com/webstore/detail/cryptostamping/dbpfclpmhfidhfbcgiaejhiebmhdgkgd"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Install in Browser
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_ext}`}
							/>
						</a>
						<Link href="/scan">
							<a className={`diva ${styles.hover_color}`}>
								Stamp Scanner
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_scan}`}
								/>
							</a>
						</Link>
					</div>
				</Tooltip>
				<Tooltip
					delay={0}
					position={"bottom center"}
					on={["click"]}
					popupClass={styles.popup_box}
					closeOnClick={true}
					trigger={
						<div>
							<a
								className={`${styles.button_font} ${
									router.pathname === "/start" && styles.open
								}`}
							>
								For Creators
								<span className={`${styles.icon_arrow}`} />
							</a>
						</div>
					}
				>
					<div className={styles.vert_list}>
						<Link href="/get-listed">
							<a className={`diva ${styles.hover_color}`}>
								Get Listed
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_verify}`}
								/>
							</a>
						</Link>
						<a
							href="https://embed.cryptostamping.org"
							className={`diva ${styles.hover_color}`}
						>
							Embed on site
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_embed}`}
							/>
						</a>
						<Link href="/dev-docs">
							<a className={`diva ${styles.hover_color}`}>
								Documentation
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_doc}`}
								/>
							</a>
						</Link>
						<Link href="/guide">
							<a className={`diva ${styles.hover_color}`}>
								Guidelines
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_regulations}`}
								/>
							</a>
						</Link>
					</div>
				</Tooltip>
				<Tooltip
					delay={0}
					position={"bottom center"}
					on={["click"]}
					popupClass={styles.popup_box}
					closeOnClick={true}
					trigger={
						<div>
							<a
								className={`${styles.button_font} ${
									router.pathname === "/start" && styles.open
								}`}
							>
								Community
								<span className={`${styles.icon_arrow}`} />
							</a>
						</div>
					}
				>
					<div className={styles.vert_list}>
						<a
							href="https://gitcoin.co/grants/4292/cryptostamping"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Fund Project
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_gitcoin}`}
							/>
						</a>
						<a
							href="https://github.com/cryptostamping"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Contribute
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_github}`}
							/>
						</a>
						<a
							href="https://reddit.com/r/cryptostamping"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Think Tank
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_reddit}`}
							/>
						</a>
						<a
							href="https://twitter.com/cutoutsnft"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Updates
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_twitter}`}
							/>
						</a>
						<a
							href="https://discord.gg/XNNZ96b5V3"
							target="_blank"
							rel="noreferrer"
							className={`diva ${styles.hover_color}`}
						>
							Join & Talk.
							<span
								className={`${styles.icon} ${styles.visible} ${styles.icon_discord}`}
							/>
						</a>
					</div>
				</Tooltip>
				<Tooltip
					delay={0}
					position={"bottom center"}
					on={["click"]}
					popupClass={styles.popup_box}
					closeOnClick={true}
					trigger={
						<div>
							<a
								className={`${styles.button_font} ${
									router.pathname === "/start" && styles.open
								}`}
							>
								Learn More
								<span className={`${styles.icon_arrow}`} />
							</a>
						</div>
					}
				>
					<div className={styles.vert_list}>
						<Link href="/roadmap">
							<a className={`diva ${styles.hover_color}`}>
								Roadmap
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_dao}`}
								/>
							</a>
						</Link>
						<Link href="/intro">
							<a className={`diva ${styles.hover_color}`}>
								Use Cases
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_use}`}
								/>
							</a>
						</Link>
						<Link href="/how-it-works">
							<a className={`diva ${styles.hover_color}`}>
								How it Works
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_how}`}
								/>
							</a>
						</Link>
						<Link href="/about">
							<a className={`diva ${styles.hover_color}`}>
								Team & FAQ's
								<span
									className={`${styles.icon} ${styles.visible} ${styles.icon_help}`}
								/>
							</a>
						</Link>
					</div>
				</Tooltip>
			</div>
			<div
				onClick={() => setMenuOpen(!menuOpen)}
				className={`d-block d-lg-none`}
			>
				<span
					className={`${styles.menu_icon} ${
						!menuOpen ? styles.menu : styles.close
					}`}
				/>
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
