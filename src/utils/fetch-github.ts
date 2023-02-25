/**
 * fetch all files from a repository
 * @param owner
 * @param repo
 * @param path
 * @returns {Promise<Response>}
 */
export const fetchContent = async (
  owner: string,
  repo: string,
  path: string,
) => {
  return await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    },
  );
};

/**
 * fetch raw file data(currently text only)
 * @param url
 */
export const fetchRaw = async (url: string) => {
  return await fetch(url, {
    headers: {
      authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  }).then((res) => res.text());
};

/**
 * fetch all pull requests
 * @param owner
 * @param repo
 * @returns {Promise<Response>}
 */
export const fetchPulls = async (owner: string, repo: string) => {
  const pullRequests = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      headers: {
        authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    },
  )
    .then((res) => res.json())
    .then(
      (response: RawGitHubResponseData[]) =>
        response.map(
          ({
            id,
            html_url,
            number,
            title,
            user: { html_url: userHtmlUrl },
          }) => ({
            id, // pull request id
            html_url, // github url
            number, // pull request number, use to fetch PR files
            title, // pull request title
            userHtmlUrl, // user github url
          }),
        ) as ParsedGitHubData[],
    );

  const requestPromises = pullRequests.map(({ number }) =>
    fetchPullFiles(number),
  );

  const download_url = await Promise.all(requestPromises);

  pullRequests.forEach((pullRequest, index) => {
    pullRequest.download_url = download_url[index];
  });

  return pullRequests;
};

/**
 * fetch all files from a pull request
 * @param pullNumber
 * @returns {Promise<any>}
 */
export const fetchPullFiles = async (pullNumber: number) => {
  return await fetch(
    `https://api.github.com/repos/solana-foundation/solana-improvement-documents/pulls/${pullNumber}/files`,
    {
      headers: {
        authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data.map(({ raw_url }: { raw_url: string }) => raw_url));
};
