import styles from "@/styles/ContentCard.module.css";
import Link from "next/link";

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
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className={styles.image}>
        {isHot && <span className={styles.badge}>Hot</span>}
        <img src={imageSrc} alt={title} />
      </div>

      <div className={styles.metaArea}>
        <h3>
          <Link href={href}>{title}</Link>
        </h3>

        {authorLabel && (
          <p className={styles.author}>
            by{" "}
            {authorHref ? (
              <Link href={authorHref}>{authorLabel}</Link>
            ) : (
              authorLabel
            )}
          </p>
        )}

        <p className={styles.description}>{description}</p>

        <p className={styles.tags}>
          {tags?.split(",").map((tag) => (
            <Link href={"#"}>{`#${tag.trim()}`}</Link>
          ))}
        </p>
      </div>
    </section>
  );
}
