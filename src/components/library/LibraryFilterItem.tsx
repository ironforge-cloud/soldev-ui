import styles from "@/styles/core/sidebar.module.css";
import { useState } from "react";
import DropdownFilterItem from "@/components/library/DropdownFilterItem";

type ComponentProps = {
  name: string;
  label: string;
  items: any[];
};

export default function LibraryFilterItem({
  name,
  label,
  items,
}: ComponentProps) {
  // track the state of the checked checkboxes
  const [checkedState, setCheckedState] = useState(
    new Array(items.length).fill(false),
  );
  // track the state of the selected items for the multi-select dropdown
  const [selectedItems, setSelectedItems] = useState([]);

  /*
    onChange handler function to update both states together
  */
  function handleCheckChange(position: number) {
    // compute the updated checked states
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );

    // compute the updated selected states
    const updatedSelectedState = items.filter(
      (item, index) => updatedCheckedState[index],
    );

    // actually update the state
    setSelectedItems(updatedSelectedState as any);
    setCheckedState(updatedCheckedState);
  }

  return (
    <section className={styles.section}>
      <h3>
        {label || name}
        {/* <QuestionMarkCircleIcon /> */}
      </h3>

      {/* <p className={styles.minorText}>Optional minor content</p> */}

      <DropdownFilterItem
        items={items}
        name={name}
        selected={selectedItems}
        checkedState={checkedState}
        handleCheckChange={handleCheckChange}
        className="lg:hidden"
      />

      <ul className={`${styles.listing} hidden lg:block`}>
        {items.map((item, id) => {
          const label = typeof item == "string" ? item : item?.label;
          return (
            <li key={id}>
              <input
                type="checkbox"
                id={`${name}_${label}`}
                name={`${name}_${label}`}
                checked={checkedState[id]}
                onChange={() => handleCheckChange(id)}
              />
              <label htmlFor={`${name}_${label}`} className="block w-full">
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
