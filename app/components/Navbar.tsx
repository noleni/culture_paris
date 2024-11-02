"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigation = [
    { name: "Expos", href: "/expos", current: true },
    { name: "Théâtre", href: "/theatre", current: false },
    { name: "Concerts", href: "/concerts", current: false },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image
          className={styles.logo}
          src="/icons/logo.webp"
          alt="logo"
          width={38}
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
        <button type="submit" className="cta">
          <AiOutlineSearch />
        </button>
      </div>

      <ul className={styles.ul}>
        {navigation.map((item) => (
          <li key={item.name} className={styles.li}>
            <Link
              href={item.href}
              className={`${styles.link} ${item.current ? styles.active : ""}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <button type="button" className="cta">
        Connexion
      </button>

      <div className={styles.menu} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <AiOutlineClose size={24} />
        ) : (
          <AiOutlineMenu size={24} />
        )}
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.ul}>
            {navigation.map((item) => (
              <li key={item.name} className={styles.li}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    item.current ? styles.active : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.cta}>
            Connexion
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
