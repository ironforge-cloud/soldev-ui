import { DefaultSeoProps } from "next-seo";
import {
  SITE_ADDR,
  SITE_NAME,
  SITE_NAME_LONG,
  CREATOR_TWITTER_HANDLE,
  SITE_TWITTER_HANDLE,
} from "./src/lib/constants/general";

const config: DefaultSeoProps = {
  // configure the title settings
  title: undefined,
  titleTemplate: `${SITE_NAME} - %s`,
  defaultTitle: SITE_NAME,
  description:
    "Learn to develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations.",

  // social media card data
  openGraph: {
    siteName: SITE_NAME_LONG,
    locale: "en_US",
    type: "website",
    url: SITE_ADDR,
    images: [
      {
        url: `${SITE_ADDR}/banner.png`,
      },
    ],
  },
  twitter: {
    handle: `@${CREATOR_TWITTER_HANDLE}`,
    site: `@${SITE_TWITTER_HANDLE}`,
    cardType: "summary_large_image",
  },
};

export default config;
