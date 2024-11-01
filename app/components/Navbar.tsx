// src/components/Navbar.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar: React.FC = () => {
  const navigation = [
    { name: "Expos", href: "expos", current: true },
    { name: "Théâtre", href: "theatre", current: false },
    { name: "Concerts", href: "concerts", current: false },
  ];
  return (
    <nav className={styles.nav}>
      <div className="flex">
        <div>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className={styles.search}>
          <input
            type="search"
            placeholder="Rechercher..."
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <div className="flex">
        <ul className={styles.ul}>
          {navigation.map((item) => (
            <li key={item.name} className={styles.li}>
              <Link
                href={item.href}
                className={`${styles.link} ${
                  item.current ? styles.active : ""
                }`}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <button type="button" className="cta">
            Connexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
