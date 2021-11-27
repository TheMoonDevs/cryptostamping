import Link from "next/link";

import styles from "components/global/navigation.module.scss";

function Navigation({ buttons }) {
	return (
		<div className={styles.bottom_buttons}>
			{buttons?.includes("home") && (
				<Link href="/">
					<a className={`${styles.read_more} ${styles.complete}`}>
						<span
							className={`${styles.icon} ${styles.icon_home}`}
						/>
						Home
					</a>
				</Link>
			)}
			{buttons?.includes("invest") && (
				<Link href="/invest">
					<a className={`${styles.read_more} ${styles.complete}`}>
						<span
							className={`${styles.icon} ${styles.icon_invest}`}
						/>
						Invest
					</a>
				</Link>
			)}
			{buttons?.includes("whitepaper") && (
				<Link href="/docs/whitepaper">
					<a className={`${styles.read_more} ${styles.complete}`}>
						<span
							className={`${styles.icon} ${styles.icon_whitepaper}`}
						/>
						Whitepaper
					</a>
				</Link>
			)}
			{buttons?.includes("roadmap") && (
				<Link href="/roadmap">
					<a className={`${styles.read_more} ${styles.complete}`}>
						<span
							className={`${styles.icon} ${styles.icon_roadmap}`}
						/>
						RoadMap
					</a>
				</Link>
			)}
			{buttons?.includes("faqs") && (
				<Link href="/faq">
					<a className={`${styles.read_more} ${styles.complete}`}>
						<span
							className={`${styles.icon} ${styles.icon_question}`}
						/>
						FAQ's.
					</a>
				</Link>
			)}
		</div>
	);
}

export default Navigation;
