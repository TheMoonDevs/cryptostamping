/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "components/global/footer.module.scss";

function Footer({}) {
  return (
    <div className={`${styles.screen_two} ${styles.dark_bg}`}>
      <div className={`col-10 col-md-5 col-lg-4 col-xl-3`}>
        <img
          className={styles.square_image}
          src="/images/cryptostamping/screen_7.jpg"
          alt=""
        />
      </div>
      <div className={`col-12 col-lg-8`}>
        <div className={`d-block ml-4 ml-md-0 mt-3 mt-md-5 mt-lg-0`}>
          <div
            className={`d-flex flex-wrap align-items-start justify-content-center`}
          >
            <div className={`${styles.menu} col-6 col-md-3`}>
              <h1 className={styles.headline}>About Project</h1>
              <Link href="/how-it-works">
                <a className={`diva ${styles.link}`}>How it Works</a>
              </Link>
              <Link href="/intro">
                <a className={`diva ${styles.link}`}>Use Cases</a>
              </Link>
              <Link href="/roadmap">
                <a className={`diva ${styles.link}`}>Roadmap</a>
              </Link>
              <Link href="/about">
                <a className={`diva ${styles.link}`}>Team & FAQ`&aps;s</a>
              </Link>
            </div>
            <div className={`${styles.menu} col-6 col-md-3`}>
              <h1 className={styles.headline}>Products</h1>

              <a
                href="https://chrome.google.com/webstore/detail/cryptostamping/dbpfclpmhfidhfbcgiaejhiebmhdgkgd"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                Browser Extension
              </a>
              <a
                href="https://embed.cryptostamping.org"
                className={`diva ${styles.link}`}
              >
                Embed Widget
              </a>
              <Link href="/scan">
                <a className={`diva ${styles.link}`}>Stamp Scanner</a>
              </Link>
            </div>
            <div className={`${styles.menu} col-6 col-md-3`}>
              <h1 className={styles.headline}>For Creators</h1>
              <Link href="/get-listed">
                <a className={`diva ${styles.link}`}>Get Listed</a>
              </Link>
              <Link href="/dev-docs">
                <a className={`diva ${styles.link}`}>Documentation</a>
              </Link>
              <Link href="/guide">
                <a className={`diva ${styles.link}`}>Guidelines</a>
              </Link>
            </div>
            <div className={`${styles.menu} col-6 col-md-3`}>
              <h1 className={styles.headline}>Social Links</h1>
              <a
                href="https://gitcoin.co/grants/4292/cryptostamping"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                <span
                  className={`${styles.icon} ${styles.visible} ${styles.icon_gitcoin}`}
                />
                Fund Project
              </a>
              <a
                href="https://github.com/cryptostamping"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                <span
                  className={`${styles.icon} ${styles.visible} ${styles.icon_github}`}
                />
                Contribute
              </a>
              <a
                href="https://reddit.com/r/cryptostamping"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                <span
                  className={`${styles.icon} ${styles.visible} ${styles.icon_reddit}`}
                />
                Think Tank
              </a>
              <a
                href="https://twitter.com/cutoutsnft"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                <span
                  className={`${styles.icon} ${styles.visible} ${styles.icon_twitter}`}
                />
                Updates
              </a>
              <a
                href="https://discord.gg/XNNZ96b5V3"
                target="_blank"
                rel="noreferrer"
                className={`diva ${styles.link}`}
              >
                <span
                  className={`${styles.icon} ${styles.visible} ${styles.icon_discord}`}
                />
                Join & Talk.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
