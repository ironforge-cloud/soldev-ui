/*
    Constants related to the course
*/

type CourseModuleItem = {
  title: string;
  href: string;
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
        href: "/course/intro-to-reading-data",
      },
      {
        title: "Write data to the network",
        href: "/course/intro-to-writing-data",
      },
      {
        title: "Interact with wallets",
        href: "/course/interact-with-wallets",
      },
      {
        title: "Serialize custom instruction data",
        href: "/course/serialize-instruction-data",
      },
      {
        title: "Deserialize custom account data",
        href: "/course/deserialize-custom-data",
      },
      {
        title: "Page, Order, and Filter custom account data",
        href: "/course/paging-ordering-filtering-data",
      },
    ],
  },
  {
    title: "Client Interaction with Common Solana Programs",
    number: 2,
    lessons: [
      {
        title: "Create tokens with the Token Program",
        href: "/course/token-program",
      },
      {
        title: "Swap tokens with the Token Swap Program",
        href: "/course/token-swap",
      },
      {
        title: "Create Solana NFTs With Metaplex",
        href: "/course/nfts-with-metaplex",
      },
    ],
  },
  {
    title: "Basic Solana Program Development",
    number: 3,
    lessons: [
      {
        title: "Hello World",
        href: "/course/hello-world-program",
      },
      {
        title: "Create a Basic Program, Part 1 - Handle Instruction Data",
        href: "/course/deserialize-instruction-data",
      },
      {
        title: "Create a Basic Program, Part 2 - State Management",
        href: "/course/program-state-management",
      },
      {
        title: "Create a Basic Program, Part 3 - Basic Security and Validation",
        href: "/course/program-security",
      },
    ],
  },
  {
    title: "Intermediate Solana Program Development",
    number: 4,
    lessons: [
      {
        title: "Local Program Development",
        href: "/course/local-setup",
      },
      {
        title: "Program Derived Addresses",
        href: "/course/pda",
      },
      {
        title: "Cross Program Invocations",
        href: "/course/cpi",
      },
      {
        title: "Program Testing - COMING SOON",
        href: "",
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
        href: "/course/intro-to-anchor",
      },
      {
        title: "Intro to client-side Anchor development",
        href: "/course/intro-to-anchor-frontend",
      },
      {
        title: "Anchor PDAs and accounts",
        href: "/course/anchor-pdas",
      },
      {
        title: "Anchor CPIs and errors",
        href: "/course/anchor-cpi",
      },
    ],
  },
  {
    title: "Beyond the Basics",
    number: 6,
    lessons: [
      {
        title: "Environment variables in Solana programs",
        href: "/course/env-variables",
      },
      {
        title: "Solana Pay",
        href: "/course/solana-pay",
      },
      {
        title: "Lesson 3",
        href: "",
        hidden: true,
      },
      {
        title: "Lesson 4",
        href: "",
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
        href: "/course/security-intro",
      },
      {
        title: "Signer authorization",
        href: "/course/signer-auth",
      },
      {
        title: "Owner checks",
        href: "/course/owner-checks",
      },
      {
        title: "Account data matching",
        href: "/course/account-data-matching",
      },
      {
        title: "Reinitialization attacks",
        href: "/course/reinitialization-attacks",
      },
      {
        title: "Duplicate mutable accounts",
        href: "/course/duplicate-mutable-accounts",
      },
      {
        title: "Type cosplay",
        href: "/course/type-cosplay",
      },
      {
        title: "Arbitrary CPIs",
        href: "/course/arbitrary-cpi",
      },
      {
        title: "Bump seed canonicalization",
        href: "/course/bump-seed-canonicalization",
      },
      {
        title: "Closing accounts and revival attacks",
        href: "/course/closing-accounts",
      },
      {
        title: "PDA sharing",
        href: "/course/pda-sharing",
      },
    ],
  },
];
