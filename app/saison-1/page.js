import fs from 'node:fs';
import path from 'node:path';
import SeasonTitle from '@/components/SeasonTitle';
import RenderBlocks from '@/components/RenderBlocks';

export const metadata = {
  title: 'Saison 1 — On a marché sur la Lune',
};

function getContent() {
  const filePath = path.join(process.cwd(), 'content', 'saisons', 'saison-1.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default function Saison1() {
  const data = getContent();

  return (
    <main>
      <SeasonTitle
        seasonLabel={data.seasonLabel}
        title={data.title}
        episodes={[
          { label: 'PILOTE', href: '#pilote', active: true },
          { label: 'ÉPISODE 1', href: '#episode-1' },
          { label: 'ÉPISODE 2', href: '#episode-2' },
          { label: 'ÉPISODE 3', href: '#episode-3' },
        ]}
      />

      <RenderBlocks blocks={data.blocks} />

      <div className="doc" style={{ paddingBottom: '8rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: 'var(--ink-soft)' }}>
          — Suite à venir : Opération Paperclip, Von Braun, Korolev… —
        </p>
      </div>
    </main>
  );
}
