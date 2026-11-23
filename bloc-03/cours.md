# Bloc 03 · Une fiche commune pour trois héros ⚔️

Vous allez afficher le guerrier, le mage et le prêtre avec **un seul composant de fiche**, alimenté par trois objets distincts. Cette séparation entre données et présentation sert aussi à afficher des produits, des contacts ou des dossiers clients.

**Départ :** votre application essentielle du bloc 02, avec le refuge, la fiche Aldric et les deux feuilles `refuge.css` et `hero.css`. Aucun bonus requis. Vous connaissez `const`, `string`, `number`, les expressions JSX et `npm run build`. Aujourd’hui, tout le code reste dans `src/App.tsx` ; aucun nouveau paquet ni fichier de style à installer.

## Première période · Regrouper les données

| Temps indicatif | Travail |
| --- | --- |
| 5 min | Reprendre et lancer le projet |
| 20 min | Lire objets, types et accès aux propriétés |
| 25 min | Réaliser l’exercice 1 |

### 1. Reprendre le projet

Ouvrez votre projet dans WebStorm. Dans le terminal à la racine contenant `package.json`, lancez `npm run dev` et ouvrez l’adresse **Local** annoncée. Si votre copie n’a plus `node_modules`, exécutez d’abord `npm ci`. Conservez les fichiers de dépendances existants. Lisez les éventuels `npm warn` ; en cas d’échec ou de `npm error`, gardez le message pour le formateur. Le proxy campus reste à vérifier sur place.

Gardez votre accueil personnel et les ressources des blocs 01–02. La seule nouvelle ressource est le [tableau des trois héros](ressources/donnees-groupe.md), à lire à côté de l’éditeur : ce Markdown ne se copie pas dans `src`.

### 2. Un objet regroupe des propriétés

Au lieu de conserver plusieurs variables séparées pour une même entité, un **objet** rassemble ses informations. Exemple distinct du groupe de héros :

```tsx
const supply = {
  name: 'Rations',
  quantity: 12,
}
```

Les accolades après `=` délimitent l’objet. Chaque propriété possède un nom, deux-points, puis une valeur. Les virgules séparent les propriétés ; la dernière virgule est autorisée. Pour lire une propriété, on utilise le point : `supply.name` vaut `'Rations'`, `supply.quantity` vaut `12`. En JSX, `<p>{supply.name} : {supply.quantity}</p>` affiche ces deux valeurs.

Les accolades de l’objet contiennent des **données** ; celles du corps d’une fonction contiennent ses instructions ; celles de JSX permettent d’évaluer une expression. Le contexte permet de les distinguer. N’affichez pas l’objet entier avec `{supply}` : React attend ici du texte ou un nombre, pas cet objet. Affichez ses propriétés.

### 3. Décrire la forme avec un type

Un alias `type` donne un nom à une forme attendue. Il ne crée pas de données :

```tsx
type Supply = {
  name: string
  quantity: number
}

const supply: Supply = {
  name: 'Rations',
  quantity: 12,
}
```

Dans le type, `name: string` indique le **type attendu** ; dans l’objet, `name: 'Rations'` donne la **valeur réelle**. Le nom du type commence par une majuscule, celui de la variable par une minuscule. Une propriété du type est obligatoire : oublier `quantity`, ou lui donner du texte, provoque une erreur TypeScript.

Placez les types après les imports et avant les fonctions pour qu’ils soient utilisables par les deux composants. Les objets de vos héros resteront dans `App`, avant son `return`. Pour lire la vie manquante d’un objet, l’expression devient par exemple `supply.quantity - 3` pour notre stock : chaque accès porte son propre nom d’objet. Pour vos héros, soustrayez la vie courante de la vie maximum.

