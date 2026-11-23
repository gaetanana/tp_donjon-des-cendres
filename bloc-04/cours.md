# Bloc 04 · Disponible ou hors combat ? 🛡️

Votre refuge affiche trois héros. Vous allez maintenant indiquer si chacun est disponible ou hors combat **à partir de ses points de vie**. Le texte restera compréhensible sans distinguer les couleurs. Cette technique sert aussi à présenter un stock épuisé ou un dossier ouvert ou fermé.

**Départ :** essentiel du bloc 03 terminé : trois objets `Hero`, un composant `HeroCard`, trois utilisations et les styles du refuge. Aucun bonus requis. Vous connaissez les objets, les types et les props. Les changements React restent dans `src/App.tsx` ; aucune nouvelle dépendance.

## Première période · Décrire un choix

| Temps indicatif | Travail |
| --- | --- |
| 5 min | Reprendre le projet |
| 20 min | Lire booléens, unions et choix conditionnel |
| 25 min | Réaliser l’exercice 1 |

### 1. Reprendre et préparer les styles

Ouvrez le projet dans WebStorm. À la racine contenant `package.json`, lancez `npm run dev` et ouvrez l’adresse **Local** affichée. Si `node_modules` manque, utilisez d’abord `npm ci`, en conservant les fichiers de dépendances. Lisez les avertissements ; en cas d’échec, conservez le message pour le formateur. Le proxy reste à vérifier sur le campus.

Copiez [hero-status.css](ressources/hero-status.css) dans `src/hero-status.css`. Ajoutez `import './hero-status.css'` aux imports de `App.tsx`, après les styles existants. Comme au bloc 02, cet import charge une feuille CSS. Ne remplacez ni `hero.css` ni `refuge.css`.

### 2. Une comparaison produit un booléen

Un `boolean` vaut `true` (vrai) ou `false` (faux), sans guillemets. Une comparaison produit ce type de valeur :

```tsx
const quantity: number = 4
const isInStock: boolean = quantity > 0
```

`isInStock` vaut ici `true`. Pour `quantity` égal à 0, il vaut `false`. Les opérateurs utiles sont :

| Écriture | Question posée |
| --- | --- |
| `quantity > 0` | Strictement supérieur à zéro ? |
| `quantity <= 0` | Inférieur ou égal à zéro ? |
| `quantity === 0` | Égal à zéro ? |
| `quantity !== 0` | Différent de zéro ? |

`=` affecte une valeur ; `===` compare deux valeurs. `'false'` est du texte, pas le booléen `false`. Dans JSX, `{isInStock}` n’affiche pas les mots vrai ou faux : pour informer le lecteur, choisissez un texte.

Pour ce bloc, un héros est **disponible si `health > 0`**, et **hors combat sinon**. Les scénarios utilisent uniquement des vies entre 0 et `maxHealth`. Une vie partielle reste disponible. Vous ne programmez ni attaque ni soin aujourd’hui : vous modifiez les données dans le fichier pour observer leur présentation.

### 3. Une union limite les valeurs autorisées

`string` permet n’importe quel texte. Une **union de valeurs littérales** limite un type à quelques textes précis :

```tsx
type StockStatus = 'available' | 'empty'
```

Le symbole `|` signifie ici « ou » : une valeur de ce type doit être exactement `'available'` ou `'empty'`. Les guillemets font partie de la syntaxe des valeurs textuelles. `'pending'` serait refusé par TypeScript. Ce type ne crée pas de variable ni de donnée.

Dans le type `Hero`, vous pouvez aussi remplacer `heroClass: string` par `heroClass: 'Guerrier' | 'Mage' | 'Prêtre'`. Les trois objets actuels restent valides ; une faute comme `'Magge'` sera désormais signalée. Cette restriction décrit les trois classes de l’équipe essentielle.

### 4. Choisir une expression avec `? :`

L’opérateur conditionnel, appelé aussi **ternaire**, choisit entre deux expressions :

```tsx
const stockStatus: StockStatus = isInStock ? 'available' : 'empty'
```

