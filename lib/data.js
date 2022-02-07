export const APP_TITLE = "Cryptostamping";
export const APP_TITLE_HEADER = "Cryptostamping";

const forceTESTNET = false;
export const IN_DEV_ENV = process && process.env.NODE_ENV === "development";

export const MOLARIS_SERVER_URL = forceTESTNET
	? process.env.NEXT_PUBLIC_MORALIS_TESTNET_URL
	: process.env.NEXT_PUBLIC_MORALIS_PROD_URL;

export const MOLARIS_APP_ID = forceTESTNET
	? process.env.NEXT_PUBLIC_MORALIS_TESTNET_ID
	: process.env.NEXT_PUBLIC_MORALIS_PROD_ID;

export const FRONTEND_BASE_URL = IN_DEV_ENV
	? "http://localhost:3000"
	: process.env.NEXT_PUBLIC_FRONTEND_URL;
export const API_BASE_URL = IN_DEV_ENV
	? "http://localhost:3000/api"
	: process.env.NEXT_PUBLIC_API_BASE_URL;

export const GS_CLIENT_ID = process.env.NEXT_PUBLIC_GS_CLIENT_ID;

export const availableMainChains = [
	{
		symbol: "eth",
		logo: "ethereum",
		name: "Ethereum",
		chainId: 1,
		rpc: "https://api.mycryptoapi.com/eth",
	},
	{
		symbol: "polygon",
		logo: "polygon",
		name: "Polygon",
		chainId: 137,
		rpc: "https://polygon-rpc.com/",
	},
	{
		symbol: "bsc",
		logo: "binance",
		name: "Binance",
		chainId: 56,
		rpc: "https://bsc-dataseed1.binance.org",
	},
	{
		symbol: "avalanche",
		logo: "avalanche",
		name: "Avalanche",
		chainId: 43114,
		rpc: "https://api.avax.network/ext/bc/C/rpc",
	},
];
export const availableTestChains = [
	{
		symbol: "ropsten",
		logo: "ethereum",
		name: "Ropsten",
		chainId: 3,
		rpc: "https://ropsten.infura.io/v3/03471b96bc3f4e539cb9fe22a60c3710",
	},
	{
		symbol: "mumbai",
		logo: "polygon",
		name: "Mumbai",
		chainId: 80001,
		rpc: "https://rpc-mumbai.maticvigil.com",
	},
	{
		symbol: "bsc testnet",
		logo: "binance",
		name: "BSC-Test",
		chainId: 97,
		rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
	},
	{
		symbol: "avalanche testnet",
		logo: "avalanche",
		name: "AVAX-Fuji",
		chainId: 43113,
		rpc: "https://api.avax-test.network/ext/bc/C/rpc",
	},
];
export const supportedChains = [
	"eth",
	"ropsten",
	"bsc",
	"bsc testnet",
	"polygon",
	"mumbai",
	"avalanche",
	"avalanche testnet",
];

export const supportedTestChains = [
	"ropsten",
	"bsc testnet",
	"mumbai",
	"avalanche testnet",
];

export const supportedMainChains = ["eth", "bsc", "polygon", "avalanche"];

export const DATE_START = "2021-10-20";

export const DATE_LAUNCH = "2021-12-01";
export const DATE_INFO = `T R A I L E R \xa0\xa0\xa0\xa0\xa0 
L A U N C H E S \xa0\xa0\xa0\xa0\xa0  
O N \xa0\xa0\xa0\xa0\xa0   D E C \xa0\xa0\xa0 1`;

export const DATE_AUCTION = "2022-01-01";

export const generateUID = () => {
	var firstPart = (Math.random() * 46656) | 0;
	var secondPart = (Math.random() * 46656) | 0;
	firstPart = ("00" + firstPart.toString(36)).slice(-2);
	secondPart = ("00" + secondPart.toString(36)).slice(-2);
	return firstPart + secondPart;
};

export const getChainObject = (_chainId, type) => {
	if (type === "mainnet") {
		for (const chainObject of availableMainChains) {
			if (chainObject.chainId === _chainId) return chainObject;
		}
		return;
	}
	if (type === "testnet") {
		for (const chainObject of availableTestChains) {
			if (chainObject.chainId === _chainId) return chainObject;
		}
		return;
	}
	for (const chainObject of availableMainChains) {
		if (chainObject.chainId === _chainId) return chainObject;
	}
	for (const chainObject of availableTestChains) {
		if (chainObject.chainId === _chainId) return chainObject;
	}
};

