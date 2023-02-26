/*
    Constants for use with the site's primary navigation
*/
import styles from "@/styles/core/nav.module.css";
import {
  AcademicCapIcon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  MicrophoneIcon,
  NewspaperIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type NavigationSection = {
  label: string;
  href?: string;
  links: NavigationLink[];
  secondaryLinks?: NavigationSection;
};

type NavigationLink = {
  label: string;
  description?: string;
  href?: string;
  icon?: any;
  isExternal?: boolean;
  className?: string;
};

export const NAVIGATION_ITEMS: NavigationSection[] = [
  {
    label: "Learn",
    // href: "/learn",
    links: [
      {
        label: "Intro to Solana",
        href: "/course",
        description: "The best starting point for Web3 basics",
        icon: MegaphoneIcon,
        isExternal: false,
        className: styles.purple,
      },
      {
        label: "Solana Bootcamp",
        href: "#",
        description: "Intro bootcamp on Solana with Jarry Xiao",
        icon: BoltIcon,
        isExternal: true,
        className: styles.green,
      },
      {
        label: "buildspace Solana Core",
        href: "#",
        description: "A 6-week course on building on Solana",
        icon: AcademicCapIcon,
        isExternal: true,
        className: styles.blue,
      },
      {
        label: "Solana Cookbook",
        href: "#",
        description: "Recipes for building on Solana",
        icon: BookOpenIcon,
        isExternal: true,
        className: styles.red,
      },
    ],
  },
  {
    label: "Library",
    // href: "/library",
    links: [
      {
        label: "Tutorials",
        href: "/library/tutorials",
        description: "Learn how to code for Solana",
        icon: AcademicCapIcon,
        className: styles.purple,
      },
      {
        label: "Articles",
        href: "/library/articles",
        description: "Insights and inspiration for Solana fans",
        icon: NewspaperIcon,
        className: styles.green,
      },
      {
        label: "Podcasts",
        href: "/library/podcasts",
        description: "Stay ahead by tuning in to the latest",
        icon: MicrophoneIcon,
        className: styles.blue,
      },
      {
        label: "Projects",
        href: "/library/projects",
        description: "Guides to building your first Solana Apps",
        icon: CpuChipIcon,
        className: styles.red,
      },
    ],
    secondaryLinks: {
      label: "Browse Topics",
      // href: "/library",
      links: [
        {
          label: "SDK",
          href: "/library/sdk",
        },
        {
          label: "Scaffolds",
          href: "/library/scaffolds",
        },
        {
          label: "Tools",
          href: "/library/tools",
        },
        {
          label: "Implementations",
          href: "/library/implementations",
        },
        {
          label: "Security",
          href: "/library/security",
        },
        {
          label: "SPL",
          href: "/library/spl",
        },
        {
          label: "Threads",
          href: "/library/threads",
        },
      ],
    },
  },
  {
    label: "Updates",
    // href: "/updates",
    links: [
      {
        label: "Newsletter",
        href: "/newsletter",
        description: "The latest from the Solana Foundation",
        icon: EnvelopeIcon,
        className: styles.purple,
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "The latest updates for the protocol",
        icon: CodeBracketIcon,
        className: styles.green,
      },
      {
        label: "Core Community Calls",
        href: "/core-community-calls",
        description: "Monthly discussions around protocol changes",
        icon: MegaphoneIcon,
        className: styles.blue,
      },
      {
        label: "Superteam Ecosystem Calls",
        href: "/superteam-ecosystem-calls",
        description: "Monthly ecosystem updates from Superteam",
        icon: UserGroupIcon,
        className: styles.red,
      },
    ],
  },
  {
    label: "Resources",
    // href: "/resources",
    links: [
      {
        label: "IDL Registry",
        href: "/registry",
        description: "Contract explorer for Solana",
        icon: MagnifyingGlassIcon,
        className: styles.purple,
      },
      {
        label: "SIMD",
        href: "/simd",
        description: "Protocol changes proposed & accepted here",
        icon: DocumentPlusIcon,
        className: styles.green,
      },
      {
        label: "Jobs",
        href: "https://earn.superteam.fun/opportunities/category/jobs",
        description: "Find a job in the Solana ecosystem",
        icon: BriefcaseIcon,
        className: styles.blue,
        isExternal: true,
      },
      {
        label: "Bounties",
        href: "https://earn.superteam.fun/opportunities/category/bounties",
        description: "Find a bounty in the Solana ecosystem",
        icon: CurrencyDollarIcon,
        className: styles.red,
        isExternal: true,
      },
      {
        label: "Grants",
        href: "https://earn.superteam.fun/opportunities/category/grants",
        description: "Find a grant in the Solana ecosystem",
        icon: BuildingLibraryIcon,
        className: styles.yellow,
        isExternal: true,
      },
    ],
  },
];
