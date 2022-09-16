import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import "styles/ui_lib/bootstrap-grid.min.css";
import "styles/ui_lib/bootstrap-reboot.min.css";
import "styles/globals.scss";
import "styles/colors.scss";
import MetaHead from "components/global/metahead";
import PageLoader from "components/global/pageloader";
import Header from "components/global/header";
import Footer from "components/global/footer";
import { MOLARIS_APP_ID, MOLARIS_SERVER_URL } from "lib/data";
import { useAppDispatch, useAppSelector, store } from "lib/redux/store";
import { AppProps } from "next/dist/shared/lib/router/router";
import { MoralisProvider, useMoralis } from "react-moralis";

function Layout(props: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {isInitialized} = useMoralis();

  const isTopLoading = useAppSelector((state) => state.ui.isTopLoading);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      {props.header && <MetaHead header={props.header} />}
      <main className={`wrapper yellow`}>
        <Header
          dispatch={dispatch}
        />
        <PageLoader loading={isTopLoading} color="primary" />
        {isInitialized ? props.children : (props.header.moralis ? <div></div> : props.children)}
        {props.footer && <Footer />}
      </main>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider serverUrl={MOLARIS_SERVER_URL} appId={MOLARIS_APP_ID}>
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
