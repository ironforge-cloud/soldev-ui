import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";

import Link from "next/link";
import PageHero from "@/components/core/PageHero";
import CourseModule from "@/components/course/CourseModule";
import CourseModuleItem from "@/components/course/CourseModuleItem";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Solana Development Course",
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container text-center">
        <h1 className="text-6xl tracking-normal">Intro to Solana</h1>

        <p className="text-gray-500">
          by{" "}
          <Link
            className="underline"
            href="https://twitter.com/jamesrp13"
            target="_blank"
            rel="noreferrer"
          >
            James Pachenco
          </Link>{" "}
          and{" "}
          <Link
            className="underline"
            href="https://github.com/Unboxed-Software/solana-course/graphs/contributors?type=a"
            target="_blank"
            rel="noreferrer"
          >
            others
          </Link>
        </p>

        <p className="max-w-2xl mx-auto text-xl text-gray-300">
          Welcome to the best starting point for Web Developers looking to learn
          Web3 development. Solana&apos;s high speed, low cost, and energy
          efficieny makes it the ideal network to learn on.
        </p>
      </PageHero>

      <section className="container">
        <CourseModule
          moduleNumber={1}
          title={"Client interaction with the Solana Network"}
        >
          <CourseModuleItem
            title="Read data from the network"
            href="/course/intro-to-reading-data"
            lessonNumber={1}
            minuteCounter={2}
          />
          <CourseModuleItem
            title="Write data to the network"
            href="/course/intro-to-writing-data"
            lessonNumber={2}
            minuteCounter={9}
          />
          <CourseModuleItem
            title="Interact with wallets"
            href="/course/interact-with-wallets"
            lessonNumber={3}
            minuteCounter={14}
          />
        </CourseModule>

        <CourseModule
          moduleNumber={2}
          title={"Client interaction with common Solana programs"}
        >
          <CourseModuleItem
            title="Create tokens with the Token Program"
            href="/course/token-program"
            lessonNumber={1}
            minuteCounter={2}
          />
          <CourseModuleItem
            title="Swap tokens with the Token Swap Program"
            href="/course/token-swap"
            lessonNumber={2}
            minuteCounter={9}
          />
          <CourseModuleItem
            title="Create Solana NFTs With Metaplex"
            href="/course/nfts-with-metaplex"
            lessonNumber={3}
            minuteCounter={14}
          />
        </CourseModule>
      </section>
    </DefaultLayout>
  );
}
