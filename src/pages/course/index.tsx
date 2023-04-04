import { NextSeoProps } from 'next-seo';
import DefaultLayout from '@/layouts/default';

import Link from 'next/link';
import PageHero from '@/components/core/PageHero';
import CourseModuleItem from '@/components/course/CourseModuleItem';
import { fetchModuleMap } from '@/utils/fetch-course';
import CourseModule from '@/components/course/CourseModule';
import { CourseModule as CourseModuleType } from '@/utils/fetch-course';

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: 'Solana Development Course',
  description: ''
};

type PageProps = {
  courseModules: CourseModuleType[];
};

export async function getStaticProps() {
  const courseModules = await fetchModuleMap().then(res => res.data);

  return {
    props: {
      courseModules
    }
  };
}

export default function Page({ courseModules }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-3 text-center">
        <h1>
          <Link href={'/course'}>Intro to Solana</Link>
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
          Welcome to the best starting point for Web Developers looking to learn Web3 Development.
          Solana&apos;s high speed, low cost, and energy efficiency make it the ideal network to
          learn on.
        </p>
      </PageHero>

      <section className="container max-w-4xl">
        {courseModules.map((module, id) => (
          <CourseModule key={id} moduleNumber={module.number} title={module.title}>
            {module.lessons.map((lesson, id) => (
              <CourseModuleItem
                key={id}
                title={lesson.title}
                href={`/course/${lesson.slug}`}
                lessonNumber={lesson?.number && lesson.number > 0 ? lesson.number : id + 1}
                isHidden={lesson?.hidden}
                // minuteCounter={2}
              />
            ))}
          </CourseModule>
        ))}
      </section>
    </DefaultLayout>
  );
}
