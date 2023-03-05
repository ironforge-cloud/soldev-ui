import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";

import { DefaultSeo } from "next-seo";
import SEO from "@@/next-seo.config";

import { Inter } from "@next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="soldev.app">
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>

      <DefaultSeo {...SEO} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
