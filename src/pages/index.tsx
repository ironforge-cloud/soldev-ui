import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo} withHero={true}>
      <PageHero className="container">
        <h1>welcome</h1>
      </PageHero>

      <section className="container">
        <p>home</p>
      </section>
    </DefaultLayout>
  );
}
