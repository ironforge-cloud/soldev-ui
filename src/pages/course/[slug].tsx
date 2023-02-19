import { NextSeoProps } from "next-seo";
import LessonLayout from "@/layouts/lesson";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Course lesson page",
  description: "",
};

export default function Page() {
  return (
    <LessonLayout seo={seo} title="Reading data from the network" href="#">
      <section className="grid grid-cols-4 gap-5 mx-auto container-inner-xl">
        <section className="min-h-full col-span-3 p-8 space-y-8">
          <article>content</article>

          <section className="flex w-full space-x-8 font-semibold">
            <Link
              href={"#"}
              className="inline-flex justify-start w-1/2 space-x-5 btn btn-light"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous lesson</span>
            </Link>
            <Link
              href={"#"}
              className="inline-flex justify-end w-1/2 space-x-5 btn btn-light"
            >
              <span>Next lesson</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </section>
        </section>

        <aside className="min-h-full col-span-1 border-l border-gray-300 divide-y divide-gray-300">
          <div className="p-8">
            <h3>Objectives</h3>

            <p className="py-1 text-sm italic text-gray-500">
              By the end of this lesson, you&apos;ll be able to:
            </p>

            <ul className="pl-8 text-sm text-gray-500 list-disc">
              <li>Explain accounts</li>
              <li>Explain SOL and lamports</li>
              <li>Explain public keys</li>
              <li>Explain the JSON RPC API</li>
              <li>Explain web3.js</li>
              <li>Install web3.js</li>
              <li>Use web3.js to create a connection to a Solana node</li>
              <li>
                Use web3.js to read data from the blockchain (balance, account
                info, etc.)
              </li>
            </ul>
          </div>

          <div className="p-8">
            <h3>Progress</h3>
          </div>
        </aside>
      </section>
    </LessonLayout>
  );
}
