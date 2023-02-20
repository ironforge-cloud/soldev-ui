import styles from "@/styles/IDLCard.module.css";
import Link from "next/link";
import { ArrowDownTrayIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  className?: string;
  href: string;
  title: string;
  address: string;
  network: "mainnet" | "testnet" | "devnet";
  description?: string;
};

export default function IDLCard({
  className,
  href,
  title,
  network,
  address,
  description,
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className={styles.metaArea}>
        <section className={styles.heading}>
          <h4>
            <Link href={href}>{title}</Link>
          </h4>

          <span className={styles.network + " " + styles[network]}>
            {network}
          </span>
        </section>

        <p className={styles.address}>{address}</p>

        {/* <p className={styles.description}>{description}</p> */}
      </div>
      <div className={styles.actionArea}>
        <Link href={"#"}>
          <ArrowDownTrayIcon />
          Download
        </Link>
        <Link href={href}>
          Details
          <ArrowUpRightIcon />
        </Link>
      </div>
    </section>
  );
}
