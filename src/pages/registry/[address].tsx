import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/registry.module.css";

import Link from "next/link";
import PageHero from "@/components/core/PageHero";
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

        <div className="justify-center space-x-3 space-y-2 lg:space-y-0 lg:flex">
          <Link href={"/registry"} className="btn btn-default">
            {/* <ArrowLeftIcon className="mr-2 icon" /> */}
            Back to IDL Registry
          </Link>
          <Link
            href={`https://explorer.solana.com/address/${program.address}`}
            target="_blank"
            className="btn btn-dark"
          >
            View on Solana Explorer
            {/* <ArrowTopRightOnSquareIcon className="ml-2 icon" /> */}
          </Link>
        </div>
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

        <nav className={styles.idlNav}>
          <Link href={"#instructions"} className={`btn ${styles.active}`}>
            Instructions
          </Link>
          <Link href={"#accounts"} className={`btn`}>
            Accounts
          </Link>
          <Link href={"#types"} className={`btn`}>
            Types
          </Link>
          <Link href={"#errors"} className={`btn`}>
            Errors
          </Link>
          <Link href={"#constants"} className={`btn`}>
            Constants
          </Link>
          <Link href={"#events"} className={`btn`}>
            Events
          </Link>
        </nav>

        <main className="">
          <section></section>
          <table className={styles.dataTable}>
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
      </section>
    </DefaultLayout>
  );
}
