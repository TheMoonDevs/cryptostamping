const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "styles/variables.scss";`,
      },
      eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      env: {
        NEXT_PUBLIC_MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_TESTNET_ID,
        NEXT_PUBLIC_MORALIS_SERVER_URL:
          process.env.NEXT_PUBLIC_MORALIS_TESTNET_URL,
      },
    };
  }
  return {
    async redirects() {
      return [
        {
          source: "/mint",
          destination: "/404",
          permanent: true,
        },
        {
          source: "/cutout/:path*",
          destination: "/?id=:path*",
          permanent: false,
        },
      ];
    },
    target: "serverless",
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
      prependData: `@import "styles/variables.scss";`,
    },
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
      NEXT_PUBLIC_MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_PROD_ID,
      NEXT_PUBLIC_MORALIS_SERVER_URL:
        process.env.NEXT_PUBLIC_MORALIS_PROD_URL,
    },
  };
};
