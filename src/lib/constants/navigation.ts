/*
    Constants for use with the site's primary navigation
*/
import styles from '@/styles/core/nav.module.css';
import {
  AcademicCapIcon,
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
  UserGroupIcon,
  VideoCameraIcon
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
    links: [
      {
        label: 'Solana Development Course',
        href: '/course',
        description: 'The best starting point for learning Web3 development',
        icon: MegaphoneIcon,
        isExternal: false,
        className: styles.purple
      },
      {
        label: 'Solana Bootcamp - Basics',
        href: '/library/playlist/solana-bootcamp-basics',
        description: 'Introductory bootcamp on Solana with Nick Frostbutter.',
        icon: VideoCameraIcon,
        // isExternal: true,
        className: styles.green
      },
      {
        label: 'Solana Bootcamp - Advanced',
        href: '/library/playlist/solana-bootcamp-advanced',
        description: 'Advanced bootcamp on Solana with Jarry Xiao.',
        icon: VideoCameraIcon,
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
    links: [
      {
        label: 'Mike Hale Newsletter',
        href: 'https://mikehale.beehiiv.com/',
        isExternal: true,
        description: 'News, tools, and resources for Solana developers',
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
    links: [
      {
        label: 'SIMD',
        href: 'https://github.com/solana-foundation/solana-improvement-documents',
        description: 'Protocol changes proposed & accepted here',
        icon: DocumentPlusIcon,
        className: styles.green,
        isExternal: true
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
        href: 'https://earn.superteam.fun/jobs',
        description: 'Find a job in the Solana ecosystem',
        icon: BriefcaseIcon,
        className: styles.red,
        isExternal: true
      },
      {
        label: 'Bounties',
        href: 'https://earn.superteam.fun/bounties',
        description: 'Find a bounty in the Solana ecosystem',
        icon: CurrencyDollarIcon,
        className: styles.yellow,
        isExternal: true
      },
      {
        label: 'Grants',
        href: 'https://earn.superteam.fun/grants',
        description: 'Find a grant in the Solana ecosystem',
        icon: BuildingLibraryIcon,
        className: styles.purple,
        isExternal: true
      }
    ]
  }
];
