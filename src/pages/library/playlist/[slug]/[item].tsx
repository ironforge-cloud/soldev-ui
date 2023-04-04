import { NextSeoProps } from 'next-seo';
import DefaultLayout from '@/layouts/default';
import Link from 'next/link';
import heroStyles from '@/styles/PageHero.module.css';
import PageHero from '@/components/core/PageHero';

// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import NextPrevButtons from '@/components/core/NextPrevButtons';
import { getRecordsFromSlug } from '@/lib/queries';
import markdownToHtml from '@/utils/markdownToHtml';

import dynamic from 'next/dynamic';
import { shareOnTwitterUrl } from '@/utils/helpers';
import { PLAYLIST_LISTING } from '@/lib/constants/playlists';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

// define the placeholder on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: 'Watch this video',
  description: ''
};

// export async function getStaticPaths() {
//   const paths = PLAYLIST_LISTING.flatMap((playlist) => {
//     return {
//       params: {
//         slug: playlist?.slug || playlist.key,
//         item: "",
//       },
//     };
//   });

//   // fetch the listing of all the records from the API
//   // let records = await getRecordsFromSlug(playlist.key);

//   // const paths = records.map((item) => {
//   //   return {
//   //     params: {
//   //       slug: item.SK,
//   //       item: "",
//   //     },
//   //   };
//   // });

//   // All missing paths are going to be server-side rendered and cached
//   return { paths, fallback: "blocking" };
// }

type StaticProps = {
  params: { slug: string; item: string };
};

export async function getServerSideProps({ params: { slug, item } }: StaticProps) {
  // only allow content from `slug`s within `PLAYLIST_LISTING`
  // NOTE: not case sensitive (i.e. `==` vs `===`)
  const playlist = PLAYLIST_LISTING.flat().filter(
    item => item?.slug == slug || item.key == slug
  )?.[0];

  // ensure a playlist was found
  if (!playlist) return { notFound: true };

  // fetch the listing of all the records from the API
  let records = await getRecordsFromSlug(playlist.key);

  // create a placeholder record
  let record: ContentRecord | null = null;
  let nextSlug: string | null = null;
  let prevSlug: string | null = null;

  for (let i = 0; i < records.length; i++) {
    // search for the provided `item`, if it doesn't match -> next
    if (item !== records[i].SK) continue;

    // save the content record
    record = records[i];

    // extract the next/prev records
    if (i > 0) prevSlug = records[i - 1].SK;
    if (records.length > i + 1) nextSlug = records[i + 1].SK;

    // convert the records markdown to html
    record.ContentMarkdown = await markdownToHtml(record.ContentMarkdown);

    // auto convert the `PublishedAt` to a usable date
    record.PublishedAt = new Date(record.PublishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // force update the Author to the desired value (when the `playlist.authorOverride` is set)
    if (playlist?.authorOverride) record.Author = playlist.authorOverride ?? '';

    // stop the loop
    break;
  }

  // handle the 404 when no record was found
  if (!record) return { notFound: true };

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: record.Title,
    description: record.Description
  };

  return {
    props: {
      seo,
      playlist,
      record,
      nextSlug,
      prevSlug
    }
    // revalidate: 60, // only allowed in getStaticProps
  };
}

type PageProps = {
  seo: NextSeoProps;
  playlist: PlaylistItem;
  record: ContentRecord;
  nextSlug?: string;
  prevSlug?: string;
};

export default function Page({ seo, playlist, record, nextSlug, prevSlug }: PageProps) {
  return (
    <DefaultLayout seo={{ ...placeholderSEO, ...seo }}>
      <PageHero className="container text-center">
        <h1>
          <Link href={`/library/playlist/${playlist?.slug ?? playlist.key}/${record.SK}`}>
            {record.Title}
          </Link>
        </h1>

        <section className={heroStyles.ctaSection}>
          <Link
            href={`/library/playlist/${playlist?.slug ?? playlist.key}`}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to Playlist
          </Link>
          <Link
            target="_blank"
            href={shareOnTwitterUrl({
              href: `/library/playlist/${playlist?.slug ?? playlist.key}/${record.SK}`,
              message: `Checkout this @solana video`
            })}
            className={`btn btn-dark ${heroStyles.ctaBtn}`}
          >
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <main className={'container max-w-4xl'}>
        <div className="mx-auto aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <ReactPlayer
            height="100%"
            width="100%"
            style={{ aspectRatio: '16/9' }}
            url={record.Url}
            controls
            pip
            stopOnUnmount={false}
          />
        </div>

        <ul className="text-gray-500 md:text-sm">
          <li>Published {record.PublishedAt}</li>
          {/* <li>By {record.Author}</li> */}
        </ul>

        {record.ContentMarkdown ? (
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: record.ContentMarkdown }}
          ></article>
        ) : null}

        <NextPrevButtons
          nextHref={`/library/playlist/${playlist?.slug ?? playlist.key}/${nextSlug ?? ''}`}
          prevHref={`/library/playlist/${playlist?.slug ?? playlist.key}/${prevSlug ?? ''}`}
          nextLabel={nextSlug ? 'Next Video in Playlist' : 'Full Playlist'}
          prevLabel={prevSlug ? 'Previous Video in Playlist' : 'Full Playlist'}
        />
      </main>
    </DefaultLayout>
  );
}
