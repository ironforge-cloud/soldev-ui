import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import NextPrevButtons from "@/components/core/NextPrevButtons";
import { getNewsletterRecords } from "@/lib/queries";
import markdownToHtml from "@/utils/markdownToHtml";
import { shareOnTwitterUrl } from "@/utils/helpers";

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Read the newsletter",
  description: "",
};

export async function getStaticPaths() {
  const records = await getNewsletterRecords();

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
  const records = await getNewsletterRecords();

  // create a placeholder record
  let record: ContentRecord | null = null;
  let nextSlug: string | null = null;
  let prevSlug: string | null = null;

  for (let i = 0; i < records.length; i++) {
    // search for the provided `slug`, if it doesn't match -> next
    if (slug !== records[i].SK) continue;

    // save the content record
    record = records[i];

    // extract the next/prev records
    if (i > 0) prevSlug = records[i - 1].SK;
    if (records.length > i + 1) nextSlug = records[i + 1].SK;

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
      nextSlug,
      prevSlug,
    },
    revalidate: 60,
  };
}

type PageProps = {
  record: ContentRecord;
  seo: NextSeoProps;
  nextSlug?: string;
  prevSlug?: string;
};

export default function Page({ record, seo, nextSlug, prevSlug }: PageProps) {
  return (
    <DefaultLayout seo={{ ...placeholderSEO, ...seo }}>
      <PageHero className="container text-center">
        <h1>
          <Link href={`/newsletter/${record.SK}`}>{record.Title}</Link>
        </h1>

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/newsletter"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to Newsletter
          </Link>
          <Link
            target="_blank"
            href={shareOnTwitterUrl({
              href: `/newsletter/${record.SK}`,
              message: `Checkout the @solana newsletter from ${record.PublishedAt}`,
            })}
            className={`btn btn-dark ${heroStyles.ctaBtn}`}
          >
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <main className={"max-w-4xl container"}>
        <p className="text-gray-500 md:text-sm">
          Published {record.PublishedAt}
        </p>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: record.ContentMarkdown }}
        ></article>

        <NextPrevButtons
          nextHref={`/newsletter/${nextSlug || ""}`}
          prevHref={`/newsletter/${prevSlug || ""}`}
          nextLabel={nextSlug ? "Next Newsletter" : "All Newsletters"}
          prevLabel={prevSlug ? "Previous Newsletter" : "All Newsletters"}
        />
      </main>
    </DefaultLayout>
  );
}
