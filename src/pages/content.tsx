import { NextSeoProps } from 'next-seo';
import DefaultLayout from '@/layouts/default';
import PageHero from '@/components/core/PageHero';
import { toast } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import Dropdown from '@/components/core/Dropdown';
import { CONTENT_LEVELS, CONTENT_TYPES, CONTENT_TAGS } from '@/lib/constants/content';
import { submitContent } from '@/lib/queries';
import Link from 'next/link';

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: 'Submit New Content',
  description: ''
};

export default function Page() {
  const [data, setData] = useState<SubmitContentData>({
    Title: '',
    Author: '',
    Description: '',
    Url: '',
    Vertical: 'Solana',
    Tags: [],
    ContentType: '',
    SpecialTag: 'New',
    ContentStatus: 'submitted'
  });

  // function to handle form submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get the form and its data
    const form = document.getElementById('submitForm') as HTMLFormElement;
    const formData = new FormData(form);

    // construct the message payload to submit to the api
    const payload: SubmitContentData = {
      Title: formData.get('title')?.toString().trim(),
      Author: formData.get('author')?.toString().trim(),
      Description: formData.get('description')?.toString().trim(),
      Url: formData.get('url')?.toString().trim(),
      ContentType: formData.get('type')?.toString().trim().toLowerCase(),
      Tags: formData.getAll('tags') as string[],
      Vertical: 'Solana',
      SpecialTag: 'New',
      ContentStatus: 'submitted'
    };

    (async () => {
      const res = await submitContent(payload)
        // .then((res) => res?.ok && res)
        .then(res => {
          // NOTE: if here, then a non-failure response was returned. assume success

          // reset the form
          form.reset();

          // give the success message
          toast.success('Successfully submitted!');

          return res;
        })
        .catch(err => {
          console.error(err);
          toast.error('An unknown error occurred');
        });
    })();
  }

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container">
        <h1>
          <Link href={'/content'}>Submit new content</Link>
        </h1>

        <p className="max-w-lg text-lg md:text-xl">
          Propose new content for the platform. Submissions are manually reviewed before
          they&apos;re published.
        </p>
      </PageHero>

      <section className="container max-w-3xl">
        <form id="submitForm" onSubmit={handleSubmit} className="space-y-6">
          <div className="form-item">
            <label htmlFor="title">Title</label>
            <input
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
              name="description"
              id="description"
              placeholder=""
              className="input h-32 min-h-[6em]"
            />
          </div>

          <div className="form-item">
            <label htmlFor="type">Content Type</label>
            <Dropdown items={CONTENT_TYPES} name="type" />
            {/* <p className="minor-text">this is optional minor text</p> */}
          </div>
          <div className="form-item">
            <label htmlFor="level">Level</label>
            <Dropdown items={CONTENT_LEVELS} name="tags" />
            <p className="minor-text">Select content difficulty for optimal discovery.</p>
          </div>

          <div className="form-item">
            <label htmlFor="tags">Tags</label>
            <p className="minor-text">
              Tags will improve content discovery, select as many as you see fit.
            </p>

            <section className="grid grid-cols-2 gap-6 pt-6 md:grid-cols-4">
              {CONTENT_TAGS.map(
                (category, catId) =>
                  category.options?.length > 0 && (
                    <div className="space-y-2" key={catId}>
                      <h5 className="text-sm">{category.label}</h5>
                      <ul className="checklist">
                        {category.options.map((option, optionId) => {
                          const label = typeof option == 'string' ? option : option.label;

                          return (
                            <li key={optionId}>
                              <input
                                type="checkbox"
                                name="tags"
                                multiple={true}
                                value={label}
                                id={`${category.label}_${label}`}
                              />
                              <label htmlFor={`${category.label}_${label}`}>{label}</label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )
              )}
            </section>
          </div>

          <div className="form-item flex items-center justify-end space-x-4 space-y-0">
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
