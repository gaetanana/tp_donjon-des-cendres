# Bloc 11 · Rechercher dans une liste et conserver un choix

Dans les exercices, votre projet de fin de bloc 10 recevra un catalogue de donjons. Vous pourrez rechercher une destination, trier les résultats et garder votre choix même si la recherche ne l'affiche plus. Les héros et le formulaire d'équipe resteront présents.

## 1 · Deux informations différentes

Prenons un catalogue de livres. Une personne cherche « atlas », choisit un livre, puis cherche « histoires ». La liste doit changer, mais son livre choisi doit rester mémorisé.

| Information | Ce qu'elle représente |
| --- | --- |
| La recherche | Le texte actuellement saisi dans le champ. |
| Le choix | L'identifiant du livre choisi par un clic. |
| Les résultats | Les livres calculés à partir du catalogue et de la recherche. |

Un **identifiant** permet de retrouver un objet sans dépendre de sa position dans la liste. Dans l'exemple, `'seas'` identifie toujours le même livre, même si le tri le déplace. Ces noms sont choisis par l'auteur, pas imposés par React.

```ts
// Book est le nom choisi pour décrire la forme d'un objet livre.
type Book = {
  id: string // Identifiant stable du livre.
  title: string // Titre affiché à l'écran.
  pages: number // Nombre utilisé pour classer les livres.
}

// Book[] signifie « tableau d'objets qui respectent le type Book ».
const books: Book[] = [
  { id: 'clouds', title: 'Atlas des nuages', pages: 300 },
  { id: 'stories', title: 'Histoires courtes', pages: 120 },
  { id: 'seas', title: 'Atlas des mers', pages: 200 },
]
```

`books` désigne le tableau entier. `book` désignera un seul objet lorsque nous parcourrons ce tableau. Le nom `title` est une propriété que nous avons choisie ; il faudra toujours utiliser cette même propriété pour lire le titre. `string` et `number` sont les types de texte et de nombre fournis par TypeScript.

## 2 · Rappel : relier un champ à un état React

Un **état** est une information que React conserve entre deux affichages du composant. Un champ est **contrôlé** lorsque sa valeur vient de cet état et que sa modification met cet état à jour.

Voici un composant d'exemple complet. Les sections suivantes utilisent ces mêmes informations pour calculer et afficher les résultats.

```tsx
import { useState } from 'react' // Outil React qui mémorise une valeur.
import type { ChangeEvent } from 'react' // Type de l'événement de saisie.

function BookSearch() {
  // query contient le texte ; setQuery demande sa mise à jour à React.
  const [query, setQuery] = useState('')

  function changeQuery(event: ChangeEvent<HTMLInputElement>) {
    // L'événement désigne le champ ; value contient son texte actuel.
    setQuery(event.currentTarget.value)
  }

  return (
    <div>
      {/* Le même identifiant relie ce libellé à ce champ. */}
      <label htmlFor="book-query">Rechercher un livre</label>
      <input id="book-query" type="search" value={query} onChange={changeQuery} />
    </div>
  )
}
```

`query` signifie ici « recherche ». Ce nom, `setQuery` et `changeQuery` sont libres ; les références doivent correspondre. `useState`, `value` et `onChange` appartiennent aux outils utilisés et ne se renomment pas comme nos variables.

Le paramètre `event` reçoit un événement de saisie, pas directement une chaîne de texte. `ChangeEvent<HTMLInputElement>` précise à TypeScript que cet événement vient d'un champ HTML. `event.currentTarget.value` lit le texte de ce champ. `setQuery(...)` transmet ce texte à React. React rappelle ensuite le composant avec le nouvel état, puis actualise l'écran : c'est un **rendu**.

`book-query` est une valeur d'`id` choisie librement et unique dans la page. `htmlFor` reprend exactement cette valeur : cliquer sur le libellé place le curseur dans le champ. `type="search"` indique un champ de recherche ; il ne filtre aucun tableau tout seul. Un **attribut** est une information écrite sur une balise, comme `id`, `type` ou `value`.

