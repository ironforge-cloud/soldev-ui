/*
    Type definitions for the assorted external services used, including:
      - GitHub API
*/

type RawGitHubResponseData = {
  id: number;
  type: string;
  html_url: string;
  number: number;
  title: string;
  user: {
    html_url: string;
  };
};

type RawGitHubPullContent = {
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

type ParsedGitHubPullContent = {
  id: string;
  number: number;
  name: string;
  html_url: string;
  download_url: string;
  metadata: ParsedGitHubMetaData;
  content?: string;
};

type ParsedGitHubSIMDData = {
  id: number;
  html_url: string;
  number: number;
  title: string;
  userHtmlUrl: string;
  download_url: string[];
  metadata: ParsedGitHubMetaData;
};

type ParsedGitHubMetaData = {
  simd: string;
  title: string;
  authors: Array<{
    name: string;
    org: string;
  }>;
  category: string;
  type: string;
  status: string;
  created: string;
  href?: string;
};

type ParsedGitHubContent = {
  id: string;
  name: string;
  html_url: string;
  download_url: string;
  content?: string;
};
