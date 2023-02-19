import { NextSeo, NextSeoProps } from "next-seo";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
  className?: string;
};

export default function DefaultLayout({
  children,
  seo,
  className,
}: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className={className}>{children}</main>

      <AppFooter />
    </>
  );
}
