import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { FRONTEND_BASE_URL } from "lib/data";

function MetaHead({ header }) {
  const router = useRouter();
  const [title, setTitle] = useState(header.title);

  const printTitle = (_title, url, query) => {
    /*
    if (url === `${FRONTEND_BASE_URL}/search`) {
      return `${query}${query ? " - " : ""}${_title}`;
    }
    */
    return `${_title}`;
  };

  /* for client side title setup, example for search */
  useEffect(() => {
    setTitle(printTitle(header.title, header.url, router.query.q));
  }, [header, router.query]);

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content={header.description} />
      <link rel="icon" href="/logo_favicon.svg" type="image/svg" />
      {header.title && <meta property="og:title" content={title} />}
      {header.description && (
        <meta property="og:description" content={header.description} />
      )}
      {header.image && <meta property="og:image" content={header.image} />}
      {header.url && <meta property="og:url" content={header.url} />}
      {header.twitter && 
      <meta name="twitter:card" content={header.twitter} />
      }
      {header.robots ? (
        <meta name="robots" content={header.robots} />
      ) : (
        <meta name="robots" content="index,nofollow" />
      )}
      {header.adult === true && <meta name="rating" content="adult" />}
      {header.structure && (
        <script
          key={`structureJSON-${header.structure.identifier}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(header.structure) }}
        />
      )}
    </Head>
  );
}

export default MetaHead;
