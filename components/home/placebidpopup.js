import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis, useMoralisQuery } from "react-moralis";

import styles from "components/home/placebidpopup.module.scss";

import {
	getCurrentStampDay,
	getCutOutReleaseDate,
	getCutOutAvailability,
	getCutOutAvailStock,
	getCutOutLinkStyle,
	printCutOutNumber,
	useTimer,
	isPrime,
	useInputChecked,
} from "lib/utils";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setWalletOpen,
	setMarketOpen,
	setTopLoading,
	setCutOut,
} from "lib/redux/features/uiSlice";

function PlaceBidPopup({ show, setShow, cutOut }) {
	const [verified, setVerified] = useState(false);
	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);

	useEffect(() => {
		setOne(false);
		setTwo(false);
		setThree(false);
		setFour(false);
		setVerified(false);
	},[show])

	const getVerifyTextOne = (cutout) => {
		const isPrimeNo = isPrime(cutOut.cutout_no);
		if (isPrimeNo) {
			return "This is a Prime edition and auction for prime edition will be open untill first 24hrs.";
		} else {
			return `This is Cut Out No. ${printCutOutNumber(cutOut.cutout_no)}, named ${cutOut.title} and is available for immediate sale.`;
		}
	};

	const getVerifyTextTwo = (cutout) => {
		const isPrimeNo = isPrime(cutOut.cutout_no);
		if (isPrimeNo) {
			return "The Minimum bidding price for a Prime Edition is 0.3 ETH.";
		} else {
			return "The Price for this Cut-Out is 0.08 ETH.";
		}
	};

	const getVerifyTextThree = (cutout) => {
		const isPrimeNo = isPrime(cutOut.cutout_no);
		if (isPrimeNo) {
			return "In the case the sale does not happen in the first 24Hrs, it will be Auction-Locked.";
		} else {
			return "Once the sale is successful, it will take 2-3 Hrs before you can recieve VIP whitelist spot, $BALLOON coins and other attached give-aways.";
		}
	};

	const getVerifyTextFive = (cutout) => {
		const isPrimeNo = isPrime(cutOut.cutout_no);
		return "The NFT Resources/ files will be available on Nov 18 when official auction website is launched.";
	};

	const getVerifyTextFour = (cutout) => {
		const isPrimeNo = isPrime(cutOut.cutout_no);
		return "Once the official Embed & Plugin are launched (Nov 20), you can start using the stamp to make history.";
	};

	const closePopup = (evt) => {
		if(evt.target.id === "background" || evt.target.id === "proceed")
			setShow(false);
	};

	const changeEmpty = () => {};

	const getCutOutLink = (cutout) => {
		if(!cutout) return "";
		for(const item of cutout.items ) {
			if(item.link && !item.owner){
				return item.link;
			}
			if(item.link && item.owner.length <= 0){
				return item.link;
			}
		}
	}

	useEffect(() => {
		if(one && two && three && four){
			setVerified(true);
		}
		else {
			setVerified(false);
		}
	},[one, two, three, four])

	if (!show) {
		return <div></div>;
	}

	return (
		<div id="background" onClick={closePopup} className={styles.background}>
			<div id="popup" className={styles.popup}>
				<h4 className={styles.tite}>
					Please read and verify the following points before you
					make a bid.
				</h4>
				<div className={styles.verfiy_box} onClick={() => setOne(!one)}>
					<input
						type="checkbox"
						checked={one}
						onChange={changeEmpty}
					/>
					<div className={`${styles.verify_checkmark} ${one && styles.active}`}>
						<span className={styles.checkmark_icon}/>
					</div>
					<p
						className={`${styles.verify_text} ${
							one && styles.active
						}`}
					>
						{getVerifyTextOne(cutOut)}
					</p>
				</div>
				<div className={styles.verfiy_box} onClick={() => setTwo(!two)}>
					<input
						type="checkbox"
						checked={two}
						onChange={changeEmpty}
					/>
					<div className={`${styles.verify_checkmark} ${two && styles.active}`}>
						<span className={styles.checkmark_icon}/>
					</div>
					<p
						className={`${styles.verify_text} ${
							two && styles.active
						}`}
					>
						{getVerifyTextTwo(cutOut)}
					</p>
				</div>
				<div
					className={styles.verfiy_box}
					onClick={() => setThree(!three)}
				>
					<input
						type="checkbox"
						checked={three}
						onChange={changeEmpty}
					/>
					<div className={`${styles.verify_checkmark} ${three && styles.active}`}>
						<span className={styles.checkmark_icon}/>
					</div>
					<p
						className={`${styles.verify_text} ${
							three && styles.active
						}`}
					>
						{getVerifyTextThree(cutOut)}
					</p>
				</div>
				<div
					className={styles.verfiy_box}
					onClick={() => setFour(!four)}
				>
					<input
						type="checkbox"
						checked={four}
						onChange={changeEmpty}
					/>
					<div className={`${styles.verify_checkmark} ${four && styles.active}`}>
						<span className={styles.checkmark_icon}/>
					</div>
					<p
						className={`${styles.verify_text} ${
							four && styles.active
						}`}
					>
						{getVerifyTextFour(cutOut)}
					</p>
				</div>
				<a
					href={getCutOutLink(cutOut)}
					target="_blank"
					rel="noreferrer"
					id="proceed"
					className={`${styles.proceed_btn} ${
						verified && styles.active
					}`}
				>
					PROCEED &nbsp; TO  &nbsp; BUY &nbsp; & &nbsp; JOIN &nbsp; HISTORY 
				</a>
			</div>
		</div>
	);
}

export default PlaceBidPopup;
