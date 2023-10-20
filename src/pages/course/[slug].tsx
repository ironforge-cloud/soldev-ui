import { NextSeoProps } from 'next-seo';
import LessonLayout from '@/layouts/lesson';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import matter from 'gray-matter';

import Link from 'next/link';
import styles from '@/styles/core/sidebar.module.css';
import subnavStyles from '@/styles/core/subnav.module.css';
import NextPrevButtons from '@/components/core/NextPrevButtons';
import { fetchLessonText, fetchCourseStructure } from '@/utils/fetch-course';
import { Unit } from '@/lib/types';
import Lesson from '@/components/course/Lesson';

const ArticleContent = dynamic(() => import('@/components/ArticleContent'), {
  ssr: false
});

type LessonMetadata = {
  title?: string;
  description?: string;
  objectives?: string[];
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  objectives: 1,
  progress: 2
};

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: 'Learn Solana Development',
  description: ''
};

export async function getStaticPaths() {
  const courseStructure = await fetchCourseStructure();

  // handle the 404 when course modules were not found
  if (courseStructure === undefined) return { notFound: true };

  const allLessons = courseStructure.tracks.flatMap(track =>
    track.units.flatMap(module => module.lessons)
  );

  const fileNames = allLessons
    .map(lesson => lesson.slug)
    .flat()
    .filter(fileName => fileName !== '');

  const paths = fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });

  return {
    paths,
    fallback: false
  };
}

type StaticProps = {
  params: { slug: string };
};

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const courseStructure = await fetchCourseStructure();

  const lessonText = await fetchLessonText(slug);

  // handle the 404 when no lesson or course module was found
  if (lessonText === undefined || courseStructure === undefined) return { notFound: true };

  // load the lesson's markdown file, with YAML front matter support
  const lessonContent = matter(lessonText);

  // determine the next/prev lessons
  let nextSlug: string | null = null;
  let prevSlug: string | null = null;

  const allUnits = courseStructure.tracks.flatMap(track => track.units);

  const allLessons = allUnits.flatMap(module => module.lessons);

  const lesson = allLessons.filter(lesson => lesson.slug === slug)[0];

  for (let i = 0; i < allLessons.length; i++) {
    if (slug !== allLessons[i].slug) continue;

    // extract the next/prev records
    if (i > 0) prevSlug = allLessons[i - 1].slug;
    if (allLessons.length > i + 1) nextSlug = allLessons[i + 1].slug;
  }

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: lessonContent.data.title || 'Learn Solana Development',
    description:
      lessonContent.data.description ||
      'This course is designed to be the absolute best starting point for Web Developers looking to learn Web3 Development. Solana is the ideal network for starting your Web3 journey because of its high speed, low cost, energy efficiency, and more.'
  };

  return {
    props: {
      markdown: lessonContent.content,
      metadata: lessonContent.data,
      slug,
      seo,
      nextSlug,
      prevSlug,
      units: allUnits
    },
    revalidate: 60
  };
}

type PageProps = {
  markdown: string;
  metadata: LessonMetadata;
  slug: string;
  seo: NextSeoProps;
  nextSlug?: string;
  prevSlug?: string;
  units: Array<Unit>;
};

export default function Page({
  markdown,
  metadata,
  seo,
  slug,
  nextSlug,
  prevSlug,
  units: Units
}: PageProps) {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  // memo-ize the current unit
  const currentUnit = useMemo(() => {
    // TODO: not sure if type-unsafe comparison here is deliberate or not
    return Units.filter(
      unit => unit.lessons.flat().filter(item => item.slug.toLowerCase() == slug).length > 0
    )?.[0];
  }, [Units, slug]);

  return (
    <LessonLayout
      seo={{ ...placeholderSEO, ...seo }}
      title={metadata.title || seo.title || 'd'}
      href={`/course/${slug?.toLowerCase()}`}
    >
      <nav className={clsx(subnavStyles.subnav, 'mobile-only')}>
        <Link
          href={'#content'}
          onClick={() => setSelectedTab(TABS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.content && subnavStyles.activeButton
          )}
        >
          Content
        </Link>
        <Link
          href={'#objectives'}
          onClick={() => setSelectedTab(TABS.objectives)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.objectives && subnavStyles.activeButton
          )}
        >
          Objectives
        </Link>
        <Link
          href={'#progress'}
          onClick={() => setSelectedTab(TABS.progress)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.progress && subnavStyles.activeButton
          )}
        >
          Progress
        </Link>
      </nav>

      <section className={styles.wrapper + ' container-inner'}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS.content ? subnavStyles.activeTab : subnavStyles.inActiveTab
          )}
        >
          <ArticleContent markdown={markdown} className="prose" />

          {/* TODO: make the next button mark the current module as completed? */}
          <NextPrevButtons
            nextHref={`/course/${nextSlug || ''}`}
            prevHref={`/course/${prevSlug || ''}`}
            nextLabel={nextSlug ? 'Next Lesson' : 'All Lessons'}
            prevLabel={prevSlug ? 'Previous Lesson' : 'All Lessons'}
          />
        </section>

        <aside className={styles.rightSideSmall + ' ' + styles.borderLeft}>
          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.objectives ? subnavStyles.activeTab : subnavStyles.inActiveTab
            )}
          >
            <h3>Objectives</h3>

            {metadata?.objectives && metadata.objectives.length > 0 ? (
              <>
                <p className={styles.minorText}>
                  By the end of this lesson, you&apos;ll be able to:
                </p>

                <ul className="list-disc pl-8 text-gray-500 md:text-sm">
                  {metadata.objectives.map((obj, id) => (
                    <li key={id}>{obj}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={styles.minorText}>This lesson has written no objectives.</p>
            )}
          </section>

          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.progress ? subnavStyles.activeTab : subnavStyles.inActiveTab
            )}
          >
            <h3>Progress</h3>

            {currentUnit?.lessons?.map((lesson, lessonIndex) => (
              <Lesson
                key={lessonIndex}
                isSmall={true}
                isActive={slug == lesson.slug}
                title={lesson.title}
                href={`/course/${lesson.slug}`}
                lessonNumber={lessonIndex + 1}
                lab={lesson.lab}
              />
            ))}
          </section>
        </aside>
      </section>
    </LessonLayout>
  );
}
