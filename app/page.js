import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32 }}>
        On a marché sur la Lune
      </h1>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '40ch' }}>
        La page d&apos;accueil de la série (frise chronologique, liste des saisons) reste à migrer
        depuis le prototype HTML. En attendant, voici la Saison 3 :
      </p>
      <Link
        href="/saison-1"
        style={{
          fontFamily: 'Space Mono, monospace',
          border: '1px solid var(--blue)',
          color: 'var(--blue)',
          padding: '10px 20px',
          textDecoration: 'none',
        }}
      >
        Saison 1 →
      </Link>
    </main>
  );
}
