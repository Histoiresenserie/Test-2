# On a marché sur la Lune — projet Next.js

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Structure

```
app/
  layout.js               — structure commune à toutes les pages
  globals.css              — variables de couleur et styles de base
  page.js                  — page d'accueil (provisoire)
  saison-1/page.js         — page de la Saison 1 : lit content/saisons/saison-1.json
  api/auth/route.js        — connexion à GitHub (pour le CMS)
  api/callback/route.js    — finalise la connexion GitHub (pour le CMS)

components/
  SeasonTitle.jsx           — module "Titre de saison"
  ModuleTitle.jsx            — module "Titre de module"
  PhotoModule.jsx             — module "Photo"
  BonusModule.jsx              — module "Bonus"
  FicheTechnique.jsx            — module "Fiche technique"
  RenderBlocks.jsx               — traduit les blocs du CMS en composants ci-dessus

content/saisons/
  saison-1.json             — LE CONTENU. C'est ce fichier que le CMS modifie.

public/admin/
  index.html, config.yml    — l'interface d'écriture (Decap CMS)
```

## Écrire du contenu SANS passer par le CMS

Vous pouvez éditer `content/saisons/saison-1.json` directement (sur GitHub, dans le
navigateur : ouvrez le fichier, cliquez le crayon ✏️, modifiez, "Commit changes").
C'est ce qui alimente la page — pratique en attendant que le CMS soit branché.

## Brancher le CMS (formulaire d'écriture)

Trois étapes, à faire une seule fois.

### 1. Créer une "GitHub OAuth App"

Sur github.com : Settings (de votre compte) → Developer settings → OAuth Apps →
"New OAuth App". Remplissez :
- **Application name** : ce que vous voulez (ex. "CMS On a marché sur la Lune")
- **Homepage URL** : votre lien Vercel (ex. `https://histoiresenserie.vercel.app`)
- **Authorization callback URL** : le même lien + `/api/callback`
  (ex. `https://histoiresenserie.vercel.app/api/callback`)

Cliquez "Register application". Vous obtenez un **Client ID**, et un bouton pour
générer un **Client Secret** — copiez les deux quelque part, le secret ne se
raffiche qu'une fois.

### 2. Ajouter ces deux valeurs dans Vercel

Dans votre projet Vercel : Settings → Environment Variables. Ajoutez :
- `GITHUB_OAUTH_CLIENT_ID` = le Client ID copié plus haut
- `GITHUB_OAUTH_CLIENT_SECRET` = le Client Secret copié plus haut

Puis redéployez (Deployments → ... → Redeploy) pour que ces variables soient prises
en compte.

### 3. Modifier `public/admin/config.yml`

Ouvrez ce fichier et remplacez les deux lignes marquées d'un commentaire :
```yaml
repo: VOTRE-COMPTE/VOTRE-DEPOT       # ex. robin123/histoires-en-serie
base_url: https://VOTRE-SITE.vercel.app   # votre lien Vercel exact
```

Commitez ce changement (sur GitHub directement, ou en redéposant le fichier).

### C'est prêt

Allez sur `https://votre-site.vercel.app/admin` — un écran "Login with GitHub"
apparaît. Connectez-vous, autorisez l'application, et vous arrivez sur le
formulaire d'écriture avec vos modules (Texte, Photo, Bonus, Titre de module,
Fiche technique) prêts à remplir pour la Saison 1.

## Modules pas encore migrés

Les scènes animées (personnage qui marche, cartes, course, Pravda, Breaking News,
bandeau final...) restent pour l'instant dans le fichier `saison-01.html`
d'origine. On les ajoute au CMS un par un.
