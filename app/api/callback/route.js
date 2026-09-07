import { NextResponse } from 'next/server';

// Étape 2 du "branchement" OAuth : GitHub renvoie ici avec un code temporaire,
// qu'on échange contre un vrai jeton d'accès, puis qu'on transmet au formulaire
// d'écriture (public/admin) qui a ouvert cette fenêtre.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse(
      renderMessage('error', { message: 'Variables GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET manquantes.' })
    );
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      return htmlResponse(
        renderMessage('error', { message: tokenData.error_description || 'Erreur GitHub inconnue.' })
      );
    }

    return htmlResponse(
      renderMessage('success', { token: tokenData.access_token, provider: 'github' })
    );
  } catch (err) {
    return htmlResponse(renderMessage('error', { message: String(err) }));
  }
}

function htmlResponse(html) {
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

// Le CMS (dans la fenêtre qui a ouvert celle-ci) attend un message précis
// via window.postMessage — ce petit script le lui envoie.
function renderMessage(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    <p style="font-family: sans-serif; padding: 2rem;">Connexion en cours… vous pouvez fermer cette fenêtre si elle ne se ferme pas seule.</p>
  </body>
</html>`;
}
