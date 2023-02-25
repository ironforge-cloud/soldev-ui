import { computeSlugForSIMD } from "@/utils/helpers";
import { fetchContent, fetchPulls, fetchRaw } from "./fetch-github";

/**
 * fetch all SIMDs from the repository
 * @returns {Promise<Object>}
 */
export const fetchRepoSIMD = async () => {
  return await fetchContent(
    "solana-foundation",
    "solana-improvement-documents",
    "proposals",
  )
    .then((res) => res.json())
    .then((response: RawGitHubPullContent[]) =>
      response
        .filter((item) => item.type === "file")
        .map(
          ({ sha, name, download_url, html_url }) =>
            ({
              id: sha, // use sha hash as id
              name, // file name
              download_url, // raw url
              html_url, // github url
              metadata: {}, // initialize the metadata record
            } as ParsedGitHubPullContent),
        ),
    );
};

/**
 * parse SIMD .md file header aka metadata
 * @param data
 * @returns {{}}
 */
export function parseMetadata<ParsedGitHubMetaData>(data: string) {
  const re = /---\n(.*)\n---/gs;
  const match = re.exec(data);
  if (!match) {
    return {};
  }
  const metadata = match[1];
  const lines = metadata.split("\n");
  const result: any = {};

  for (const line of lines) {
    if (line.trim().startsWith("-")) {
      const cleanedLine = line.trim().slice(1).trim();
      const [name, org] = cleanedLine.split("(");
      const orgTrim = org ? org.slice(0, -1).trim() : null;
      if (result.authors) {
        result.authors.push({ name: name.trim(), org: orgTrim });
      } else {
        result.authors = [{ name: name.trim(), org: orgTrim }];
      }
    } else {
      const [key, value] = line.split(": ");
      if (key === "simd") {
        result[key] = value.replace(/'/g, "");
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * fetch all SIMDs i.e. from repository and pull requests
 * @returns {Promise<Awaited<Response>[]>}
 */
export async function fetchAllSIMD() {
  const [pullRequests, repo] = await Promise.all([
    fetchPulls("solana-foundation", "solana-improvement-documents"),
    fetchRepoSIMD(),
  ]);

  return await Promise.all(
    [...pullRequests, ...repo].map(async (item) => {
      if (!Array.isArray(item.download_url)) {
        item.download_url = [item.download_url];
      }
      const dataArray = await Promise.all(
        item.download_url.map(async (url: string) => {
          return await fetchRaw(url);
        }),
      );

      try {
        item.metadata = JSON.parse(
          JSON.stringify(parseMetadata(dataArray.join(""))),
        );

        // attempt to compute the local route
        const slug = computeSlugForSIMD(item as ParsedGitHubPullContent);
        if (slug) item.metadata.href = `/simd/${slug}`;
      } catch (e) {
        console.error("Failed to parse metadata");
      }
      return item as ParsedGitHubPullContent;
    }),
  );
}
