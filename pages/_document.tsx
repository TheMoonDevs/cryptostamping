/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

// import { GA_ADSENSE_ID } from "lib/data";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// <script data-ad-client="ca-pub-5580766488859840" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
// <script>0</script>
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

/* useEffect(()=>{
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },[]) */

/*
        <Link href="/feedback">
          <a className={`${styles.navigation_link} ${router.route === "/feedback" ? styles.active : ""}`}>
          <img src="/icons/sidebar_feedback.svg" alt="" />
          Send Feedback</a>
        </Link>
*/
export default MyDocument;
