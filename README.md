# Navira 🟢⚫

Application mobile de streaming en direct — la version africaine du concept de lives à la "Switch".
Les créateurs de contenu font des lives et reçoivent des cadeaux ; les spectateurs achètent des coins Navira pour les soutenir.

**Tous les fichiers sont à plat (aucun sous-dossier)** pour pouvoir les uploader un par un directement dans un repo GitHub via "Add file → Upload files".

## Stack technique

- **App mobile** : React Native (Expo)
- **Navigation** : React Navigation (native stack)
- **Backend / Auth / Données** : Firebase (Auth, Firestore, Storage)
- **Live streaming** : à intégrer — Agora.io ou LiveKit recommandés (voir `firebase.js` pour le point de départ des services)
- **Paiements** : 7 moyens de paiement africains (Tmoney, Flooz, Orange Money, MTN MoMo, Moov Money, Wave, carte bancaire) — passerelle à confirmer (ex. CinetPay)

## Liste des fichiers

| Fichier | Rôle |
|---|---|
| `App.js` | Point d'entrée de l'application |
| `app.json` | Config Expo (icône, splash screen vert/noir) |
| `package.json` | Dépendances du projet |
| `babel.config.js` | Config Babel |
| `.gitignore` | Fichiers à exclure de Git |
| `.env.example` | Variables d'environnement à renseigner |
| `logo.png` | Logo Navira TSA (icône d'app) |
| `splash-banner.png` | Bannière du logo utilisée sur l'écran d'ouverture |
| `colors.js` | Charte de couleurs vert/noir |
| `firebase.js` | Config Firebase (à compléter) |
| `AppNavigator.js` | Arborescence de navigation entre tous les écrans |
| `SplashScreen.js` | Écran d'ouverture (1s, effet cinéma) affiché à l'entrée dans l'app |
| `LoginScreen.js` | Page 1 : création de compte / connexion (email) |
| `WelcomeScreen.js` | Page 2 : écran animé "Bienvenue dans Navira" |
| `RoleSelectionScreen.js` | Page 3 : choix spectateur ou streamer |
| `ViewerHomeScreen.js` | Espace spectateur : liste des streamers |
| `BuyCoinsScreen.js` | Achat de coins (7 moyens de paiement) |
| `StreamerOnboardingScreen.js` | KYC streamer : identité, pièce d'identité, 18 ans min |
| `StreamerPendingValidationScreen.js` | Écran "en attente de validation admin" |
| `StreamerDashboardScreen.js` | Dashboard streamer (à enrichir) |
| `SettingsScreen.js` | Paramètres (mot de passe, déconnexion, suppression compte...) |

## Comment mettre ça sur GitHub

1. Va sur ton repo GitHub → **"Add file" → "Upload files"**
2. Sélectionne **tous les fichiers de ce zip d'un coup** (Ctrl+A / Cmd+A dans le dossier dézippé)
3. Glisse-les dans la zone d'upload de GitHub
4. Clique sur **"Commit changes"**

Comme il n'y a aucun sous-dossier, chaque fichier s'ajoute directement à la racine du repo sans souci.

## Analytics natif (mobile) — étape supplémentaire requise

L'app utilise `@react-native-firebase/analytics`, qui a besoin de vrais fichiers de config natifs (en plus de `firebaseConfig` dans `firebase.js`) :

1. Sur la console Firebase → **Paramètres du projet** → **Vos applications**
2. Ajoute une **app Android** (icône Android) avec le package `com.trillionsoftware.navira` → télécharge **`google-services.json`** → place-le à la racine du projet
3. Ajoute une **app iOS** (icône Apple) avec le bundle ID `com.trillionsoftware.navira` → télécharge **`GoogleService-Info.plist`** → place-le aussi à la racine du projet
4. Comme ce module utilise du code natif, l'app ne peut plus tourner dans **Expo Go** — il faut créer un **build de développement** avec `npx expo prebuild` puis `npx expo run:android` / `npx expo run:ios`, ou passer par **EAS Build**

Tant que ces 2 fichiers ne sont pas ajoutés, l'app plantera au démarrage à cause de l'import `@react-native-firebase/analytics`.

## Installation locale

```bash
npm install
npx expo start
```

## Ce qu'il reste à faire (TODO)

1. **Firebase** : créer le projet Firebase et remplacer les valeurs dans `firebase.js`
2. **Live streaming** : intégrer Agora.io ou LiveKit pour le vrai flux vidéo en direct
3. **Paiements** : brancher une passerelle (ex. CinetPay) sur les 7 moyens de paiement
4. **Console admin** : à construire séparément (web) pour que l'administrateur puisse valider les streamers et gérer les retraits
5. **Dashboard streamer** : détail des statistiques à définir
6. **Éligibilité monétisation** : logique de calcul sur les 20 vidéos minimum à définir précisément
7. **Lien d'accès direct** au compte/live d'un streamer (deep link)

## Contact

- Support : navira.system@protonmail.com
- Admin : trillionbooks6@gmail.com
