import styles from "@/styles/CourseModule.module.css";
import Link from "next/link";
import clsx from "clsx";

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  className?: string;
  isActive?: boolean;
  isComplete?: boolean;
  isSmall?: boolean;
  title: string;
  href: string;
  lessonNumber?: number;
  minuteCounter?: number;
  isHidden?: boolean;
};

export default function CourseModuleItem({
  className,
  isComplete,
  isActive,
  isSmall,
  title,
  href,
  lessonNumber,
  minuteCounter,
  isHidden,
}: ComponentProps) {
  return (
    <section
      className={clsx(
        isSmall ? styles.lineItemSmall : styles.lineItem,
        isActive && styles.lessonActive,
        isHidden === true && "blur-sm",
      )}
    >
      <div
        className={clsx(
          styles.lessonStatus,
          isComplete && styles.lessonComplete,
        )}
      >
        {isComplete ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <span>{lessonNumber}</span>
        )}
      </div>

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
