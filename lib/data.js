export const APP_TITLE = "Monsters";
export const APP_TITLE_HEADER = "M O N S T E R S";

const forceTESTNET = false;
export const IN_DEV_ENV = process && process.env.NODE_ENV === "development";

export const MOLARIS_SERVER_URL = forceTESTNET
	? process.env.NEXT_PUBLIC_MORALIS_TESTNET_URL ||
	  "https://bay1qwjddr9g.usemoralis.com:2053/server"
	: process.env.NEXT_PUBLIC_MORALIS_PROD_URL ||
	  "https://tsuojewfhwgt.usemoralis.com:2053/server";

export const MOLARIS_APP_ID = forceTESTNET
	? process.env.NEXT_PUBLIC_MORALIS_TESTNET_ID ||
	  "S9huOoW4inxmZEOUMMXulB3OfO39Re3OmVJjYxx2"
	: process.env.NEXT_PUBLIC_MORALIS_PROD_ID ||
	  "ZIys9T9Qp0dot3GpktlEbIHRKrDwFZn9YfFBa5Qj";

export const FRONTEND_BASE_URL = IN_DEV_ENV
	? "http://localhost:3000"
	: "https://cryptostamping.org";
export const API_BASE_URL = IN_DEV_ENV
	? "http://localhost:3000/api"
	: "https://cryptostamping.org/api";

export const MINTING_CONTRACT_ADDRESS =
	"0x5C0282d2e512c1AEbC9F75baD69Bfd5B140cb9F5";

export const PINATA_API_BASE_URL = "https://api.pinata.cloud";
export const PINATA_API_KEY = "56b1fa9797ec485b5a69";
export const PINATA_API_SECRET =
	"e591b97e58b5aadb8d196aa926abe8db54badff9da73e377dd16ce295d2eb2c9";
export const PINATA_JWT =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MDZmYTEwMi1mYTU4LTQyYzItYmI3Ny03NjUxODI1MDA5M2UiLCJlbWFpbCI6InN1Ymhha2FydGlra2lyZWRkeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTZiMWZhOTc5N2VjNDg1YjVhNjkiLCJzY29wZWRLZXlTZWNyZXQiOiJlNTkxYjk3ZTU4YjVhYWRiOGQxOTZhYTkyNmFiZThkYjU0YmFkZmY5ZGE3M2UzNzdkZDE2Y2UyOTVkMmViMmM5IiwiaWF0IjoxNjM1MTUwNDQzfQ.8LvB-hWbKXA814R9KtzN2Gw9Rp8u9bHhIeK-NWVGfBg";

export const DATE_START = "2021-10-20";

export const DATE_LAUNCH = "2021-12-01";
export const DATE_INFO = `T R A I L E R \xa0\xa0\xa0\xa0\xa0 
L A U N C H E S \xa0\xa0\xa0\xa0\xa0  
O N \xa0\xa0\xa0\xa0\xa0   D E C \xa0\xa0\xa0 1`;

export const DATE_AUCTION = "2022-01-01";

export const availableChains = [
	{
		name: "Polygon Mainnet",
		chain: "Polygon",
		network: "mainnet",
		rpc: [
			"https://polygon-rpc.com/",
			"https://rpc-mainnet.matic.network",
			"https://matic-mainnet.chainstacklabs.com",
			"https://rpc-mainnet.maticvigil.com",
			"https://rpc-mainnet.matic.quiknode.pro",
			"https://matic-mainnet-full-rpc.bwarelabs.com",
		],
		faucets: [],
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		infoURL: "https://polygon.technology/",
		shortName: "MATIC",
		chainId: 137,
		networkId: 137,
		slip44: 966,
		moralisChainId: "matic",
		explorers: [
			{
				name: "polygonscan",
				url: "https://polygonscan.com",
				standard: "EIP3091",
			},
		],
	},
	{
		name: "Ethereum Mainnet",
		chain: "ETH",
		network: "mainnet",
		icon: "ethereum",
		rpc: [
			"https://mainnet.infura.io/v3/${INFURA_API_KEY}",
			"wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
			"https://api.mycryptoapi.com/eth",
			"https://cloudflare-eth.com",
		],
		faucets: [],
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
		},
		infoURL: "https://ethereum.org",
		shortName: "eth",
		chainId: 1,
		networkId: 1,
		slip44: 60,
		ens: {
			registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
		},
		explorers: [
			{
				name: "etherscan",
				url: "https://etherscan.io",
				standard: "EIP3091",
			},
		],
	},
	{
		name: "Binance Smart Chain Mainnet",
		chain: "BSC",
		network: "mainnet",
		rpc: [
			"https://bsc-dataseed1.binance.org",
			"https://bsc-dataseed2.binance.org",
			"https://bsc-dataseed3.binance.org",
			"https://bsc-dataseed4.binance.org",
			"https://bsc-dataseed1.defibit.io",
			"https://bsc-dataseed2.defibit.io",
			"https://bsc-dataseed3.defibit.io",
			"https://bsc-dataseed4.defibit.io",
			"https://bsc-dataseed1.ninicoin.io",
			"https://bsc-dataseed2.ninicoin.io",
			"https://bsc-dataseed3.ninicoin.io",
			"https://bsc-dataseed4.ninicoin.io",
			"wss://bsc-ws-node.nariox.org",
		],
		faucets: ["https://free-online-app.com/faucet-for-eth-evm-chains/"],
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "BNB",
			decimals: 18,
		},
		infoURL: "https://www.binance.org",
		shortName: "bnb",
		chainId: 56,
		networkId: 56,
		slip44: 714,
		explorers: [
			{
				name: "bscscan",
				url: "https://bscscan.com",
				standard: "EIP3091",
			},
		],
	},
	{
		name: "Polygon Testnet",
		chain: "Polygon",
		network: "testnet",
		rpc: [
			"https://rpc-mumbai.maticvigil.com",
			"https://matic-mumbai.chainstacklabs.com",
			"https://matic-testnet-archive-rpc.bwarelabs.com",
		],
		faucets: ["https://faucet.polygon.technology/"],
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		infoURL: "https://polygon.technology/",
		provider: "https://rpc-mumbai.matic.today",
		shortName: "maticmum",
		chainId: 80001,
		networkId: 80001,
		moralisChainId: "mumbai",
		explorers: [
			{
				name: "polygonscan",
				url: "https://mumbai.polygonscan.com",
				standard: "EIP3091",
			},
		],
	},
];

