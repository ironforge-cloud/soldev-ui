import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";
import styles from "@/styles/core/sidebar.module.css";
import ContentCard from "@/components/core/ContentCard";
import { getRecordsForPlaylist } from "@/lib/queries";
import { PLAYLIST_LISTING } from "@/lib/constants/playlists";

// define the on-page seo metadata
const placeholderSEO: NextSeoProps = {
  title: "Explore the playlist",
  description: "",
};

//
export async function getStaticPaths() {
  const paths = PLAYLIST_LISTING.flat().map((item) => {
    return {
      params: {
        slug: item?.slug || item.key,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

type StaticProps = {
  params: { slug: string };
};

export async function getStaticProps({ params: { slug } }: StaticProps) {
  // only allow `slug`s from the `PLAYLIST_LISTING`
  // NOTE: not case sensitive (i.e. `==` vs `===`)
  const playlist = PLAYLIST_LISTING.flat().filter(
    (item) => item?.slug == slug || item.key == slug,
  )?.[0];

  // ensure a playlist was found
  if (!playlist) return { notFound: true };

  // auto redirect to using the custom slug (when set) in as the route
  /*
    NOTE: these redirects will not actually trigger unless both the
    playlist `slug` and `key` are added to the `staticPaths`
  */
  if (playlist?.slug && playlist.slug !== slug)
    return {
      redirect: {
        destination: `/library/playlist/${playlist.slug}`,
      },
    };

  // define the on-page seo metadata
  const seo: NextSeoProps = {
    title: playlist.title || placeholderSEO.title,
    description: playlist.description || placeholderSEO.description,
  };

  // fetch the listing of all the records from the API
  let records = await getRecordsForPlaylist(playlist.key);

  // force update the Author to the desired value (when the `playlist.authorOverride` is set)
  if (playlist?.authorOverride && Array.isArray(records))
    records = records.map((item) => {
      item.Author = playlist.authorOverride ?? "";
      return item;
    });

  return {
    props: {
      seo,
      playlist,
      records,
    },
    revalidate: 60,
  };
}

type PageProps = {
  seo: NextSeoProps;
  playlist: PlaylistItem;
  records: ContentRecord[];
};

export default function Page({ playlist, records, seo }: PageProps) {
  return (
    <DefaultLayout seo={{ ...placeholderSEO, ...seo }}>
      <PageHero className="container">
        <h1>{playlist.title}</h1>

        <p className="max-w-lg text-xl">{playlist.description}</p>
      </PageHero>

      <main className={styles.wrapper + " container"}>
        {records.map((item, index) => {
          // auto remove the `preText` text from the displayed title
          if (
            playlist?.titleFilter &&
            item.Title.toLowerCase().substring(
              0,
              playlist.titleFilter.length,
            ) == playlist.titleFilter
          )
            item.Title = item.Title.substring(
              playlist.titleFilter.length,
            ).trim();

          return (
            <ContentCard
              key={item.SK}
              isLarge={!index}
              href={`/library/playlist/${playlist?.slug ?? playlist.key}/${
                item.SK
              }`}
              title={item.Title}
              authorLabel={item.Author}
              // authorHref="#"
              imageSrc={item.Img}
              tags={item.Tags}
              description={item.Description}
            />
          );
        })}
      </main>
    </DefaultLayout>
  );
}
