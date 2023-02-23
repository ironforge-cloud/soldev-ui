import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import Link from "next/link";

import styles from "@/styles/core/sidebar.module.css";
import SIMDCard from "@/components/simd/SIMDCard";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Improvement Docs (SIMD)",
  description: "",
};

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

      <main className={styles.wrapper + " container"}>
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
      </main>
    </DefaultLayout>
  );
}
