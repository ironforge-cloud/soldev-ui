import styles from '@/styles/Unit.module.css';

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  moduleNumber: number;
};

export default function Unit({ children, className, title, moduleNumber }: ComponentProps) {
  return (
    <section className={` ${styles.card} ${className}`}>
      <section className={styles.moduleHeader}>
        <span className={styles.moduleNumber}>Module {moduleNumber}</span>
        <h2>{title}</h2>
      </section>

      <section className={styles.moduleListing}>{children}</section>
    </section>
  );
}
