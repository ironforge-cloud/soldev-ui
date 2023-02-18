import { NextSeo, NextSeoProps } from "next-seo";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
};

export default function DefaultLayout({ children, seo }: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <main className="">{children}</main>
    </>
  );
}
