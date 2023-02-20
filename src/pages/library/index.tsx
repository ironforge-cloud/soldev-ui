import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
// import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Library",
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1 className="text-6xl tracking-normal">Library</h1>

        <p className="max-w-lg mx-auto text-xl">
          Check out the latest and greatest tutorials, articles, podcasts, and
          more.
        </p>
      </PageHero>

      <section className={styles.wrapper + " container-inner"}>
        <section className={styles.rightSideLarge}>
          <main className={styles.gridContainer}>
            <ContentCard
              href="#"
              title="A Guide to Full Stack Development on Solana"
              authorLabel="Nader Dabit"
              authorHref="#"
              imageSrc="/img/cta/1.jpg"
              description="Learn how to build end-to-end products on Solana with this tutorial covering React, Anchor, Rust, and Phantom."
              tags="beginner, web3.js, anchor, solana, beginner, web3.js, anchor"
            />
            <ContentCard
              href="#"
              isHot={true}
              title="Create a Solana dApp from Scratch"
              authorLabel="@LORISMATIC"
              authorHref="#"
              imageSrc="/img/cta/0.jpg"
              description="In this series, we'll implement a simplified version of Twitter as a Solana dApp. We'll write our own program and use it in a custom VueJS app."
              tags="beginner, anchor, javascript"
            />
            <ContentCard
              href="#"
              title="Solana 101"
              authorLabel="Figment"
              authorHref="#"
              imageSrc="/img/cta/4.jpg"
              description="Getting started with Solana by doing all the basic essentials from setup to deploying a program, to interacting with that program."
              tags="beginner, web3.js, solana, javascript, rust"
            />
            <ContentCard
              href="#"
              isHot={true}
              title="Intro to Programming on Solana"
              authorLabel="paulx"
              authorHref="#"
              imageSrc="/img/cta/5.jpg"
              description="Introductory guide for building a smart contract on Solana using a simple escrow program example."
              tags="beginner, web3.js, rust"
            />
            <ContentCard
              href="#"
              title="A Guide to Full Stack Development on Solana"
              authorLabel="Nader Dabit"
              authorHref="#"
              imageSrc="/img/cta/1.jpg"
              description="Learn how to build end-to-end products on Solana with this tutorial covering React, Anchor, Rust, and Phantom."
              tags="beginner, web3.js, anchor, solana, beginner, web3.js, anchor"
            />
            <ContentCard
              href="#"
              title="Create a Solana dApp from Scratch"
              authorLabel="@LORISMATIC"
              authorHref="#"
              imageSrc="/img/cta/0.jpg"
              description="In this series, we'll implement a simplified version of Twitter as a Solana dApp. We'll write our own program and use it in a custom VueJS app."
              tags="beginner, anchor, javascript"
            />
            <ContentCard
              href="#"
              title="Solana 101"
              authorLabel="Figment"
              authorHref="#"
              imageSrc="/img/cta/4.jpg"
              description="Getting started with Solana by doing all the basic essentials from setup to deploying a program, to interacting with that program."
              tags="beginner, web3.js, solana, javascript, rust"
            />
            <ContentCard
              href="#"
              title="Intro to Programming on Solana"
              authorLabel="paulx"
              authorHref="#"
              imageSrc="/img/cta/5.jpg"
              description="Introductory guide for building a smart contract on Solana using a simple escrow program example."
              tags="beginner, web3.js, rust"
            />
          </main>
        </section>

        <aside className={styles.leftSideSmall + " " + styles.stickySidebar}>
          <section className={styles.section}>
            <h3>
              Type
              {/* <QuestionMarkCircleIcon /> */}
            </h3>

            {/* <p className={styles.minorText}>Optional minor content</p> */}

            <ul className={styles.listing}>
              <li>
                <input type="checkbox" name="" id="type_tutorials" />
                <label htmlFor="type_tutorials">Tutorials</label>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Level</h3>

            <ul className={styles.listing}>
              <li>
                <input type="checkbox" name="" id="level_beginner" />
                <label htmlFor="level_beginner">Beginner</label>
              </li>
              <li>
                <input type="checkbox" name="" id="level_intermediate" />
                <label htmlFor="level_intermediate">Intermediate</label>
              </li>
              <li>
                <input type="checkbox" name="" id="level_advanced" />
                <label htmlFor="level_advanced">Advanced</label>
              </li>
            </ul>
          </section>
        </aside>
      </section>
    </DefaultLayout>
  );
}
