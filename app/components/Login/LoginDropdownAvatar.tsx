"use client";
import { useState, useEffect, useRef } from "react";
import Avatar from "../UI/Avatar";
import styles from "./loginDropdownAvatar.module.scss";

export interface LoginDropdownAvatarProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
  logout: () => void;
}

const LoginDropdownAvatar: React.FC<LoginDropdownAvatarProps> = ({
  user,
  logout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si un clic est détecté en dehors
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles["login-dropdown-avatar"]} ref={dropdownRef}>
      <Avatar
        src={user.image}
        alt={user.name}
        size="sm"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />
      <div
        className={`${styles["dropdown-menu"]} ${
          isDropdownOpen ? styles["opened"] : ""
        }`}
      >
        <button onClick={() => console.log("Profil clicked")}>Profil</button>
        <button onClick={() => console.log("Préférences clicked")}>
          Préférences
        </button>
        <button onClick={logout}>Déconnexion</button>
      </div>
    </div>
  );
};

export default LoginDropdownAvatar;
