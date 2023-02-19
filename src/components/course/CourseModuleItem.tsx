import styles from "@/styles/CourseModule.module.css";
import Link from "next/link";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  lessonNumber?: number;
  minuteCounter?: number;
};

export default function CourseModuleItem({
  className,
  title,
  href,
  lessonNumber,
  minuteCounter,
}: ComponentProps) {
  return (
    <section className={styles.lineItem}>
      <div className={styles.lessonStatus}>
        <span>{lessonNumber}</span>
      </div>

      <div className={styles.lineItemMetaArea}>
        <h3>
          <Link href={href}>
            {title}
            <ArrowUpRightIcon className="text-xl" />
          </Link>
        </h3>

        <p className={styles.metaInfo}>
          <span>Lesson {lessonNumber}</span>
          <span>&bull;</span>
          <span>{minuteCounter} minutes</span>
        </p>
      </div>
    </section>
  );
}
