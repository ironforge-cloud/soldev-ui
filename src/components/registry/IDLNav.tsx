import styles from "@/styles/registry/IDLNav.module.css";
import Dropdown from "@/components/core/Dropdown";
import Link from "next/link";

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
          <Link
            key={id}
            href={`#${item.label.toLowerCase()}`}
            className={`btn ${
              selected === item.label.toLocaleLowerCase() ? styles.active : ""
            } ${
              (idl as any)?.[item.label.toLowerCase()] ? "" : styles.disabled
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Dropdown items={options} className="mobile-only" />
    </>
  );
}
