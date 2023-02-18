import styles from "@/styles/PageHero.module.css";
import clsx from "clsx";

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  heroSize?: "lg" | "sm";
};

export default function PageHero({
  children,
  className,
  heroSize,
}: ComponentProps) {
  return (
    <section
      className={clsx(
        styles.hero,
        heroSize == "lg" ? "bg-star-lg" : "bg-star-sm",
      )}
    >
      <section className={clsx(styles.inner, className)}>{children}</section>
    </section>
  );
}
