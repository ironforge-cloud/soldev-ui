import styles from "@/styles/core/header.module.css";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  children?: React.ReactNode;
};

export default function AppHeader({ children }: ComponentProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <header className={styles.header}>
      <section className={styles.inner}>
        <section
          className={clsx(
            styles.staticNav,
            // navbarOpen && "bg-black",
          )}
        >
          <Link href={"/"} className={styles.logoArea}>
            <Image src={"/logo-light.svg"} alt="Logo" width={124} height={0} />
          </Link>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className={styles.burger}
          >
            {navbarOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </section>

        <nav
          className={clsx(
            styles.primaryArea,
            navbarOpen ? styles.primaryAreaActive : "hidden",
          )}
        >
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

          <section className={styles.form}>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              {/* <span>icon</span> */}
              <input type="text" name="k" placeholder="Search" />
            </form>

            <button className="lg:btn-default">Submit Content</button>
          </section>
        </nav>
      </section>
    </header>
  );
}
