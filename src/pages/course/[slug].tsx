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
import { CourseModule, fetchLesson, fetchModuleMap } from '@/utils/fetch-course';
import CourseModuleItem from '@/components/course/CourseModuleItem';

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
  const courseModules = await fetchModuleMap().then(res => res.data);

  // handle the 404 when course modules were not found
  if (courseModules === undefined) return { notFound: true };

  const fileNames = courseModules
    .map(module => {
      return module.lessons.map(lesson => lesson.slug);
    })
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
  const courseModules = await fetchModuleMap().then(res => res.data);

  const lesson = await fetchLesson(slug.concat('.md'));

  // handle the 404 when no lesson or course module was found
  if (lesson.data === undefined || courseModules === undefined) return { notFound: true };

  // load the lesson's markdown file, with YAML front matter support
  const lessonContent = matter(lesson.data);

  // determine the next/prev lessons
  let nextSlug: string | null = null;
  let prevSlug: string | null = null;

  const lessonListing = courseModules.flatMap(item => item.lessons.flat());

  for (let i = 0; i < lessonListing.length; i++) {
    if (slug !== lessonListing[i].slug) continue;

    // extract the next/prev records
    if (i > 0) prevSlug = lessonListing[i - 1].slug;
    if (lessonListing.length > i + 1) nextSlug = lessonListing[i + 1].slug;
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
      courseModules
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
  courseModules: CourseModule[];
};

export default function Page({
  markdown,
  metadata,
  seo,
  slug,
  nextSlug,
  prevSlug,
  courseModules
}: PageProps) {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  // memo-ize the current module
  const currentModule = useMemo(() => {
    return courseModules.filter(
      item => item.lessons.flat().filter(item => item.slug.toLowerCase() == slug).length > 0
    )?.[0];
  }, [courseModules, slug]);

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

            {currentModule?.lessons?.map((item, id) => (
              <CourseModuleItem
                key={id}
                isSmall={true}
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
