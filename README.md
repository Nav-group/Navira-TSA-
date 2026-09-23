# Navira TSA — Console Admin

Page web unique (`index.html`), à héberger séparément de l'app mobile. Utilise Firebase Auth + Firestore pour :
- **Valider ou refuser** les dossiers KYC des streamers (`streamer_requests`)
- **Valider ou refuser** les demandes de retrait (`withdrawal_requests`)
- **Voir la liste** des streamers déjà validés

## Étape 1 — Créer le compte de l'administrateur

1. Console Firebase → **Authentication** → **Users** → **"Add user"**
2. Renseigne l'email admin (`trillionbooks6@gmail.com`) et un mot de passe
3. Copie l'**UID** généré pour ce compte (colonne "User UID")

## Étape 2 — Donner les droits admin à ce compte

1. Console Firebase → **Firestore Database** → **"Start collection"**
2. Nom de la collection : `admins`
3. ID du document : **colle l'UID copié à l'étape 1**
4. Ajoute un champ quelconque, par ex. `role` (string) = `admin`
5. Enregistre

C'est cette collection `admins` que `firestore.rules` (déjà fourni) utilise pour savoir qui a le droit de valider/refuser.

## Étape 3 — Héberger la page

Le plus simple : **Firebase Hosting** (gratuit, même projet Firebase).

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Choisis le dossier contenant index.html comme "public directory"
firebase deploy
```

Firebase te donne une URL du type `https://navira-tsa-371c8.web.app` — c'est le lien à garder pour l'administrateur.

Alternative simple : héberger juste ce fichier `index.html` sur GitHub Pages (Add file → Upload files → activer Pages sur la branche).

## Ce qu'il reste à faire côté app mobile

Pour que les demandes s'affichent ici avec les photos, l'app mobile doit encore :
1. Uploader les photos du dossier streamer (profil, CNI recto/verso, selfie) vers Firebase Storage
2. Créer le document `streamer_requests` avec les champs : `userId`, `firstName`, `lastName`, `country`, `city`, `birthDate`, `profilePhotoUrl`, `idFrontUrl`, `idBackUrl`, `selfieWithIdUrl`, `status: "en_attente"`

(Actuellement `StreamerOnboardingScreen.js` a un `TODO` à cet endroit — je peux le compléter si tu veux qu'on enchaîne dessus.)
