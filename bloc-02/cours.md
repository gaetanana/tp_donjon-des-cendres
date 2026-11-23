# Bloc 02 · Afficher les statistiques d’un héros 🛡️

Le refuge accueille maintenant la fiche du guerrier. Vous allez séparer les valeurs de leur présentation : une modification dans les données actualisera tous les endroits où elles sont affichées.

**Point de départ.** Reprenez votre application essentielle du bloc 01, avec son accueil, sa section « Avant le départ », `../src/style/refuge.css` et `public/refuge.jpg`. Aucun bonus n’est nécessaire. Aujourd’hui, vous modifiez seulement `src/App.tsx` et ajoutez une feuille de style. Vous utiliserez des textes (`string`), des nombres (`number`) et des expressions JSX.

## Première période · Relier une donnée à l’écran

| Temps indicatif | Travail |
| --- | --- |
| 10 min | Rouvrir le projet, copier le CSS et relancer Vite |
| 15 min | Lire les variables et les expressions JSX |
| 25 min | Réaliser l’exercice 1 et contrôler les deux occurrences du nom |

### 1. Reprendre le projet

Ouvrez votre dossier personnel dans WebStorm, puis le terminal à la racine qui contient `package.json`. Copiez le fichier [hero.css](../src/style/hero.css) dans **votre** dossier `src`, à côté de `App.tsx`. Gardez `refuge.css` en place. Ajoutez en haut de `App.tsx`, sous son import existant :

```tsx
import './hero.css'
```

Les deux imports chargent deux feuilles complémentaires : le refuge conserve son décor, et `hero.css` met en forme la fiche. Il ne contient aucune donnée de héros ni logique à programmer.

Démarrez le serveur depuis le dossier contenant `package.json` :

```sh
npm run dev
```

Ouvrez l’adresse **Local** annoncée. Si vous reprenez une copie sans `node_modules`, utilisez d’abord `npm ci` avec les fichiers de dépendances conservés du bloc 01. Des lignes `npm warn` peuvent accompagner une installation réussie ; lisez-les. Si `npm error` apparaît ou que la commande échoue, conservez le message pour le formateur. Le proxy du campus reste à vérifier sur place.

### 2. Nommer une valeur avec `const`

Une variable permet de retrouver une valeur par son nom. Dans une application de gestion, elle pourrait contenir le nom d’un produit ou son stock. Voici un exemple **distinct de votre fiche de héros** :

```tsx
export default function Supply() {
  const supplyName: string = 'Rations'
  const quantity: number = 12

  return (
    <section>
      <h2>{supplyName}</h2>
      <p>Réserve : {quantity} unités</p>
      <p>Après distribution : {quantity - 3} unités</p>
    </section>
  )
}
```

`const supplyName: string = 'Rations'` déclare un nom, un type et une valeur initiale. `const` interdit une réaffectation de cette variable pendant l’exécution. Vous pouvez néanmoins modifier sa valeur initiale dans le fichier puis enregistrer : Vite actualise l’application avec votre nouveau code.

| Élément | Sens |
| --- | --- |
| `supplyName` | Nom choisi en anglais ; la majuscule intérieure sépare les mots |
| `: string` | Type TypeScript : du texte, écrit entre guillemets simples ou doubles |
| `: number` | Type TypeScript : un nombre, écrit sans guillemets ; les décimales utilisent un point |
| `=` | Donne la valeur initiale à la variable |

Les types s’écrivent en minuscules. TypeScript peut souvent les déduire de la valeur ; nous les écrivons explicitement pour apprendre à les lire. N’utilisez pas `any` pour faire disparaître une erreur de type.

Placez vos déclarations **dans la fonction `App`, avant `return`**. Les accolades extérieures de la fonction délimitent son corps ; elles ne sont pas les accolades JSX qui affichent une valeur. Un nom déclaré doit être écrit exactement de la même façon à son utilisation : `heroName` et `heroname` sont deux noms différents.

### 3. Afficher une expression en JSX

