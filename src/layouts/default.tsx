import { NextSeo, NextSeoProps } from "next-seo";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
};

export default function DefaultLayout({ children, seo }: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className="container">{children}</main>

      <AppFooter />
    </>
  );
}
