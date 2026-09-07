import styles from './PhotoModule.module.css';

/**
 * MODULE "PHOTO" — validé, définitif.
 * Bandeau sombre avec kicker fixe "PIÈCE D'ARCHIVE", un titre, une photo/vidéo, et une légende/crédit.
 *
 * Props :
 * - title    : ex. "Le V2"
 * - src      : URL de l'image (laisser vide pour le cadre placeholder)
 * - alt      : texte alternatif de l'image
 * - video    : { youtubeId } si vidéo YouTube au lieu d'une photo (optionnel)
 * - caption  : légende / crédit sous le cadre (optionnel)
 * - noTitle  : true pour les bandeaux vidéo d'intro sans kicker ni titre
 */
export default function PhotoModule({ title, src, alt, video, caption, noTitle = false }) {
  return (
    <section className={styles.banner}>
      <div className="grid-overlay" />
      {!noTitle && (
        <>
          <div className={styles.kicker}>PIÈCE D&apos;ARCHIVE</div>
          <h2 className={styles.title}>{title}</h2>
        </>
      )}
      <div className={styles.frame}>
        {video?.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={title || 'Vidéo'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || title} />
        ) : (
          <div className={styles.placeholder}>[photo à venir]</div>
        )}
      </div>
      {caption && <div className={styles.caption}>{caption}</div>}
    </section>
  );
}
