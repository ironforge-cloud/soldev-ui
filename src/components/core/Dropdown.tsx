import styles from "@/styles/core/dropdown.module.css";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

type DropdownOption = {
  label: string;
};

type ComponentProps = {
  className?: string;
  items: Array<DropdownOption | string>;
  defaultIndex?: number;
};

export default function Dropdown({
  className,
  items,
  defaultIndex = 0,
}: ComponentProps) {
  const [selected, setSelected] = useState(items[defaultIndex]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={`${styles.container} ${className}`}>
        <Listbox.Button className={styles.actionButton}>
          <span className={styles.actionLabel}>
            {typeof selected != "string" ? selected.label : selected}
          </span>
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
          <Listbox.Options className={styles.dropdownOptions}>
            {items.map((item, id) => (
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
                      {typeof item != "string" ? item.label : item}
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
