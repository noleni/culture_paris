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
    {
      name: "Théâtre",
      href: "/theatre",
      current: useFirstPathSegment() === "theatre",
    },
    {
      name: "Concert",
      href: "/concert",
      current: useFirstPathSegment() === "concert",
    },
    {
      name: "Danse",
      href: "/danse",
      current: useFirstPathSegment() === "danse",
    },
    {
      name: "Enfant",
      href: "/enfant",
      current: useFirstPathSegment() === "enfant",
    },
  ];

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/icons/logo.webp"
          alt="logo"
          width={38}
          height={38}
          priority
        />
      </Link>
      <nav className={styles.nav}>
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
      </nav>
      <div className="flex">
        {/* <button type="button" className="cta">
          Connexion
        </button> */}
        <LoginButton />
      </div>

      {/* <div className={styles.menu} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <>
              <AiOutlineMenu size={24} />
            </>
          )}
        </div> */}

      {/* {isMobileMenuOpen && (
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
        )} */}
    </header>
  );
};

export default Navbar;
