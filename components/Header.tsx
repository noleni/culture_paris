// Updated Navbar component
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./Login/Login";
import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getFirstPathSegment } from "@/app/utils/getFirstPathSegment";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const firstPathSegment = getFirstPathSegment(usePathname());

  const navigation = [
    { name: "Expos", href: "/expo", current: firstPathSegment === "expo" },
    {
      name: "Théâtre",
      href: "/theatre",
      current: firstPathSegment === "theatre",
    },
    {
      name: "Concert",
      href: "/concert",
      current: firstPathSegment === "concert",
    },
    {
      name: "Danse",
      href: "/danse",
      current: firstPathSegment === "danse",
    },
    {
      name: "separator",
    },
    {
      name: "Jeune public",
      href: "/jeune-public",
      current: firstPathSegment === "jeune-public",
    },
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
          <ul className={styles.ul}>
            {navigation.map((item) =>
              item.name === "separator" ? (
                <li key={item.name} className={styles.separator}>|</li>
              ) : (
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
              )
            )}
          </ul>
        </nav>
        <div className={styles.actions}>
          {!isMobileMenuOpen && (
            <>
              <button type="button">
                <AiOutlineSearch size={30} />
              </button>
              <button type="button">
                <IoMdNotificationsOutline size={30} />
              </button>
              <LoginButton />
            </>
          )}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
