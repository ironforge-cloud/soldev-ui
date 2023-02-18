import styles from "@/styles/ImageCTACard.module.css";
import Link from "next/link";

const DEFAULT_IMG_SRC = "/img/cta/0.jpg";

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  text: string;
  imageSrc?: string;
};

export default function ImageCTACard({
  className,
  title,
  href,
  text,
  imageSrc = DEFAULT_IMG_SRC,
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className="">
        <img src={imageSrc} alt={title} />
      </div>
      <div className={styles.metaArea}>
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        <p>{text}</p>
      </div>
    </section>
  );
}
