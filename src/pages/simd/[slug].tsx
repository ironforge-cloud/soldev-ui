import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/registry.module.css";
import Link from "next/link";

import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";
import IDLNav from "@/components/registry/IDLNav";

import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Registry page",
  description: "",
};

export default function Page() {
  const program = {
    title: "jet_staking",
    network: "mainnet",
    address: "9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF",
  };

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>{program.title}</h1>

        {/* <p className="max-w-2xl text-xl">
          optional paragraph text
        </p> */}

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/registry"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to IDL Registry
          </Link>
          <Link
            href={`https://explorer.solana.com/address/${program.address}`}
            target="_blank"
            className={`btn btn-dark ${heroStyles.ctaBtn}`}
          >
            View on Solana Explorer
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <section className={"container"}>
        <nav className={styles.registryNav}>
          <Link href={"#idl"} className={` ${styles.active}`}>
            IDL
          </Link>
          <Link href={"#accounts-data"} className={``}>
            Accounts Data
          </Link>
        </nav>

        <IDLNav />
      </section>

      <main
        className={`container-inner ${styles.scrollContainer} hide-scroll-bar`}
      >
        <table className={`${styles.dataTable} hide-scroll-bar`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Arguments</th>
              <th>Accounts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>addUri</td>
              <td>
                <ul className={styles.dataList}>
                  <li>
                    <span>index</span>
                    <span className={`${styles.badge} ${styles.badge}`}>
                      u16
                    </span>
                  </li>
                  <li>
                    <span>relativeUri</span>
                    <span className={`${styles.badge} ${styles.badge}`}>
                      string
                    </span>
                  </li>
                </ul>
              </td>
              <td>
                <ul className={styles.dataList}>
                  <li>
                    <span>user</span>
                    <span className={styles.badgeRed}>isSigner</span>
                    <span className={styles.badgeGreen}>isMut</span>
                  </li>
                  <li>
                    <span>uris</span>
                    <span className={styles.badgeBlue}>isMut</span>
                  </li>
                  <li>
                    <span>systemProgram</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </DefaultLayout>
  );
}
