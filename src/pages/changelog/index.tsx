import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import { getChangelogRecords } from "@/lib/queries";
import { computeImage } from "@/utils/content";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Changelog",
  description:
    "Weekly updates on the Solana ecosystem from the Solana Foundation.",
};

export async function getStaticProps() {
  // fetch the listing of changelog records from the API
  const records = await getChangelogRecords();

  // extract the latest changelog record
  const latestRecord = records?.[0];

  return {
    props: {
      records,
      // latestRecord,
    },
    revalidate: 60,
  };
}

type PageProps = {
  records: ContentRecord[];
  // latestRecord: ContentRecord;
};

export default function Page({ records }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Changelog</h1>

        <p className="max-w-lg text-xl">
          Weekly updates on the Solana ecosystem from the Solana Foundation
        </p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        {records.map((item, index) => {
          // auto remove the `solana changelog` text from the displayed title
          const preString = "solana changelog - ";
          if (
            item.Title.toLowerCase().substring(0, preString.length) == preString
          )
            item.Title = item.Title.substring(preString.length).trim();

          return (
            <ContentCard
              key={item.SK}
              isLarge={!index}
              href={`/changelog/${item.SK}`}
              title={item.Title}
              authorLabel={item.Author}
              // authorHref="#"
              imageSrc={computeImage(item)}
              tags={item.Tags}
              description={item.Description}
            />
          );
        })}
      </main>
    </DefaultLayout>
  );
}
