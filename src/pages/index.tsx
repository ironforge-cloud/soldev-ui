import DefaultLayout from "@/layouts/default";
import { NextSeoProps } from "next-seo";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <p>home</p>
    </DefaultLayout>
  );
}
