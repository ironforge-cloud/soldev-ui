import styles from "@/styles/ImageCTACard.module.css";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const DEFAULT_IMG_SRC = "/img/cta/0.jpg";

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  text: string;
  imageSrc?: string;
  isExternal?: boolean;
};

export default function ImageCTACard({
  className,
  title,
  href,
  text,
  isExternal,
  imageSrc = DEFAULT_IMG_SRC,
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className="">
        <img src={imageSrc} alt={title} />
      </div>
      <div className={styles.metaArea}>
        <h3>
          <Link href={href} target={isExternal ? "_blank" : ""}>
            {title}
            {isExternal && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
          </Link>
        </h3>
        <p>{text}</p>
      </div>
    </section>
  );
}
