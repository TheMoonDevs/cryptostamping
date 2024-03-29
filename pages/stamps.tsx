/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useContext } from "react";
import Tooltip from "components/modals/tooltip";
import cardstyles from "styles/common/card.module.scss";
import card2styles from "styles/common/card2.module.scss";
import styles from "styles/pages/stamps.module.scss";
import {
  APP_TITLE,
  FRONTEND_BASE_URL,
  IN_DEV_ENV,
  stampCollectionCards,
  supportedMainChains,
  supportedChains,
  availableMainChains,
  availableTestChains,
  getChainObject,
  isTestnet,
  ChainProps,
} from "lib/data";
import { MoralisQuery, MoralisQueryParams} from "lib/moralis";
import { useAppDispatch, useAppSelector } from "lib/redux/store";
import { useMoralis } from "react-moralis"
import { fromWei } from "web3-utils";


export default function StampsPage({}) {
  const {Moralis, isInitialized} = useMoralis();
  const dispatch = useAppDispatch();
  const listRef = useRef();

  const filters: ChainProps[] = [
    { symbol: "all", name: "ALL NFTs", logo: "all" },
    ...availableMainChains,
    ...availableTestChains,
  ];
  const sorts = [
    { type: "createdAt", order: true, id: "created_asc", name: "Oldest" },
    {
      type: "avg_price",
      order: true,
      id: "price_desc",
      name: "Price High",
    },
    {
      type: "avg_price",
      order: false,
      id: "price_asc",
      name: "Price Low",
    },
    { type: "createdAt", order: false, id: "created_desc", name: "Latest" },
  ];

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [stampsets, setStampsets] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
  const [currentSort, setCurrentSort] = useState(sorts[0]);
  const [CollectionCount, setCollectionCount] = useState(1);

  useEffect(() => {
	if(!isInitialized) return;
    //LOAD COLLECTIONS
    let condition: MoralisQueryParams = {
      className: "Stampset",
      equalTo: [
        { name: "chain", value: currentFilter?.symbol },
        { name: "enabled", value: true },
      ],
      sort: {
        name: currentSort.type,
        order: currentSort.order ? "descending" : "ascending",
      },
      limit: 30,
      exec: "find",
    };
    if (currentFilter.symbol === "all") {
      condition.containedIn = [{ name: "chain", value: supportedChains }];
      condition.equalTo = [{ name: "enabled", value: true }];
    }
    MoralisQuery(Moralis, {
      ...condition,
      exec: "count",
      limit: null,
      sort: null,
    })
      .then((response) => {
        setCollectionCount(response);
      })
      .catch((error) => {});
    MoralisQuery(Moralis, condition)
      .then((response) => {
        setStampsets(Array.from(response, (x: any) => x?.toJSON()));
      })
      .catch((error) => {});
  }, [isInitialized, currentFilter, currentSort, Moralis]);

  const printPrice = (_moralis, _price) => {
    return parseFloat(fromWei(_price?.toString()))?.toFixed(3).toString();
  };

  const getLogoForSymbol = (_symbol) => {
    for (const chain of filters) {
      if (chain.symbol === _symbol) return chain.logo;
    }
    return "all";
  };

  return (
    <div className={`container page_wrapper`}>
      <div className={`${styles.header}`}>
        <div className={styles.header_box}>
          <h1>NFT Collections </h1>
          <div className="d-flex align-items-center">
            <p className={styles.subtitle}>
              Explore NFTs that can add value to Internet.
            </p>
            <div className={`${card2styles.address}`}>
              {" "}
              {CollectionCount} Collections
            </div>
          </div>
        </div>
        <div className={styles.filters_box}>
          <Tooltip
            delay={0}
            position={"bottom center"}
            on={["click"]}
            popupClass={styles.popup_box}
            trigger={
              <div>
                <a className={`${styles.btn_filter}`}>
                  {currentFilter.name}
                  <span className={`${styles.icon_arrow}`} />
                </a>
              </div>
            }
          >
            <div className={styles.vert_list}>
              {filters.map((filter) => {
                return (
                  <a
                    onClick={() => {
                      setCurrentFilter(filter);
                    }}
                    key={filter.symbol}
                    className={`diva ${styles.hover_color} ${
                      currentFilter.symbol === filter.symbol && styles.active
                    }`}
                  >
                    {filter.name}
                    <span
                      className={`${styles.tab_icon} ${filter.logo} ${
                        getChainObject(filter.chainId, "testnet") && styles.grey
                      }`}
                    ></span>
                  </a>
                );
              })}
            </div>
          </Tooltip>
        </div>
        <div className={styles.filters_box}>
          <Tooltip
            delay={0}
            position={"bottom center"}
            on={["click"]}
            popupClass={styles.popup_box}
            trigger={
              <div>
                <a className={`${styles.btn_filter}`}>
                  Sort by {currentSort.name}
                  <span className={`${styles.icon_arrow}`} />
                </a>
              </div>
            }
          >
            <div className={styles.vert_list}>
              {sorts.map((sort) => {
                return (
                  <a
                    onClick={() => {
                      setCurrentSort(sort);
                    }}
                    key={sort.id}
                    className={`diva ${styles.hover_color} ${
                      currentSort.id === sort.id && styles.active
                    }`}
                  >
                    {sort.name}
                    <span
                      className={`${styles.tab_icon} ${sort.id} ${styles.grey}`}
                    ></span>
                  </a>
                );
              })}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={`${styles.list_container}`}>
        {stampsets.map((stampset) => {
          return (
            <div
              key={stampset?.title}
              className={`col-12 xol-md-6 col-lg-4 px-0`}
            >
              <div className={styles.card_container}>
                <a
                  className={"diva"}
                  href={`/scan/${stampset.chain}/${stampset.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.card}>
                    <img
                      className={styles.banner}
                      src={stampset.images_meta?.feature}
                      alt=""
                    />
                    {!supportedMainChains.includes(stampset.chain) && (
                      <div className={styles.card_tooltip}>
                        <p>THIS IS A TESTNET</p>
                      </div>
                    )}
                    <div className={styles.card_header}>
                      <div className={styles.card_stats}>
                        <p className={styles.number}>{stampset.max_supply}</p>
                        <p className={styles.subtag}>ITEMS</p>
                      </div>
                      <div className={"d-vert-center"}>
                        <img
                          className={styles.logo}
                          src={stampset.images_meta?.logo}
                          alt=""
                        />
                        <h4>
                          {stampset?.title}
                          {stampset.owner_meta?.verified && (
                            <span
                              className={`${styles.inline_icon} ${styles.icon_verified}`}
                            />
                          )}
                        </h4>
                      </div>
                      <div className={styles.card_stats}>
                        <p className={styles.number}>{stampset.max_rarity}</p>
                        <p className={styles.subtag}>RARITY</p>
                      </div>
                    </div>
                    <p className={styles.description}>{stampset.description}</p>
                    <div className={"divider mt-1"}></div>
                    <div className={styles.card_footer}>
                      <div className="d-flex align-items-center">
                        <span
                          className={`${styles.tab_icon} ${getLogoForSymbol(
                            stampset.chain
                          )} mr-2`}
                        ></span>
                        <p className={styles.pricetag}>
                          {printPrice(
                            Moralis,
                            stampset.avg_price || stampset.mint_price
                          )}{" "}
                          ETH
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        {!isTestnet(stampset.chain) && (
                          <a
                            className={"diva"}
                            href={`https://opensea.io/collection/${stampset.token_address}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span
                              className={`${styles.tab_icon} opensea mx-1`}
                            ></span>
                          </a>
                        )}
                        {stampset.links_meta?.twitter && (
                          <a
                            className={"diva"}
                            href={`https://twitter.com/@${stampset.links_meta?.twitter}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span
                              className={`${styles.tab_icon} twitter hover_op mx-1`}
                            ></span>
                          </a>
                        )}
                        {stampset.links_meta?.website && (
                          <a
                            className={"diva"}
                            href={`${stampset.links_meta?.website}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span
                              className={`${styles.tab_icon} new_tab hover_op mx-1`}
                            ></span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Static Site Genration */
export async function getStaticProps() {
  /* meta tags that need to be passed to the header */
  const header = {
    title: `Explore Crypto Stamps / Stamp Enabled NFTs.`,
    description: `Explore & Buy NFT Stamps that are listed on Cryptostamping, & Enabled for stamping on websites via browser extension.`,
    url: `${FRONTEND_BASE_URL}/stamps`,
    robots: "index,follow",
  };

  return {
    props: {
      header,
      header_type: "normal",
    },
  };
}
