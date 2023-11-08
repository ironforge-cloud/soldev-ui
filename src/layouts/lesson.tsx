import { NextSeo, NextSeoProps } from 'next-seo';
import AppHeader from '@/components/core/AppHeader';
import AppFooter from '@/components/core/AppFooter';
import Link from 'next/link';

import heroStyles from '@/styles/PageHero.module.css';
import PageHero from '@/components/core/PageHero';
import { shareOnTwitterUrl } from '@/utils/helpers';
import LanguagePicker from '@/components/core/LanguagePicker';

type LayoutProps = {
  children: React.ReactNode;
  seo?: NextSeoProps;
  className?: string;
  title: string;
  href: string;
};

export default function LessonLayout({ children, seo, className, title, href }: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className={className}>
        <PageHero className="container text-center">
          <h1>
            <Link href={href}>{title}</Link>
          </h1>

          {/* <p className="max-w-2xl space-x-3 text-base text-gray-500">
            <span>Lesson 1</span>
            <span>&bull;</span>
            <span>4 minutes</span>
          </p> */}

          <section className={heroStyles.ctaSection}>
            <Link href={'/course'} className={`btn btn-default ${heroStyles.ctaBtn}`}>
              {/* <ArrowLeftIcon className="icon" /> */}
              Back to course
            </Link>
            <Link
              target="_blank"
              href={shareOnTwitterUrl({
                href: href,
                message: `Checkout this lesson "${title}" from the Solana Development Course`
              })}
              className={`btn btn-dark ${heroStyles.ctaBtn}`}
            >
              Share on twitter
              {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
            </Link>

            <LanguagePicker />
          </section>
        </PageHero>

        {children}
      </main>

      <AppFooter />
    </>
  );
}
