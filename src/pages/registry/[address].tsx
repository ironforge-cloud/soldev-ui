import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

import IDLNav from "@/components/registry/IDLNav";
import { getIDLRecords, getIDLRecordByAddress } from "@/lib/queries";
import IDLInstructionsTable from "@/components/registry/IDLInstructionsTable";

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
        tab: "",
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

  console.log(record.idl);

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
        <IDLNav />
      </section>

      {record?.idl ? (
        <>
          <IDLInstructionsTable data={record.idl.instructions} />
        </>
      ) : null}
    </DefaultLayout>
  );
}