## 3 · Préparer un texte pour la comparaison

Nous souhaitons que « atlas », « ATLAS » et «  atlas  » trouvent les mêmes titres. Nous préparons une autre valeur à partir du texte saisi, sans modifier le contenu du champ.

```ts
// Exemple de saisie : les espaces et les majuscules appartiennent au texte brut.
const query = '  ATLAS  '
// trim retire les espaces aux extrémités ; toLowerCase passe en minuscules.
const normalizedQuery = query.trim().toLowerCase()
// normalizedQuery vaut 'atlas' ; query vaut toujours '  ATLAS  '.
```

Cette valeur fixe de `query` sert à lire le résultat de l'exemple. Dans le composant, `query` provient de l'état montré en section 2 ; on ne déclare pas une seconde variable de ce nom.

Le point permet d'utiliser une propriété ou une méthode sur une valeur. Une **méthode** est une fonction disponible sur cette valeur. Les parenthèses de `trim()` et de `toLowerCase()` demandent leur exécution. Ici, le résultat de `trim()` est ensuite utilisé par `toLowerCase()`.

`normalizedQuery` est un nom choisi pour la recherche préparée. `trim`, `toLowerCase` et `includes` sont des méthodes JavaScript : leurs noms sont imposés.

```ts
// includes répond par un booléen : le titre contient-il le texte demandé ?
const firstMatch = 'atlas des mers'.includes('atlas') // true : oui.
const secondMatch = 'histoires courtes'.includes('atlas') // false : non.
```

| Saisie | Recherche préparée | Titres correspondants |
| --- | --- | --- |
| `  ATLAS  ` | `atlas` | Atlas des nuages, Atlas des mers |
| `histoires` | `histoires` | Histoires courtes |
| `dragon` | `dragon` | Aucun |
| Texte vide ou espaces seuls | Texte vide | Tous : chaque texte contient la chaîne vide. |

La conversion ignore les majuscules/minuscules, mais ne supprime pas les accents. `trim()` ne retire pas les espaces entre les mots.

## 4 · Filtrer : garder les objets qui répondent à une condition

`filter` parcourt un tableau et construit un **nouveau tableau**. Pour chaque objet, nous lui fournissons une fonction qui répond `true` pour garder cet objet ou `false` pour l'écarter du résultat. Le catalogue d'origine reste intact.

```ts
// book reçoit successivement chaque objet du tableau books.
const matchingBooks = books.filter((book) => {
  // Chaque titre est comparé en minuscules à la recherche préparée.
  return book.title.toLowerCase().includes(normalizedQuery)
})
```

`(book) => { ... }` est une **fonction fléchée**. `book` est son paramètre : un nom local que nous choisissons pour l'objet reçu. `=>` introduit ce que fait la fonction. Entre les accolades, `return` donne le résultat à `filter` ; il ne renvoie pas ici du JSX à React.

Pour la recherche `atlas`, les réponses successives sont `true`, `false`, `true`. `matchingBooks` contient donc les deux atlas, dans leur ordre d'origine.

Une fonction qui renvoie une seule expression peut s'écrire plus court :

```ts
// Sans accolades après =>, le résultat de l'expression est renvoyé directement.
const matchingBooks = books.filter((book) => book.title.toLowerCase().includes(normalizedQuery))
```

Ces deux écritures sont **deux présentations du même calcul**. Il ne faut pas déclarer deux fois `matchingBooks` dans le même composant.

## 5 · Trier : changer l'ordre du résultat sans changer la source

Après filtrage, les deux atlas sont encore dans l'ordre 300 pages, puis 200 pages. Nous voulons afficher les livres du plus court au plus long.

```ts
// slice() crée un nouveau tableau avec les mêmes objets.
const visibleBooks = matchingBooks.slice().sort((first, second) => first.pages - second.pages)
// Pour la recherche 'atlas', l'ordre obtenu est 200 pages, puis 300 pages.
```

