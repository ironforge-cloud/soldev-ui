import clsx from "clsx";
import styles from "@/styles/core/sidebar.module.css";
import { useState } from "react";

import {
  CONTENT_LEVELS,
  CONTENT_TYPES,
  CONTENT_TAGS,
} from "@/lib/constants/content";

import LibraryFilterItem from "./LibraryFilterItem";

type ComponentProps = {
  className?: string;
};

export default function LibraryFilters({ className }: ComponentProps) {
  return (
    <>
      <LibraryFilterItem name="types" label="Type" items={CONTENT_TYPES} />
      <LibraryFilterItem name="levels" label="Level" items={CONTENT_LEVELS} />
      {/* <LibraryFilterItem name="tags" label="Tag" items={CONTENT_TAGS} /> */}
    </>
  );

  // return (
  //   <aside
  //     className={clsx(styles.leftSideSmall, styles.stickySidebar, "order-1")}
  //   >
  //     <LibraryFilterItem name="types" label="Type" items={CONTENT_TYPES} />
  //     <LibraryFilterItem name="levels" label="Level" items={CONTENT_LEVELS} />
  //     {/* <LibraryFilterItem name="tags" label="Tag" items={CONTENT_TAGS} /> */}
  //   </aside>
  // );
}
