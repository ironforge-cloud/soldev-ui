import styles from "@/styles/core/sidebar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropdownFilterItem from "@/components/library/DropdownFilterItem";
import { computeFilterFromUrlParam } from "@/utils/helpers";

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
  const router = useRouter();

  // track the state of the checked checkboxes
  const [checkedState, setCheckedState] = useState(
    new Array(items.length).fill(false),
  );
  // track the state of the selected items for the multi-select dropdown
  const [selectedItems, setSelectedItems] = useState([]);

  // use the router's query to track the state of selected items
  useEffect(() => {
    const urlData = computeFilterFromUrlParam(
      (router.query[name] as string) ?? "",
    );

    // compute the updated checked states for the checkboxes
    const updatedCheckedState = checkedState.map(
      (_item, id) =>
        urlData.filter((k) => k.toLowerCase() == items[id].toLowerCase())
          .length > 0,
    );

    // compute the updated selected states for multi selects
    const updatedSelectedState = items.filter(
      (_item, index) => updatedCheckedState[index],
    );

    // finally update the state
    setSelectedItems(updatedSelectedState as any);
    setCheckedState(updatedCheckedState);
  }, [router.query]);

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
      (_item, index) => updatedCheckedState[index],
    );

    // construct the new url query params
    const urlQuery = {
      ...router.query, //only update the current key
    };
    urlQuery[name.toLowerCase()] = encodeURIComponent(
      updatedSelectedState.join(",").toLowerCase(),
    );

    // update the url query path for the changed value
    router.push(
      {
        pathname: router.pathname, // use the current path
        query: urlQuery,
      },
      undefined,
      { shallow: true },
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
