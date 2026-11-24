# Bloc 01 · Ouvrir le refuge ⚔️

**Module M1 · Afficher et sélectionner les héros**  
**Séance de 2 heures · 2 périodes de 50 minutes de travail**

À la fin de cette séance, vous pourrez rouvrir votre propre projet, le lancer depuis WebStorm et faire apparaître dans le navigateur une modification de votre premier composant React. Votre application affichera le refuge où les trois héros se retrouveront avant de partir en expédition.

![Vue du refuge à l’entrée du défilé](donjon-des-cendres/public/refuge.jpg)

## Première période · Du dossier partagé à votre navigateur

| Temps indicatif | Travail | Point de passage |
| --- | --- | --- |
| 10 min | Lire la consigne et préparer votre dossier personnel | Vous distinguez le support distribué de votre application |
| 25 min | Ouvrir le socle, installer les dépendances et lancer le serveur | Le navigateur affiche « Atelier prêt » |
| 15 min | Repérer le composant et réaliser l’exercice 1 | Votre modification apparaît après enregistrement |

### 1. Préparer une copie personnelle

Dans l’éditeur, ouvrez ce fichier en aperçu Markdown. Dans WebStorm, la barre en haut de l’éditeur Markdown permet de choisir l’aperçu seul ou le texte et l’aperçu côte à côte. Gardez la consigne visible sur un écran et votre application sur l’autre si vous le souhaitez.

Un **TP** est une suite de manipulations dont vous vérifiez le résultat. Pour chaque activité, repérez le fichier demandé, faites une petite modification, enregistrez, puis regardez ce qui a changé. Si votre écran montre encore l’étape précédente, reprenez au dernier résultat que vous avez effectivement observé.

1. Dans votre espace de travail personnel, créez un **dossier vide** nommé `donjon-des-cendres`. Gardez ce dossier d’une séance à l’autre.
2. Dans les ressources de ce bloc, ouvrez le [socle du projet](ressources/socle/). **Copiez son contenu** dans votre dossier vide. À la racine de `donjon-des-cendres`, vous devez voir directement `package.json`, `src` et `public`.
3. Dans WebStorm, choisissez **Fichier → Ouvrir** (*File → Open*) et sélectionnez votre dossier `donjon-des-cendres`. Si l’IDE demande de faire confiance au projet, vérifiez que le chemin correspond à votre copie du socle fourni par le formateur.
4. Gardez l’original du dossier partagé pour relire le cours. Faites les manipulations de code dans votre copie personnelle. Pour les exercices React et TypeScript, utilisez le support et écrivez le code vous-même.

### 2. Installer les outils du projet une première fois

Ouvrez le panneau **Terminal** de WebStorm. Un terminal est une zone où vous écrivez une commande et appuyez sur **Entrée** pour l’exécuter. Tapez chaque ligne séparément et attendez la réponse. Sous Windows, vous pouvez choisir **Command Prompt / Invite de commandes** dans le menu du terminal. Les commandes ci-dessous s’utilisent aussi dans un terminal macOS.

```sh
node --version
npm --version
```

Le poste de référence utilise **Node.js 24** et **npm 11**. La première commande affiche par exemple `v24.22.3`, la seconde `11.19.1`. Node exécute les outils de développement sur votre poste. npm installe les bibliothèques dont l’application a besoin, dont React.

