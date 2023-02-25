import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Newsletter",
  description: "",
};

export async function getStaticProps() {
  // fetch the listing of newsletter records from the API
  const newsletters: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/solana/newsletters`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // extract the latest newsletter
  const lastNewsletter = newsletters?.[0];

  return {
    props: {
      newsletters,
      lastNewsletter,
    },
    revalidate: 60,
  };
}

type PageProps = {
  newsletters: ContentRecord[];
  lastNewsletter: ContentRecord;
};

export default function Page({ newsletters, lastNewsletter }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Newsletter</h1>

        <p className="max-w-lg text-xl">
          The latest news and updates from the Solana Foundation.
        </p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        {newsletters.map((item, index) => (
          <ContentCard
            isLarge={!index}
            href={item.Url}
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
