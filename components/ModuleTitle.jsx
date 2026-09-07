import styles from './ModuleTitle.module.css';

/**
 * MODULE "TITRE DE MODULE"
 * Petit séparateur à traits (ex. "LE V2", "L'OPÉRATION PAPERCLIP") qui introduit
 * un module suivant qui n'a pas de titre intégré (fiche technique, scène, etc.)
 *
 * Props :
 * - children : le texte du titre
 */
export default function ModuleTitle({ children }) {
  return (
    <div className={styles.divider}>
      <span>{children}</span>
    </div>
  );
}
