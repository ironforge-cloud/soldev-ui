import styles from "@/styles/core/nav.module.css";
import Link from "next/link";

import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  ChevronDownIcon,
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
} from "@heroicons/react/24/outline";

type ComponentProps = {
  // children?: React.ReactNode;
};

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

const NAVIGATION_ITEMS: NavigationSection[] = [
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
        href: "#",
        description: "The latest updates for the protocol",
        icon: CodeBracketIcon,
        isExternal: true,
        className: styles.green,
      },
      {
        label: "Dev Call",
        href: "#",
        description: "Monthly updates from the Solana Team",
        icon: MegaphoneIcon,
        isExternal: true,
        className: styles.blue,
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

export default function AppNavigation({}: ComponentProps) {
  const [openState, setOpenState] = useState(
    new Array(NAVIGATION_ITEMS.length).fill(false),
  );

  // function to update the openState for each of the menu options
  function handleUpdateState(position: number, value: boolean) {
    setOpenState(
      openState.map((item, index) => (index === position ? value : false)),
    );
  }

  return (
    <ul className={styles.linkArea}>
      {NAVIGATION_ITEMS.map((section, id) => (
        <li
          key={id}
          onMouseEnter={() => handleUpdateState(id, true)}
          onMouseLeave={() => handleUpdateState(id, false)}
        >
          <div
            className={styles.linkItemContainer}
            onClick={() => handleUpdateState(id, !openState[id])}
          >
            {section?.href ? (
              <Link href={section.href} className={styles.linkItem}>
                {section.label}
              </Link>
            ) : (
              <span className={styles.linkItem}>{section.label}</span>
            )}
            <span className={styles.arrow}>
              <ChevronDownIcon
                className={`icon-md ${openState[id] && "rotate-180"} `}
              />
            </span>
          </div>
          {/* <Transition
              show={openState[id]}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            > */}
          {openState[id] && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownInner}>
                <div className={styles.primaryList}>
                  {section.links.map((item, id) => (
                    <Link
                      key={id}
                      href={item?.href || "#"}
                      className={styles.link}
                    >
                      {item?.icon !== undefined && (
                        <span
                          className={`${styles.iconArea} ${
                            item?.className || ""
                          }`}
                        >
                          <item.icon aria-hidden="true" />
                        </span>
                      )}

                      <span className={styles.metaArea}>
                        <p className={styles.label}>{item.label}</p>
                        {item.description && (
                          <p className={styles.description}>
                            {item.description}
                          </p>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>

                {section?.secondaryLinks && (
                  <div className={styles.secondaryList}>
                    {section.secondaryLinks?.href ? (
                      <Link
                        href={section.secondaryLinks.href}
                        className={styles.heading}
                      >
                        {section.secondaryLinks.label}
                      </Link>
                    ) : (
                      <p className={styles.heading}>
                        {section.secondaryLinks.label}
                      </p>
                    )}

                    {section.secondaryLinks.links.map((item, id) => (
                      <Link
                        key={id}
                        href={item?.href || "#"}
                        className={styles.link}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* </Transition> */}
        </li>
      ))}
    </ul>
  );
}
