import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import styles from './page.module.css';
import SeriesRow from '../components/SeriesRow';
import SiteHeader from '../components/SiteHeader';

// Lit toutes les saisons publiées dans content/saisons, dans l'ordre (saison-1, saison-2, …).
// Ajouter une nouvelle saison (fichier + page) la fait apparaître ici automatiquement.
function getSaisons() {
  const dir = path.join(process.cwd(), 'content', 'saisons');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));

  return files
    .map((file) => {
      const slug = file.replace(/\.json$/, '');
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      const coverImage = data.coverImage
        ?? data.blocks?.find((b) => b.type === 'photo')?.imageUrl
        ?? null;
      return {
        slug,
        title: data.title,
        seasonLabel: data.seasonLabel,
        coverImage,
        summary: data.summary ?? null,
        seasonsCount: data.seasonsCount ?? 1,
        years: data.years ?? null,
      };
    })
    .sort((a, b) => {
      const na = parseInt(a.slug.match(/\d+/)?.[0] ?? '0', 10);
      const nb = parseInt(b.slug.match(/\d+/)?.[0] ?? '0', 10);
      return na - nb;
    });
}

// Rangées thématiques de la page d'accueil. Pour l'instant elles piochent
// toutes dans la même liste de séries (contenu encore limité) ; à terme,
// chaque rangée pourra filtrer par thème et/ou varier selon les visiteurs.
// L'ordre est volontairement mélangé différemment par rangée ici, histoire de
// bien voir que ce sont des carrousels indépendants tant qu'on n'a que 4 séries.
function getRows(saisons) {
  const reversed = [...saisons].reverse();
  const shuffled = [saisons[2], saisons[0], saisons[3], saisons[1]].filter(Boolean);

  return [
    { id: 'saisons', title: 'Les dernières séries', saisons },
    { id: 'guerre-froide', title: 'Histoire(s) de Guerre Froide', saisons: reversed },
    { id: 'musique', title: 'Histoire(s) de Musique', saisons: shuffled },
  ];
}

export default function Home() {
  const saisons = getSaisons();
  const rows = getRows(saisons);

  return (
    <main>
      <SiteHeader />
      <div className={styles.screen}>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <img src="/logo-main.png" alt="Histoires en Série" className={styles.mainLogo} />
            <div className={styles.heroDivider} />
            <p className={styles.intro}>
              <span className={styles.dash}>— </span>
              De la culture à scroller.
              <span className={styles.dash}> —</span>
            </p>
          </div>
        </section>

        <div className={styles.ctaBlock}>
          <Link href="#saisons" className={styles.btnPrimary}>Explorer les séries</Link>
          <button type="button" className={styles.btnSecondary}>Série au hasard</button>
        </div>
      </div>

      {rows.map((row) => (
        <SeriesRow key={row.id} id={row.id} title={row.title} saisons={row.saisons} />
      ))}
    </main>
  );
}
