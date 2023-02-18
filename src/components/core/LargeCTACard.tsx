import styles from "@/styles/LargeCTACard.module.css";
import clsx from "clsx";
import Link from "next/link";

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
};

export default function LargeCTACard({
  className,
  title,
  text,
  ctaHref,
  ctaLabel,
  backgroundImage,
}: ComponentProps) {
  return (
    <section className={styles.container}>
      <section
        className={clsx(styles.inner, "container-inner", className)}
        style={
          backgroundImage
            ? { backgroundImage: `url('${backgroundImage}')` }
            : {}
        }
      >
        <h2>{title}</h2>

        {text && <p>{text}</p>}

        {ctaHref && (
          <Link href={ctaHref} className="inline-flex btn btn-default">
            {ctaLabel || "Get started"}
          </Link>
        )}
      </section>
    </section>
  );
}
