import Image from "next/image";

import styles from "./avatar.module.scss";

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', onClick }) => {
  return (
    <button className={styles.avatar} onClick={onClick}>
      <Image src={src} alt={alt} width={24} height={24} />
    </button>
  );
}

export default Avatar;