`sort` réordonne le tableau sur lequel il est appelé. Ici, il reçoit la copie créée par `slice()` : nous ne lui demandons pas de réordonner `books`. Cette copie est un tableau en mémoire, **pas une copie du projet ou d'un fichier**. Les objets et leurs identifiants ne sont pas recréés par `slice()`.

`sort` appelle notre fonction de comparaison avec deux objets, nommés librement `first` et `second`. Leur différence indique leur ordre :

| Résultat de `first.pages - second.pages` | Conséquence |
| --- | --- |
| Négatif, par exemple 200 − 300 = −100 | `first` doit être avant `second`. |
| Positif, par exemple 300 − 200 = 100 | `first` doit être après `second`. |
| Zéro | Les deux valeurs sont égales pour ce tri. |

Sans recherche, l'affichage devient Histoires courtes (120), Atlas des mers (200), Atlas des nuages (300). L'ordre de `books` reste nuages, histoires, mers.

## 6 · Afficher les résultats et mémoriser un clic

Le nombre de résultats est `visibleBooks.length`. `length` est une propriété, donc sans parenthèses. `map` transforme chaque objet visible en une ligne à afficher. Contrairement à `filter`, il produit ici du JSX, pas une réponse vrai/faux.

Nous ajoutons au composant un deuxième état, indépendant de la recherche :

```tsx
// Dans le composant : texte vide au départ, donc aucun livre choisi.
const [selectedBookId, setSelectedBookId] = useState('')
```

Voici un extrait du JSX de ce même composant :

```tsx
<section>
  {/* Le compteur peut être annoncé lors de ses changements par un lecteur d'écran. */}
  <p role="status">Résultats : {visibleBooks.length}</p>
  {/* && affiche le message seulement si la comparaison est vraie. */}
  {visibleBooks.length === 0 && <p>Aucun livre trouvé.</p>}
  <ul>
    {/* Les parenthèses après => permettent de renvoyer le JSX sur plusieurs lignes. */}
    {visibleBooks.map((book) => (
      <li key={book.id}>
        {/* Ce bouton agit sans envoyer un formulaire ; le clic mémorise un identifiant. */}
        <button
          type="button"
          onClick={() => setSelectedBookId(book.id)}
          aria-pressed={selectedBookId === book.id}
        >
          Choisir {book.title}
        </button>
      </li>
    ))}
  </ul>
</section>
```

`key={book.id}` donne à React une clé stable pour suivre chaque ligne. Ce n'est pas l'attribut HTML `id` : les deux ont des rôles différents. La clé utilise l'identifiant du livre, et non sa position qui peut changer avec le tri.

`onClick={() => setSelectedBookId(book.id)}` fournit une fonction à exécuter **au clic**. Les parenthèses vides signifient que cette fonction ne déclare aucun paramètre ; elle utilise le `book` de la ligne. Sans cette fonction, appeler la mise à jour pendant le rendu ne décrirait plus une action à attendre.

`===` compare les deux identifiants. `aria-pressed` transmet le résultat vrai/faux aux technologies d'assistance pour indiquer si le bouton correspond au choix. Cet attribut n'effectue pas lui-même la sélection. `role="status"` décrit une zone dont les changements peuvent être annoncés ; il ne calcule pas le compteur. Ces noms d'attributs et la valeur `status` sont standard, pas des noms inventés pour notre projet.

## 7 · Retrouver l'objet choisi, même s'il est masqué

L'état conserve seulement `'seas'`, par exemple. Pour afficher son titre ou ses pages, il faut retrouver l'objet correspondant dans le **catalogue complet**.

```ts
// find renvoie le premier livre dont l'identifiant correspond au choix mémorisé.
const selectedBook = books.find((book) => book.id === selectedBookId)
// Sans correspondance, selectedBook vaut undefined : aucun objet trouvé.
```

`filter` renvoie toujours un tableau, éventuellement vide. `find` renvoie **un objet** ou `undefined`. Cette dernière valeur signifie ici « aucun résultat » ; elle n'a pas de propriété `title` à lire.

