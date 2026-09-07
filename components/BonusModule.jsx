import styles from './BonusModule.module.css';

/**
 * MODULE "BONUS" — validé, définitif.
 * Bandeau sombre, photo à gauche + texte à droite, étiquette orange "BONUS".
 *
 * Props :
 * - title    : ex. "Cap Canaveral"
 * - src      : URL de la photo
 * - alt      : texte alternatif
 * - caption  : légende / crédit sous la photo (optionnel)
 * - children : le texte du bonus (un ou plusieurs <p>)
 */
export default function BonusModule({ title, src, alt, caption, children }) {
  return (
    <section className={styles.banner}>
      <div className="grid-overlay" />
      <div className={styles.content}>
        <div className={styles.photoCol}>
          <div className={styles.frame}>
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt || title} />
            ) : (
              <span className={styles.placeholder}>[photo]</span>
            )}
          </div>
          {caption && <div className={styles.caption}>{caption}</div>}
        </div>
        <div className={styles.textCol}>
          <div className={styles.tag}>BONUS</div>
          <h3 className={styles.title}>{title}</h3>
          {children}
        </div>
      </div>
    </section>
  );
}
