# Bloc 07 · Afficher des collections 🗂️

## Objectif et parcours

Vous allez produire les trois boutons du groupe depuis un tableau, puis afficher deux cartes de bestiaire avec un composant commun. Ajouter une donnée suffira à ajouter une carte. Cette organisation sert aussi aux catalogues de produits et aux listes de contacts.

Prérequis : objets typés, props, conditions, sélection et fonctions pures du bloc 06. Budget indicatif : reprise 5 min, lecture 20 min, exercice 1 25 min ; pause ; lecture et exercice 2 35 min, contrôles 15 min. Total : 100 minutes, bonus exclu.

## 1. Reprendre le refuge

Partez de votre essentiel du bloc 06, sans bonus : trois héros, une fiche consultée, huit statistiques, scores 25/7/9 et vies 100/60/80. Gardez les trois fonctions pures. Un manque de vie négatif indique probablement un ordre inversé des arguments : `getMissingHealth` reçoit la vie, puis le maximum.

Travaillez dans `src/App.tsx`. Copiez le [style fourni](ressources/bestiary.css) dans `src/bestiary.css`, puis importez-le avec `import './bestiary.css'`. Gardez tous les styles précédents et l’image du refuge. Les [données et contrats](ressources/donnees.md) se lisent à côté du code ; ce Markdown ne se copie pas dans `src`.

Gardez les dépendances et leurs versions. Si elles manquent, utilisez `npm ci`. Lancez `npm run dev`, ouvrez l’adresse Local indiquée ; Ctrl+C arrête le serveur. Un second terminal à la racine permet `npm run build`. Le rechargement à chaud peut conserver la sélection ; un vrai rechargement revient à Aldric.

## 2. Regrouper des valeurs dans un tableau

Un tableau est une collection ordonnée entre crochets. Les éléments sont séparés par des virgules. `Product[]` signifie « tableau d’objets Product » : tous ses éléments respectent ce contrat.

Exemple indépendant à lire, sans le copier dans le refuge :

```ts
type Product = { id: string; name: string; price: number }
const notebook: Product = { id: 'notebook', name: 'Carnet', price: 6 }
const pencil: Product = { id: 'pencil', name: 'Crayon', price: 2 }
const products: Product[] = [notebook, pencil]
```

Ce tableau contient les deux objets existants, sans les dupliquer. `products.length` vaut 2. `products[0]` désigne le premier élément : les positions commencent à zéro. Un tableau vide s’écrit `[]`. Nous n’allons ni modifier les objets ni trier le tableau pendant le rendu.

Dans le TP, gardez `warrior`, `mage`, `priest` et ajoutez `const heroes: Hero[] = [warrior, mage, priest]` après ces trois objets dans `App`. Ajoutez auparavant leur identifiant stable selon les références. Déclarez `HeroChoice` avant `Hero` pour lire les contrats dans cet ordre.

## 3. Transformer chaque élément avec map

`map` appelle une fonction pour chaque élément et rassemble les résultats dans un nouveau tableau. L’original reste inchangé si la fonction ne modifie pas ses objets. React peut afficher directement un tableau d’éléments JSX.

```tsx
<ul>
  {products.map((product) => (
    <li key={product.id}>{product.name} : {product.price} pièces</li>
  ))}
</ul>
```

`(product) => (...)` est une **fonction fléchée** : elle reçoit l’élément courant et renvoie l’expression entre parenthèses. `product` n’existe que dans cette fonction. Son type est déduit de `Product[]` : aucun `any` à ajouter. La flèche `=>` ne se confond pas avec la comparaison `===`.

La forme avec accolades exige un `return` explicite :

```tsx
products.map((product) => {
  return <li key={product.id}>{product.name}</li>
})
```

Sans `return` dans cette seconde forme, aucune ligne ne sera rendue. Pour le TP, privilégiez la première forme, avec parenthèses autour du JSX.

### Une clé stable pour chaque frère

`key` permet à React de reconnaître un élément parmi les autres éléments de la même liste. Placez-la sur l’élément directement renvoyé par `map`. Elle doit être unique parmi ses frères et stable quand l’ordre change : un identifiant fourni convient. Une position, un nombre aléatoire ou un nom susceptible de changer ne conviennent pas ici. `key` n’est pas affichée et n’est pas transmise comme prop ordinaire : passez aussi l’objet au composant.

### Un bouton qui transmet la bonne valeur

Pour appeler une fonction avec un argument au clic, transmettez une petite fonction :

```tsx
// Dans un composant où setSelectedProductId met à jour la sélection :
<button type="button" onClick={() => setSelectedProductId(product.id)}>
  Consulter {product.name}
</button>
```

La fonction sans paramètre `() => ...` attend le clic. `onClick={setSelectedProductId(product.id)}` exécuterait la mise à jour pendant le rendu. À chaque passage de `map`, la fonction créée utilise l’objet de ce passage.

**Réalisez l’exercice 1** dans [exercices.md](exercices.md).

## 4. Répéter un composant avec des props

Le même principe vaut pour un composant :

```tsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

Ce fragment suppose un composant ProductCard recevant une prop `product`. Dans le refuge, vous écrirez `MonsterCard` avec un contrat `MonsterCardProps` contenant `monster: Monster`, sur le modèle de `HeroCardProps`. Le composant lira `props.monster`. Il décrira une seule carte ; le `map` dans `App` décidera combien en afficher.

Le bestiaire présente des créatures connues, sans combat ni sélection de monstre. Il n’ajoute aucun état React. Le groupe reste représenté par ses trois boutons ; sa fiche détaillée reste unique et correspond au héros consulté. Nous conservons le choix conditionnel de `selectedHero` du bloc 06 ; la recherche dans un tableau sera étudiée ultérieurement.

**Réalisez l’exercice 2 puis les contrôles de l’exercice 3.**

## 5. Reconnaître les erreurs

| Symptôme | Vérification |
| --- | --- |
| Avertissement de clé dans la console | `key` sur l’élément directement renvoyé, identifiants uniques |
| Aucune carte malgré les données | Retour de la fonction passée à map ; prop transmise au composant |
| Trop de rendus ou boucle au chargement | Le setter doit être dans la fonction de clic, pas appelé pendant le rendu |
| Erreur sur `hero.id` | Propriété ajoutée au type et aux trois objets ; type HeroChoice conservé |
| Toutes les cartes montrent la même créature | Le composant lit sa prop et non un objet fixé dans App |

## Fin de séance

Vous avez un tableau de héros, un tableau de monstres, deux affichages par `map`, une seule fiche de héros et deux cartes de bestiaire. Les calculs et la sélection restent corrects. Le build doit réussir ; restaurez les deux monstres initiaux après les essais.

Le bonus distribué séparément enrichit le bestiaire avec trois portraits locaux. Aucun bonus n’est requis pour la suite ; le corrigé essentiel est remis en fin de séance.
