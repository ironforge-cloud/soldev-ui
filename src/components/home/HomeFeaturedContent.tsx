import styles from "@/styles/ContentCard.module.css";
import ContentCard from "@/components/core/ContentCard";

type ComponentProps = {
  className?: string;
};

export default function HomeFeaturedContent({ className }: ComponentProps) {
  return (
    // <section className={`container-inner ${styles.container} ${className}`}>
    <section className={`space-y-5 px-5 ${className}`}>
      <h2 className="text-2xl">Featured</h2>

      <div className={`${styles.container} py-5 border-t border-gray-200`}>
        <ContentCard
          isHot={true}
          href="#"
          title="A Guide to Full Stack Development on Solana"
          authorLabel="Nader Dabit"
          authorHref="#"
          imageSrc="/img/cta/1.jpg"
          description="Learn how to build end-to-end products on Solana with this tutorial covering React, Anchor, Rust, and Phantom."
          tags="beginner, web3.js, anchor, solana, beginner, web3.js, anchor"
        />
        <ContentCard
          isHot={true}
          href="#"
          title="Create a Solana dApp from Scratch"
          authorLabel="@LORISMATIC"
          authorHref="#"
          imageSrc="/img/cta/0.jpg"
          description="In this series, we'll implement a simplified version of Twitter as a Solana dApp. We'll write our own program and use it in a custom VueJS app."
          tags="beginner, anchor, javascript"
        />
        <ContentCard
          isHot={true}
          href="#"
          title="Solana 101"
          authorLabel="Figment"
          authorHref="#"
          imageSrc="/img/cta/4.jpg"
          description="Getting started with Solana by doing all the basic essentials from setup to deploying a program, to interacting with that program."
          tags="beginner, web3.js, solana, javascript, rust"
        />
        <ContentCard
          isHot={true}
          href="#"
          title="Intro to Programming on Solana"
          authorLabel="paulx"
          authorHref="#"
          imageSrc="/img/cta/5.jpg"
          description="Introductory guide for building a smart contract on Solana using a simple escrow program example."
          tags="beginner, web3.js, rust"
        />
      </div>
    </section>
  );
}
