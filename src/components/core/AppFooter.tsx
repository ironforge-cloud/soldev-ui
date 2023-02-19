import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { SITE_GITHUB, SITE_NAME, SITE_TWITTER } from "@/lib/constants/general";
import styles from "@/styles/core/footer.module.css";

type ComponentProps = {
  children?: React.ReactNode;
};

export default function AppFooter({ children }: ComponentProps) {
  return (
    <footer className={styles.footer}>
      <section className={clsx("container", styles.inner)}>
        <section className={styles.metaArea}>
          <Link href={"/"}>
            <Image src={"/logo-light.svg"} alt="Logo" width={124} height={0} />
          </Link>

          <p className="">
            Stay up-to-date with the latest updates, learning, and happenings in
            the Solana ecosystem.
          </p>

          <section className="flex">
            <Link href={SITE_GITHUB}>GH</Link>
            <Link href={SITE_TWITTER}>Twitter</Link>
          </section>
        </section>

        <LearnFooterLinks />
        <LibraryFooterLinks />
        <UpdatesFooterLinks />
        <ResourcesFooterLinks />
        <TeamFooterLinks />

        <section className={styles.copyright}>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
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
        <Link href={"#"}>Intro to Solana</Link>
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
        <Link href={"/library/tutorials"}>Tutorials</Link>
      </li>
      <li>
        <Link href={"/library/articles"}>Articles</Link>
      </li>
      <li>
        <Link href={"/library/podcasts"}>Podcasts</Link>
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
        <Link href={"/newsletter"}>Newsletter</Link>
      </li>
      <li>
        <Link href={"/changelog"}>Changelog</Link>
      </li>
      <li>
        <Link href={"#"}>Dev Call</Link>
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
        <Link href={"/registry"}>IDL Registry</Link>
      </li>
      <li>
        <Link href={"/simd"}>SIMD</Link>
      </li>
      <li>
        <Link
          target="_blank"
          href={"https://earn.superteam.fun/opportunities/category/jobs"}
        >
          Jobs
        </Link>
      </li>
      <li>
        <Link
          target="_blank"
          href={"https://earn.superteam.fun/opportunities/category/bounties"}
        >
          Bounties
        </Link>
      </li>
      <li>
        <Link
          target="_blank"
          href={"https://earn.superteam.fun/opportunities/category/grants"}
        >
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
        <Link href={"#"}>Wallet Connect</Link>
      </li>
    </ul>
  );
}
