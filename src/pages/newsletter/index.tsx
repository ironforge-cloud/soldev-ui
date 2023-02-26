import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import { getNewsletterRecords } from "@/lib/queries";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Newsletter",
  description: "",
};

export async function getStaticProps() {
  // fetch the listing of newsletter records from the API
  const records = await getNewsletterRecords();

  // extract the latest newsletter
  // const lastNewsletter = records?.[0];

  return {
    props: {
      records,
      // lastNewsletter,
    },
    revalidate: 60,
  };
}

type PageProps = {
  records: ContentRecord[];
  // lastNewsletter: ContentRecord;
};

export default function Page({ records }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Newsletter</h1>

        <p className="max-w-lg text-xl">
          The latest news and updates from the Solana Foundation.
        </p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        {records.map((item, index) => (
          <ContentCard
            key={item.SK}
            isLarge={!index}
            href={`/newsletter/${item.SK}`}
            title={item.Title}
            authorLabel={item.Author}
            // authorHref="#"
            imageSrc={item.Img}
            tags={item.Tags}
            description={item.Description}
          />
        ))}
      </main>
    </DefaultLayout>
  );
}
