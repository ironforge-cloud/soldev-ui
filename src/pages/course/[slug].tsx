import { NextSeoProps } from "next-seo";
import LessonLayout from "@/layouts/lesson";
import Link from "next/link";
import styles from "@/styles/core/sidebar.module.css";
import clsx from "clsx";
import { useMemo, useState } from "react";

import fs from "fs";
import path from "path";
import * as matter from "gray-matter";
import { COURSE_MODULES } from "@/lib/constants/course";

import subnavStyles from "@/styles/core/subnav.module.css";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import CourseModuleItem from "@/components/course/CourseModuleItem";
import NextPrevButtons from "@/components/core/NextPrevButtons";
import ArticleContent from "@/components/ArticleContent";

type LessonMetadata = {
  title?: string;
  description?: string;
  objectives?: string[];
};

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Learn Solana Development",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  objectives: 1,
  progress: 2,
};

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Learn Solana Development",
  description: "",
};

// define the base directory to search for the course content for
const directory = path.join(process.cwd(), "content", "course");

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(directory);

  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

type StaticProps = {
  params: { slug: string };
};

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const filePath = path.join(directory, `${slug}.md`);

  // load the lesson's markdown file, with YAML front matter support
  const lesson = matter.read(filePath);

  // handle the 404 when no record was found
  if (!lesson) return { notFound: true };

  // TODO: determine the next/prev lessons

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: lesson.data.title || "Learn Solana Development",
    description: lesson.data.description || "Learn Solana Development",
  };

  return {
    props: {
      markdown: lesson.content,
      metadata: lesson.data,
      slug,
      seo,
    },
    revalidate: 60,
  };
}

type PageProps = {
  markdown: string;
  metadata: LessonMetadata;
  slug: string;
  seo: NextSeoProps;
};

export default function Page({ markdown, metadata, seo, slug }: PageProps) {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  // memo-ize the current module
  const currentModule = useMemo(() => {
    return COURSE_MODULES.filter(
      (item) =>
        item.lessons.flat().filter((item) => item.slug.toLowerCase() == slug)
          .length > 0,
    )?.[0];
  }, []);

  return (
    <LessonLayout
      seo={{ ...placeholderSEO, ...seo }}
      title={metadata.title || seo.title || "d"}
      href={`/course/${slug?.toLowerCase()}`}
    >
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
          <ArticleContent markdown={markdown} className="prose" />

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

            {metadata?.objectives && metadata.objectives.length > 0 ? (
              <>
                <p className={styles.minorText}>
                  By the end of this lesson, you&apos;ll be able to:
                </p>

                <ul className="pl-8 text-gray-500 list-disc md:text-sm">
                  {metadata.objectives.map((obj, id) => (
                    <li key={id}>{obj}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={styles.minorText}>
                This lesson has written no objectives.
              </p>
            )}
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

            {currentModule?.lessons?.map((item, id) => (
              <CourseModuleItem
                key={id}
                isSmall={true}
                // isComplete={true}
                isActive={slug == item.slug}
                title={item.title}
                href={`/course/${item.slug}`}
                lessonNumber={item.number || id + 1}
                // minuteCounter={2}
              />
            ))}
          </section>
        </aside>
      </section>
    </LessonLayout>
  );
}
