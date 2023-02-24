import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import { FormEvent } from "react";
import Dropdown from "@/components/core/Dropdown";
import {
  CONTENT_LEVELS,
  CONTENT_TYPES,
  CONTENT_TAGS,
} from "@/lib/constants/content";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "Submit",
  description: "",
};

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
              {CONTENT_TAGS.map(
                (category, catId) =>
                  category.options?.length > 0 && (
                    <div className="space-y-2" key={catId}>
                      <h5 className="text-sm">{category.label}</h5>
                      <ul className="checklist">
                        {category.options.map((option, optionId) => {
                          const label =
                            typeof option == "string" ? option : option.label;

                          return (
                            <li key={optionId}>
                              <input
                                type="checkbox"
                                name={category.label}
                                id={`${category.label}_${label}`}
                              />
                              <label htmlFor={`${category.label}_${label}`}>
                                {label}
                              </label>
                            </li>
                          );
                        })}
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
