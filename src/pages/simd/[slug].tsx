import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { fetchAllSIMD } from "@/utils/fetch-simd";
import { fetchRaw } from "@/utils/fetch-github";

import styles from "@/styles/core/sidebar.module.css";
import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";
import subnavStyles from "@/styles/core/subnav.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import NextPrevButtons from "@/components/core/NextPrevButtons";
import { SIMDAuthorLineItem } from "@/components/simd/SIMDTableLineItem";
import { computeSlugForSIMD, shareOnTwitterUrl } from "@/utils/helpers";

const ArticleContent = dynamic(() => import("@/components/ArticleContent"), {
  ssr: false,
});

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "SIMD doc page",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  details: 1,
  toc: 2,
};

export async function getStaticPaths() {
  const records = await fetchAllSIMD();

  // filter out SIMD files in incorrect format (missing title or simd number)
  const paths = records
    .filter((item) => item.metadata.title && item.metadata.simd)
    .map((item) => ({
      params: {
        slug: computeSlugForSIMD(item.metadata.simd, item.metadata.title),
      },
    }));

  return { paths, fallback: false };
}

type StaticProps = {
  params: { slug: string };
};

export async function getStaticProps({ params: { slug } }: StaticProps) {
  // fetch all the SIMD records from GitHub
  const records = await fetchAllSIMD();

  // located the desired record by the `slug`
  const record = records.find(
    (item) =>
      item.metadata.simd &&
      computeSlugForSIMD(item.metadata.simd, item.metadata.title) === slug,
  );

  // handle the 404 when no record was found
  if (!record) return { notFound: true };

  // fetching markdown and getting rid of document metadata
  record.content = await fetchRaw(record.download_url[0]).then((res) =>
    res.replace(/^---[\s\S]*?---/m, "").trim(),
  );

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: `SIMD-${record.metadata.simd} - ${record.metadata.title}`,
    // description: record.metadata.title,
  };
  // TODO: craft a useful seo description based on the record's data
  // TODO: determine the next and prev items

  return {
    props: {
      record,
      slug,
      seo,
    },
    revalidate: 300,
  };
}

type PageProps = {
  record: ParsedGitHubPullContent;
  seo: NextSeoProps;
  slug: string;
};

export default function Page({ record, seo, slug }: PageProps) {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  // extract all the h2 (i.e. `##` from markdown) tags to generate the table of contents
  const tableOfContents = useMemo(
    () =>
      (record?.content?.match(/^## .*$/gm) || []).map((line) => line.slice(3)),
    [],
  );

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container text-center">
        <h1>
          <Link href={record.metadata.href || "#"} className="hover:underline">
            {record.metadata.title}
          </Link>
        </h1>

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/simd"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to SIMD
          </Link>
          <Link
            target="_blank"
            href={record.html_url}
            className={`btn btn-dark ${heroStyles.ctaBtn}`}
          >
            Discuss on GitHub
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <nav className={clsx(subnavStyles.subnav, "mobile-only")}>
        <Link
          href={"#content"}
          onClick={() => setSelectedTab(TABS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.content && subnavStyles.activeButton,
            // "w-1/2 text-center",
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
            // "w-1/2 text-center",
          )}
        >
          Details
        </Link>
        <Link
          href={"#toc"}
          onClick={() => setSelectedTab(TABS.toc)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.toc && subnavStyles.activeButton,
            // "w-1/2 text-center",
          )}
        >
          Table of Contents
        </Link>
      </nav>

      <section className={clsx(styles.wrapper, "container-inner")}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          {/* <article
            className="prose"
            dangerouslySetInnerHTML={{
              __html: record?.content || "[unable to fetch SIMD proposal]",
            }}
          ></article> */}
          <ArticleContent
            markdown={record.content || "[unable to fetch SIMD proposal]"}
            className="prose"
          />

          <NextPrevButtons
            nextHref="#"
            prevHref="#"
            nextLabel="Next SIMD"
            prevLabel="Previous SIMD"
          />
        </section>

        <aside
          className={clsx(
            styles.rightSideSmall,
            // styles.stickySidebar,
            styles.borderLeft,
          )}
        >
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

            <ul className="space-y-1 text-gray-500 md:text-sm">
              <li>
                SIMD: #<span>{record.metadata.simd}</span>
              </li>
              <li>Created: {record.metadata.created}</li>
              {/* <li>Title: {record.metadata.title}</li> */}
              <li>Type: {record.metadata.type}</li>
              <li>Status: {record.metadata.status}</li>
              {record?.metadata?.authors?.length > 0 && (
                <li>
                  <p>Authors:</p>
                  <ul className="pl-8 list-disc">
                    {record.metadata.authors.map((author, id) => (
                      <SIMDAuthorLineItem key={id} author={author} />
                    )) || <li>no authors found</li>}
                  </ul>
                </li>
              )}
            </ul>
          </section>

          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.toc
                ? subnavStyles.activeTab
                : subnavStyles.inActiveTab,
            )}
          >
            <h3>Table of Contents</h3>

            <ul className="space-y-2 text-gray-500 md:text-sm">
              {tableOfContents.length > 0 &&
                tableOfContents.map((item, id) => (
                  <li key={id}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\W/g, "-")}`}
                      className="underline hover:text-gray-700"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </aside>
      </section>
    </DefaultLayout>
  );
}
