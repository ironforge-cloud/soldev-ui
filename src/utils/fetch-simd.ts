import { computeSlugForSIMD } from '@/utils/helpers';
import { fetchRaw, fetchPullRequests } from '@/utils/fetch-github';

type GitHubProposal = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

export const fetchSIMDs = async (): Promise<Array<ParsedGitHubPullContent>> => {
  const url =
    'https://api.github.com/repos/solana-foundation/solana-improvement-documents/contents/proposals';
  const response = await (
    await fetch(url, {
      headers: { Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_GITHUB_TOKEN },
      cache: 'force-cache'
    })
  ).json();

  const fileMap = (response as Array<GitHubProposal>)
    .filter(item => item.type === 'file')
    .map(
      ({ sha, name, download_url, html_url }) =>
        ({
          id: sha, // use sha hash as id
          name, // file name
          download_url, // raw url
          html_url, // github url
          metadata: {} // initialize the metadata record
        } as ParsedGitHubPullContent)
    );

  return fileMap;
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
  const lines = metadata.split('\n');
  const result: any = {};

  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      const cleanedLine = line.trim().slice(1).trim();
      const [name, org] = cleanedLine.split('(');
      const orgTrim = org ? org.slice(0, -1).trim() : null;
      if (result.authors) {
        result.authors.push({ name: name.trim(), org: orgTrim });
      } else {
        result.authors = [{ name: name.trim(), org: orgTrim }];
      }
    } else {
      const [key, value] = line.split(': ');
      if (key === 'simd') {
        result[key] = value.replace(/'/g, '');
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
  const [pullRequests, SIMDs] = await Promise.all([
    fetchPullRequests('solana-foundation', 'solana-improvement-documents'),
    fetchSIMDs()
  ]);

  const records = await Promise.all(
    [...pullRequests, ...SIMDs].map(async item => {
      if (!Array.isArray(item.download_url)) {
        item.download_url = [item.download_url];
      }
      const dataArray = await Promise.all(
        item.download_url.map(async (url: string) => {
          return await fetchRaw(url);
        })
      );

      try {
        item.metadata = JSON.parse(JSON.stringify(parseMetadata(dataArray.join(''))));

        // always convert simd to uppercase
        item.metadata.simd = item?.metadata?.simd?.toUpperCase();

        // attempt to compute the local route
        const slug = computeSlugForSIMD(item.metadata.simd, item.metadata.title);
        if (slug) item.metadata.href = `/simd/${slug}`;
      } catch (err) {
        console.error('Failed to parse metadata');
        console.error(err);
      }
      return item as ParsedGitHubPullContent;
    })
  )
    .then(res =>
      // auto filter out records by their computed SIMD proposal number
      // (i.e. no `simd` value => invalid proposal/not a real proposal)
      res.filter(record => record?.metadata?.simd)
    )
    // sort from higher to lower SIMD number
    .then(res => res.sort((a, b) => parseInt(b.metadata.simd) - parseInt(a.metadata.simd)));

  return records;
}
