/*
  Common queries and API calls to fetch data
*/

//
export async function getNewsletterRecords() {
  const records: ContentRecord[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/solana/newsletters`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return records;
}
