import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import { getSuperteamCommunityCallRecords } from "@/lib/queries";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Superteam's Ecosystem Calls",
  description: "",
};

//
const preString = "solana ecosystem call - ";

export async function getStaticProps() {
  // fetch the listing of core community call records from the API
  const records = await getSuperteamCommunityCallRecords();

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
        <h1>Superteam&apos;s Ecosystem Calls</h1>

        <p className="max-w-lg text-xl">
          Community updates from around the Solana ecosystem, brought to you by
          Superteam.
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
              href={`/superteam-ecosystem-calls/${item.SK}`}
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