export const getChainFromSymbol = (_symbol, type) => {
	if (type === "mainnet") {
		for (const chainObject of availableMainChains) {
			if (chainObject.symbol === _symbol) return chainObject;
		}
		return;
	}
	if (type === "testnet") {
		for (const chainObject of availableTestChains) {
			if (chainObject.symbol === _symbol) return chainObject;
		}
		return;
	}
	for (const chainObject of availableMainChains) {
		if (chainObject.symbol === _symbol) return chainObject;
	}
	for (const chainObject of availableTestChains) {
		if (chainObject.symbol === _symbol) return chainObject;
	}
};

export const isTestnet = (chain) => {
	for (const chainObject of availableTestChains) {
		if (chainObject.symbol === chain) return true;
	}
	return false;
};

//🎯 🎲 📌 📐 🔑 🔐 ⚔ ⚙ 🧲 ⚠ ➡ ✅ 🏃  🦴 ✍ 💯 ☠ 📅

export const stampCollectionCards = [
	{
		image: "/images/cards/cutouts.png",
		title: "Cut Outs | The 1st stamps. ",
		link: "https://cutoutsnft.com",
		message:
			"With a limit of only 999 stamps, valuing Quality over quantity, cutouts is the first ever digital stamp collection, auctioned one per day. Its value & importance will only increase with passing time.",
	},
	{
		image: "/images/cards/start.jpg",
		title: "Start a stamp collection.",
		message:
			"Cryptostamping is an open-sorce concept, and it will forever remain so. To start a stamp collection you will not require to pay any fees, but only follow the developer guidelines mentioned here & deploy your NFT contract with the ECS standard.",
	},
];

export const usecaseCards = [
	{
		image: "/images/cards/type.png",
		title: "Add real value to your articles, blogs or websites.",
		message:
			"252,000 new websites are created every day worldwide, put an NFT stamp you own on your website and differentiate from the ordinary.",
	},
	{
		image: "/images/cards/graphitti.png",
		title: "Use stamps as your brand mark or digital identity.",
		message:
			"Create a trusted following by using your stamp as your brand mark to denote that you were there, and you liked it or even hated it.",
	},
	{
		image: "/images/cards/paperboat.png",
		title: "Support or Endorse projects authentically.",
		message:
			"There are 100s of new projects listing out their partners or investors, but no way to verify. Use stamps to support projects you're working on authentically.",
	},
	{
		image: "/images/cards/speaker.png",
		title: "Use stamps as a Fraud-alert or a Scam-alert.",
		message:
			"Use your stamp to alert people of scams & frauds, don't trust some jpegs of fake-founders. Stamping is done on block chain, and easily verifiable by its public stamping history.",
	},
	{
		image: "/images/cards/basket.png",
		title: "Donate money in an authentic public way.",
		message:
			"Use your stamp to donate money through this decentralised stamping system, everything is public including the donors who will be listed out as stamps.",
	}, //A key issue with many donation sites, is their centralized control, but if
	{
		image: "/images/cards/hanging.png",
		title: "Use stamps to get special access in websites.",
		message:
			"One of the key factors with centralized platforms is trust, what if my subscription gets overridden? but if they give you access on the basis of stamping, it's 100% credible as this is inerasable & lives on block-chain.",
	},
];

