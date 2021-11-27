import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { FixedSizeList as List, areEqual } from "react-window";

import styles from "components/home/investblock.module.scss";

import Tooltip from "components/modals/tooltip";

import { randomIntFromInterval, toHex } from "lib/utils";
import { DATE_LAUNCH, availableChains } from "lib/data";
import { useChain } from "lib/web3";

import { setLoggedIn } from "lib/redux/features/userSlice";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function InvestBlock({ highlightBlock, setHighlightBlock }) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const [currentChain, setCurrentChain] = useState({});
	const { chainId, switchChain } = useChain();
	const { Moralis } = useMoralis();
	const web3 = new Moralis.Web3();

	const chainIds = {
		etherium: 1,
		polygon: 80001, //137,
		binance: 56,
	};

	const { data: investConfigArray, isLoading: dataLoading } = useMoralisQuery(
		"InvestConfig",
		(query) => query.ascending("createdAt").limit(1)
	);

	const [data, setData] = useState(null);

	useEffect(() => {
		console.log(data?.attributes);
		if (!highlightBlock || !data?.attributes) return;
		for (var i = availableChains.length - 1; i >= 0; i--) {
			if (availableChains[i].chainId === chainId) {
				setCurrentChain(availableChains[i]);
				if (chainId === chainIds.etherium)
					setActivePrice(data.attributes?.etherium_prices[0]);
				if (chainId === chainIds.polygon)
					setActivePrice(data.attributes?.polygon_prices[0]);
				if (chainId === chainIds.binance)
					setActivePrice(data.attributes?.binance_prices[0]);
				return;
			}
		}
	}, [chainId, data]);

	useEffect(() => {
		setData(investConfigArray[0]);
	}, [investConfigArray]);

	/*const data = {
		attributes?: {
			treasury_address: "0x95f1B07BdeF74EEf9f4C072CbadC7Dbee4014C0E",
			etherium_prices: [
				{ price: 0.001, tag: "Thankyou.", clause: 0 },
				{ price: 0.01, tag: "Thankyou.", clause: 1 },
				{ price: 0.1, tag: "Thankyou.", clause: 2 },
			],
			binance_prices: [
				{ price: 0.008, tag: "Thankyou.", clause: 0 },
				{ price: 0.08, tag: "Thankyou.", clause: 1 },
				{ price: 0.8, tag: "Thankyou.", clause: 2 },
			],
			polygon_prices: [
				{ price: 0.00003, tag: "Thankyou.", clause: 0 },
				{ price: 30, tag: "Thankyou.", clause: 1 },
				{ price: 300, tag: "Thankyou.", clause: 2 },
			],
			clauses: [
				{
					"benefits": [
						"1 badge that gives you beta early access to many of the projects initiated/partnered with team cutouts.",
						"An unerasable transaction proof that you were part of the movement. the turn point of internet history & digital stamps. ",
					],
				},
				{
					"benefits": [
						"1 stamp giveaway from any of the first nine collections minted with ECS standard of cryptostamping.org",
						"1 badge that gives you beta early access and many oppurtunities like launchpad, promotion, stamping from projects or individuals initiated/partnered with team cutouts.",
						"An unerasable transaction proof that you were part of the movement. the turn point of internet history & digital stamps. ",
					],
				},
				{
					"benefits": [
						"1 whitelist spot that will let you buy an original cutout at floor price ( 0.2~0.5 Eth )",
						"1 stamp giveaway from any of the first nine collections minted with ECS standard of cryptostamping.org",
						"1 badge that gives you special membership access and many oppurtunities like launchpad, promotion, stamping from projects initiated/partnered with team cutouts.",
						"An unerasable transaction proof that you were part of the movement. the turn point of internet history & digital stamps. ",
					],
				},
			],
		},
	};
	*/

	const [activePrice, setActivePrice] = useState({});
	const [txObject, setTxObject] = useState(null);
	const [loading, setLoading] = useState(false);

	const clickSwitchChain = (newChainId) => {
		for (var i = availableChains.length - 1; i >= 0; i--) {
			if (availableChains[i].chainId === newChainId) {
				setActivePrice({});
				switchChain(availableChains[i]);
				return;
			}
		}
	};

	const clickPaySelection = (priceObject) => {
		setActivePrice(priceObject);
		if (chainId === chainIds.etherium) {
		}
		setHighlightBlock(true);
	};

	const sendTransaction = () => {
		if (!activePrice?.price) {
			for (var i = availableChains.length - 1; i >= 0; i--) {
				if (availableChains[i].chainId === chainId) {
					if (chainId === chainIds.etherium)
						setActivePrice(data.attributes?.etherium_prices[0]);
					if (chainId === chainIds.polygon)
						setActivePrice(data.attributes?.polygon_prices[0]);
					if (chainId === chainIds.binance)
						setActivePrice(data.attributes?.binance_prices[0]);
					setHighlightBlock(true);
					return;
				}
			}
		}
		const transactionParameters = {
			from: window.ethereum.selectedAddress,
			value: web3.utils.toHex(Moralis.Units.ETH(activePrice.price + "")),
			to: data?.attributes?.treasury_address,
		};
		console.log(transactionParameters);
		window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [transactionParameters],
			})
			.then((txHash) => {
				console.log(txHash);
				setTxObject({
					hash: txHash,
					url: currentChain.explorers[0].url + "/tx/" + txHash,
					message: `Note that the above link is your proof of investment and it will be required to claim any of the defined benefits. \n
						Please check our team-talks in discord server for daily updates of the project or \n 
						subscribe to our private newsletter to get a weekly report of stats, growth and development of the project. \n`,
				});
			})
			.catch((error) => console.error);
	};

	useEffect(() => {
		if (!highlightBlock) {
			setActivePrice({});
			setTxObject(null);
		}
	}, [highlightBlock]);

	if(!data?.attributes){
		return <div></div>
	}

	return (
		<div className={styles.container}>
			{highlightBlock && (<div className={styles.tabs_chain}>
				<div
					onClick={() => clickSwitchChain(chainIds.etherium)}
					className={`${styles.chain_item} ${
						chainIds.etherium === chainId && styles.active
					}`}
				>
					<span
						className={`${styles.icon} ${styles.etherium_icon}`}
					/>
					ETH
				</div>
				<div
					onClick={() => clickSwitchChain(chainIds.binance)}
					className={`${styles.chain_item} ${
						chainIds.binance === chainId && styles.active
					}`}
				>
					<span className={`${styles.icon} ${styles.binance_icon}`} />
					BNB
				</div>
				<div
					onClick={() => clickSwitchChain(chainIds.polygon)}
					className={`${styles.chain_item} ${
						chainIds.polygon === chainId && styles.active
					}`}
				>
					<span className={`${styles.icon} ${styles.polygon_icon}`} />
					MATIC
				</div>
			</div>
			)}
			{highlightBlock && !txObject && (
				<div className={styles.payment}>
					{chainIds.etherium === chainId && (
						<div className={styles.tabs_payments}>
							{data?.attributes?.etherium_prices.map(
								(etherium_price) => {
									return (
										<div
											onClick={() => {
												clickPaySelection(
													etherium_price
												);
											}}
											key={etherium_price.price}
											className={styles.payment_item}
										>
											<div
												className={`${styles.circle} ${
													activePrice.price ===
														etherium_price.price &&
													styles.active
												}`}
											>
												<span
													className={`${styles.icon} ${styles.icon_check}`}
												/>
											</div>
											<div>
												<h2>{etherium_price.price}</h2>
												<p>ETH</p>
											</div>
										</div>
									);
								}
							)}
						</div>
					)}
					{chainIds.binance === chainId && (
						<div className={styles.tabs_payments}>
							{data?.attributes?.binance_prices.map(
								(price_object) => {
									return (
										<div
											onClick={() => {
												clickPaySelection(price_object);
											}}
											key={price_object.price}
											className={styles.payment_item}
										>
											<div
												className={`${styles.circle} ${
													activePrice.price ===
														price_object.price &&
													styles.active
												}`}
											>
												<span
													className={`${styles.icon} ${styles.icon_check}`}
												/>
											</div>
											<div>
												<h2>{price_object.price}</h2>
												<p>BNB</p>
											</div>
										</div>
									);
								}
							)}
						</div>
					)}
					{chainIds.polygon === chainId && (
						<div className={styles.tabs_payments}>
							{data?.attributes?.polygon_prices.map(
								(price_object) => {
									return (
										<div
											onClick={() => {
												clickPaySelection(price_object);
											}}
											key={price_object.price}
											className={styles.payment_item}
										>
											<div
												className={`${styles.circle} ${
													activePrice.price ===
														price_object.price &&
													styles.active
												}`}
											>
												<span
													className={`${styles.icon} ${styles.icon_check}`}
												/>
											</div>
											<div>
												<h2>{price_object.price}</h2>
												<p>MATIC</p>
											</div>
										</div>
									);
								}
							)}
						</div>
					)}
				</div>
			)}
			{highlightBlock && !txObject && activePrice.clause >= 0 && (
				<div className={styles.benefits}>
					<h1>Benefits.</h1>
					{data?.attributes?.clauses[activePrice.clause].benefits.map(
						(benefit) => {
							return (
								<p
									key={benefit}
									className={styles.benefit_line}
								>
									{benefit}
								</p>
							);
						}
					)}
				</div>
			)}
			{highlightBlock &&
				!txObject &&
				activePrice.clause >= 0 &&
				data?.attributes?.clauses[activePrice.clause].nfts?.length >
					0 && (
					<div className={styles.benefits}>
						<h1>Attached NFTs.</h1>
						{data?.attributes?.clauses[
							activePrice.clause
						].nfts?.map((nft) => {
							return (
								<p
									key={benefit}
									className={styles.benefit_line}
								>
									{benefit}
								</p>
							);
						})}
					</div>
				)}
			{highlightBlock && txObject && (
				<div className={styles.message_box}>
					<h1>Thank you.</h1>
					<p>
						Here's your proof -{" "}
						<a
							className={styles.message_link}
							href={txObject.url}
							rel="noreferrer"
							target="_blank"
						>
							{txObject.hash.substr(0, 10)}...
						</a>
					</p>
					<p>{txObject.message}</p>
				</div>
			)}
			{!txObject && (
				<div onClick={sendTransaction} className={styles.btn_invest}>
					Invest Now.
				</div>
			)}
			{!txObject && <p className={styles.smalltext}>& Join History.</p>}
		</div>
	);
}

export default InvestBlock;
