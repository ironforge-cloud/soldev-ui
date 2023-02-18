import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/header.module.css";

type ComponentProps = {
  children?: React.ReactNode;
};

export default function AppHeader({ children }: ComponentProps) {
  return (
    <header className={styles.header}>
      <section className={styles.inner}>
        <Link href={"/"} className={styles.logoArea}>
          <Image src={"/logo-light.svg"} alt="Logo" width={124} height={0} />
        </Link>

        <section className={styles.primaryArea}>
          <ul className={styles.linkArea}>
            <li>
              <Link href={"#"}>Learn</Link>
            </li>
            <li>
              <Link href={"#"}>Updates</Link>
            </li>
            <li>
              <Link href={"#"}>Resources</Link>
            </li>
            <li>
              <Link href={"#"}>Library</Link>
            </li>
          </ul>

          <section className="flex space-x-2">
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              {/* <span>icon</span> */}
              <input type="text" name="k" placeholder="Search" />
            </form>

            <button className="btn-default">Submit Content</button>
          </section>
        </section>
      </section>
    </header>
  );
}
