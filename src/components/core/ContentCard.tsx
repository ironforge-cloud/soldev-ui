import styles from "@/styles/ContentCard.module.css";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { SITE_ADDR } from "@/lib/constants/general";

const DEFAULT_IMG_SRC = "/img/cta/0.jpg";

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  description?: string;
  imageSrc?: string;
  authorLabel?: string;
  authorHref?: string;
  tags?: string | string[];
  isHot?: boolean;
  isExternal?: boolean;
  isLarge?: boolean;
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
  isLarge,
}: ComponentProps) {
  // auto convert internal links to internal, and external to external
  if (
    href.substring(0, SITE_ADDR.length).toLowerCase() ===
    SITE_ADDR.toLowerCase()
  ) {
    href = href.substring(SITE_ADDR.length);
    isExternal = false;
  } else if (href.substring(0, 1) !== "/") isExternal = true;

  // always convert `tags` into an array
  if (tags && typeof tags == "string") tags = tags.split(",");

  return (
    <section
      className={`${styles.card} ${isLarge && styles.largeCard} ${className}`}
    >
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

        {description && <p className={styles.description}>{description}</p>}

        {Array.isArray(tags) && tags.length > 0 && (
          <p className={styles.tags}>
            {tags.map((tag) => (
              <Link key={tag.toString()} href={"#"}>{`#${tag.trim()}`}</Link>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
