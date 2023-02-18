import { NextSeo, NextSeoProps } from "next-seo";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
};

export default function BareLayout({ children, seo }: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      {children}
    </>
  );
}
