import styles from '@/styles/DataCard.module.css';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid';

type ComponentProps = {
  className?: string;
  id: number;
  href: string;
  githubLink: string;
  title: string;
  status: 'draft';
  type: 'core';
  date?: string;
  authors?: string;
  description?: string;
};

export default function SIMDCard({
  className,
  id,
  title,
  href,
  githubLink,
  authors,
  date,
  type,
  status,
  description
}: ComponentProps) {
  return (
    <section className={styles.card}>
      <div className={styles.metaArea}>
        <section className={styles.heading}>
          <h4>
            <Link href={href}>{title}</Link>
          </h4>

          <span className={styles.statusIndicator + ' ' + styles[status]}>{status}</span>
        </section>

        <p className={styles.description}>{authors}</p>
        <p className={styles.description}>
          <span>{type}</span>
          <span className="mx-1">&bull;</span>
          <span>{date}</span>
        </p>

        {/* <p className={styles.description}>{description}</p> */}
      </div>
      <div className={styles.actionArea}>
        <Link href={githubLink}>
          <ArrowTopRightOnSquareIcon />
          GitHub
        </Link>
        <Link href={href}>
          Details
          <ArrowUpRightIcon />
        </Link>
      </div>
    </section>
  );
}
