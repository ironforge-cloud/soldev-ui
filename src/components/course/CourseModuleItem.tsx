import styles from "@/styles/CourseModule.module.css";
import Link from "next/link";
import clsx from "clsx";

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  getCourseLessonProgress,
  saveCourseLessonProgress,
} from "@/utils/course";

type ComponentProps = {
  className?: string;
  isActive?: boolean;
  isSmall?: boolean;
  title: string;
  href: string;
  lessonNumber?: number;
  minuteCounter?: number;
  isHidden?: boolean;
};

export default function CourseModuleItem({
  className,
  isActive,
  isSmall,
  title,
  href,
  lessonNumber,
  minuteCounter,
  isHidden,
}: ComponentProps) {
  // track the completion state of the checkmark for the ui
  const [isComplete, setIsComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // set the completed status via the local storage value
  useEffect(() => {
    setIsComplete(getCourseLessonProgress(href));
  }, [href]);

  return (
    <section
      className={clsx(
        isSmall ? styles.lineItemSmall : styles.lineItem,
        isActive && styles.lessonActive,
        isHidden === true && "blur-sm",
      )}
    >
      <button
        className={clsx(
          styles.lessonStatus,
          isComplete && styles.lessonComplete,
        )}
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        onClick={() => {
          if (isHidden) return;
          setIsComplete(saveCourseLessonProgress(href, !isComplete));
        }}
      >
        {isComplete || isHovered ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <span>{lessonNumber}</span>
        )}
      </button>

      <div className={styles.lineItemMetaArea}>
        <h3>
          <Link href={isHidden === true ? "/course" : href}>
            <span>{title}</span>
            <span>
              <ArrowUpRightIcon />
            </span>
          </Link>
        </h3>

        <p className={styles.metaInfo}>
          <span>Lesson {lessonNumber}</span>
          {minuteCounter && minuteCounter > 0 && (
            <>
              <span>&bull;</span>
              <span>{minuteCounter} minutes</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
