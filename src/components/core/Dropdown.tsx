import styles from "@/styles/core/dropdown.module.css";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

type DropdownOption = {
  label: string;
  value?: string | number | boolean;
  href?: string;
};

type ComponentProps = {
  className?: string;
  name?: string | undefined;
  items: Array<DropdownOption | string>;
  defaultIndex?: number;
};

export default function Dropdown({
  className,
  items,
  defaultIndex = 0,
  name,
}: ComponentProps) {
  const [selected, setSelected] = useState(items[defaultIndex]);

  const router = useRouter();

  return (
    <Listbox value={selected} onChange={setSelected} name={name || undefined}>
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
                value={
                  typeof item != "string" ? item?.value || item.label : item
                }
                onClick={(e: any) => {
                  if (typeof item != "string" && item?.href) {
                    setSelected(item);
                    router.push(item.href);
                  }
                }}
              >
                {({ selected }) => (
                  <>
                    {typeof item != "string" && item?.href ? (
                      <Link href={item.href} onClick={() => setSelected(item)}>
                        <span className={selected ? styles.selectedOption : ""}>
                          {typeof item != "string" ? item.label : item}
                        </span>
                      </Link>
                    ) : (
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
