import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";
import SEO from "@@/next-seo.config";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>

      <DefaultSeo {...SEO} />
      {/* <body className={`${inter.variable} font-sans`}> */}
      <Component {...pageProps} />
      {/* </body> */}
    </>
  );
}
