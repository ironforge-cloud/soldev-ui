import { NextSeoProps } from "next-seo";
import LessonLayout from "@/layouts/lesson";
import styles from "@/styles/core/sidebar.module.css";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Course lesson page",
  description: "",
};

export default function Page() {
  return (
    <LessonLayout seo={seo} title="Reading data from the network" href="#">
      <section className={styles.wrapper + " container-inner"}>
        <section className={styles.leftSideLarge}>
          <article>content</article>

          <section className="flex w-full space-x-8 font-semibold">
            <Link
              href={"#"}
              className="inline-flex justify-start w-1/2 space-x-5 btn btn-light"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous lesson</span>
            </Link>
            <Link
              href={"#"}
              className="inline-flex justify-end w-1/2 space-x-5 btn btn-light"
            >
              <span>Next lesson</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </section>
        </section>

        <aside className={styles.rightSideSmall + " " + styles.borderLeft}>
          <section className={styles.section}>
            <h3>Objectives</h3>

            <p className={styles.minorText}>
              By the end of this lesson, you&apos;ll be able to:
            </p>

            <ul className="pl-8 text-sm text-gray-500 list-disc">
              <li>Explain accounts</li>
              <li>Explain SOL and lamports</li>
              <li>Explain public keys</li>
              <li>Explain the JSON RPC API</li>
              <li>Explain web3.js</li>
              <li>Install web3.js</li>
              <li>Use web3.js to create a connection to a Solana node</li>
              <li>
                Use web3.js to read data from the blockchain (balance, account
                info, etc.)
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Progress</h3>
          </section>
        </aside>
      </section>
    </LessonLayout>
  );
}
