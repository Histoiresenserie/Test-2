'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../app/page.module.css';

// Header fixe en haut de page : se cache quand on scrolle vers le bas
// (pour libérer de l'espace sur mobile), réapparaît dès qu'on remonte.
export default function SiteHeader() {
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--header-h', `${headerRef.current.offsetHeight}px`);
      }
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    function handleScroll() {
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY.current;
      setHidden(scrollingDown && y > 80);
      lastScrollY.current = y;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.siteHeader} ${hidden ? styles.siteHeaderHidden : ''}`}
    >
      <img src="/logo-horizontal.png" alt="Histoires en Série" className={styles.headerLogo} />
      <div className={styles.headerSpacer} />
      <button type="button" className={styles.btnSupport}>Soutenir</button>
      <button type="button" className={styles.btnSignup}>Inscription</button>
      <button type="button" className={styles.menuButton} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
