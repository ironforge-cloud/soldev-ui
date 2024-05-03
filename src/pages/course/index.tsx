import { NextSeoProps } from 'next-seo';
import DefaultLayout from '@/layouts/default';

import Link from 'next/link';
import PageHero from '@/components/core/PageHero';
import Lesson from '@/components/course/Lesson';
import { fetchCourseStructure, fetchCourseTranslations } from '@/utils/fetch-course';
import Unit from '@/components/course/Unit';
import { CourseStructure, Translations } from '@/lib/types';
import { Fragment } from 'react';

import LanguagePicker from '@/components/core/LanguagePicker';

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: 'Solana Development Course',
  description: ''
};

type PageProps = {
  CourseStructure: CourseStructure;
  courseTranslations: Translations;
};

type StaticProps = {
  locale?: string;
};

export async function getStaticProps({ locale }: StaticProps) {
  const courseStructure = await fetchCourseStructure();
  const courseTranslations = await fetchCourseTranslations(locale);

  return {
    props: {
      CourseStructure: courseStructure,
      courseTranslations
    },
    revalidate: 60 * 60 // 1 hour in seconds
  };
}

export default function Page({ CourseStructure, courseTranslations }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-3 text-center">
        <h1>
          <Link href={'/course'}>Solana Development Course</Link>
        </h1>

        <p className="text-base text-gray-500">
          by{' '}
          <Link
            className="underline"
            href="https://twitter.com/jamesrp13"
            target="_blank"
            rel="noreferrer"
          >
            James Pacheco
          </Link>{' '}
          and{' '}
          <Link
            className="underline"
            href="https://github.com/Unboxed-Software/solana-course/graphs/contributors?type=a"
            target="_blank"
            rel="noreferrer"
          >
            others
          </Link>
        </p>

        <p className="max-w-2xl md:text-xl">
          Welcome to the best place for Web Developers looking to learn Web3 development.
          Solana&apos;s high speed, low cost, and energy efficiency make it the ideal network to
          build on.
        </p>

        <LanguagePicker />
      </PageHero>

      <section className="container max-w-4xl">
        {CourseStructure.tracks.map((track, trackIndex) => (
          <Fragment key={trackIndex}>
            <h2 className="text-4xl">{courseTranslations[track.slug] || track.title} </h2>
            {track.units.map((unit, unitIndex) => (
              <Unit
                key={unitIndex}
                moduleNumber={unitIndex + 1}
                title={courseTranslations[unit.slug] || unit.title}
              >
                {unit.lessons.map((lesson, lessonIndex) => (
                  <Lesson
                    key={lessonIndex}
                    title={courseTranslations[lesson.slug] || lesson.title}
                    href={`/course/${lesson.slug}`}
                    lessonNumber={lessonIndex + 1}
                    lab={lesson?.lab}
                    isHidden={lesson?.hidden}
                  />
                ))}
              </Unit>
            ))}
          </Fragment>
        ))}
      </section>
    </DefaultLayout>
  );
}
