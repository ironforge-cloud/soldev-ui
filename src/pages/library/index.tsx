import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { getContentTypes, getRecordsFromSlug } from "@/lib/queries";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import LibraryFilters from "@/components/library/LibraryFilters";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { computeImage } from "@/utils/content";
import { computeFilterFromUrlParam } from "@/utils/helpers";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Library",
  description: "",
};

export async function getStaticProps() {
  // fetch the content types
  const contentTypes = await getContentTypes();

  // fetch the records from the API via the Promise.all()
  const records = await Promise.all(
    contentTypes
      .filter((item) => item != "newsletters")
      .map((item) => getRecordsFromSlug(item)),
  )
    .then((res) => res.flat())
    // sort from newest to oldest
    .then((res) =>
      res.sort((a, b) => parseInt(b.PublishedAt) - parseInt(a.PublishedAt)),
    );

  console.log(records[0]);

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
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  // construct the filter options
  const [filterOptions, setFilterOptions] = useState<{
    limit: number;
    page: number;
    descSort: boolean;
  }>({
    limit: 18,
    page: 1,
    descSort: true,
  });

  // memo-ize the filtered records less compute
  const filteredRecords = useMemo(() => {
    // compute the filter `type`
    let filterValues: string[];

    // handle the record `type` filtering
    if (
      (filterValues = computeFilterFromUrlParam(
        (router.query.types as string) ?? "",
      )) &&
      filterValues.length > 0
    )
      records = records.filter((item) => {
        return (
          filterValues.filter(
            (type: string) =>
              item.ContentType.toLowerCase() == type.toLowerCase(),
          )?.length > 0
        );
      });

    // handle the record `level` filtering
    // NOTE: the records's `level` value is stored in the `Tags` attribute
    if (
      (filterValues = computeFilterFromUrlParam(
        (router.query.levels as string) ?? "",
      )) &&
      filterValues.length > 0
    )
      records = records.filter((item) => {
        return (
          filterValues.filter(
            (filter: string) =>
              item.Tags.filter(
                (tag) => tag.toLowerCase() == filter.toLowerCase(),
              )?.length > 0,
          )?.length > 0
        );
      });

    // handle the record `tag` filtering
    if (
      (filterValues = computeFilterFromUrlParam(
        (router.query.tags as string) ?? "",
      )) &&
      filterValues.length > 0
    )
      records = records.filter((item) => {
        return (
          filterValues.filter(
            (filter: string) =>
              item.Tags.filter(
                (tag) => tag.toLowerCase() == filter.toLowerCase(),
              )?.length > 0,
          )?.length > 0
        );
      });

    // always paginate
    return records.slice(0, filterOptions.limit * filterOptions.page);
  }, [records, filterOptions, router.query]);

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
            {filteredRecords.map((item) => (
              <ContentCard
                key={item.SK}
                href={item.Url}
                title={item.Title}
                authorLabel={item.Author}
                // authorHref={"#"}
                imageSrc={computeImage(item)}
                description={item.Description}
                // tags={item.Tags}
              />
            ))}
          </main>
        </section>
      </section>
    </DefaultLayout>
  );
}
