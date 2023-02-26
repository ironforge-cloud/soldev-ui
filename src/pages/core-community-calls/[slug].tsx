import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import NextPrevButtons from "@/components/core/NextPrevButtons";
import { getCoreCommunityCallRecords } from "@/lib/queries";
import markdownToHtml from "@/utils/markdownToHtml";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Watch the Core Community Call",
  description: "",
};

export async function getStaticPaths() {
  const records = await getCoreCommunityCallRecords();

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
  const records = await getCoreCommunityCallRecords();

  // create a placeholder record
  let record: ContentRecord | null = null;

  for (let i = 0; i < records.length; i++) {
    // search for the provided `slug`, if it doesn't match -> next
    if (slug !== records[i].SK) continue;

    // save the content record
    record = records[i];

    // TODO: extract the next and previous records

    // convert the records markdown to html
    record.ContentMarkdown = await markdownToHtml(record.ContentMarkdown);

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
            href={"/core-community-calls"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to Community Calls
          </Link>
          <Link href={"#"} className={`btn btn-dark ${heroStyles.ctaBtn}`}>
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <main className={"max-w-4xl container"}>
        <div className="aspect-[16/9] w-full border border-gray-200 bg-gray-50 rounded-2xl overflow-hidden mx-auto">
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
          <li>Published {record.PublishedAt}</li>
          {/* <li>By {record.Author}</li> */}
        </ul>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: record.ContentMarkdown }}
        ></article>

        <NextPrevButtons
          nextHref="#"
          prevHref="#"
          nextLabel="Next Community Call"
          prevLabel="Previous Community Call"
        />
      </main>
    </DefaultLayout>
  );
}
