import { NextSeo, NextSeoProps } from "next-seo";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
  className?: string;
  withHero?: boolean;
};

export default function DefaultLayout({
  children,
  seo,
  className,
  withHero,
}: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader withHero={withHero} />

      <main className={className}>{children}</main>

      <AppFooter />
    </>
  );
}
