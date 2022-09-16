import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import "styles/ui_lib/bootstrap-grid.min.css";
import "styles/ui_lib/bootstrap-reboot.min.css";
import "styles/globals.scss";
import "styles/colors.scss";

import MetaHead from "components/global/metahead";
import PageLoader from "components/global/pageloader";
import Header from "components/global/header";
import Footer from "components/global/footer";

import { useSize } from "lib/img_helper";
import { MOLARIS_APP_ID, MOLARIS_SERVER_URL } from "lib/data";

import { useAppDispatch, useAppSelector, store } from "lib/redux/store";

import { setTopLoading } from "lib/redux/features/uiSlice";
import { setLoggedIn } from "lib/redux/features/userSlice";
import { AppProps } from "next/dist/shared/lib/router/router";

function Layout(props: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        {props.children}
        {props.footer && <Footer />}
      </main>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
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
