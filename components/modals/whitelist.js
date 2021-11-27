import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

import { FRONTEND_BASE_URL } from "lib/data";

import sidebar from "components/modals/sidebar.module.scss";
import styles from "components/modals/whitelist.module.scss";

import { DATE_INFO } from "lib/data";
import { setLoggedIn } from "lib/redux/features/userSlice";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function WhitelistSidebar({}) {
  // const currentUser = Moralis.User.current();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const { Moralis, user } = useMoralis();

  const isWhitelistOpen = useSelector((state) => state.ui.isWhitelistOpen);

  const hide = () => {
    dispatch(setSidebarOpen({ type: "Whitelist", open: false }));
  };

  return (
    <div id="outside_box" className={`${sidebar.container}`}>
      <div
        className={`${sidebar.sidebar} ${sidebar.fill} ${sidebar.left} ${
          isWhitelistOpen && sidebar.active
        }`}
      >
        <div className={styles.container}>
          <h1 className={styles.soon}>coming soon...</h1>
          <div className={`${sidebar.icon_btn} ${styles.icon_btn}`} onClick={hide}>
              <span className={sidebar.close_icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhitelistSidebar;

/* {user?.get("username").length > 15
                ? "Random"
                : user?.get("username")}
                */