```tsx
<div>
  {/* Le ternaire choisit l'un des deux affichages selon l'existence de l'objet. */}
  {selectedBook !== undefined ? (
    <p>Livre choisi : {selectedBook.title}</p>
  ) : (
    <p>Aucun livre choisi.</p>
  )}
</div>
```

`!==` signifie « différent de ». L'écriture `condition ? résultatSiVrai : résultatSiFaux` s'appelle un **ternaire**. Le nom est lu seulement dans la branche où l'objet existe.

| Action | Liste visible | Résumé |
| --- | --- | --- |
| Aucun choix, recherche vide | Les trois livres triés | Aucun livre choisi. |
| Choisir Atlas des mers | Les trois livres triés | Atlas des mers |
| Chercher `histoires` | Histoires courtes | Toujours Atlas des mers |
| Chercher `dragon` | Aucun résultat | Toujours Atlas des mers |

La recherche modifie les lignes visibles. Elle ne change pas `selectedBookId`. Le résumé utilise `books.find(...)`, donc le choix reste retrouvable même lorsqu'il n'apparaît plus dans `visibleBooks`.

## 8 · Ce qui est mémorisé et ce qui est recalculé

Les états sont la recherche brute et l'identifiant choisi. Le texte préparé, le tableau filtré, le tableau trié et l'objet choisi sont des **valeurs dérivées** : des résultats calculés à partir des états et des données.

Ces calculs se placent dans le corps du composant, avant son `return`. À chaque rendu, ils utilisent les états courants. Il n'est pas nécessaire de créer un `useState` supplémentaire pour chaque résultat.

**Parcours d'une saisie :** le champ appelle le gestionnaire → le gestionnaire lit son texte → la mise à jour d'état est demandée → React rappelle le composant → filtre et tri sont recalculés → l'écran reflète les résultats.

## 9 · Passer des livres aux donjons 🧭

Vous allez maintenant appliquer ces mécanismes dans **votre projet actuel**, après la fin du bloc 10. Les [exercices](exercices-11.md) indiquent où agir dans `src/App.tsx`.

Une feuille CSS est fournie pour la présentation du catalogue. Après l'avoir placée dans `src`, son import au début de `App.tsx` permet à l'application de charger ses styles :

```tsx
// Le chemin ./ désigne ici un fichier situé dans le même dossier que App.tsx.
import './dungeon-catalog.css'
```

Les exercices précisent les valeurs de `className` attendues par cette feuille. Ce sont des noms de classes CSS choisis pour le projet ; ils doivent correspondre aux noms présents dans le CSS. Ils n'effectuent ni la recherche ni la sélection.

| Dans les exemples | Dans les exercices du refuge | Rôle conservé |
| --- | --- | --- |
| `books` et `Book` | `dungeons` et `Dungeon` | Catalogue et forme de ses objets, fournis en ressource. |
| `book.title` | `dungeon.name` | Texte sur lequel porte la recherche. |
| `book.pages` | `dungeon.recommendedLevel` | Nombre utilisé pour le tri croissant. |
| `query`, `setQuery`, `changeQuery` | `dungeonQuery`, `setDungeonQuery`, `changeDungeonQuery` | Champ de recherche et gestionnaire. |
| `normalizedQuery` | `normalizedQuery` | Texte préparé pour comparer. |
| `matchingBooks`, `visibleBooks` | `matchingDungeons`, `visibleDungeons` | Résultats filtrés puis triés. |
| `selectedBookId`, `setSelectedBookId` | `selectedDungeonId`, `setSelectedDungeonId` | Identifiant choisi et sa mise à jour. |
| `selectedBook` | `selectedDungeon` | Objet retrouvé dans le catalogue complet. |
| `book-query` | `dungeon-query` | Identifiant HTML du champ, repris dans son libellé. |

**À retenir :** la recherche détermine ce que l'on voit ; l'identifiant détermine ce que l'on a choisi. Filtrer, trier et retrouver un objet sont trois opérations différentes.
