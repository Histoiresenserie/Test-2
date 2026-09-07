import styles from './SeasonTitle.module.css';

/**
 * MODULE "TITRE DE SAISON"
 * Ouvre chaque saison. Structure fixe (kicker + titre + sélecteur d'épisodes) ;
 * la direction artistique (couleurs, police, motif) peut changer d'une série à l'autre.
 *
 * Props :
 * - seasonLabel   : ex. "SAISON 1 — 1945–1957"
 * - title         : ex. "La guerre avant les étoiles" (peut contenir un <br/> via un tableau de lignes)
 * - episodes      : [{ label: "PILOTE", href: "#pilote", active: true }, ...]
 */
export default function SeasonTitle({ seasonLabel, title, episodes = [] }) {
  return (
    <section className={styles.cover}>
      <div className="grid-overlay" />
      <div className={styles.kicker}>{seasonLabel}</div>
      <h1 className={styles.title}>{title}</h1>
      {episodes.length > 0 && (
        <nav className={styles.episodeNav}>
          {episodes.map((ep) => (
            <a
              key={ep.href}
              href={ep.href}
              className={`${styles.navLink} ${ep.active ? styles.navLinkActive : ''} ${ep.disabled ? styles.navLinkDisabled : ''}`}
            >
              {ep.label}
            </a>
          ))}
        </nav>
      )}
      <div className={styles.scrollHint}>↓ faire défiler</div>
    </section>
  );
}
