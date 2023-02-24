import styles from "@/styles/registry/IDLNav.module.css";
import Dropdown from "@/components/core/Dropdown";
import Link from "next/link";

// define the listing of navigation items to be displayed
const LINK_OPTIONS = [
  { label: "Instructions" },
  { label: "Accounts" },
  { label: "Types" },
  { label: "Errors" },
  { label: "Constants" },
  { label: "Events" },
];

type ComponentProps = {
  className?: string;
};

export default function IDLNav(props: ComponentProps) {
  return (
    <>
      <nav className={styles.desktopNav}>
        {LINK_OPTIONS.map((item, id) => (
          <Link
            key={id}
            href={`#${item.label.toLowerCase()}`}
            className={`btn ${id == 0 ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Dropdown items={LINK_OPTIONS} className="mobile-only" />
    </>
  );
}
