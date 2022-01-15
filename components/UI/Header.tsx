import type { NextPage } from "next";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Consul Clone</div>
      <nav>
        <ul>
          <li>
            <Link href="/services">Services</Link>
          </li>

          <li>
            <Link href="/nodes">Nodes</Link>
          </li>

          <li>
            <Link href="/kv">Key / Value</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
