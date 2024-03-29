import { get } from 'fetch-unfucked';

const authorization = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;

export const fetchRaw: (url: string) => Promise<string> = async (url: string) => {
  const response = await get(url, {
    Authorization: authorization
  });

  if (response.status !== 'OK') {
    throw new Error(`Error ${response.status} GETting ${url}`);
  }
  return response.body;
};

export const fetchPullRequests = async (
  owner: string,
  repo: string
): Promise<Array<ParsedGitHubSIMDData>> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
  const response = await (
    await fetch(url, {
      headers: { Authorization: authorization },
      cache: 'force-cache'
    })
  ).json();

  const pullRequestsRaw = response as RawGitHubResponseData[];

  const pullRequests = pullRequestsRaw.map(
    ({ id, html_url, number, title, user: { html_url: userHtmlUrl } }) => ({
      id, // pull request id
      html_url, // github url
      number, // pull request number, use to fetch PR files
      title, // pull request title
      userHtmlUrl // user github url
    })
  ) as ParsedGitHubSIMDData[];

  const requestPromises = pullRequests.map(({ number }) => fetchFilesFromPullRequest(number));

  const download_url = await Promise.all(requestPromises);

  pullRequests.forEach((pullRequest, index) => {
    pullRequest.download_url = download_url[index];
  });

  return pullRequests;
};

export const fetchFilesFromPullRequest = async (pullRequestNumber: number) => {
  const response = await (
    await fetch(
      `https://api.github.com/repos/solana-foundation/solana-improvement-documents/pulls/${pullRequestNumber}/files`,
      {
        headers: { Authorization: authorization },
        cache: 'force-cache'
      }
    )
  ).json();

  const data = response;
  return data.map(({ raw_url }: { raw_url: string }) => raw_url);
};
