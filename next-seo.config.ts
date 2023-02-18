import { DefaultSeoProps } from "next-seo";
import {
  SITE_ADDR,
  SITE_TWITTER,
  SITE_NAME,
  SITE_NAME_LONG,
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
  },
  twitter: {
    handle: `@${SITE_TWITTER}`,
    site: `@${SITE_TWITTER}`,
    cardType: "summary_large_image",
  },
};

export default config;