Lisez : « si `isInStock` est vrai, retenir `'available'` ; sinon retenir `'empty'` ». La forme est `condition ? valeurSiVrai : valeurSiFaux`. On peut aussi choisir du texte dans JSX :

```tsx
<p>{isInStock ? 'En stock' : 'Stock épuisé'}</p>
```

L’expression est entourée d’accolades parce qu’elle est dans JSX. Avant le `return`, les accolades JSX ne sont pas nécessaires. Le choix ne modifie aucune donnée et ne se déclenche pas au clic : il est évalué pendant l’affichage du composant.

Réalisez l’[exercice 1](exercices.md#exercice-1). Vous calculez la disponibilité dans la fiche qui reçoit le héros, sans ajouter de propriété aux objets.

**Pause · 10 minutes**

## Seconde période · Adapter la présentation

| Temps indicatif | Travail |
| --- | --- |
| 15 min | Lire styles et affichage conditionnels |
| 20 min | Réaliser l’exercice 2 |
| 15 min | Exécuter les contrôles de l’exercice 3 |

### 5. Choisir une classe CSS avec une expression

`className` peut recevoir une chaîne fixe ou une expression qui produit une chaîne :

```tsx
<p className={isInStock ? 'stock-ready' : 'stock-empty'}>
  {isInStock ? 'En stock' : 'Stock épuisé'}
</p>
```

Les noms CSS de cet exemple concernent un stock imaginaire ; pour les héros, utilisez les classes de la feuille fournie, décrites dans l’exercice. Le texte indique toujours l’état : la couleur ajoute un repère, sans être le seul moyen de comprendre.

Écrivez les calculs propres à un héros **dans `HeroCard`, avant son `return`**. Ils lisent `props.hero.health` et sont recalculés pour chaque utilisation du composant. Ne gardez pas deux informations indépendantes, par exemple `health: 0` et `isAvailable: true` dans un objet : elles pourraient se contredire. Calculez le booléen depuis la vie reçue.

### 6. Afficher un élément seulement si une condition est vraie

L’opérateur `&&` permet ici d’inclure un élément JSX quand un booléen est vrai :

```tsx
{stockStatus === 'empty' && <p>Livraison nécessaire.</p>}
```

Dans le JSX du composant, cette expression produit le paragraphe si la comparaison est vraie ; sinon, aucun paragraphe n’est affiché. `&&` se lit « et ». Utilisez à gauche une **comparaison ou un booléen**. N’écrivez pas `{quantity && <p>…</p>}` : quand la quantité vaut 0, React peut afficher ce zéro au lieu de masquer proprement le contenu.

Si vous répartissez un élément sur plusieurs lignes après `&&`, vous pouvez l’entourer de parenthèses pour regrouper son JSX, comme après `return`.

`? :` choisit entre deux résultats ; `&&` convient quand un élément doit seulement apparaître ou disparaître. Aucun besoin de recopier toute la fiche dans deux branches. Les statistiques et le nom restent communs aux deux états.

Réalisez l’[exercice 2](exercices.md#exercice-2), puis l’[exercice 3](exercices.md#exercice-3).

### Fin de séance

Conservez les trois héros à leur vie maximum, avec « Disponible » sur chaque fiche et sans avertissement. `npm run build` doit réussir ; continuez à modifier `src`, pas `dist`. Pendant un essai volontaire d’erreur, une page peut devenir vide : rétablissez la donnée et vérifiez de nouveau la compilation. Pour faciliter la lecture du code déplacé, utilisez au besoin le menu **Code → Reformater le code** de WebStorm (raccourci Windows habituel : Ctrl+Alt+L).

Arrêtez le serveur avec Ctrl+C dans son terminal. La prochaine séance ajoutera une interaction ; conservez le projet essentiel complet. Un bonus indépendant propose trois états de santé, sans être nécessaire à la suite ; il est distribué séparément du paquet essentiel de test.

Pour approfondir : [affichage conditionnel React](https://react.dev/learn/conditional-rendering), [booléens et unions TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Toutes les étapes nécessaires sont expliquées ci-dessus.
