import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Newsletter",
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Newsletter</h1>

        <p className="max-w-lg text-xl">
          The latest news and updates from the Solana Foundation.
        </p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        <ContentCard
          // isExternal={true}
          href="/newsletter/slug"
          title="Solana Tech Roundup"
          authorLabel="Jacob Creech"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Solana Tech Roundup This past week there has been progress on offline message signing. This highly requested feature."
          isLarge={true}
        />
        <ContentCard
          href="/newsletter/slug"
          title="Solana Tech Roundup"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Solana Tech Roundup This past week there has been progress on offline message signing. This highly requested feature."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Solana 101"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Getting started with Solana by doing all the basic essentials from setup to deploying a program, to interacting with that program."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Intro to Programming on Solana"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Introductory guide for building a smart contract on Solana using a simple escrow program example."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Solana Tech Roundup"
          authorLabel="Nader Dabit"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Solana Tech Roundup This past week there has been progress on offline message signing. This highly requested feature."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Solana Tech Roundup"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Solana Tech Roundup This past week there has been progress on offline message signing. This highly requested feature."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Solana 101"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Getting started with Solana by doing all the basic essentials from setup to deploying a program, to interacting with that program."
        />
        <ContentCard
          href="/newsletter/slug"
          title="Intro to Programming on Solana"
          authorLabel="Solana Foundation"
          // authorHref="#"
          imageSrc="/img/content/newsletter_cover.jpg"
          description="Introductory guide for building a smart contract on Solana using a simple escrow program example."
        />
      </main>
    </DefaultLayout>
  );
}
