/*
    Constants related to the submitted content of the site
*/

export type ContentDropdownType = {
  label: string;
  value?: string | number | boolean;
  href?: string;
};

export type ContentTagItem = {
  label: string;
  options: Array<ContentDropdownType | string>;
};

export const CONTENT_LEVELS: Array<ContentDropdownType | string> = [
  // { label: "Beginner", value: 6, href: "/#demo" },
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const CONTENT_TYPES: Array<ContentDropdownType | string> = [
  "Tutorials",
  "Projects",
  "Tools",
  "SPL",
  "Articles",
  "SDK",
  "Implementations",
  "Threads",
  "Podcasts",
  "Scaffolds",
  "Security",
];

export const CONTENT_TAGS: Array<ContentTagItem> = [
  {
    label: "Industry",
    options: ["DeFi", "Gaming", "Governance", "Mobile", "Security"],
  },
  {
    label: "Protocol",
    options: ["Serum", "OpenBook", "Metaplex", "Arweave", "SolanaPay"],
  },
  {
    label: "Framework",
    options: ["Anchor", "Web3.js", "React.js", "Svelte", "Vue.js", "Seahorse"],
  },
  {
    label: "Language",
    options: [
      "Rust",
      "JavaScript",
      "C#",
      "Golang",
      "Python",
      "Java",
      "Swift",
      "CLI/Shell",
      "Kotlin",
    ],
  },
];

/*
  Hard coded values for manually overriding the Author field for content records
*/
export const CONTENT_AUTHOR_OVERRIDES = {
  newsletter: "Solana Foundation",
  changelog: "Solana Foundation",
};
