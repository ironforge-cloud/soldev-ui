import styles from '@/styles/core/header.module.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import AppNavigation from './AppNavigation';
import { useRouter } from 'next/router';
import { ScaleIcon } from '@heroicons/react/24/outline';

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
            styles.staticNav
            // navbarOpen && "bg-black",
          )}
        >
          <Link href="/" className={styles.logoArea}>
            <Image src={'/logo-light.svg'} alt="Logo" width={124} height={0} />
          </Link>

          <button onClick={() => setNavbarOpen(!navbarOpen)} className={styles.burger}>
            {navbarOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </section>

        <nav className={clsx(styles.primaryArea, navbarOpen ? styles.primaryAreaActive : 'hidden')}>
          <AppNavigation />

          <section className={styles.form}>
            <Link
              href={'/validator'}
              className="inline-flex items-center gap-x-2 rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <ScaleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Stake SOL
            </Link>
          </section>
        </nav>
      </section>
    </header>
  );
}