Si la commande est inconnue sur un poste Windows que vous pouvez équiper, installez la distribution **Node.js 24.x pour Windows**, avec npm, puis rouvrez WebStorm et son terminal. Sur un poste administré, demandez au formateur la distribution prévue par le campus. [Distributions officielles de Node.js 24](https://nodejs.org/dist/latest-v24.x/)

Dans le terminal, la commande `dir` sous Windows ou `ls` sous macOS doit faire apparaître **package.json**. À partir de ce dossier, exécutez :

```sh
npm ci
```

`package.json` décrit les bibliothèques et les commandes du projet. `package-lock.json` enregistre les versions précises à installer. `npm ci` lit ces deux fichiers, télécharge les dépendances nécessaires et crée le dossier `node_modules`. Laissez les deux fichiers fournis ensemble. L’installation utilise le réseau au premier téléchargement. Une fois terminée, le terminal vous rend la main. Si le téléchargement échoue sur le réseau du campus, conservez le message exact pour le formateur. La configuration du proxy dépend du poste.

### 3. Afficher la première page

```sh
npm run dev
```

Cette commande démarre **Vite**, le serveur de développement. Suivez l’adresse indiquée après **Local** dans le terminal, par exemple `http://localhost:5173/`. Vous pouvez la copier dans votre navigateur. Le numéro peut varier selon le poste. Vous devez lire **Atelier prêt**. Laissez ce terminal ouvert pendant que vous travaillez.

| Fichier | Ce qu’il fait aujourd’hui |
| --- | --- |
| `index.html` | Donne son titre à l’onglet et fournit un emplacement pour l’application |
| `src/main.tsx` | Demande à React d’afficher le composant `App` dans cet emplacement |
| `src/App.tsx` | Décrit ce que vous voyez dans la page. C’est ici que vous écrivez aujourd’hui |
| `../src/styles` | Contient les styles préparés pour votre futur écran |
| `public/` | Contient l’illustration locale utilisée par la feuille de style |

**À vous.** Faites l’[exercice 1](exercices.md#exercice-1). Avant la pause, montrez dans votre IDE la ligne qui a produit le changement à l’écran.

**Pause · 10 minutes**

## Seconde période · Construire l’accueil

| Temps indicatif | Travail | Point de passage |
| --- | --- | --- |
| 10 min | Lire l’exemple et repérer ses balises | Vous savez où commence et finit le contenu rendu |
| 25 min | Construire le refuge avec l’exercice 2 | Le décor et vos textes apparaissent ensemble |
| 15 min | Effectuer l’exercice 3 | Vous retrouvez votre travail après l’arrêt et la relance |

### 4. Lire un composant avant de le modifier

Dans `App.tsx`, `function App()` définit une fonction appelée `App`. Cette fonction est un **composant React**. Quand React l’affiche, il utilise ce que la fonction renvoie après le mot `return`. `export default` permet au fichier de démarrage de retrouver ce composant. Gardez ce nom et cette déclaration.

L’extension **.tsx** permet de mêler TypeScript et **JSX**, la syntaxe des balises dans un composant. Vous connaissez déjà le rôle des titres et paragraphes en HTML. Voici comment un autre écran, celui d’une bibliothèque, pourrait les regrouper :

```tsx
export default function Library() {
  return (
    <section className="library">
      <h2>Salle des archives</h2>
      <p>Les cartes anciennes sont conservées ici.</p>
    </section>
  )
}
```

Repérez trois gestes que vous pourrez réutiliser pour le refuge.

- Pour renvoyer plusieurs lignes, écrivez `return (` sur une même ligne et fermez la parenthèse après le contenu. Le composant renvoie un seul élément extérieur, ici `section`, qui peut contenir plusieurs enfants.
- Chaque balise ouverte se ferme. Dans l’exemple, `</p>` ferme le paragraphe avant que `</section>` ferme la section.
- `className="library"` associe l’élément à une classe CSS. Dans votre application, la classe fournie se nomme **refuge**. La feuille de style s’active en ajoutant `import './refuge.css'` en haut de `App.tsx`, avant la déclaration du composant. Le préfixe `./` signifie « dans le même dossier que ce fichier ».

### 5. Construire, observer et reprendre

Faites l’[exercice 2](exercices.md#exercice-2), puis l’[exercice 3](exercices.md#exercice-3). À chaque enregistrement, Vite met à jour la page dans le navigateur. En cas d’erreur de syntaxe, lisez le nom du fichier et le numéro de ligne indiqués, puis examinez les balises et les parenthèses autour de cette ligne.

**Fin de séance.** Conservez votre application avec ses deux zones visibles, son illustration et vos propres textes. Notez dans quel dossier vous devrez rouvrir le terminal au prochain cours. L’énoncé facultatif de la carte d’accueil est distribué séparément. Vous pouvez effectuer toute la suite de la formation à partir de l’écran essentiel.
