/* eslint-disable react/destructuring-assignment */
import { memo, useState } from "react";

import Popup from "reactjs-popup";
import styles from "components/home/itemownerpopup.module.scss";
import progress_styles from "styles/common/progress.module.scss";

import { prettyPrintDate } from "lib/utils";

// eslint-disable-next-line react/display-name
const ItemOwnerPopup = memo((props) => {
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    console.log("fetching..");
    console.log(props.item);
    setLoading(true);
    props.item= {
      contract: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
      token_id: "2324"
    }
    const options = {
      address: props.item.contract,
      token_id:
        props.item.token_id,
      chain: "eth",
      order: "block_timestamp.DESC",
      limit: "10"
    };
    setItemDetails({});
    let tokenIdOwners;
    try{
      tokenIdOwners = await props.Moralis.Web3API.token.getWalletTokenIdTransfers(options);
    }
    catch (e) {
      return;
    }
    consol.log(tokenIdOwners.result);
    if(tokenIdOwners && tokenIdOwners.result.length > 0){
      const value = tokenIdOwners.result[0].value;
      const tokenValue = props.Moralis.Units.FromWei(value);
      console.log(tokenValue);
      const ownerAddress = tokenIdOwners.result[0].to_address;
      console.log(tokenIdOwners.result[0]);
      setItemDetails({
        value: tokenValue,
        timestamp: tokenIdOwners.result[0].block_timestamp
      })
    }
    setLoading(false);
    console.log(tokenIdOwners);
  };

  return (
    <Popup
      key={props.key}
      arrow={false}
      onOpen={refreshData}
      mouseEnterDelay={props.delay ? props.delay : 500}
      trigger={() => props.trigger}
      position={props.position ? props.position : "top left"}
      on={props.on ? props.on : ["hover", "focus"]}
    >
      {(close) => (
        <div className={styles.popup_tooltip}>
          {loading &&
          <div className={styles.spinner_container}>
            <span className={`${progress_styles.progress_spinner} ${styles.blue_spinner} ${progress_styles.active}`} />
          </div>
          }
          {!loading &&
          <div className={styles.info_container}>
            <p className={styles.item_price}>
            <span className={styles.eth_icon}></span>
            {itemDetails.value}
            <span className={styles.item_tag}>&nbsp; ETH</span>
            </p>
            <p className={`${styles.item_time} ${styles.mini}`}>Last Trade on {prettyPrintDate(itemDetails.timestamp)}</p>
            <p className={styles.item_time}></p>
          </div>
          }
          <div className={styles.popup_details}>
            <a href={props.item.link}
            target="_blank"
            rel="noreferrer"
             className={styles.item_link}>
              View on OpenSea.
            </a>
          </div>
          {props.children}
        </div>
      )}
    </Popup>
  );
});

export default ItemOwnerPopup;
