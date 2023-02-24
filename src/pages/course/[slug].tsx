import { NextSeoProps } from "next-seo";
import LessonLayout from "@/layouts/lesson";
import styles from "@/styles/core/sidebar.module.css";
import { useState } from "react";

import subnavStyles from "@/styles/core/subnav.module.css";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import CourseModuleItem from "@/components/course/CourseModuleItem";
import NextPrevButtons from "@/components/core/NextPrevButtons";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Course lesson page",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  objectives: 1,
  progress: 2,
};

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  return (
    <LessonLayout seo={seo} title="Reading data from the network" href="#">
      <nav className={clsx(subnavStyles.subnav, "mobile-only")}>
        <Link
          href={"#content"}
          onClick={() => setSelectedTab(TABS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.content && subnavStyles.activeButton,
          )}
        >
          Content
        </Link>
        <Link
          href={"#objectives"}
          onClick={() => setSelectedTab(TABS.objectives)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.objectives && subnavStyles.activeButton,
          )}
        >
          Objectives
        </Link>
        <Link
          href={"#progress"}
          onClick={() => setSelectedTab(TABS.progress)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.progress && subnavStyles.activeButton,
          )}
        >
          Progress
        </Link>
      </nav>

      <section className={styles.wrapper + " container-inner"}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          <article>content</article>

          <NextPrevButtons
            nextHref="#"
            prevHref="#"
            nextLabel="Next lesson"
            prevLabel="Previous lesson"
          />
        </section>

        <aside className={styles.rightSideSmall + " " + styles.borderLeft}>
          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.objectives
                ? subnavStyles.activeTab
                : subnavStyles.inActiveTab,
            )}
          >
            <h3>Objectives</h3>

            <p className={styles.minorText}>
              By the end of this lesson, you&apos;ll be able to:
            </p>

            <ul className="pl-8 text-gray-500 list-disc md:text-sm">
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

          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.progress
                ? subnavStyles.activeTab
                : subnavStyles.inActiveTab,
            )}
          >
            <h3>Progress</h3>

            <CourseModuleItem
              isSmall={true}
              isActive={true}
              isComplete={true}
              title="Read data from the network"
              href="/course/intro-to-reading-data"
              lessonNumber={1}
              minuteCounter={2}
            />
            <CourseModuleItem
              isSmall={true}
              title="Write data to the network"
              href="/course/intro-to-writing-data"
              lessonNumber={2}
              minuteCounter={9}
            />
            <CourseModuleItem
              isSmall={true}
              title="Interact with wallets"
              href="/course/interact-with-wallets"
              lessonNumber={3}
              minuteCounter={14}
            />
          </section>
        </aside>
      </section>
    </LessonLayout>
  );
}
