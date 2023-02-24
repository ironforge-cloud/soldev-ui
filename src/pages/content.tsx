import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import { FormEvent } from "react";
import Dropdown from "@/components/core/Dropdown";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Submit",
  description: "",
};

// define the allowed listing of selectable items in the form
const CONTENT_LEVELS = [
  // { label: "Beginner", value: 6, href: "/#demo" },
  "Beginner",
  "Intermediate",
  "Advanced",
];
const CONTENT_TYPES = [
  "Tutorials",
  "Projects",
  "Tools",
  "SPL",
  "Articles",
  "SDK",
  "Implementations",
  "Threads",
  "Podcasts",
  "Scaffolds",
  "Security",
];
const TAG_LISTING = [
  {
    label: "Industry",
    options: ["DeFi", "Gaming", "Governance", "Mobile", "Security"],
  },
  {
    label: "Protocol",
    options: ["Serum", "OpenBook", "Metaplex", "Arweave", "SolanaPay"],
  },
  {
    label: "Framework",
    options: ["Anchor", "Web3.js", "React.js", "Svelte", "Vue.js", "Seahorse"],
  },
  {
    label: "Language",
    options: [
      "Rust",
      "JavaScript",
      "C#",
      "Golang",
      "Python",
      "Java",
      "Swift",
      "CLI/Shell",
      "Kotlin",
    ],
  },
];

export default function Page() {
  // function to handle form submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get the form and its data
    const form = document.getElementById("submitForm") as HTMLFormElement;
    const formData = new FormData(form);

    for (const [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }

    // alert("handle submit");
  }

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>Submit new content</h1>

        <p className="max-w-lg text-lg md:text-xl">
          Propose new content for the platform. Submissions are manually
          reviewed before they&apos;re published.
        </p>
      </PageHero>

      <section className="container max-w-3xl">
        <form id="submitForm" onSubmit={handleSubmit} className="space-y-6">
          <div className="form-item">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder=""
              className="input"
            />
          </div>
          <div className="form-item">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder=""
              className="input"
            />
            <p className="minor-text">Name, Username or Social Platform link</p>
          </div>
          <div className="form-item">
            <label htmlFor="url">Content URL</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder=""
              className="input"
            />
          </div>
          <div className="form-item">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder=""
              className="input h-32 min-h-[6em]"
            />
          </div>

          <div className="form-item">
            <label htmlFor="url">Content Type</label>
            <Dropdown items={CONTENT_TYPES} name="type" />
            {/* <p className="minor-text">this is optional minor text</p> */}
          </div>
          <div className="form-item">
            <label htmlFor="url">Level</label>
            <Dropdown items={CONTENT_LEVELS} name="level" />
            <p className="minor-text">
              Select content difficulty for optimal discovery.
            </p>
          </div>

          <div className="form-item">
            <label htmlFor="tags">Tags</label>
            <p className="minor-text">
              Tags will improve content discovery, select as many as you see
              fit.
            </p>

            <section className="grid grid-cols-2 gap-6 pt-6 md:grid-cols-4">
              {TAG_LISTING.map(
                (category, catId) =>
                  category.options?.length > 0 && (
                    <div className="space-y-2" key={catId}>
                      <h5 className="text-sm">{category.label}</h5>
                      <ul className="checklist">
                        {category.options.map((option, optionId) => (
                          <li key={optionId}>
                            <input type="checkbox" name="" id="industry_defi" />
                            <label htmlFor="industry_defi">{option}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
              )}
            </section>
          </div>

          <div className="flex items-center justify-end space-x-4 space-y-0 form-item">
            <button type="reset" className="btn-outline">
              Clear
            </button>
            <button type="submit" className="btn-dark">
              Submit
            </button>
          </div>
        </form>
      </section>
    </DefaultLayout>
  );
}
