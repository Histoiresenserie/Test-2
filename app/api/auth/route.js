import { NextResponse } from 'next/server';

// Étape 1 du "branchement" OAuth : redirige vers GitHub pour demander l'autorisation.
// Le CMS (public/admin) appelle cette route quand on clique sur "Login with GitHub".
export async function GET(request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      'Variable GITHUB_OAUTH_CLIENT_ID manquante dans les réglages Vercel (Environment Variables).',
      { status: 500 }
    );
  }

  const { origin } = new URL(request.url);
  const redirectUri = `${origin}/api/callback`;
  const state = Math.random().toString(36).slice(2);

  const authorizeUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent('repo,user')}` +
    `&state=${state}`;

  return NextResponse.redirect(authorizeUrl);
}
