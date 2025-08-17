import React from 'react';
import styles from './Avatar.module.css';
type AvatarProps = {
  name: string;
  backgroundColor?: string; // opcional, para personalización
};

const Avatar: React.FC<AvatarProps> = ({ name, backgroundColor }) => {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      className={styles.avatar}
      style={{ backgroundColor: backgroundColor || 'var(--color-primary-dark )'}}
      title={name}
    >
      {initial}
    </div>
  );
};

export default Avatar;