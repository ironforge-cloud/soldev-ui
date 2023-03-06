import styles from '@/styles/ContentCard.module.css';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { SITE_ADDR } from '@/lib/constants/general';
import Image from 'next/image';

const DEFAULT_IMG_SRC = '/placeholder.webp';

type ComponentProps = {
  className?: string;
  title: string;
  href: string;
  description?: string;
  imageSrc?: string;
  authorLabel?: string;
  authorHref?: string;
  tags?: string | string[];
  badgeText?: string;
  isExternal?: boolean;
  isLarge?: boolean;
};

export default function ContentCard({
  className = '',
  imageSrc = DEFAULT_IMG_SRC,
  title,
  href,
  description,
  authorLabel,
  authorHref,
  tags,
  badgeText,
  isExternal,
  isLarge
}: ComponentProps) {
  // auto convert internal links to internal, and external to external
  if (href.substring(0, SITE_ADDR.length).toLowerCase() === SITE_ADDR.toLowerCase()) {
    href = href.substring(SITE_ADDR.length);
    isExternal = false;
  } else if (href.substring(0, 1) !== '/') isExternal = true;

  // always convert `tags` into an array
  if (tags && typeof tags == 'string') tags = tags.split(',');

  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : ''} ${className}`}>
      <Link href={href} target={isExternal ? '_blank' : ''} className={styles.image}>
        {badgeText && <span className={styles.badge}>{badgeText}</span>}
        <Image
          src={imageSrc}
          alt={title}
          fill={true}
          placeholder={'blur'}
          blurDataURL={imageSrc}
          sizes="(max-width: 768px) 100vw,
              (max-width: 500px) 50vw,
              33vw"
        />
      </Link>

      <div className={styles.metaArea}>
        <h3>
          <Link href={href} target={isExternal ? '_blank' : ''}>
            <span>{title}</span>
            {isExternal && <ArrowUpRightIcon />}
          </Link>
        </h3>

        {authorLabel && (
          <p className={styles.author}>
            by{' '}
            {authorHref ? (
              <Link href={authorHref} target="_blank">
                {authorLabel}
              </Link>
            ) : (
              authorLabel
            )}
          </p>
        )}

        {description && <p className={styles.description}>{description}</p>}

        {Array.isArray(tags) && tags.length > 0 && (
          <p className={styles.tags}>
            {tags.map((tag, id) => (
              <Link key={id} href={'#'}>{`#${tag.trim()}`}</Link>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
