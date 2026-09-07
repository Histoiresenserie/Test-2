import styles from './FicheTechnique.module.css';

/**
 * MODULE "FICHE TECHNIQUE" (aka "scroll photo gauche")
 * Photo/schéma fixe à gauche pendant que des informations défilent à droite, étape par étape.
 * Pur CSS (position: sticky), aucun JavaScript nécessaire.
 *
 * Props :
 * - src, alt : la photo/le schéma
 * - accent   : 'blue' | 'red' — couleur du cadre et des repères (camp USA/URSS)
 * - steps    : [{ title, text }, ...]
 */
export default function FicheTechnique({ src, alt, accent = 'blue', steps = [] }) {
  return (
    <div className={styles.wrap} style={{ '--accent': `var(--${accent})` }}>
      <div className={styles.visualCol}>
        <div className={styles.frame}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} />
          ) : (
            <span className={styles.placeholder}>[photo ou schéma]</span>
          )}
        </div>
      </div>
      <div className={styles.textCol}>
        {steps.map((step, i) => (
          <div className={styles.step} key={i}>
            <div className={styles.stepIndex}>
              {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </div>
            <h4 className={styles.stepTitle}>{step.title}</h4>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
