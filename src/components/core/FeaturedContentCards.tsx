import styles from "@/styles/ContentCard.module.css";

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
};

export default function FeaturedContentCards({
  children,
  className,
  title,
}: ComponentProps) {
  return (
    <section
      className={`${styles.scrollContainer} hide-scroll-bar container-inner`}
    >
      {title && <h2 className={styles.heading}>{title}</h2>}

      <section className={`${styles.container} ${className}`}>
        {children}
      </section>
    </section>
  );
}
