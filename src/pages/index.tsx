import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import HomeCategoryCards from "@/components/home/HomeCategoryCards";
import HomeResourceCards from "@/components/home/HomeResourceCards";
import LargeCTACard from "@/components/core/LargeCTACard";
import FeaturedContentCards from "@/components/core/FeaturedContentCards";
import ContentCard from "@/components/core/ContentCard";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

// this is a temporary variable used to simulate the serverSideProps
const posts = [0, 0, 0, 0];

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container py-20" heroSize="lg">
        <h1>
          Your <span className="gradient-solana">Solana</span> homepage
        </h1>

        <p className="max-w-lg text-lg md:text-xl">
          Stay up-to-date with the latest updates, learning, and happenings in
          the Solana ecosystem.
        </p>
      </PageHero>

      <section className="py-8 space-y-8">
        <HomeCategoryCards className="-mt-24" />

        <FeaturedContentCards title="Featured">
          {posts.map((post, id) => (
            <ContentCard
              key={id}
              className="lg:max-w-full w-72 max-w-[70%]"
              isExternal={true}
              isHot={true}
              href="#"
              title="A Guide to Full Stack Development on Solana"
              authorLabel="Nader Dabit"
              authorHref="#"
              imageSrc="/img/cta/1.jpg"
              description="Learn how to build end-to-end products on Solana with this tutorial covering React, Anchor, Rust, and Phantom."
              tags="beginner, web3.js, anchor, solana, beginner, web3.js, anchor"
            />
          ))}
        </FeaturedContentCards>

        <LargeCTACard
          title="Changelog"
          text="Weekly updates on the Solana ecosystem"
          ctaLabel="Get caught up"
          ctaHref="/changelog"
          backgroundImage="/img/cta/changelog.svg"
        />

        <FeaturedContentCards title="Latest">
          {posts.map((post, id) => (
            <ContentCard
              key={id}
              isExternal={true}
              isHot={true}
              href="#"
              title="A Guide to Full Stack Development on Solana"
              authorLabel="Nader Dabit"
              authorHref="#"
              imageSrc="/img/cta/1.jpg"
              description="Learn how to build end-to-end products on Solana with this tutorial covering React, Anchor, Rust, and Phantom."
              tags="beginner, web3.js, anchor, solana, beginner, web3.js, anchor"
            />
          ))}
        </FeaturedContentCards>

        <HomeResourceCards className="" />
      </section>
    </DefaultLayout>
  );
}