Entre deux balises, `{supplyName}` demande à React d’afficher la valeur. Sans accolades, `<h2>supplyName</h2>` affiche le mot « supplyName ». Les guillemets restent nécessaires dans la déclaration du texte, mais ne s’ajoutent pas autour de l’expression JSX.

Une **expression** produit une valeur : `{quantity - 3}` affiche le résultat de la soustraction. Vous pouvez aussi écrire `{quantity + 2}` pour une addition de nombres. Le texte fixe autour de l’expression reste du JSX ordinaire, par exemple `Réserve :` et `unités`. Les déclarations `const` restent avant `return`, jamais entre les balises.

Faites l’[exercice 1](exercices.md#exercice-1). Montrez comment une seule modification du nom actualise deux zones de la page.

**Pause · 10 minutes**

## Seconde période · Lire et vérifier une fiche

| Temps indicatif | Travail |
| --- | --- |
| 10 min | Lire les données fournies et la structure de la fiche |
| 25 min | Réaliser l’exercice 2 et le changement de points de vie |
| 15 min | Réaliser l’exercice 3 et conserver l’état final |

### 4. Séparer données et présentation

Les [données du guerrier](ressources/donnees-heros.md) donnent toutes les valeurs nécessaires. Ce sont des valeurs d’affichage : vous ne programmez ni combat ni formule de statistiques aujourd’hui. Utiliser la même variable à plusieurs endroits évite que deux textes affichent des noms différents après une modification.

Pour la fiche, utilisez `<article className="hero-card">`. `article` regroupe un contenu autonome. Son titre est un `h2`. Une liste de descriptions associe ensuite des libellés à leurs valeurs : `dl` contient des couples `dt` (le libellé) et `dd` (la valeur). Exemple pour un stock :

```tsx
<dl className="hero-stats">
  <dt>Quantité disponible</dt>
  <dd>{quantity} unités</dd>
</dl>
```

Ajoutez les autres couples avant la fermeture `</dl>`. Le CSS dispose chaque libellé à côté de sa valeur et permet les retours à la ligne sur une fenêtre étroite. La classe `hero-card` fournit le cadre ; `hero-stats` organise les données.

Faites l’[exercice 2](exercices.md#exercice-2). Les points de vie courants et maximum sont deux nombres distincts : les modifier ne provoque encore aucune action dans le jeu. La soustraction donne uniquement une information affichée.

### 5. Vérifier aussi les types

Vite affiche rapidement les modifications, mais sa transformation du fichier ne garantit pas que tous les types sont corrects. Le projet propose une commande complémentaire :

```sh
npm run build
```

Elle exécute TypeScript (`tsc --noEmit`) puis prépare la version distribuable avec Vite dans `dist`. Elle ne remplace pas le serveur de développement. Pour l’exécuter sans arrêter Vite, ouvrez un deuxième onglet de terminal dans WebStorm, vérifiez que vous êtes à la racine du même projet, puis entrez la commande. Vous pouvez aussi arrêter Vite avec Ctrl+C, lancer la commande, puis relancer `npm run dev`.

Si vous écrivez `const quantity: number = 'douze'`, TypeScript signale que du texte ne peut pas être affecté à un nombre. Une valeur numérique attendue s’écrit par exemple `12`, sans guillemets. Lisez le fichier et la ligne désignés par le message. Une erreur ne se corrige pas en supprimant le type : examinez la valeur attendue.

Faites l’[exercice 3](exercices.md#exercice-3).

**Fin de séance.** Votre refuge conserve son accueil et ses trois rôles. La nouvelle fiche affiche le nom et les statistiques du guerrier à partir de variables ; son nom apparaît aussi dans une phrase de présentation. Conservez le dossier entier. Le bonus d’identité est distribué séparément et reste facultatif.

Pour approfondir après le TP : [expressions JSX, documentation React](https://react.dev/learn/javascript-in-jsx-with-curly-braces) et [types simples, documentation TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Les étapes indispensables figurent dans ce cours.
