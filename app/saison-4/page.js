import fs from 'node:fs';
import path from 'node:path';
import SeasonTitle from '@/components/SeasonTitle';
import RenderBlocks from '@/components/RenderBlocks';

export const metadata = {
  title: 'Heureux qui comme Ulysse',
};

function getContent() {
  const filePath = path.join(process.cwd(), 'content', 'saisons', 'saison-4.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default function Saison4() {
  const data = getContent();

  return (
    <main>
      <SeasonTitle seasonLabel={data.seasonLabel} title={data.title} />
      <RenderBlocks blocks={data.blocks} />
    </main>
  );
}
