import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import LibraryFilters from "@/components/library/LibraryFilters";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import clsx from "clsx";
import { computeImage } from "@/utils/content";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Library",
  description: "",
};

export async function getStaticProps() {
  // fetch the records from the API

  // const contentTypes = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`,
  // ).then((res) => res.json());
  // console.log("--- contentTypes ---");
  // console.log(contentTypes);

  // const playlists = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`,
  // ).then((res) => res.json());
  // console.log(playlists);

  const type = "tutorials";

  const records = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${type}`,
  ).then((res) => res.json());
  // console.log("--- records ---");
  // console.log(records.length);
  // console.log(records);

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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Library</h1>

        <p className="max-w-lg text-xl">
          Check out the latest and greatest tutorials, articles, podcasts, and
          more.
        </p>
      </PageHero>

      <section className={styles.wrapper + " container-inner"}>
        <aside
          className={clsx(
            styles.leftSideSmall,
            !showFilters && styles.stickySidebar,
          )}
        >
          <section className="flex justify-end px-6 mt-6 col-span-full lg:hidden">
            <button
              className="space-x-2 btn-dark"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon
                className={clsx("icon", showFilters && "rotate-180")}
              />
              <span>Filters</span>
            </button>
          </section>

          <div
            className={showFilters ? styles.floatingMenu : "hidden lg:block"}
          >
            <LibraryFilters
              className={showFilters ? styles.floatingMenuInner : ""}
            />
          </div>
        </aside>

        <section className={styles.rightSideLarge}>
          <main className={styles.gridContainer}>
            {records.map((item) => (
              <ContentCard
                key={item.PK}
                href={item.Url}
                title={item.Title}
                authorLabel={item.Author}
                // authorHref={"#"}
                imageSrc={computeImage(item)}
                description={item.Description}
                tags={item.Tags}
              />
            ))}
          </main>
        </section>
      </section>
    </DefaultLayout>
  );
}
