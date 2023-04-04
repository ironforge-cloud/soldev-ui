import styles from '@/styles/core/dropdown.module.css';
import clsx from 'clsx';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';

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
  // accept the state tracking as props
  selected: any;
  checkedState: any;
  handleCheckChange: Function;
};

export default function DropdownFilterItem({
  className,
  items,
  // defaultIndex = 0,
  name,
  selected,
  checkedState,
  handleCheckChange
}: ComponentProps) {
  return (
    <Listbox value={selected} onChange={handleCheckChange as any} name={name || undefined} multiple>
      <div className={`${styles.container} ${className}`}>
        <Listbox.Button className={styles.actionButton}>
          <span className={styles.actionLabel}>
            {selected.length > 0 ? (
              <>{selected.length == 1 ? selected : `Multiple (${selected.length})`}</>
            ) : (
              'None selected'
            )}
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
          <Listbox.Options static className={clsx(styles.dropdownOptions, '')}>
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  clsx(active ? styles.optionActive : styles.optionInactive)
                }
                value={typeof item != 'string' ? item?.value || item.label : item}
                as="label"
                htmlFor={`${name}_${typeof item != 'string' ? item.label : item}`}
              >
                {({ selected }) => (
                  <>
                    <input
                      type="checkbox"
                      id={`${name}_${typeof item != 'string' ? item.label : item}`}
                      checked={checkedState[index]}
                      onChange={() => handleCheckChange(index)}
                      className="hidden"
                    />
                    <span className={selected ? styles.selectedOption : ''}>
                      {typeof item != 'string' ? item.label : item}
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
