import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import styles from "@/styles/core/sidebar.module.css";
import IDLCard from "@/components/registry/IDLCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "IDL Registry",
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-8">
        <h1>IDL Registry</h1>

        {/* <p className="max-w-lg text-xl">optional minor text</p> */}

        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
          <div className="inputWithIcon">
            <label htmlFor="site_search">
              <MagnifyingGlassIcon />
            </label>
            <input
              type="text"
              id="site_search"
              name="k"
              placeholder="Search programs by name or address"
            />
          </div>
        </form>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
        <IDLCard
          href="/registry/9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
          title="jet_staking"
          network="mainnet"
          address="9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF"
        />
      </main>
    </DefaultLayout>
  );
}