export const GS_CLIENT_ID =
	"220441957802-ad9588m5epvg0ksib90ds4e8c5ou3ibr.apps.googleusercontent.com";

export const lobbyOptions = [
	{ isPublic: true, label: "Anyone can join.", id: "PACJ" },
	{ isPublic: true, label: "Only from your Region.", id: "OFR" },
	{ isPublic: true, label: "Only Pro players.", id: "OPP" },
];

export const getRandomRoomName = () => {
	let prefix = "Amamzon Reeves";
	let suffix = generateUID();
	return prefix + " " + suffix;
};

export const generateUID = () => {
	var firstPart = (Math.random() * 46656) | 0;
	var secondPart = (Math.random() * 46656) | 0;
	firstPart = ("00" + firstPart.toString(36)).slice(-2);
	secondPart = ("00" + secondPart.toString(36)).slice(-2);
	return firstPart + secondPart;
};

//🎯 🎲 📌 📐 🔑 🔐 ⚔ ⚙ 🧲 ⚠ ➡ ✅ 🏃  🦴 ✍ 💯 ☠ 📅

export const stampCollectionCards = [
	{
		image: "/images/cards/cutouts.png",
		title: "Cut Outs | The 1st stamps. ",
		link: "https://cutoutsnft.com",
		message: "With a limit of only 999 stamps, valuing Quality over quantity, cutouts is the first ever digital stamp collection, auctioned one per day. Its value & importance will only increase with passing time."
	},
	{
		image: "/images/cards/start.jpg",
		title: "Start a stamp collection.",
		message: "Cryptostamping is an open-sorce concept, and it will forever remain so. To start a stamp collection you will not require to pay any fees, but only follow the developer guidelines mentioned here & deploy your NFT contract with the ECS standard."
	}
]

export const usecaseCards = [
	{
		image: "/images/cards/type.png",
		title: "Add real value to your articles, blogs or websites.",
		message: "252,000 new websites are created every day worldwide, put an NFT stamp you own on your website and differentiate from the ordinary."
	},
	{
		image: "/images/cards/graphitti.png",
		title: "Use stamps as your brand mark or digital identity.",
		message: "Create a trusted following by using your stamp as your brand mark to denote that you were there, and you liked it or even hated it."
	},
	{
		image: "/images/cards/paperboat.png",
		title: "Support or Endorse projects authentically.",
		message: "There are 100s of new projects listing out their partners or investors, but no way to veify, Use stamps to support projects you're working on authentically."
	},
	{
		image: "/images/cards/speaker.png",
		title: "Use stamps as a Fraud-alert or a Scam-alert.",
		message: "Use your stamp to alert people of scams & frauds, don't trust some jpegs of fake-founders. Stamping is done on block chain, and easily verifiable by its public stamping history."
	},
	{
		image: "/images/cards/basket.png",
		title: "Donate money in an authentic public way.",
		message: "Use your stamp to donate money through this decentralised stamping system, everything is public including the donators who will be listed out as stamps."
	},//A key issue with many donation sites, is their centralized control, but if
	{
		image: "/images/cards/hanging.png",
		title: "Use stamps to get special access in websites.",
		message: "One of the keyfactors with centralized platform is trust, what if my subscription gets over-ridden? but if they give you access on the basis of stamping, its 100% credible as this is inerasable & lives on block-chain."
	}
]


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

export const investFAQs =  [
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
