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
import NextPrevButtons from "@/components/core/NextPrevButtons";
import { getNewsletterRecords } from "@/lib/queries";
import markdownToHtml from "@/utils/markdownToHtml";

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Read the newsletter",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS_OPTIONS = {
  content: 0,
  details: 1,
};

export async function getStaticPaths() {
  const newsletters = await getNewsletterRecords();

  const paths = newsletters.map((item) => {
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
  const newsletters = await getNewsletterRecords();

  // create a placeholder record
  let record: ContentRecord | null = null;

  // let content = {};

  for (let i = 0; i < newsletters.length; i++) {
    // search for the provided `slug`, if it doesn't match -> next
    if (slug !== newsletters[i].SK) continue;

    // save the content record
    record = newsletters[i];

    // TODO: extract the next and previous records

    // convert the records markdown to html
    record.ContentMarkdown = await markdownToHtml(record.ContentMarkdown);
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
            href={"/newsletters"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to Newsletter
          </Link>
          <Link href={"#"} className={`btn btn-dark ${heroStyles.ctaBtn}`}>
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <nav className={clsx(subnavStyles.subnav, "mobile-only")}>
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
      </nav>

      <section className={styles.wrapper + " container-inner"}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS_OPTIONS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: record.ContentMarkdown }}
          ></article>

          <NextPrevButtons
            nextHref="#"
            prevHref="#"
            nextLabel="Next Newsletter"
            prevLabel="Previous Newsletter"
          />
        </section>

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
              {/* {record?.Author?.trim() && (
                <li>
                  <p>Authors:</p>
                  <ul className="pl-8 list-disc">
                    {record.Author.split(",").map(
                      (author, id) =>
                        author.trim() && (
                          <SIMDAuthorLineItem key={id} author={author.trim()} />
                        ),
                    ) || <li>no authors found</li>}
                  </ul>
                </li>
              )} */}
            </ul>
          </section>
        </aside>
      </section>
    </DefaultLayout>
  );
}
