'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './SeriesCarousel.module.css';

function seasonsLabel(count) {
  return count <= 1 ? 'Mini-série' : `${count} saisons`;
}

// Observe chaque carte et la marque "focused" dès qu'elle est majoritairement
// visible dans le carrousel, pour l'effet "au premier plan" façon Netflix.
export default function SeriesCarousel({ saisons }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [openSlug, setOpenSlug] = useState(null);
  const openSaison = saisons.find((s) => s.slug === openSlug) ?? null;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // `isIntersecting` reste vrai dès qu'un seul pixel est visible : on se base
    // plutôt sur `intersectionRatio` pour exiger une carte quasi entièrement
    // visible avant de la considérer "au premier plan".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.unfocused, entry.intersectionRatio < 0.98);
        });
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.98, 1] }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [saisons]);

  // Empêche le scroll de la page derrière l'aperçu ouvert, et permet de le
  // fermer avec Échap.
  useEffect(() => {
    if (!openSlug) return;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpenSlug(null);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSlug]);

  function handleCardClick(e, slug) {
    e.preventDefault();
    setOpenSlug(slug);
  }

  return (
    <>
      <div className={styles.carousel} ref={trackRef}>
        {saisons.map((saison, index) => (
          <Link
            key={saison.slug}
            href={`/${saison.slug}`}
            className={styles.carouselCard}
            onClick={(e) => handleCardClick(e, saison.slug)}
            ref={(el) => { cardRefs.current[index] = el; }}
          >
            <div
              className={styles.carouselCardMedia}
              data-fallback={saison.coverImage ? undefined : (index % 2 === 0 ? 'magenta' : 'yellow')}
              style={saison.coverImage ? { backgroundImage: `url(${saison.coverImage})` } : undefined}
            />
            <div className={styles.carouselCardScrim} />
            <div className={styles.carouselCardContent}>
              <span className={styles.cardLabel}>{seasonsLabel(saison.seasonsCount)}</span>
              <span className={styles.carouselCardTitle}>{saison.title}</span>
            </div>
          </Link>
        ))}
      </div>

      {openSaison && (
        <div className={styles.overlayBackdrop} onClick={() => setOpenSlug(null)}>
          <div className={styles.overlayCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.overlayMedia}>
              <div
                className={styles.carouselCardMedia}
                data-fallback={openSaison.coverImage ? undefined : 'magenta'}
                style={openSaison.coverImage ? { backgroundImage: `url(${openSaison.coverImage})` } : undefined}
              />
              <button
                type="button"
                className={styles.overlayClose}
                aria-label="Fermer"
                onClick={() => setOpenSlug(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.overlayContent}>
              <span className={`${styles.cardLabel} ${styles.overlayLabel}`}>{seasonsLabel(openSaison.seasonsCount)}</span>
              <h3 className={styles.overlayTitle}>{openSaison.title}</h3>
              {openSaison.summary && <p className={styles.overlaySummary}>{openSaison.summary}</p>}
              <div className={styles.overlayFooter}>
                {openSaison.years && <span className={styles.summaryMeta}>{openSaison.years}</span>}
                <Link href={`/${openSaison.slug}`} className={styles.overlayCta}>
                  Voir la série →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