export const mainFAQs = [
	{
		id: "i1",
		question: "Why we believe this is a Game-Changer?",
		answer: `There are millions of posts every second and the 
		internet keeps growing, how do you or anyone know which 
		has value? and this is where the prime value of NFT's kick in, 
		they can increase value of a post. By adding a stamp that has 
		a current value of 30ETH gives that post an unique advantage 
		from the rest of spammers. This is the direction in which NFT's 
		& digital world need to head into (excluding NFT game market).`,
		emoji: "",
		image: "/images/snapshots/snapshot1.png",
	},
	{
		id: "i2",
		question: "How cryptostamping works?",
		answer: `cryptostamping is a system where people stamp on 
		websites, articles, posts, images, games, videos, almost anything. 
		The way you do it can be as simple as clicking 
		a button that the website/game itself embedded. 
		they can also do this through a browser plugin 
		without any need for embed too. it will be 100% authentic as it
		will check from On-Chain Details while both signing &
		displaying.`,
		emoji: "",
		image: "/images/snapshots/snapshot2.png",
	},
	{
		id: "i3",
		question: "Is this Open-Source?",
		answer: `Yes, cryptostamping is an open source system 
		that is ownerless and decentralised. it regulates the stamping 
		rules through an ECS standard, that defines and preconfigures the 
		minting contract to follow the stamping standards. Any software like 
		plugin and embed are also publicly developed and 
		updated as a communal effort by the cryptostamping org.`,
		emoji: "",
		image: "/images/snapshots/snapshot3.png",
	},
	{
		id: "i4",
		question: "A cut above the rest?",
		answer: `Even if there are millions of stamp collections 
		into the future harnessing the power of web3, 
		Cut Outs will always be looked up as the first digital stamp 
		collection. It's value & importance will only 
		increase with passing time. From the all new ECS standard 
		that defines cryptostamping, to the constant upgrades of all 
		integrations, cut outs will always bear the spearhead role 
		in looking far into the future of digital valuation & 
		a decentralized web3 networking.`,
		emoji: "",
		image: "/images/snapshots/snapshot4.png",
	},
	{
		id: "i6",
		question: "Why the auction model & why so few?",
		answer: `Quality over Quantity. We
				strongly believe this is how NFT's should be, as
				collecting something that has high value and rare is how
				people can differentiate themselves from the main
				stream. Hence we put in more efforts for each and every cutout's 
				designs, upgrades, use cases. We even maintain a locked treasury for 
				 future upgrades of cut outs depending on the tech advancements.`,
		emoji: "",
		image: "/images/snapshots/snapshot5.png",
	},
	{
		id: "i7",
		question: "Can anyone start a crypto stamp collection?",
		answer: `Yes, anyone can, we invite all creators out there to create
				their own crypto-stamp collections and actually
				transform the gnawing social media. For this reason we
				even decided to launch only one stamp per day untill
				999. Take your shot before its too late. check cryptostamping.org
				 for more info and how to get started.`,
		emoji: "",
		image: "/images/snapshots/snapshot6.png",
	},
];

export const investFAQs = [
	{
		id: "i1",
		question: "The idea",
		answer: `From websites that are dynamic, to something as simple as
        text posts, you can add value to any digital content with
        just a stamp. cryptostamping is the power of web3 in it's true
        essence!`,
		emoji: "",
		image: "/images/snapshots/snapshot1.png",
	},
	{
		id: "i2",
		question: "Use cases",
		answer: `The derivative use cases range from 
        crypto verification, influencer following, 
        brand marketing, supporting movements, 
        signing petitions, receiving donations, 
        public payments, 
        subscriptions and lots more..`,
		emoji: "",
		image: "/images/snapshots/snapshot2.png",
	},
	{
		id: "i3",
		question: "The Foundation of a revolution",
		answer: `From the all new ECS standard that defines cryptostamping, 
        to the constant upgrades of all integrations, 
        cut outs will always bear the spearhead role in looking 
        far into the future of digital valuation & 
        a decentralized web3 networking.`,
		emoji: "",
		image: "/images/snapshots/snapshot3.png",
	},
	{
		id: "i4",
		question: "Stable Market.",
		answer: `Not comparing to the volatile NFT markets that 
        depend on hype & community activity,
        cut outs will always be valued for its inherent utility 
        and its historic impact as a turnpoint of the digital media.`,
		emoji: "",
		image: "/images/snapshots/snapshot4.png",
	},
	{
		id: "i6",
		question: "Infinitely Scalable.",
		answer: `Every cutout is scalable to a next upgrade depending
      on the future events of mankind, 
      a good example would be a 3d stamp that adds value to a metaverse
      server among the countless that are popping!`,
		emoji: "",
		image: "/images/snapshots/snapshot5.png",
	},
	{
		id: "i7",
		question: "A cut above the rest.",
		answer: `With only a limit of 999 stamps, 
        we value Quality over Quantity,
        we know an NFT is valued for its rarity & 
        impact. hence we put in more efforts for
         each and every cutout's designs, upgrades,
         use cases.`,
		emoji: "",
		image: "/images/snapshots/snapshot6.png",
	},
	{
		id: "i8",
		question: "The punchline.",
		answer: `Even if there are millions of stamp collections 
        into the future harnessing the power of web3, 
        Cut Outs will always be looked up
        as the first digital stamp
        collection. It's value & importance will only 
        increase with passing time.`,
		emoji: "",
		image: "/images/snapshots/snapshot6.png",
	},
];
