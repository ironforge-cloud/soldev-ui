import styles from "@/styles/pageHero.module.css";
import clsx from "clsx";

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function PageHero({ children, className }: ComponentProps) {
  return (
    <section className={styles.hero}>
      <section className={clsx(styles.inner, className)}>{children}</section>
    </section>
  );
}
