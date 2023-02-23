import { NextSeo, NextSeoProps } from "next-seo";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

import Link from "next/link";
import PageHero from "@/components/core/PageHero";
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

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
          <h1>
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h1>

          {/* <p className="max-w-2xl space-x-3 text-base text-gray-500">
            <span>Lesson 1</span>
            <span>&bull;</span>
            <span>4 minutes</span>
          </p> */}

          <div className="justify-center py-5 space-x-0 space-y-2 lg:space-x-3 lg:space-y-0 lg:flex">
            <Link
              href={"/course/#hash-routing"}
              className="block btn btn-default lg:inline-block"
            >
              {/* <ArrowLeftIcon className="mr-2 icon" /> */}
              Back to course
            </Link>
            <Link href={"#"} className="block btn btn-dark lg:inline-block">
              Share on twitter
              {/* <ArrowTopRightOnSquareIcon className="ml-2 icon" /> */}
            </Link>
          </div>
        </PageHero>

        {children}
      </main>

      <AppFooter />
    </>
  );
}
