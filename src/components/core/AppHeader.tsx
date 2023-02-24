import styles from "@/styles/core/header.module.css";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

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
              <Link href={"/library"}>Library</Link>
            </li>
          </ul>

          <section className={styles.form}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="inputWithIcon">
                <label htmlFor="site_search">
                  <MagnifyingGlassIcon />
                </label>
                <input
                  type="text"
                  id="site_search"
                  name="k"
                  placeholder="Search"
                  className={navbarOpen ? styles.formInput : "input-dark"}
                />
              </div>
            </form>

            <Link
              href={"/content"}
              className={clsx(
                "btn",
                navbarOpen ? styles.formButton : "btn-default",
              )}
            >
              Submit Content
            </Link>
          </section>
        </nav>
      </section>
    </header>
  );
}
