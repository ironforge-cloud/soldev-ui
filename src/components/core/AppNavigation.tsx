import styles from "@/styles/core/nav.module.css";
import Link from "next/link";

import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { ArrowUpRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

type ComponentProps = {
  // children?: React.ReactNode;
};

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
                      target={item?.isExternal ? "_blank" : ""}
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
                        <p className={styles.label}>
                          <span>{item.label}</span>
                          {item?.isExternal && (
                            <span>
                              {/* <ArrowTopRightOnSquareIcon className="ml-2 icon" /> */}
                              <ArrowUpRightIcon className="ml-2 icon" />
                            </span>
                          )}
                        </p>
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
                        target={item?.isExternal ? "_blank" : ""}
                      >
                        <span>{item.label}</span>
                        {item?.isExternal && (
                          <span>
                            {/* <ArrowTopRightOnSquareIcon className="ml-1 -mt-1 icon-sm" /> */}
                            <ArrowUpRightIcon className="ml-2 icon-sm" />
                          </span>
                        )}
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
