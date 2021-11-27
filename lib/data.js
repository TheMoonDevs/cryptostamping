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
	: "https://cut-outs.netlify.app";
export const API_BASE_URL = IN_DEV_ENV
	? "http://localhost:3000/api"
	: "https://cut-outs.netlify.app/api";

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
export const faqs = [
	{
		title: "Frequently Asked Questions",
		list: [
			{
				id: "i1",
				question: "What defines a Cut Out in simpler terms?",
				answer: `Cut Out is a digital stamp that not only marks one's support 
				but also adds value and gives authenticity to a particular website or post.`,
				emoji: "🔎",
			},
			{
				id: "i2",
				question: "How does a Cut Out add value to digital content?",
				answer: `To own a cut-out means to own an NFT that's worth some real value. 
				When you stamp with your cut-out on any website.
				The website's value far outreaches than an emoji or jpeg
				that anyone can embed or post.`,
				emoji: "✨",
			},
			{
				id: "i3",
				question: "Where & How do I use a Cut Out?",
				answer: `You can use it anywhere on the web where you 
				see a +STAMP button. and even on websites that do not have one, 
				with our plugin. Do check the roadmap to see when they 
				will be available.`,
				emoji: "🔨",
			},
			{
				id: "i4",
				question: "How can I own a Cut Out?",
				answer: `Well, you buy it. There will only ever be 999 Editions, 
				auctioned one each day. 
				Note that prime editions are more valuable than normal ones.
				And there are only 168 prime numbers under 999.`,
				emoji: "💰",
			},
			{
				id: "i6",
				question: "Why are Prime Editions so Highly Valued?",
				answer: `All prime numbered cutouts have a stamping limit
				of 9. Increasing its rarity index and further
				increasing its webscore.`,
				emoji: "🎲",
			},
			{
				id: "i7",
				question: "What is a stamping Limit ?",
				answer: `A good example would be The spartan
				stamp (Cut Out 001) can be stamped on a 99 websites where as 
				The angry kong (Cut Out 002) can only be stamped on 9 websites.
				So, if there is a new stamping of angry kong at anypoint in future,
				it will raise a lot of discussion, as the entire internet can 
				only have 9 sightings of it at any given-point of time.`,
				emoji: "📐",
			},
		],
	},
	{
		title: "Pre-Sale Rules & Guidelines.",
		list: [
			{
				id: "p1",
				question: "What's on Pre-Sale?",
				answer: `To reward early adopters who can find truly amazing 
    			projects before anyone, The starting few Cut Outs will be available 
    			for direct sale on pre-sale for whitelist holders.`,
				emoji: "🔥",
			},
			{
				id: "p2",
				question: "How do I get into the whitelist?",
				answer: `You can enter the whitelist either by making a smaller investment on homepage or contributiong to the project as
				 a project ambassador or nft promoter.`,
				emoji: "📅",
			},
			{
				id: "p5",
				question: "Why can't I buy a Prime Edition in Pre-Sale?",
				answer: `The prime editions will be available for open bidding for its first 24 Hrs. 
				If no one bids the Minimum Amount, It will get Auction-Locked. 
				We do this because Prime Editions are and will be super-rare.`,
				emoji: "⏳",
			},
		],
	},
	{
		title: "Stamp Authenticity.",
		list: [
			{
				id: "a1",
				question: "How are you making sure its authentic?",
				answer: `This is complex, but if you wish to understand why we say it's 100% authentic,
				 Do read. Any NFT stamp will function as a stamper which you use to stamp 
				 on websites, emails, or other content. and you do this either through the 
				 +stamp button or through the browser plugin (OUR OWN). when you stamp, 
				 metadata would have to be signed specifically by the current user,
				 it will collect the stamp id, your id, and store it. when someone opens
				the site or post, it will verify whether the stored stamps truly do belong 
				to their owners, maybe the stamp got transferred or burned or something. 
				It does this through the transaction history of that stamp, 
				and check if the id matches its current owner. 
				In this way, a stamp will be displayed only after it's verified.`,
				emoji: "✅",
			},
			{
				id: "a2",
				question: "Are there plans for On-Chain Authentication?",
				answer: `If you understood the above, you must have also
				understood that we only depend on On-Chain
				for verification of stored data but not for storing itself. 
				This is certainly not decentralised and does not match 
				with our open source spirit. So, yes, we do have plans for 
				On-Chain Authentication when a user stamps too. Except its even more
				complex and we certainly don't want to disclose it untill we officially
				make everything open-source. Do become a community member of ours to know more
				or sit tight untill then.
				`,
				emoji: "🔑",
			},
		],
	},
	{
		title: "Open Source Spirit.",
		list: [
			{
				id: "o1",
				question: "Why Open Source?",
				answer: `This is not just an idea that prints money, 
				but an idea that brings a revolution to the entire digital world.
				 It is imperative that we keep everything transparent and opensource, 
				 to make a collective effort to transform digital media.
				  If the content is not crypto stamped, it basically means 
				  it's not worth wasting your time. This is how we envision 
				  the digital future.`,
				emoji: "🎯",
			},
			{
				id: "o2",
				question: "How does it work?",
				answer: `To understand open source, you must see this from a creator's point of view.
				 So, Any creator who starts a new similar digital stamp collection must be registered 
				 on the open-source site (to be published) & follow the ECS standard while deploying their contract. 
				 This will not be too restrictive but just add a few functions that will be 
				 required for future stamp verification etc. Once accepted, any user that 
				 buys a digital stamp from that collection can officially start using that 
				 stamp to stamp on sites. Any site can also embed the +Stamp Icon to ask their 
				 viewers to stamp their site. Note that any code related to the cut-outs 
				 website but not plugin or embed will not 
				 be open-source.`,
				emoji: "🔐",
			},
			{
				id: "o3",
				question: "Why is the launch date for Open Source in Jan?",
				answer: `Time is required for us to test & improvise so that you don't have to. 
				Any non-partnered new stamp collection will have to wait until Jan 
				as some On-Chain functionality 
				will depend on the contract deployed.`,
				emoji: "📅",
			},
			{
				id: "o4",
				question: "Will there be an Open Source committee?",
				answer: `Yes. In order to finalize and steer the crypto-stamps concept in the right direction, 
				there are many decisions to be made, both development and administrative related.
				 The committee will be trying its best to make everything work without too many restrictions 
				 for creators while making sure any rule will not damage the best interests of the digital future. 
				 Get in touch on discord for more info`,
				emoji: "✍",
			},
		],
	},
	{
		title: "Future Plans.",
		list: [
			{
				id: "f2",
				question:
					"What's launchpad websites & how it adds into the plan?",
				answer: `To demonstrate the potentials of crypto-stamping,
				 A launchpad site will be launched with +STAMP embed button included.
				  The site will showcase the upcoming NFT Projects and enable other
				   stamp holders to stamp on these listings and be directly involved 
				   in whitelisting phase of these projects. 
				   They may also offer extra spots or other incentives. 
				   Just Imagine having a cutout stamped on the next big NFT project !!!`,
				emoji: "➡",
			},
			{
				id: "f3",
				question: "Long Term Goals?",
				answer: `We at Cut Outs always try to see long into the future. 
				So, we even made plans to keep a locked treasury that will stay 
				locked until it requires that we open it. 
				For example, there was a VR revolution spreading up with 
				some new tech inventions in the future, 
				To be able to upgrade all the sold Cut-Outs into their VR stamps, 
				the treasury can be unlocked. we will do anything and everything to stay 
				ahead in the game. As we said in our brand motto, Cut Outs will always 
				be a cut above the rest..`,
				emoji: "🎯",
			},
			{
				id: "f1",
				question: "What's in DAO & What's not?",
				answer: `There will be an open-source committee as mentioned above to decide on anything 
				related to Crypto Stamps in general like '+STAMP' embed, Plugin, 
				Crypto-Stamping Rules, etc. But not on anything related to Cut-Outs. 
				We believe large-level decentralization is not suited for collections like ours.
				Cut Outs are and will be valued for its prime utility and rarity, 
				and only second for its community.`,
				emoji: "📌",
			},
			{
				id: "f4",
				question: "Is there any Community Wallet?",
				answer: `Yes. Although the particular divisions have not been made yet,
				 it is decided to maintain a community wallet for 
				 community related events and only badge holders will get a 
				 voting right on these events.`,
				emoji: "💰",
			},
			{
				id: "f5",
				question: "Are we Financial advisors?",
				answer: `No, we are not! Consult your own legal and financial professionals,
				 as nothing written here should be considered professional advice. 
				 This is a decision only you can make.
				 A small reminder: Do not spend money you can't afford to lose.`,
				emoji: "⚠",
			},
			{
				id: "f6",
				question: "Will I be considered cool if I buy a Cutout?",
				answer: `This is history in its making. You're damn right you will!!`,
				emoji: "💯",
			},
		],
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

let p_faqs = faqs[1].list;
p_faqs.push(faqs[4].list[faqs[4].list.length - 1]);
export const presale_faqs = p_faqs;
export const roadmap_faqs = faqs[4].list;

export const roadmap_times = [
	{
		id: "i1",
		question: "October 20, 2021 - Idea & Inception.",
		answer: `The first cut out and by definition the first cryptostamp ever
		 was designed and posted on website. The concept of cryptostamping officially took
		 its roots, and we were planning and working on how to make this system authentic
		 and open source.`,
		emoji: "✅",
	},
	{
		id: "i2",
		question: "Oct 31, 2021 - Website Launch & Community building.",
		answer: `The website was deployed with all the 
		frontend and upto 11 stamps designed. The discord server and 
		the social accounts on twitter & reddit are also launched
		on Oct 31, 2021. The idea was shared and made public with articles 
		and social posts everywhere.`,
		emoji: "✅",
	},
	{
		id: "i21",
		question: "Nov 24, 2021 - Dapp Website Launch",
		answer: `With wallet connection, free giveaway badges, 
			and methods for direct investment on the main website, 
			the dapp was succesfully deployed and was up and running.`,
		emoji: "✅",
	},
	{
		id: "i3",
		question: "Dec 1, 2021 - Trailer Launch & Community build up",
		answer: `The official trailer for Cutouts will be launched to 
		simplify the process of understanding cryptostamping and the impact it can 
		create. Also begins phase 1 of marketing and community build up.`,
		emoji: "🔨",
	},
	{
		id: "i4",
		question: "Dec 15, 2021 - ECS standard & Embed Launch",
		answer: `The official standard for cyptostamping - ECS1 - Ethyrium Crypto Stamping Standard
		 will be developed and deployed on etherium mainnet. \n\n 
		 The Official Embed that people can use to integrate in 
		 their webpages will be launched and deployed.`,
		emoji: "🔨",
	},
	{
		id: "i6",
		question: "Dec 31, 2021 - Plugin Launch",
		answer: `Official plugin launch with which stamp holders can view all their stamps, 
		and also credibly stamp on any website url they prefer.`,
		emoji: "🔨",
	},
	{
		id: "i7",
		question: "Jan 2022 | Ether 2.0 => Presale for Whitelist Holders.",
		answer: `We will wait untill etherium 2.0 launch for the presale and 
		public auction events to begin where the gas fees would be 
		optimal and the demand is high for cut outs.`,
		emoji: "📅",
	},
];
