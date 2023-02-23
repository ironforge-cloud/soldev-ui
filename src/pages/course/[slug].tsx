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

          <section className="grid w-full font-semibold gap-y-4 lg:gap-8 lg:grid-cols-2">
            <Link
              href={"#"}
              className="flex justify-between order-2 w-full space-x-5 lg:justify-start lg:order-1 btn btn-lg btn-light"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous lesson</span>
            </Link>
            <Link
              href={"#"}
              className="flex justify-between order-1 w-full space-x-5 lg:justify-end lg:order-2 btn-lg btn btn-light"
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
