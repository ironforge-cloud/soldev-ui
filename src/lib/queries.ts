/*
  Common queries and API calls to fetch data
*/

import { CONTENT_AUTHOR_OVERRIDES } from '@/lib/constants/content';
import { PLAYLIST_KEYS } from '@/lib/constants/playlists';

// fetch all `newsletter` records from the API
export async function getNewsletterRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  )
    .then(res => res.json())
    .catch(err => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map(item => {
      // always update the newsletter Url to help with redirects (from `/newsletters` to `/newsletter`)
      item.Url = item.Url.replace('/newsletters/', '/newsletter/');
      // update
      item.Author = CONTENT_AUTHOR_OVERRIDES.newsletter;
      return item;
    });

  return records;
}

// fetch all `changelog` records from the API
export async function getChangelogRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK5-Qri7Pg9zd-Vvhz9kX2-R`
  )
    .then(res => res.json())
    .catch(err => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map(item => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.changelog;
      return item;
    });

  return records;
}

// fetch all the available library content `types` from the API
export async function getContentTypes() {
  let records: string[] = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`)
    .then(res => res.json())
    .catch(err => console.error(err));

  return records;
}

// fetch all the records for the given slug the API
export async function getRecordsFromSlug(slug: string) {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${slug}`
  )
    .then(res => res.json())
    .catch(err => console.error(err));

  if (slug === PLAYLIST_KEYS.superteamEcosystemCalls) {
    if (Array.isArray(records)) {
      records = records.map(item => {
        item.Author = CONTENT_AUTHOR_OVERRIDES.ecosystemCalls;
        return item;
      });
    }
  }

  if (slug === PLAYLIST_KEYS.coreCommunityCalls || slug === PLAYLIST_KEYS.validatorCommunityCalls) {
    if (Array.isArray(records)) {
      records = records.map(item => {
        item.Author = CONTENT_AUTHOR_OVERRIDES.solanaFoundation;
        return item;
      });
    }
  }

  return records;
}

// submit content to the API
export async function submitContent(data: SubmitContentData, httpMethod: 'POST' | 'PUT' = 'POST') {
  const record = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
    method: httpMethod,
    mode: 'no-cors',
    // headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data })
  });
  // .then((res) => res.json())
  // .catch((err) => console.error(err));

  return record;
}
