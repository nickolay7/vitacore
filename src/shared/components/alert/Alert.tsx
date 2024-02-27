import React, { useState, useEffect, FC } from 'react';
import styles from './styles.module.css';

interface AlertProps {
  message: string;
}
const Alert: FC<AlertProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.alert} ${visible ? '' : styles.hidden}`}>
      {message}
    </div>
  );
};

export default Alert;
