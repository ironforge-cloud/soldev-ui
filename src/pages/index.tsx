import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import HomeCategoryCards from "@/components/home/HomeCategoryCards";
import HomeResourceCards from "@/components/home/HomeResourceCards";
import HomeFeaturedContent from "@/components/home/HomeFeaturedContent";
import LargeCTACard from "@/components/core/LargeCTACard";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container py-20" heroSize="lg">
        <h1 className="text-6xl tracking-normal">
          Your <span className="gradient-solana">Solana</span> homepage
        </h1>

        <p className="max-w-lg mx-auto text-xl">
          Stay up-to-date with the latest updates, learning, and happenings in
          the Solana ecosystem.
        </p>
      </PageHero>

      <section className="py-8 space-y-8">
        <HomeCategoryCards className="-mt-24" />

        <HomeFeaturedContent className="container" />

        <LargeCTACard
          title="Changelog"
          text="Weekly updates on the Solana ecosystem"
          ctaLabel="Get caught up"
          ctaHref="/changelog"
          backgroundImage="/img/cta/changelog.svg"
        />

        <HomeFeaturedContent className="container" />

        <HomeResourceCards className="" />
      </section>
    </DefaultLayout>
  );
}
