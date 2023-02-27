import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import IDLCard from "@/components/registry/IDLCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getIDLRecordByAddress, getIDLRecords } from "@/lib/queries";
import { useState } from "react";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "IDL Registry",
  description: "Solana program registry of IDLs.",
};

export async function getStaticProps() {
  // fetch the listing of IDK from the API
  const records = await getIDLRecords();

  return {
    props: {
      records,
    },
    revalidate: 3600,
  };
}

type PageProps = {
  records: IDLRecord[];
};

export default function Page({ records }: PageProps) {
  const [searchText, setSearchText] = useState("");

  // define the filter props for on page searching
  let filter = {
    start: 0,
    perPage: 24,
  };

  // handler to filter the on page records
  function parseFilters(records: IDLRecord[]) {
    return records.filter((program) => {
      if (program.programName.toLowerCase().includes(searchText.toLowerCase()))
        return true;
      else if (program.address.includes(searchText)) return true;
      return false;
    });
  }

  // run all the filters and pagination on the records
  let filteredRecords = parseFilters(records);
  // .slice(
  //   filter.start,
  //   filter.perPage,
  // );

  return (
    <DefaultLayout seo={seo} className="min-h-screen">
      <PageHero className="container space-y-8">
        <h1>IDL Registry</h1>

        {/* <p className="max-w-lg text-xl">optional minor text</p> */}

        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
          <div className="inputWithIcon">
            <label htmlFor="site_search">
              <MagnifyingGlassIcon />
            </label>
            <input
              type="text"
              className="input-dark"
              id="site_search"
              placeholder="Search programs by name or address"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </PageHero>

      <main className={styles.wrapper + " container grid"}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((item) => (
            <IDLCard
              key={item.address}
              href={`/registry/${item.address}`}
              title={item.programName}
              address={item.address}
              network="mainnet"
            />
          ))
        ) : (
          <p className="my-10 text-center col-span-full">
            No results found for &ldquo;
            <span className="italic underline">{searchText}</span>
            &rdquo;
          </p>
        )}
      </main>
    </DefaultLayout>
  );
}
