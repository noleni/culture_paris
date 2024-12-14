// Updated Navbar component
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./Login/Login";
import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const useFirstPathSegment = () => {
    const pathname = usePathname();
    if (!pathname) return null;
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] || null;
  };

  const navigation = [
    { name: "Expos", href: "/expo", current: useFirstPathSegment() === "expo" },
    { name: "Théâtre", href: "/theatre", current: useFirstPathSegment() === "theatre" },
    { name: "Concert", href: "/concert", current: useFirstPathSegment() === "concert" },
    { name: "Danse", href: "/danse", current: useFirstPathSegment() === "danse" },
    { name: "Enfant", href: "/enfant", current: useFirstPathSegment() === "enfant" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/icons/logo.webp"
            alt="logo"
            width={38}
            height={38}
            priority
          />
        </Link>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
          <div className={styles.search}>
            <input
              type="search"
              placeholder={"Rechercher..."}
              className={styles.input}
            />
            <button type="submit" className={styles.cta}>
              <AiOutlineSearch />
            </button>
          </div>
          <ul className={styles.ul}>
            {navigation.map((item) => (
              <li key={item.name} className={styles.li}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    item.current ? styles.active : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          {!isMobileMenuOpen && <LoginButton />}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
