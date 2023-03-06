import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { SITE_GITHUB_URL, SITE_TWITTER_HANDLE } from '@/lib/constants/general';
import styles from '@/styles/core/footer.module.css';

type ComponentProps = {
  children?: React.ReactNode;
};

export default function AppFooter({ children }: ComponentProps) {
  return (
    <footer className={styles.footer}>
      <section className={clsx('container', styles.inner)}>
        <section className={styles.metaArea}>
          <Link href={'/'}>
            <Image src={'/logo-light.svg'} alt="Logo" width={124} height={0} />
          </Link>

          <p className="">
            Stay up-to-date with the latest updates, learning, and happenings in the Solana
            ecosystem.
          </p>

          <section className="inline-flex space-x-3">
            <Link href={SITE_GITHUB_URL}>
              <Image
                src={'/img/icons/github.svg'}
                width={24}
                height={24}
                alt={'SolDev on GitHub'}
              />
            </Link>
            <Link href={`https://twitter.com/${SITE_TWITTER_HANDLE}`}>
              <Image
                src={'/img/icons/twitter.svg'}
                width={24}
                height={24}
                alt={'SolDev on Twitter'}
              />
            </Link>
          </section>
        </section>

        <LearnFooterLinks />
        <LibraryFooterLinks />
        <UpdatesFooterLinks />
        <ResourcesFooterLinks />
        <TeamFooterLinks />

        <section className={styles.copyright}>
          &copy; {new Date().getFullYear()} Ironforge, Inc. All rights reserved.
        </section>
      </section>
    </footer>
  );
}

function LearnFooterLinks() {
  return (
    <ul className={styles.linkArea}>
      <li>
        <h4>Learn</h4>
      </li>
      <li>
        <Link href={'/course'}>Intro to Solana</Link>
      </li>
      <li>
        <Link target="_blank" href={'https://solanacookbook.com/'}>
          Solana Cookbook
        </Link>
      </li>
      <li>
        <Link href={'/library/playlist/solana-bootcamp'}>Solana Bootcamp</Link>
      </li>
      <li>
        <Link target="_blank" href={'https://buildspace.so/solana-core'}>
          buildspace Solana Core
        </Link>
      </li>
    </ul>
  );
}

function LibraryFooterLinks() {
  return (
    <ul className={styles.linkArea}>
      <li>
        <h4>Library</h4>
      </li>
      <li>
        <Link href={'/library?types=tutorials'}>Tutorials</Link>
      </li>
      <li>
        <Link href={'/library?types=articles'}>Articles</Link>
      </li>
      <li>
        <Link href={'/library?types=podcasts'}>Podcasts</Link>
      </li>
    </ul>
  );
}

function UpdatesFooterLinks() {
  return (
    <ul className={styles.linkArea}>
      <li>
        <h4>Updates</h4>
      </li>
      <li>
        <Link href={'/newsletter'}>Newsletter</Link>
      </li>
      <li>
        <Link href={'/changelog'}>Changelog</Link>
      </li>
      <li>
        <Link href={'/library/playlist/core-community-calls'}>Community Calls</Link>
      </li>
      <li>
        <Link href={'/library/playlist/superteam-ecosystem-calls'}>Ecosystem Calls</Link>
      </li>
      <li>
        <Link href={'/library/playlist/validator-community-discussions'}>
          Validator Discussions
        </Link>
      </li>
    </ul>
  );
}

function ResourcesFooterLinks() {
  return (
    <ul className={styles.linkArea}>
      <li>
        <h4>Resources</h4>
      </li>
      <li>
        <Link href={'/registry'}>IDL Registry</Link>
      </li>
      <li>
        <Link href={'/simd'}>SIMD</Link>
      </li>
      <li>
        <Link target="_blank" href={'https://solana.stackexchange.com/'}>
          Stack Exchange
        </Link>
      </li>
      <li>
        <Link target="_blank" href={'https://earn.superteam.fun/opportunities/category/jobs'}>
          Jobs
        </Link>
      </li>
      <li>
        <Link target="_blank" href={'https://earn.superteam.fun/opportunities/category/bounties'}>
          Bounties
        </Link>
      </li>
      <li>
        <Link target="_blank" href={'https://earn.superteam.fun/opportunities/category/grants'}>
          Grants
        </Link>
      </li>
    </ul>
  );
}

function TeamFooterLinks() {
  return (
    <ul className={styles.linkArea}>
      <li>
        <h4>Team</h4>
      </li>
      <li>
        <Link href={'#'}>Wallet Connect</Link>
      </li>
    </ul>
  );
}
