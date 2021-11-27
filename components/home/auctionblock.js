import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { FixedSizeList as List, areEqual } from "react-window";

import PlaceBidPopup from "components/home/placebidpopup";
import ItemOwnerPopup from "components/home/itemownerpopup";
import styles from "components/home/auctionblock.module.scss";
import Tooltip from "components/modals/tooltip";
import ButtonsBanner from "components/home/buttonsbanner";

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
import { DATE_LAUNCH } from "lib/data";


import { setLoggedIn } from "lib/redux/features/userSlice";
import {
	setSidebarOpen,
	setTopLoading,
	setCutOut,
} from "lib/redux/features/uiSlice";

const renderVideo = memo(
	({ index, style, data }) => (
		<div style={style}>
			<video
				className={styles.video}
				src={getVideoDisplayLink(data[index].attributes.cutout_no)}
				controls={false}
				autoPlay={true}
				poster={"/images/blank_background.svg"}
				muted
				loop
				playsInline
			/>
		</div>
	),
	areEqual
);

function AuctionBlock({ dispatch, Moralis, authenticate }) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const cutOut = useSelector((state) => state.ui.cutOut);

	const [pageNo, setPageNo] = useState(1);
	const [displyCutOutNo, setDisplayCutOutNo] = useState(2);
	const page_length = 30;
	const maxPageNo = 1;
	const { data, error, isLoading } = useMoralisQuery(
		"CutOut",
		(query) =>
			query
				.greaterThanOrEqualTo(
					"cutout_no",
					1 + (pageNo - 1) * page_length
				)
				.lessThanOrEqualTo("cutout_no", pageNo * page_length + 5)
				.ascending("cutout_no"),
		[pageNo]
	);
	const openWhitelist = () => {
		dispatch(setSidebarOpen({type: "Whitelist", open: true}));
	};

	const listRef = useRef();

	useEffect(() => {
		// run only once at the starting.
		// fetch current days stamp no and set it.
		if (cutOut === null) {
			let nowCutNo = getCurrentStampDay();
			nowCutNo = randomIntFromInterval(2, 10);
			setDisplayCutOutNo(nowCutNo);
			setPageNo(1);
			return;
		}
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].attributes.cutout_no === cutOut.cutout_no) {
				listRef.current.scrollToItem(i);
				return;
			}
		}
	}, [data, cutOut]);

	useEffect(() => {
		//first setting only if theres no cutout
		if (cutOut === null && data && data.length > 0)
			renderCutOut(displyCutOutNo);
	}, [data, cutOut, displyCutOutNo]);

	useEffect(() => {
		console.log(pageNo);
	}, [pageNo]);

	const renderCutOut = (cutNo) => {
		if (!data || data.length <= 0) {
			return;
		}
		const spanWidth = 3;
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].attributes.cutout_no === cutNo) {
				dispatch(setCutOut(data[i].toJSON()));
				return;
			}
		}
	};

	const clickBack = (number) => {
		if (cutOut.cutout_no != 1) {
			let newNo = cutOut.cutout_no - 1;
			if (newNo <= (pageNo - 1) * page_length + 5) {
				setPageNo((_pageNo) => _pageNo - 1);
			}
			renderCutOut(newNo);
		}
	};

	const showBackBtn = (number) => {
		if (number != 1) return styles.active;
		return "";
	};

	const clickNext = () => {
		if (cutOut.cutout_no < getCurrentStampDay()) {
			let newNo = cutOut.cutout_no + 1;
			renderCutOut(newNo);
			if (newNo >= pageNo * page_length - 5 && pageNo < maxPageNo) {
				setPageNo((_pageNo) => _pageNo + 1);
			}
		}
	};
	const showNextBtn = (number) => {
		if (number < getCurrentStampDay()) return styles.active;
		return "";
	};

	const getThemStrip = (theme_color) => {
		return {
			background: theme_color,
		};
	};

	const [showPlacebid, setShowPlaceBid] = useState(false);
	const clickPlaceBid = () => {
		//setShowPlaceBid(true);
	};


	return (
		<div className={styles.container}>
			<PlaceBidPopup
				show={showPlacebid}
				setShow={setShowPlaceBid}
				cutOut={cutOut}
			/>
			{cutOut &&
			<div className={styles.screen_one_content}>
				<div
					className={styles.border}
					style={getThemStrip(cutOut.theme_color)}
				/>
				<div className={styles.stamp_title_info}>
					<h4 className={styles.stamp_title}>{cutOut.title}</h4>
					<p className={styles.stamp_descr}>{cutOut.description}</p>
				</div>
				<List
					ref={listRef}
					height={450}
					className={styles.stamp_display_vid}
					itemCount={data.length}
					itemData={data}
					itemSize={450}
					width={450}
					layout="horizontal"
				>
					{renderVideo}
				</List>
				<div className={styles.stamp_release_info}>
					<div className={styles.number_box}>
						<h4 className={styles.stamp_number}>
							Cut Out {printCutOutNumber(cutOut.cutout_no)}
							{isPrime(cutOut.cutout_no) && (
								<Tooltip
									delay={0}
									position={"top center"}
									description={
										"All Prime No. Editions are special. For more info, join whitelist."
									}
									trigger={
										<span className={styles.primetag}>
											P
										</span>
									}
								/>
							)}
						</h4>
						<div
							onClick={clickBack}
							className={`${styles.navigation_btn} ${showBackBtn(
								cutOut.cutout_no
							)}`}
						>
							<span className={styles.navigation_icon} />
						</div>
						<div
							onClick={clickNext}
							className={`${styles.navigation_btn} ${
								styles.right
							} ${showNextBtn(cutOut.cutout_no)}`}
						>
							<span
								className={`${styles.navigation_icon} ${styles.right}`}
							/>
						</div>
					</div>
					<div className={styles.release_box}>
						<p className={styles.release_date}>
							{getCutOutReleaseDate(cutOut.cutout_no)}
						</p>
						<p className={styles.current_availability}>
							<span className={styles.eth_icon}></span>
							{cutOut.price ? cutOut.price+" Eth": "Reserved."}
						</p>
						<a
							onClick={openWhitelist}
							className={`${styles.rarible_link} ${
								isPrime(cutOut.cutout_no) && styles.yellow
							} ${cutOut.availability === "sold" && styles.red}`}
						>
							{getCutOutAvailStock(cutOut.availability)}
						</a>
						{cutOut.available <= 0 && (
							<a
								onClick={clickPlaceBid}
								className={`${styles.rarible_link} ${styles.red}`}
							>
								Sold Out.
							</a>
						)}
					</div>
					{getCutOutDescription(
						cutOut.availability,
						cutOut.cutout_no
					) !== null && (
						<div>
							<p
								className={`${styles.current_availability} ${styles.description}`}
							>
								{getCutOutDescription(
									cutOut.availability,
									cutOut.cutout_no
								)}
							</p>
							<div className="d-flex align-items-center">
							<p className={styles.stamp_descr}>
								<span className={styles.stamp_title}>
									{cutOut.title}
								</span>
								{isPrime(cutOut.cutout_no) && (
									<span>
										{" | "}
										{cutOut.description}
									</span>
								)}
							</p>
							</div>
						</div>
					)}
				</div>
			</div>
			}
			{!cutOut &&
			<div className={styles.container}>
				<div className={styles.screen_one_empty}></div>
			</div>
			}
			<ButtonsBanner Moralis={Moralis} authenticate={authenticate}/>
		</div>
	);
}

export default AuctionBlock;

/*
{data
						.filter((displayData) => {
							return (
								Math.abs(
									displayData.attributes.cutout_no -
										cutOut.cutout_no
								) < 5
							);
						})
						.map((displayData) => {
							return (
								<video
									className={styles.video}
									src={getVideoDisplayLink(
										displayData.attributes.cutout_no
									)}
									controls={false}
									autoPlay={true}
									poster={"/images/blank_background.jpeg"}
									muted
									loop
									playsInline
								/>
							);
						})}
				</div>


					<div className="d-flex align-items-start flex-wrap">
						{!isPrime(cutOut.cutout_no) &&
							cutOut?.items?.map((item, index) => {
								return item.owner ? (
									<ItemOwnerPopup
										key={item.link}
										trigger={
											<div className={styles.item_card}>
												<p className={styles.item_text}>
													{index + 1} . {item.owner}
												</p>
											</div>
										}
										delay={0}
										position={"top center"}
										item={item}
										Moralis={Moralis}
									></ItemOwnerPopup>
								) : (
									<div />
								);
							})}
					</div>


						<a
							href={"/presale"}
							className={`${styles.rarible_link} ${styles.normal}`}
						>
							More Details
						</a>
						.

*/
