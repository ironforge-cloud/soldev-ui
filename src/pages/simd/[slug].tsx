import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/core/sidebar.module.css";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

import subnavStyles from "@/styles/core/subnav.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { SIMDAuthorLineItem } from "@/components/simd/SIMDTableLineItem";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "SIMD doc page",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  details: 1,
};

// this is a temporary data record to simulate getServerSideProps
const simd = {
  id: 0,
  title: "Lockout Violation Detection",
  href: "/simd/000-lockout-violation-detection",
  githubLink:
    "https://github.com/solana-foundation/solana-improvement-documents/pull/9",
  authors: [
    {
      name: "carllin",
      link: "https://github.com/carllin",
    },
    "ashwinsekar",
    "wencoding",
  ],
  date: "2022-12-12",
  type: "core",
  status: "draft",
};

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container text-center">
        <h1>
          <Link href={simd.href} className="hover:underline">
            {simd.title}
          </Link>
        </h1>

        {/* <p className="max-w-2xl space-x-3 text-base text-gray-500">
            <span>Lesson 1</span>
            <span>&bull;</span>
            <span>4 minutes</span>
          </p> */}

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/simd"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to SIMD
          </Link>
          <Link href={"#"} className={`btn btn-dark ${heroStyles.ctaBtn}`}>
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <nav className={clsx(subnavStyles.subnav, subnavStyles.mobileOnly)}>
        <Link
          href={"#content"}
          onClick={() => setSelectedTab(TABS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.content && subnavStyles.activeButton,
          )}
        >
          Content
        </Link>
        <Link
          href={"#details"}
          onClick={() => setSelectedTab(TABS.details)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.details && subnavStyles.activeButton,
          )}
        >
          Details
        </Link>
      </nav>

      <section className={styles.wrapper + " container-inner"}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          <article>content</article>

          <section className="grid w-full font-semibold gap-y-4 lg:gap-8 lg:grid-cols-2">
            <Link
              href={"#"}
              className="flex justify-between order-2 w-full space-x-5 lg:justify-start lg:order-1 btn btn-lg btn-light"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous SIMD</span>
            </Link>
            <Link
              href={"#"}
              className="flex justify-between order-1 w-full space-x-5 lg:justify-end lg:order-2 btn-lg btn btn-light"
            >
              <span>Next SIMD</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </section>
        </section>

        <aside className={styles.rightSideSmall + " " + styles.borderLeft}>
          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.details
                ? subnavStyles.activeTab
                : subnavStyles.inActiveTab,
            )}
          >
            <h3>Details</h3>

            {/* <p className={styles.minorText}>optional minor text</p> */}

            <ul className="text-gray-500 md:text-sm">
              <li>
                SIMD: #<span>{simd.id}</span>
              </li>
              <li>Created: {simd.date}</li>
              <li>Title: {simd.title}</li>
              <li>Type: {simd.type}</li>
              <li>Status: {simd.status}</li>
              <li>
                <p>Authors:</p>
                <ul className="pl-8 list-disc">
                  {simd.authors.map((author, id) => (
                    <SIMDAuthorLineItem key={id} author={author} />
                  )) || <li>no authors found</li>}
                </ul>
              </li>
            </ul>
          </section>
        </aside>
      </section>
    </DefaultLayout>
  );
}
