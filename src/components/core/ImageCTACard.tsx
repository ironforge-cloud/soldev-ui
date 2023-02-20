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
    <Link href={href} target={isExternal ? "_blank" : ""}>
      <span className={styles.card}>
        <img src={imageSrc} alt={title} />
        <span className={styles.metaArea}>
          <h3>
            {title}
            {isExternal && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
          </h3>
          <p>{text}</p>
        </span>
      </span>
    </Link>
  );
}