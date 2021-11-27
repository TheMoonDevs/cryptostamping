import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useMoralis, useMoralisQuery } from "react-moralis";

import Tooltip from "components/modals/tooltip";
import styles from "components/home/buttonsbanner.module.scss";

import {
	getCurrentStampDay,
	getCutOutReleaseDate,
	getCutOutAvailability,
	getCutOutAvailStock,
	getCutOutDescription,
	getCutOutLinkStyle,
	printCutOutNumber,
	useTimer,
	isPrime,
	getVideoDisplayLink,
	randomIntFromInterval,
} from "lib/utils";
import { DATE_LAUNCH, DATE_INFO } from "lib/data";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function ButtonsBanner({ authenticate }) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { timer: preSaleCount } = useTimer(DATE_LAUNCH);

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
		else {
			handleLogin();
		}
	};

	const openTrailer = () => {
		dispatch(setSidebarOpen({ type: "Trailer", open: true }));
	};

	const openWhitelist = () => {
		dispatch(setSidebarOpen({ type: "Whitelist", open: true }));
	};

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 1000);
	}, []);

	return (
		<div className={styles.bottom_bar}>
			<div className={styles.badges_bar}>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"New here? understand why it's worth it to invest here."
					}
					open={open}
					trigger={
						<div
							onClick={openTrailer}
							className={styles.badge_button}
						>
							<div
								className={`${styles.badge} ${
									open && styles.active
								}`}
							>
								<span className={styles.icon_trailer} />
							</div>
							<p className={styles.badge_text}>Trailer</p>
						</div>
					}
				/>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"Connect your wallet to collect free give-aways & join exciting events."
					}
					trigger={
						<div
							onClick={openWallet}
							className={styles.badge_button}
						>
							<div className={styles.badge}>
								<span className={styles.icon_connect} />
							</div>
							<p className={styles.badge_text}>Connect</p>
						</div>
					}
				/>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"Our whitelist spots are very limited. Join before its down."
					}
					trigger={
						<div
							onClick={openWhitelist}
							className={styles.badge_button}
						>
							<div className={styles.badge}>
								<span className={styles.icon_whitelist} />
							</div>
							<p className={styles.badge_text}>Whitelist</p>
						</div>
					}
				/>
			</div>
			{preSaleCount.seconds && (
				<div className={styles.presale_box}>
					<h4 className={styles.mini_title}>{DATE_INFO}</h4>
					<div className={styles.timer_block}>
						{preSaleCount.days > 0 && (
							<div className={styles.timer_bit}>
								<p className={styles.timer_count}>
									{preSaleCount.days}
								</p>
								<p className={styles.timer_tag}>Days</p>
							</div>
						)}
						{preSaleCount.days > 0 && preSaleCount.hours > 0 && (
							<div className={styles.timer_bit}>
								<p className={styles.timer_count}>
									{preSaleCount.hours}
								</p>
								<p className={styles.timer_tag}>Hours</p>
							</div>
						)}
						<div className={styles.timer_bit}>
							<p className={styles.timer_count}>
								{preSaleCount.minutes}
							</p>
							<p className={styles.timer_tag}>Mins</p>
						</div>
						<div className={styles.timer_bit}>
							<p className={styles.timer_count}>
								{preSaleCount.seconds}
							</p>
							<p className={styles.timer_tag}>Secs</p>
						</div>
					</div>
				</div>
			)}
			<div className={styles.badges_bar}>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"Invest in a longstanding project that will live through ages."
					}
					trigger={
						<div>
						<Link href="/invest">
						<a
							
							className={styles.badge_button}
						>
							<div className={styles.badge}>
								<span className={styles.icon_cryptostamping} />
							</div>
							<p className={styles.badge_text}>Invest.</p>
						</a>
						</Link>
						</div>
					}
				/>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"We are building a constructive community free of all clutters for people to learn / share / discuss."
					}
					trigger={
						<a
							href="https://discord.gg/XNNZ96b5V3"
							target="_blank"
							rel="noreferrer"
							className={styles.badge_button}
						>
							<div className={styles.badge}>
								<span className={styles.icon_discord} />
							</div>
							<p className={styles.badge_text}>Join us.</p>
						</a>
					}
				/>
				<Tooltip
					delay={0}
					position={"top center"}
					description={
						"The oppurtunity awaits the prepared. Keep following us for the latest updates."
					}
					trigger={
						<a
							href="https://twitter.com/cutoutsnft"
							target="_blank"
							rel="noreferrer"
							className={styles.badge_button}
						>
							<div className={styles.badge}>
								<span className={styles.icon_twitter} />
							</div>
							<p className={styles.badge_text}>Follow us.</p>
						</a>
					}
				/>
			</div>
		</div>
	);
}

export default ButtonsBanner;

//cryptostamping.org is the opensource stamping system & marketplace that will feature millions of stamp collections.
