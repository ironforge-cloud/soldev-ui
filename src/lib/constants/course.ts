/*
    Constants related to the course
*/

type CourseModuleItem = {
  title: string;
  slug: string;
  number?: number;
  hidden?: boolean;
};

type CourseModule = {
  number: number;
  title: string;
  lessons: CourseModuleItem[];
};

export const COURSE_MODULES: CourseModule[] = [
  {
    title: "Client Interaction with the Solana Network",
    number: 1,
    lessons: [
      {
        title: "Read data from the network",
        slug: "intro-to-reading-data",
      },
      {
        title: "Write data to the network",
        slug: "intro-to-writing-data",
      },
      {
        title: "Interact with wallets",
        slug: "interact-with-wallets",
      },
      {
        title: "Serialize custom instruction data",
        slug: "serialize-instruction-data",
      },
      {
        title: "Deserialize custom account data",
        slug: "deserialize-custom-data",
      },
      {
        title: "Page, Order, and Filter custom account data",
        slug: "paging-ordering-filtering-data",
      },
    ],
  },
  {
    title: "Client Interaction with Common Solana Programs",
    number: 2,
    lessons: [
      {
        title: "Create tokens with the Token Program",
        slug: "token-program",
      },
      {
        title: "Swap tokens with the Token Swap Program",
        slug: "token-swap",
      },
      {
        title: "Create Solana NFTs With Metaplex",
        slug: "nfts-with-metaplex",
      },
    ],
  },
  {
    title: "Basic Solana Program Development",
    number: 3,
    lessons: [
      {
        title: "Hello World",
        slug: "hello-world-program",
      },
      {
        title: "Create a Basic Program, Part 1 - Handle Instruction Data",
        slug: "deserialize-instruction-data",
      },
      {
        title: "Create a Basic Program, Part 2 - State Management",
        slug: "program-state-management",
      },
      {
        title: "Create a Basic Program, Part 3 - Basic Security and Validation",
        slug: "program-security",
      },
    ],
  },
  {
    title: "Intermediate Solana Program Development",
    number: 4,
    lessons: [
      {
        title: "Local Program Development",
        slug: "local-setup",
      },
      {
        title: "Program Derived Addresses",
        slug: "pda",
      },
      {
        title: "Cross Program Invocations",
        slug: "cpi",
      },
      {
        title: "Program Testing - COMING SOON",
        slug: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Anchor Program Development",
    number: 5,
    lessons: [
      {
        title: "Intro to Anchor development",
        slug: "intro-to-anchor",
      },
      {
        title: "Intro to client-side Anchor development",
        slug: "intro-to-anchor-frontend",
      },
      {
        title: "Anchor PDAs and accounts",
        slug: "anchor-pdas",
      },
      {
        title: "Anchor CPIs and errors",
        slug: "anchor-cpi",
      },
    ],
  },
  {
    title: "Beyond the Basics",
    number: 6,
    lessons: [
      {
        title: "Environment variables in Solana programs",
        slug: "env-variables",
      },
      {
        title: "Solana Pay",
        slug: "solana-pay",
      },
      {
        title: "Lesson 3",
        slug: "",
        hidden: true,
      },
      {
        title: "Lesson 4",
        slug: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Solana Program Security",
    number: 7,
    lessons: [
      {
        title: "How to approach the Program Security module",
        slug: "security-intro",
      },
      {
        title: "Signer authorization",
        slug: "signer-auth",
      },
      {
        title: "Owner checks",
        slug: "owner-checks",
      },
      {
        title: "Account data matching",
        slug: "account-data-matching",
      },
      {
        title: "Reinitialization attacks",
        slug: "reinitialization-attacks",
      },
      {
        title: "Duplicate mutable accounts",
        slug: "duplicate-mutable-accounts",
      },
      {
        title: "Type cosplay",
        slug: "type-cosplay",
      },
      {
        title: "Arbitrary CPIs",
        slug: "arbitrary-cpi",
      },
      {
        title: "Bump seed canonicalization",
        slug: "bump-seed-canonicalization",
      },
      {
        title: "Closing accounts and revival attacks",
        slug: "closing-accounts",
      },
      {
        title: "PDA sharing",
        slug: "pda-sharing",
      },
    ],
  },
];
