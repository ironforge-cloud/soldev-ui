import styles from '@/styles/registry/IDLNav.module.css';
import Dropdown from '@/components/core/Dropdown';
import Link from 'next/link';

type ComponentProps = {
  options: { label: string; href?: string }[];
  selected: string;
  idl?: Idl;
};

export default function IDLNav({ options, selected, idl }: ComponentProps) {
  return (
    <>
      <nav className={styles.desktopNav}>
        {options.map((item, id) => (
          <span key={id}>
            {(idl as any)?.[item.label.toLowerCase()] ? (
              <Link
                href={`#${item.label.toLowerCase()}`}
                className={`btn ${
                  selected === item.label.toLocaleLowerCase() ? styles.active : ''
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span key={id} className={`btn ${styles.disabled}`}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <Dropdown
        items={options.filter(item => (idl as any)?.[item.label.toLowerCase()])}
        className="mobile-only"
      />
    </>
  );
}
