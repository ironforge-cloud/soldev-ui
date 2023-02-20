import styles from "@/styles/ContentCard.module.css";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const DEFAULT_IMG_SRC = "/img/cta/0.jpg";

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  description?: string;
  imageSrc?: string;
  authorLabel?: string;
  authorHref?: string;
  tags?: string;
  isHot?: boolean;
  isExternal?: boolean;
};

export default function ContentCard({
  className,
  imageSrc = DEFAULT_IMG_SRC,
  title,
  href,
  description,
  authorLabel,
  authorHref,
  tags,
  isHot,
  isExternal,
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className={styles.image}>
        <Link href={href} target={isExternal ? "_blank" : ""}>
          {isHot && <span className={styles.badge}>Hot</span>}
          <img src={imageSrc} alt={title} />
        </Link>
      </div>

      <div className={styles.metaArea}>
        <h3>
          <Link href={href} target={isExternal ? "_blank" : ""}>
            {title}
            {isExternal && <ArrowUpRightIcon />}
          </Link>
        </h3>

        {authorLabel && (
          <p className={styles.author}>
            by{" "}
            {authorHref ? (
              <Link href={authorHref} target="_blank">
                {authorLabel}
              </Link>
            ) : (
              authorLabel
            )}
          </p>
        )}

        <p className={styles.description}>{description}</p>

        <p className={styles.tags}>
          {tags?.split(",").map((tag, id) => (
            <Link key={id} href={"#"}>{`#${tag.trim()}`}</Link>
          ))}
        </p>
      </div>
    </section>
  );
}
