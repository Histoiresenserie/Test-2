import ModuleTitle from '@/components/ModuleTitle';
import PhotoModule from '@/components/PhotoModule';
import BonusModule from '@/components/BonusModule';
import FicheTechnique from '@/components/FicheTechnique';

// Transforme un **texte en gras** écrit dans le CMS en vrai <strong>.
// Volontairement minimal : on ne gère que le gras pour l'instant.
function renderInlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function paragraphsOf(field) {
  // Le CMS stocke une liste de { value: "..." } — on simplifie ici en tableau de strings.
  return (field || []).map((p) => (typeof p === 'string' ? p : p.value));
}

/**
 * Prend le tableau "blocks" d'un fichier de contenu (content/saisons/*.json,
 * généré par le CMS) et rend la suite de modules correspondante.
 */
export default function RenderBlocks({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <div className="doc" key={i}>
                {paragraphsOf(block.paragraphs).map((p, j) => (
                  <p key={j}>{renderInlineMarkdown(p)}</p>
                ))}
              </div>
            );

          case 'moduleTitle':
            return <ModuleTitle key={i}>{block.title}</ModuleTitle>;

          case 'photo':
            return (
              <PhotoModule
                key={i}
                title={block.title}
                src={block.image || block.imageUrl}
                alt={block.alt}
                caption={block.caption}
                noTitle={block.noTitle}
                video={block.youtubeId ? { youtubeId: block.youtubeId } : undefined}
              />
            );

          case 'bonus':
            return (
              <BonusModule
                key={i}
                title={block.title}
                src={block.image || block.imageUrl}
                caption={block.caption}
              >
                {paragraphsOf(block.paragraphs).map((p, j) => (
                  <p key={j}>{renderInlineMarkdown(p)}</p>
                ))}
              </BonusModule>
            );

          case 'ficheTechnique':
            return (
              <FicheTechnique
                key={i}
                src={block.image || block.imageUrl}
                alt={block.alt}
                accent={block.accent}
                steps={block.steps}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
