import styles from "@/styles/registry/IDLNav.module.css";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

const LINK_OPTIONS = [
  { label: "Instructions" },
  { label: "Accounts" },
  { label: "Types" },
  { label: "Errors" },
  { label: "Constants" },
  { label: "Events" },
];

type ComponentProps = {
  className?: string;
};

export default function IDLNav(props: ComponentProps) {
  return (
    <>
      <IDLNavDefault />
      <IDLNavDropdown />
    </>
  );
}

export function IDLNavDefault({ className }: ComponentProps) {
  return (
    <nav className={styles.desktopNav}>
      {LINK_OPTIONS.map((item, id) => (
        <Link
          key={id}
          href={`#${item.label.toLowerCase()}`}
          className={`btn ${id == 0 ? styles.active : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function IDLNavDropdown({ className }: ComponentProps) {
  const [selected, setSelected] = useState(LINK_OPTIONS[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={styles.dropdownNav}>
        <Listbox.Button className={styles.actionButton}>
          <span className={styles.actionLabel}>{selected.label}</span>
          <span className={styles.actionIcon}>
            <ChevronDownIcon aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={styles.dropdown}>
            {LINK_OPTIONS.map((item, id) => (
              <Listbox.Option
                key={id}
                className={({ active }) =>
                  active ? styles.optionActive : styles.optionInactive
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className={selected ? styles.selectedOption : ""}>
                      {item.label}
                    </span>
                    {selected ? (
                      <span className={styles.selectedIcon}>
                        <CheckIcon aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
