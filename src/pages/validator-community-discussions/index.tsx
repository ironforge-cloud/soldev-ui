import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import { getValidatorCallRecords } from "@/lib/queries";

// define the base route for these records
const ROUTE_BASE = "/validator-community-discussions";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Validator Community Discussions",
  description: "",
};

//
// const preString = "solana community validator discussion - ";
const preString = "solana community";

export async function getStaticProps() {
  // fetch the listing of records from the API
  const records = await getValidatorCallRecords();

  return {
    props: {
      records,
    },
    revalidate: 60,
  };
}

type PageProps = {
  records: ContentRecord[];
};

export default function Page({ records }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Community Validator Discussions</h1>

        <p className="max-w-lg text-xl">
          Discussions from the Solana Validator Community on operations,
          upcoming changes, and best practices.
        </p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        {records.map((item, index) => {
          // auto remove the `preText` text from the displayed title
          if (
            item.Title.toLowerCase().substring(0, preString.length) == preString
          )
            item.Title = item.Title.substring(preString.length).trim();

          return (
            <ContentCard
              key={item.SK}
              isLarge={!index}
              href={`${ROUTE_BASE}/${item.SK}`}
              title={item.Title}
              authorLabel={item.Author}
              // authorHref="#"
              imageSrc={item.Img}
              tags={item.Tags}
              description={item.Description}
            />
          );
        })}
      </main>
    </DefaultLayout>
  );
}
