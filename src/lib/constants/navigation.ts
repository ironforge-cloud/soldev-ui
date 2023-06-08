/*
    Constants for use with the site's primary navigation
*/
import styles from '@/styles/core/nav.module.css';
import {
  AcademicCapIcon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  MicrophoneIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

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
    label: 'Learn',
    // href: "/learn",
    links: [
      {
        label: 'Intro to Solana',
        href: '/course',
        description: 'The best starting point for Web3 basics',
        icon: MegaphoneIcon,
        isExternal: false,
        className: styles.purple
      },
      {
        label: 'Solana Bootcamp',
        href: '/library/playlist/solana-bootcamp',
        description: 'Intro bootcamp on Solana with Jarry Xiao',
        icon: BoltIcon,
        // isExternal: true,
        className: styles.green
      },
      {
        label: 'buildspace Solana Core',
        href: 'https://buildspace.so/solana-core',
        description: 'A 6-week course on building on Solana',
        icon: AcademicCapIcon,
        isExternal: true,
        className: styles.blue
      },
      {
        label: 'Solana Cookbook',
        href: 'https://solanacookbook.com/',
        description: 'Recipes for building on Solana',
        icon: BookOpenIcon,
        isExternal: true,
        className: styles.red
      }
    ]
  },
  {
    label: 'Library',
    href: '/library',
    links: [
      {
        label: 'Tutorials',
        href: '/library?types=tutorials',
        description: 'Learn how to code for Solana',
        icon: AcademicCapIcon,
        className: styles.purple
      },
      {
        label: 'Articles',
        href: '/library?types=articles',
        description: 'Insights and inspiration for Solana fans',
        icon: NewspaperIcon,
        className: styles.green
      },
      {
        label: 'Podcasts',
        href: '/library?types=podcasts',
        description: 'Stay ahead by tuning in to the latest',
        icon: MicrophoneIcon,
        className: styles.blue
      },
      {
        label: 'Projects',
        href: '/library?types=projects',
        description: 'Guides to building your first Solana Apps',
        icon: CpuChipIcon,
        className: styles.red
      }
    ],
    secondaryLinks: {
      label: 'Browse Topics',
      // href: "/library",
      links: [
        {
          label: 'SDK',
          href: '/library?types=sdk'
        },
        {
          label: 'Scaffolds',
          href: '/library?types=scaffolds'
        },
        {
          label: 'Tools',
          href: '/library?types=tools'
        },
        {
          label: 'Implementations',
          href: '/library?types=implementations'
        },
        {
          label: 'Security',
          href: '/library?types=security'
        },
        {
          label: 'SPL',
          href: '/library?types=spl'
        },
        {
          label: 'Threads',
          href: '/library?types=threads'
        }
      ]
    }
  },
  {
    label: 'Updates',
    // href: "/updates",
    links: [
      {
        label: 'Newsletter',
        href: '/newsletter',
        description: 'The latest from the Solana Foundation',
        icon: EnvelopeIcon,
        className: styles.purple
      },
      {
        label: 'Changelog',
        href: '/changelog',
        description: 'The latest updates for the protocol',
        icon: CodeBracketIcon,
        className: styles.green
      },
      {
        label: 'Core Community Calls',
        href: '/library/playlist/core-community-calls',
        description: 'Monthly discussions around protocol changes',
        icon: MegaphoneIcon,
        className: styles.blue
      },
      {
        label: 'Community Validator Discussions',
        href: '/library/playlist/validator-community-discussions',
        description: 'Monthly discussions around validator operations',
        icon: ChatBubbleLeftRightIcon,
        className: styles.red
      },
      {
        label: 'Superteam Ecosystem Calls',
        href: '/library/playlist/superteam-ecosystem-calls',
        description: 'Monthly ecosystem updates from Superteam',
        icon: UserGroupIcon,
        className: styles.yellow
      }
    ]
  },
  {
    label: 'Resources',
    // href: "/resources",
    links: [
      {
        label: 'SIMD',
        href: '/simd',
        description: 'Protocol changes proposed & accepted here',
        icon: DocumentPlusIcon,
        className: styles.green
      },
      {
        label: 'Stack Exchange',
        href: 'https://solana.stackexchange.com/',
        description: 'Find questions and answers about Solana',
        icon: Square3Stack3DIcon,
        className: styles.blue,
        isExternal: true
      },
      {
        label: 'Jobs',
        href: 'https://earn.superteam.fun/opportunities/category/jobs',
        description: 'Find a job in the Solana ecosystem',
        icon: BriefcaseIcon,
        className: styles.red,
        isExternal: true
      },
      {
        label: 'Bounties',
        href: 'https://earn.superteam.fun/opportunities/category/bounties',
        description: 'Find a bounty in the Solana ecosystem',
        icon: CurrencyDollarIcon,
        className: styles.yellow,
        isExternal: true
      },
      {
        label: 'Grants',
        href: 'https://earn.superteam.fun/opportunities/category/grants',
        description: 'Find a grant in the Solana ecosystem',
        icon: BuildingLibraryIcon,
        className: styles.purple,
        isExternal: true
      }
    ]
  }
];
