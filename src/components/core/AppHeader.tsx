import styles from "@/styles/core/header.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import AppNavigation from "./AppNavigation";
import { useRouter } from "next/router";

type ComponentProps = {
  children?: React.ReactNode;
};

export default function AppHeader({ children }: ComponentProps) {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);

  // auto close the nav menu when the page navigates away
  useEffect(() => {
    setNavbarOpen(false);
  }, [router.query]);

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
          <AppNavigation />

          <section className={styles.form}>
            {/* <form onSubmit={(e) => e.preventDefault()}>
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
            </form> */}

            <Link
              href={"/content"}
              className={clsx(
                "btn whitespace-nowrap",
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
