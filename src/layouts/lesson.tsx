import { NextSeo, NextSeoProps } from "next-seo";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

import Link from "next/link";
import PageHero from "@/components/core/PageHero";

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
  className?: string;
  title: string;
  href: string;
};

export default function LessonLayout({
  children,
  seo,
  className,
  title,
  href,
}: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className={className}>
        <PageHero className="container text-center">
          <h1 className="text-6xl tracking-normal">
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h1>

          {/* <p className="max-w-2xl mx-auto space-x-3 text-base text-center text-gray-500">
            <span>Lesson 1</span>
            <span>&bull;</span>
            <span>4 minutes</span>
          </p> */}

          <div className="flex justify-center space-x-3">
            <Link href={"/course/#hash-routing"} className="btn btn-default">
              Back to course
            </Link>
            <Link href={"#"} className="btn btn-dark">
              Share on twitter
            </Link>
          </div>
        </PageHero>

        {children}
      </main>

      <AppFooter />
    </>
  );
}
