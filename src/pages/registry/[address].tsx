import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

// import {
//   ArrowLeftIcon,
//   ArrowTopRightOnSquareIcon,
// } from "@heroicons/react/24/solid";

import IDLNav from "@/components/registry/IDLNav";
import { getIDLRecords, getIDLRecordByAddress } from "@/lib/queries";
import IDLInstructionsTable from "@/components/registry/IDLInstructionsTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IDLAccountsTable from "@/components/registry/IDLAccountsTable";
import IDLTypesTable from "@/components/registry/IDLTypesTable";
import IDLErrorsTable from "@/components/registry/IDLErrorsTable";
import IDLConstantsTable from "@/components/registry/IDLConstantsTable";
import IDLEventsTable from "@/components/registry/IDLEventsTable";

// define the listing of navigation items to be displayed
const SUBNAV_OPTIONS = [
  { label: "Instructions", href: "#instructions" },
  { label: "Accounts", href: "#accounts" },
  { label: "Types", href: "#types" },
  { label: "Errors", href: "#errors" },
  { label: "Constants", href: "#constants" },
  { label: "Events", href: "#events" },
];

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Explore this Solana Program's IDL",
  description: "",
};

export async function getStaticPaths() {
  const records = await getIDLRecords();

  const paths = records.map((item) => {
    return {
      params: {
        address: item.address,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

type StaticProps = {
  params: { address: string };
};

export async function getStaticProps({ params: { address } }: StaticProps) {
  const record = await getIDLRecordByAddress(address);

  // handle the 404 when no record was found
  if (!record || !record.idl) return { notFound: true };

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: `${record.programName} IDL`,
    // description: "",
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
  record: IDLRecord;
  seo: NextSeoProps;
};

export default function Page({ record, seo }: PageProps) {
  const { asPath } = useRouter();
  const [selectedTab, setSelectedTab] = useState("instructions");

  // track and auto update the selected tab by the hash based routing
  useEffect(() => {
    // console.log("change hash");
    setSelectedTab(asPath.split("#")[1] || "instructions");
  }, [asPath]);

  return (
    <DefaultLayout seo={{ ...placeholderSEO, ...seo }}>
      <PageHero className="container">
        <h1>{record.programName}</h1>

        {/* <p className="max-w-2xl text-xl">
          optional paragraph text
        </p> */}

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/registry"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to IDL Registry
          </Link>
          <Link
            href={`https://explorer.solana.com/address/${record.address}`}
            target="_blank"
            className={`btn btn-dark ${heroStyles.ctaBtn}`}
          >
            View on Solana Explorer
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <section className={"container"}>
        <IDLNav
          idl={record?.idl}
          options={SUBNAV_OPTIONS}
          selected={selectedTab}
        />
      </section>

      {(record?.idl as Idl) ? (
        <>
          {selectedTab == "instructions" && (
            <IDLInstructionsTable data={record.idl?.instructions} />
          )}
          {selectedTab == "accounts" && (
            <IDLAccountsTable data={record.idl?.accounts} />
          )}
          {selectedTab == "types" && <IDLTypesTable data={record.idl?.types} />}
          {selectedTab == "errors" && (
            <IDLErrorsTable data={record.idl?.errors} />
          )}
          {selectedTab == "constants" && (
            <IDLConstantsTable data={record.idl?.constants} />
          )}
          {selectedTab == "events" && (
            <IDLEventsTable data={record.idl?.events} />
          )}
        </>
      ) : // <RenderTable record={record} tab={selectedTab} />
      null}
    </DefaultLayout>
  );
}

/*
  Component function to switch case render the correct data table for view 
*/
function RenderTable({ tab, record }: { tab: string; record: IDLRecord }) {
  switch (tab) {
    case "instructions":
      return <IDLInstructionsTable data={(record.idl as Idl).instructions} />;
    case "accounts":
      return <IDLAccountsTable data={(record.idl as Idl).accounts} />;
    default:
      return (
        <p className="p-8 text-2xl text-center">
          Unknown page. Please select a valid option.
        </p>
      );
  }
}
