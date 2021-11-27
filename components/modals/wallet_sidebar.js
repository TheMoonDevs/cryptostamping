import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
  useMoralisWeb3Api,
} from "react-moralis";

import { FRONTEND_BASE_URL } from "lib/data";
import { useWeb3 } from "lib/web3";
import { useInputText } from "lib/form";
import { getSimple } from "lib/api";

import Tooltip from "components/modals/tooltip";

import progress_styles from "styles/common/progress.module.scss";
import styles from "components/modals/wallet_sidebar.module.scss";
import sidebar from "components/modals/sidebar.module.scss";

import { setLoggedIn } from "lib/redux/features/userSlice";
import {
  setSidebarOpen,
  setTopLoading,
  setBadgeNFTs,
} from "lib/redux/features/uiSlice";

const GiveawayTab = ({ isLoggedIn }) => {
  const { Moralis, user } = useMoralis();
  const { web3, signMessage } = useWeb3(isLoggedIn);
  const { value: inputURL, bind: bindInputURL } = useInputText();

  const { data: giveawayData, isLoading: giveawayLoading } = useMoralisQuery(
    "Giveaway",
    (query) => query.greaterThan("amount", 0).descending("createdAt").limit(5)
  );

  const [phase, setPhase] = useState("listout");
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState(null);
  const [giveaway, setGiveaway] = useState(null);
  const [savingClaim, setSavingClaim] = useState(false);
  const { isSaving, error, save: saveClaim } = useNewMoralisObject("Claim");

  const getConnectionMessage = (_date, _connection) => {
    return `You connected your wallet on ${_date} as the ${_connection}${
      _connection === 1 ? "st" : ""
    }${_connection === 2 ? "nd" : ""}${_connection === 3 ? "rd" : ""}${
      _connection > 3 ? "th" : ""
    } user.`;
  };

  const clickClaimSign = () => {
    if (!message.claimable) {
      setPhase("listout");
      return;
    }
    if (
      giveaway.verification_id !== "LEAP_TFWC" &&
      (!inputURL || inputURL?.length <= 0)
    ) {
      return alert("please fill in the url link to your post.");
    }
    if (message.btn_text === "Claim Badge.") {
      console.log(inputURL);
      const signing_address = localStorage.getItem("selected_address");
      const sign_message = {
        message: "Claim " + giveaway.title,
        proof:
          giveaway.verification_id === "LEAP_TFWC"
            ? getConnectionMessage(
                giveaway.createdAt,
                giveaway.wallet_connection
              )
            : inputURL,
        badge_id: giveaway.verification_id,
        badge_no:
          giveaway.verification_id === "LEAP_TFWC"
            ? giveaway.wallet_connection
            : giveaway.taken + 1,
        badge_type: giveaway.type_details[0],
        badge_benefits: giveaway.benefits,
        signing_address: signing_address,
      };
      setSavingClaim(true);
      signMessage(sign_message, { name: "Claim Badge." }, signing_address)
        .then((result) => {
          sign_message.sign_data = result;
          return saveClaim(sign_message);
        })
        .then(() => {
          setSavingClaim(false);
          setMessage({
            name: "Claimed.",
            message: `The NFT Badge will be airdropped to your wallet in 6-12 hours. Thankyou for your patience.`,
            btn_text: "Go Back.",
            claimable: false,
          });
        })
        .catch((error) => {
          setSavingClaim(false);
        });
    }
  };

  const claimGiveaway = (_giveaway) => {
    if (_giveaway.attributes.verification_id === "LEAP_TFWC") {
      setPhase("check");
      setChecking(true);
      setMessage(null);
      const query = new Moralis.Query(Moralis.Object.extend("User"));
      query.descending("createdAt");
      query
        .find()
        .then((response) => {
          const new_giveaway = { ..._giveaway.attributes };
          console.log(new_giveaway);
          new_giveaway.createdAt = response[0].attributes.createdAt;
          new_giveaway.wallet_connection =
            response[0].attributes.wallet_connection;
          setGiveaway(new_giveaway);
          setChecking(false);
          if (response[0].attributes.wallet_connection < 99) {
            setMessage({
              name: "Congratulations ! You're eligible.",
              message: `${getConnectionMessage(
                response[0].attributes.createdAt,
                response[0].attributes.wallet_connection
              )} The claim will not require any gas fees,
               and the NFT will be airdropped to your wallet in 6-12 hours.`,
              btn_text: "Claim Badge.",
              claimable: true,
            });
          } else {
            setMessage({
              name: "Sorry ! You're ineligible.",
              message: `${getConnectionMessage(
                response[0].attributes.createdAt,
                response[0].attributes.wallet_connection
              )} Thankyou for your interest, 
              please check other giveaways requirements that will let you participate.`,
              btn_text: "Go Back.",
              claimable: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setChecking(false);
          setMessage({
            name: "There was an error.",
            message: `Please check your internet connection or try refreshing the page.`,
            btn_text: "Go Back.",
            claimable: false,
          });
        });
    } else {
      const new_giveaway = { ..._giveaway.attributes };
      setGiveaway(new_giveaway);
      setPhase("badge_claim");
      if (_giveaway.attributes.taken < _giveaway.attributes.amount) {
        setMessage({
          name: `${
            _giveaway.attributes?.amount - _giveaway.attributes.taken
          } badges left.`,
          message: `${_giveaway.attributes?.claim_requirements?.join("\n\n")}`,
          claim_info: `The claim will not require any gas fees,
               and the NFT will be airdropped to your 
               wallet in 6-12 hours.`,
          btn_text: "Claim Badge.",
          cover_image: _giveaway.attributes?.cover_image,
          claimable: true,
        });
      } else {
        setMessage({
          name: "All Badges are claimed.",
          message: `Thankyou for your interest, 
              please check other badge requirements that will let you earn 
              a free front seat of this revolution.`,
          btn_text: "Go Back.",
          claimable: false,
        });
      }
    }
  };

  if (phase === "check") {
    return (
      <div className={styles.giveaway_box}>
        <p>*Please wait a moment while we are checking your eligibility.</p>
        {checking && (
          <div className="d-flex justify-content-center">
            <span
              className={`${progress_styles.progress_spinner} ${progress_styles.big} ${progress_styles.green} ${progress_styles.active}`}
            />
          </div>
        )}
        {message && (
          <div className={styles.message_box}>
            <h1>{message.name}</h1>
            <p>{message.message}</p>
            <div
              onClick={clickClaimSign}
              className={`${styles.giveaway_link} ${styles.big} ${
                message.claimable && styles.green
              }`}
            >
              {savingClaim && (
                <span
                  className={`${progress_styles.progress_spinner} ${progress_styles.white} ${styles.spinner_in_btn} ${progress_styles.active}`}
                />
              )}
              {message.btn_text}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === "badge_claim") {
    return (
      <div className={styles.giveaway_box}>
        <p>*Badge claiming will take 6-12 hours depending on the queue.</p>
        {checking && (
          <div className="d-flex justify-content-center">
            <span
              className={`${progress_styles.progress_spinner} ${progress_styles.big} ${progress_styles.green} ${progress_styles.active}`}
            />
          </div>
        )}
        {message && (
          <div className={styles.message_box}>
            {message.cover_image && (
              <img
                src={message.cover_image}
                className={styles.cover_image}
                alt=""
              />
            )}
            <h1>{message.name}</h1>
            <p>{message.message}</p>
            <div className="d-flex align-items-center">
              {message.claimable && (
                <div className={styles.input_btn}>
                  <span className={styles.input_icon} />
                  <input
                    className={`${styles.input_text}`}
                    type="text"
                    autoComplete="off"
                    placeholder={"URL to your post."}
                    {...bindInputURL}
                  />
                </div>
              )}
              <div
                onClick={clickClaimSign}
                className={`${styles.giveaway_link} ${styles.big} ${
                  message.claimable && styles.green
                }`}
              >
                {savingClaim && (
                  <span
                    className={`${progress_styles.progress_spinner} ${progress_styles.white} ${styles.spinner_in_btn} ${progress_styles.active}`}
                  />
                )}
                {message.btn_text}
              </div>
            </div>
            <p className={styles.smalltext}>{message.claim_info}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.giveaway_box}>
      <p>
        *All giveaways will be direct airdops incurring no gas transaction fees.
      </p>
      {giveawayData.length <= 0 && (
        <div className="d-flex justify-content-center">
          <span
            className={`${progress_styles.progress_spinner} ${progress_styles.green} ${progress_styles.big} ${progress_styles.active}`}
          />
        </div>
      )}
      <div className={styles.giveaway_listbox}>
        {giveawayData.map((giveaway) => {
          return (
            <div className={styles.giveaway_item} key={giveaway.id}>
              <img
                className={styles.giveaway_image}
                src={giveaway.attributes.image_url}
                alt=""
              />
              <div className={styles.giveaway_info}>
                <h2>{giveaway.attributes.title}</h2>
                <p>
                  <span className={styles.giveaway_amount}>
                    {giveaway.attributes.amount - giveaway.attributes.taken} /{" "}
                    {giveaway.attributes.amount}
                  </span>
                  {giveaway.attributes.description}
                </p>
                <div className="d-flex">
                  <Tooltip
                    delay={0}
                    position={"top center"}
                    description={giveaway.attributes.type_details.join("\n\n")}
                    trigger={
                      <div className={styles.giveaway_link}>
                        {giveaway.attributes.type}
                      </div>
                    }
                  />
                  <Tooltip
                    delay={0}
                    position={"top center"}
                    description={giveaway.attributes.benefits.join("\n\n")}
                    trigger={
                      <div className={styles.giveaway_link}>BENEFITS</div>
                    }
                  />
                  <div
                    onClick={() => {
                      claimGiveaway(giveaway);
                    }}
                    className={styles.end_button}
                  >
                    <Tooltip
                      delay={500}
                      position={"top center"}
                      description={
                        "Claiming will require no transaction fees, only a verfication signing from your account."
                      }
                      trigger={
                        <div
                          className={`${styles.giveaway_link} ${styles.green}`}
                        >
                          CLAIM {giveaway.attributes.type}
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BadgesTab = ({ isLoggedIn }) => {
  const { Moralis, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const dispatch = useDispatch();
  const badges = useSelector((state) => state.ui.badgeNFTs);

  const [isNFTsLoading, setNFTsLoading] = useState(false);
  const [badge, setBadge] = useState(null);

  const loadNFTs = () => {
    dispatch(setBadgeNFTs([]));
    const options = {
      chain: "matic",
      address: window.ethereum?.selectedAddress,
      token_address: "0x8b66DAf6D4742dd6b8C7e081b19cfdd5b1e1856b",
    };
    setNFTsLoading(true);
    Moralis.Web3API.account
      .getNFTsForContract(options)
      .then((response) => {
        var promA = [];
        for (var i = 0; i < response.result.length; i++) {
          promA.push(getSimple(response.result[i].token_uri));
        }
        if (promA.length <= 0) return [];
        else return Promise.all(promA);
      })
      .then((response) => {
        setNFTsLoading(false);
        const nftBadges = [];
        for (var i = 0; i < response.length; i++) {
          nftBadges.push(response[i].data);
        }
        dispatch(setBadgeNFTs(nftBadges));
      })
      .catch((err) => {
        setNFTsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (badges.length <= 0) loadNFTs();
  }, []);

  if (badge) {
    return (
      <div
        className={`${styles.badge_item} ${styles.small}`}
        key={badge.signature}
      >
        <div onClick={() => {setBadge(null);}}
        className={styles.giveaway_link}>GO BACK</div>
        <div className="d-flex my-4">
          <img
            className={`${styles.badge_image} ${styles.small}`}
            src={badge.image}
            alt=""
          />
          <div className="d-block">
            <h1>{badge.name}</h1>
            <p>{badge.description}</p>
          </div>
        </div>
        {badge.benefits.map((benefit) => {
          return (
            <h3 className={`my-3 ${styles.badge_benefit}`}>
              <b>- {benefit}</b>
            </h3>
          );
        })}
        <p className={styles.smalltext}>
        The method or procedure to avail the benefits provided by this badge will
         be updated as we grow. spread the word, a storm is rising.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.giveaway_box}>
      <p>
        *All badges & cards work as special permits depending on the benefits
        attached. &nbsp;
        <a className={styles.refresh_link} onClick={loadNFTs}>
          Refresh.
        </a>
      </p>
      {isNFTsLoading && (
        <div className="d-flex justify-content-center">
          <span
            className={`${progress_styles.progress_spinner} ${progress_styles.blue} ${progress_styles.big} ${progress_styles.active}`}
          />
        </div>
      )}
      <div className={styles.badge_container}>
        {badges.map((badge) => {
          return (
            <div
              onClick={() => {
                setBadge(badge);
              }}
              className={styles.badge_item}
              key={badge.signature}
            >
              <img className={styles.badge_image} src={badge.image} alt="" />
              <h5>{badge.name}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function WalletSidebar({}) {
  // const currentUser = Moralis.User.current();
  const dispatch = useDispatch();
  const { Moralis, user, logout } = useMoralis();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isWalletOpen = useSelector((state) => state.ui.isWalletOpen);

  const hide = () => {
    dispatch(setSidebarOpen({ type: "Wallet", open: false }));
  };

  const showUserOnMarket = () => {
    dispatch(setSidebarOpen({ type: "Market", open: true }));
  };

  const logOutUser = () => {
    logout();
    dispatch(setLoggedIn(false));
    dispatch(setSidebarOpen({ type: "Wallet", open: false }));
  };

  const Tabs = [
    "My NFT Stamps",
    "Free Giveaways",
    "Cut Outs Badges",
    "Transactions",
  ];
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);

  return (
    <div id="outside_box" className={`${sidebar.container}`}>
      <div className={`${sidebar.sidebar} ${isWalletOpen && sidebar.active}`}>
        <div className={styles.header}>
          <div className={styles.header_start}>
            <div className={` ${styles.username_btn}`} onClick={logOutUser}>
              Logout
            </div>
          </div>
          <div className={styles.header_middle}>
            <span className={styles.check_icon} />
            <p className={`${styles.text} ${styles.smhide}`}>CONNECTED TO </p>
            {user &&
              user
                ?.get("accounts")
                .slice(0, 2)
                .map((account) => {
                  return (
                    <div
                      key={account}
                      className={`${styles.text} ${styles.btn}`}
                    >
                      {account.substr(0, 8)}..
                    </div>
                  );
                })}
          </div>
          <div className={styles.header_end}>
            <div className={sidebar.icon_btn} onClick={hide}>
              <span className={sidebar.close_icon} />
            </div>
          </div>
        </div>
        <div className={styles.display_box}>
          <div className={styles.tabs_list}>
            {Tabs.map((tab) => {
              return (
                <div
                  onClick={() => setSelectedTab(tab)}
                  className={`${styles.tab_item} ${
                    tab === selectedTab && styles.active
                  } ${tab === Tabs[3] && styles.green} ${
                    tab === Tabs[2] && styles.skyblue
                  } ${tab === Tabs[1] && styles.green} ${
                    tab === Tabs[0] && styles.yellow
                  }`}
                  key={tab}
                >
                  {tab}
                </div>
              );
            })}
          </div>
          {selectedTab === Tabs[0] && (
            <div className={styles.error_box}>
              <img
                src="/icons/center_focus.svg"
                alt=""
                className={styles.error_image}
              />
              <h1>No Stamps yet.</h1>
              <p>
                The Integrations for Stamping system is still in the building
                phase. you can check regular updates from team by joining &nbsp;
                <a
                  href="https://discord.gg/XNNZ96b5V3"
                  rel="noreferrer"
                  target="_blank"
                >
                  discord
                </a>
              </p>
            </div>
          )}
          {selectedTab === Tabs[1] && <GiveawayTab isLoggedIn={isLoggedIn} />}
          {selectedTab === Tabs[2] && <BadgesTab isLoggedIn={isLoggedIn} />}
          {selectedTab === Tabs[3] && (
            <div className={styles.giveaway_box}>
              <p>
                *Here will be your proof of payments for investment, auction
                bidding, direct sale, etc..
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletSidebar;

/* {user?.get("username").length > 15
                ? "Random"
                : user?.get("username")}
                */
