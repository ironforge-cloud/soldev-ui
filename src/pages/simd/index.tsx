import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import Link from "next/link";

import dataTableStyles from "@/styles/core/dataTable.module.css";

import styles from "@/styles/core/sidebar.module.css";
import SIMDCard from "@/components/simd/SIMDCard";
import SIMDTableLineItem, {
  SIMDTableLineItemProps,
} from "@/components/simd/SIMDTableLineItem";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Improvement Docs (SIMD)",
  description: "",
};

// this is a temporary variable to scaffold the display functionality
const records: SIMDTableLineItemProps[] = [
  {
    id: 0,
    title: "Lockout Violation Detection",
    href: "/simd/000-lockout-violation-detection",
    githubLink:
      "https://github.com/solana-foundation/solana-improvement-documents/pull/9",
    authors: [
      {
        name: "carllin",
        link: "https://github.com/carllin",
      },
      "ashwinsekar",
      "wencoding",
    ],
    date: "2022-12-12",
    type: "core",
    status: "draft",
  },
  {
    id: 1,
    title: "Solana Proposal Process",
    href: "/simd/0001-solana-proposal-process",
    githubLink:
      "https://github.com/solana-foundation/solana-improvement-documents/blob/main/proposals/0001-simd-process.md",
    authors: ["Jacob Creech (Solana Foundation)"],
    date: "2022-10-18",
    type: "meta",
    status: "draft",
  },
];

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-8">
        <h1>Solana Improvement Docs</h1>

        <p className="max-w-4xl text-base text-gray-300 md:text-lg">
          This section hosts the Solana Improvement Documents (SIMD) assembled
          in{" "}
          <Link
            href={
              "https://github.com/solana-foundation/solana-improvement-documents"
            }
            className="underline"
          >
            this repository
          </Link>
          . The improvement documents describe proposed and accepted changes to
          the Solana protocol.The latest news and updates from the Solana
          Foundation.
        </p>
      </PageHero>

      <main
        className={`container-inner py-8 ${dataTableStyles.scrollContainer} hide-scroll-bar`}
      >
        <table className={`${dataTableStyles.dataTable} hide-scroll-bar`}>
          <thead>
            <tr>
              <th className={dataTableStyles.smallTh}>SIMD #</th>
              <th>Title</th>
              <th className={dataTableStyles.smallTh}>Type</th>
              <th className={dataTableStyles.smallTh}>Status</th>
              <th>Author</th>
              <th className={dataTableStyles.smallTh}>Created At</th>
              <th className={dataTableStyles.smallTh}></th>
            </tr>
          </thead>
          <tbody>
            {records.map((simd, id) => (
              <SIMDTableLineItem key={id} {...simd} />
            ))}
          </tbody>
        </table>
      </main>

      {/* <main className={styles.wrapper + " container"}>
        <SIMDCard
          id={0}
          href="/simd/000-lockout-violation-detection"
          githubLink="https://github.com/solana-foundation/solana-improvement-documents/pull/9"
          title="#000 Lockout Violation Detection"
          type="core"
          date="2022-12-12"
          status="draft"
          authors="carlin, ashwinsekar, wencoding"
        />
      </main> */}
    </DefaultLayout>
  );
}
