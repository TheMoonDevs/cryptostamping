import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { MoralisProvider } from "react-moralis";
import { useMoralis } from "react-moralis";

import "styles/ui_lib/bootstrap-grid.min.css";
import "styles/ui_lib/bootstrap-reboot.min.css";
import "styles/globals.scss";
import "styles/colors.scss";

import MetaHead from "components/global/metahead";
import PageLoader from "components/global/pageloader";

import { useSize } from "lib/img_helper";
import { MOLARIS_APP_ID, MOLARIS_SERVER_URL } from "lib/data";

import store from "lib/redux/store";
import { storeValue, retrieveValue } from "lib/browser_sync";

import { setTopLoading } from "lib/redux/features/uiSlice";
import { setLoggedIn } from "lib/redux/features/userSlice";

function Layout(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const isTopLoading = useSelector((state) => state.ui.isTopLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const {
    Moralis,
    authenticate,
    logout,
    isAuthenticated,
    isUnauthenticated,
    isInitialized,
    user,
  } = useMoralis();

  useEffect(() => {
    if(isLoggedIn && !window.ethereum?.selectedAddress){
      logout();
      return;
    }
    const handleDisconnect = () => {
      if (isLoggedIn) {
        logout();
      }
    };
    window?.ethereum?.on("disconnect", handleDisconnect);
    return () => {
      window?.ethereum?.removeListener("disconnect", handleDisconnect);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    if (!user && localStorage.getItem("default_account") == null) {
      return;
    }
    const handleAccounts = (accounts) => {
      if (accounts.length <= 0) return;
      if (user && user.attributes.accounts.includes(accounts[0])) {
        return;
      }
      const default_account = localStorage.getItem("default_account");
      if (default_account && accounts[0] === default_account) {
        return;
      }
      if (!user) {
        alert(
          "Please signin with your default account before you can connect this account!"
        );
        return;
      }
    };
    window.ethereum.removeListener("accountsChanged", handleAccounts);
    window.ethereum.on("accountsChanged", handleAccounts);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccounts);
    };
  }, [user]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const handleAccounts = (accounts) => {
      if (!window.ethereum.selectedAddress) {
        logout();
        return;
      }
      localStorage.setItem("selected_address", window.ethereum.selectedAddress);
      if (!isLoggedIn) return;
      if (user && user.attributes.accounts.includes(accounts[0])) {
        return;
      }
      if (window.confirm("Confirm to connect this account too?")) {
        Moralis.link(window.ethereum.selectedAddress)
          .then(() => {
            dispatch(setTopLoading(false));
          })
          .catch(() => {
            dispatch(setTopLoading(false));
          });
      } else {
        return;
      }
    };
    window.ethereum.removeListener("accountsChanged", handleAccounts);
    window.ethereum.on("accountsChanged", handleAccounts);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccounts);
    };
  }, [isLoggedIn, user]);

  return (
    <div>
      {props.header && <MetaHead header={props.header} />}
      <main className={`wrapper yellow`}>
        <PageLoader loading={isTopLoading} color="primary" />
        {isInitialized && React.cloneElement(props.children, {})}
      </main>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={MOLARIS_APP_ID} serverUrl={MOLARIS_SERVER_URL}>
      <Provider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MoralisProvider>
  );
}

/*
// Webvitals for page-speed & performance.
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric.name);
    console.log(metric);
  }
}
*/

export default MyApp;
