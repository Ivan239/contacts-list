import React from 'react';
import github from '../../assets/github.png';
import hh from '../../assets/hh.png';
import styles from './Footer.module.sass';

function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/Ivan239"
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github" className={styles.logo} />
      </a>
      <a
        href="https://innopolis.hh.ru/resume/805199d0ff098806f50039ed1f6330376c396b"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <img src={hh} alt="hh" className={styles.logo} />
      </a>
    </div>
  );
}

export default Footer;