Réalisez l’[exercice 1](exercices.md#exercice-1). Vous transformez d’abord la fiche existante, sans changer son résultat visible.

**Pause · 10 minutes**

## Seconde période · Réutiliser la présentation

| Temps indicatif | Travail |
| --- | --- |
| 15 min | Lire composants et props |
| 25 min | Réaliser l’exercice 2 : extraire la fiche, afficher les trois héros |
| 10 min | Réaliser l’exercice 3 : contrôler les données et les types |

### 4. Un composant est une fonction de présentation

`App` est déjà un composant : sa fonction renvoie du JSX. Vous pouvez créer une autre fonction pour une partie réutilisable de la page. Écrivez-la **en dehors de `App`**, avant cette dernière, et donnez-lui un nom commençant par une majuscule. Une balise minuscule désigne un élément HTML ; une balise telle que `<SupplyCard />` désigne votre composant. `/>` ferme une balise sans contenu enfant.

Un composant reçoit des informations dans un objet nommé ici `props`. Ce sont les **props**, transmises par le parent. Exemple complet pour le stock, à comprendre sans le copier dans votre application :

```tsx
type SupplyCardProps = {
  supply: Supply
}

function SupplyCard(props: SupplyCardProps) {
  return (
    <article>
      <h2>{props.supply.name}</h2>
      <p>Quantité : {props.supply.quantity}</p>
    </article>
  )
}
```

Le paramètre `props` est la donnée reçue par la fonction. `: SupplyCardProps` décrit sa forme : il contient une propriété `supply`, elle-même de type `Supply`. `props.supply.name` lit donc le nom du stock reçu. Le mot `props` est un nom de paramètre usuel, pas un fichier à importer.

Dans le JSX du parent, on écrit :

```tsx
<SupplyCard supply={supply} />
```

À gauche de `=`, `supply` est le **nom de la prop attendue**. Dans `{supply}`, c’est la **variable du parent à transmettre**. Une seconde utilisation pourrait être `<SupplyCard supply={reserve} />` si un autre objet `reserve` de même type était déclaré. Les deux utilisations partagent la présentation, mais reçoivent chacune leurs données.

Le composant enfant ne peut pas lire directement une variable déclarée dans `App` : elle appartient au corps de `App`. Les props permettent de la lui transmettre explicitement. Lisez les props sans les modifier dans l’enfant. Le parent choisit les données ; l’enfant affiche ce qu’il reçoit. Ce bloc ne programme pas encore de boutons ni de modification par l’utilisateur.

### 5. Extraire la fiche plutôt que la recopier

Pour votre application, créez `HeroCardProps`, avec une propriété `hero` de type `Hero`, puis la fonction `HeroCard(props: HeroCardProps)`. Déplacez l’`article` de votre fiche dans son `return`. Dans cette fonction, les accès à un héros deviennent `props.hero.name`, `props.hero.health`, etc. Conservez les classes CSS existantes.

Dans `App`, remplacez l’ancien `article` par `<HeroCard hero={warrior} />`. Le paragraphe « En première ligne » reste dans `App` et continue de lire `warrior.name`. Ajoutez ensuite deux utilisations du même composant pour le mage et le prêtre. **Trois utilisations, une seule définition de fiche** : vous n’avez pas à recopier les sept couples `dt` / `dd`.

Ne définissez pas `HeroCard` à l’intérieur de `App` et n’appelez pas sa fonction vous-même avec `HeroCard(...)` : utilisez sa balise JSX. Gardez `export default` uniquement sur `App`, qui reste le point d’entrée chargé par le projet. L’organisation en plusieurs fichiers viendra plus tard.

Réalisez l’[exercice 2](exercices.md#exercice-2), puis les contrôles de l’[exercice 3](exercices.md#exercice-3).

**Fin de séance.** Votre refuge conserve son accueil et présente trois fiches successives avec leurs données distinctes. `npm run build` doit réussir : une page visible ne garantit pas que les types sont corrects. Le dossier `dist` généré par cette commande contient une version distribuable ; continuez à modifier les fichiers de `src`, pas ceux de `dist`. Arrêtez Vite avec Ctrl+C en quittant le poste ; relancez-le avec `npm run dev` à la reprise. Conservez tout le projet.

Pour approfondir : [composants React](https://react.dev/learn/your-first-component), [props React](https://react.dev/learn/passing-props-to-a-component) et [types d’objets TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Les étapes nécessaires figurent dans ce support. Un bonus de maître de guilde est proposé séparément, sans conditionner la suite.
