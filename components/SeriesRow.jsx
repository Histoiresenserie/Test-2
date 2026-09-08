import styles from '../app/page.module.css';
import SeriesCarousel from './SeriesCarousel';

// Une "rangée" de la page d'accueil : titre + carrousel horizontal de séries.
// Réutilisé pour "Les dernières séries" et les futures rangées thématiques.
export default function SeriesRow({ id, title, saisons }) {
  return (
    <section id={id} className={styles.latestSection}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.sectionScrollHint} aria-hidden="true" />
      </div>
      <SeriesCarousel saisons={saisons} />
    </section>
  );
}
