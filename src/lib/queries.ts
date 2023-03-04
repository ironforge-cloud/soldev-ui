/*
  Common queries and API calls to fetch data
*/

import { CONTENT_AUTHOR_OVERRIDES } from "@/lib/constants/content";

// fetch all `newsletter` records from the API
export async function getNewsletterRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map((item) => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.newsletter;
      return item;
    });

  return records;
}

// fetch all `changelog` records from the API
export async function getChangelogRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK5-Qri7Pg9zd-Vvhz9kX2-R`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map((item) => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.changelog;
      return item;
    });

  return records;
}

// fetch all the records for the given playlist from the API
export async function getRecordsForPlaylist(slug: string) {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${slug}`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return records;
}

// fetch all Solana Core Community Call records from the API
export async function getCoreCommunityCallRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK7e_mH_sFwTytYQxalh7xd5`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map((item) => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.communityCall;
      return item;
    });

  return records;
}

// fetch all Solana Validator Community Call records from the API
export async function getValidatorCallRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK78yjGBZwYhTf7rao0t13Zw`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map((item) => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.validatorCall;
      return item;
    });

  return records;
}

// fetch all Superteam Community Call records from the API
export async function getSuperteamCommunityCallRecords() {
  let records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PL3lU6B-N55SorbjvAYTFL6svTu6hfjKH8`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // force update the Author to the desired value
  if (Array.isArray(records))
    records = records.map((item) => {
      item.Author = CONTENT_AUTHOR_OVERRIDES.ecosystemCall;
      return item;
    });

  return records;
}

// fetch all IDL records from the Ironforge API
export async function getIDLRecords() {
  let records: IDLRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/all`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return records;
}

// fetch a specific IDL record data from the Ironforge API
export async function getIDLRecordByAddress(address: string) {
  const record: IDLRecord = await fetch(
    `${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/${address}`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return record;
}
