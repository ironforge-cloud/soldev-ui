import styles from '@/styles/LargeCTACard.module.css';
import clsx from 'clsx';
import Link from 'next/link';

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
};

export default function LargeCTACard({
  className,
  title,
  text,
  ctaHref,
  ctaLabel,
  backgroundImage
}: ComponentProps) {
  return (
    <section className={styles.container}>
      <section
        className={clsx(
          styles.inner,
          'container-inner to-[#9945FF]] bg-gradient-to-r from-[#14F195]',
          className
        )}
        style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : {}}
      >
        <h2>{title}</h2>

        {text && <p>{text}</p>}

        {ctaHref && (
          <Link target="_blank" href={ctaHref} className="btn btn-default inline-flex">
            {ctaLabel || 'Get started'}
          </Link>
        )}
      </section>
    </section>
  );
}
