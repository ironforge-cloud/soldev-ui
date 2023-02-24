import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import LibraryFilters from "@/components/library/LibraryFilters";
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
        <h1>Library</h1>

        <p className="max-w-lg text-xl">
          Check out the latest and greatest tutorials, articles, podcasts, and
          more.
        </p>
      </PageHero>

      <section className={styles.wrapper + " container-inner"}>
        <section className={styles.rightSideLarge}>
          <main className={styles.gridContainer}>
            <ContentCard
              isExternal={true}
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
              isExternal={true}
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
          <LibraryFilters className="" />
        </aside>
      </section>
    </DefaultLayout>
  );
}
