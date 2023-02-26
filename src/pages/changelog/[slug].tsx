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
import NextPrevButtons from "@/components/core/NextPrevButtons";

import { getChangelogRecords } from "@/lib/queries";
import markdownToHtml from "@/utils/markdownToHtml";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Watch the Changelog",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS_OPTIONS = {
  content: 0,
  details: 1,
};

export async function getStaticPaths() {
  const records = await getChangelogRecords();

  const paths = records.map((item) => {
    return {
      params: {
        slug: item.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

type StaticProps = {
  params: { slug: string };
};

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const records = await getChangelogRecords();

  // create a placeholder record
  let record: ContentRecord | null = null;

  // let content = {};

  for (let i = 0; i < records.length; i++) {
    // search for the provided `slug`, if it doesn't match -> next
    if (slug !== records[i].SK) continue;

    // save the content record
    record = records[i];

    // TODO: extract the next and previous records

    // convert the records markdown to html
    // record.ContentMarkdown = await markdownToHtml(record.ContentMarkdown);
    // TODO: handle the h1 element from the markdown

    // auto convert the `PublishedAt` to a usable date
    record.PublishedAt = new Date(record.PublishedAt).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    );

    // stop the loop
    break;
  }

  // handle the 404 when no record was found
  if (!record) return { notFound: true };

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: record.Title,
    description: record.Description,
  };

  return {
    props: {
      record,
      seo,
    },
    revalidate: 60,
  };
}

type PageProps = {
  record: ContentRecord;
  seo: NextSeoProps;
};

export default function Page({ record, seo }: PageProps) {
  // track the selected tab for the mobile view
  const [selectedTab, setSelectedTab] = useState(TABS_OPTIONS.content);

  return (
    <DefaultLayout seo={{ ...placeholderSEO, ...seo }}>
      <PageHero className="container text-center">
        <h1>
          <Link href={record.Url} className="hover:underline">
            {record.Title}
          </Link>
        </h1>

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/changelog"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to Changelog
          </Link>
          <Link href={"#"} className={`btn btn-dark ${heroStyles.ctaBtn}`}>
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      {/* <nav className={clsx(subnavStyles.subnav, "mobile-only")}>
        <Link
          href={"#content"}
          onClick={() => setSelectedTab(TABS_OPTIONS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS_OPTIONS.content && subnavStyles.activeButton,
            // "w-1/2 text-center",
          )}
        >
          Content
        </Link>
        <Link
          href={"#details"}
          onClick={() => setSelectedTab(TABS_OPTIONS.details)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS_OPTIONS.details && subnavStyles.activeButton,
            // "w-1/2 text-center",
          )}
        >
          Details
        </Link>
      </nav> */}

      <section className={"container max-w-5xl"}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS_OPTIONS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          <div className="aspect-[16/9] w-full shadow-lg rounded-3xl overflow-hidden">
            <ReactPlayer
              height="100%"
              width="100%"
              style={{ aspectRatio: "16/9" }}
              url={record.Url}
              controls
              pip
              stopOnUnmount={false}
            />
          </div>

          <ul className="text-gray-500 md:text-sm">
            <li>Published: {record.PublishedAt}</li>
          </ul>

          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: record.ContentMarkdown }}
          ></article>

          <NextPrevButtons
            nextHref="#"
            prevHref="#"
            nextLabel="Next Changelog"
            prevLabel="Previous Changelog"
          />
        </section>

        {false && (
          <aside className={styles.rightSideSmall + " " + styles.borderLeft}>
            <section
              className={clsx(
                styles.section,
                selectedTab === TABS_OPTIONS.details
                  ? subnavStyles.activeTab
                  : subnavStyles.inActiveTab,
              )}
            >
              <h3>Details</h3>

              {/* <p className={styles.minorText}>optional minor text</p> */}

              <ul className="text-gray-500 md:text-sm">
                <li>Published: {record.PublishedAt}</li>
                {/* <li>Title: {record.Title}</li> */}
              </ul>
            </section>
          </aside>
        )}
      </section>
    </DefaultLayout>
  );
}
