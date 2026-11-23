# Bloc 12 · Modifier un objet dans un tableau d’état

Vous pouvez déjà consulter les héros et choisir une destination. Vous allez permettre de **renommer le héros consulté** sans perdre les autres noms ni modifier ses caractéristiques.

Les [exercices](exercices-12.md) appliquent ces mécanismes dans votre projet de fin du bloc 11.

## 1 · Distinguer les données initiales des données courantes

Une constante recréée dans une fonction composant n’est pas une mémoire modifiable par l’utilisateur. React conserve les données d’un rendu au suivant grâce à un **état**. Un rendu est l’exécution du composant qui calcule ce que la page doit afficher.

Voici les données d’un petit catalogue d’exemple. Le type et les données initiales se placent **hors de la fonction composant**, après les imports. Le mot anglais `initial` indique le point de départ.

```ts
// Book est notre nom de type ; string et number sont des types TypeScript.
type Book = {
  id: string // Identifiant stable, indépendant du titre affiché.
  title: string
  pages: number
}

// Ce tableau fournit les deux livres au premier affichage.
const initialBooks: Book[] = [
  { id: 'atlas', title: 'Atlas', pages: 120 },
  { id: 'garden', title: 'Jardin', pages: 80 },
]
```

Dans le composant de cet exemple, les déclarations suivantes se placent près des autres états, avant les gestionnaires et le `return` JSX :

```tsx
// React conserve le tableau courant entre les rendus.
const [books, setBooks] = useState<Book[]>(initialBooks)
// Le choix mémorise un identifiant, pas une copie du livre.
const [selectedBookId, setSelectedBookId] = useState('atlas')
```

`useState` est fourni par React et s’importe comme au bloc 11. Les chevrons `<Book[]>` sont ici une indication TypeScript : l’état contient un tableau d’objets `Book`. Ce n’est pas une balise HTML. Les parenthèses transmettent `initialBooks` comme valeur initiale. Les crochets donnent deux noms aux deux éléments reçus : `books` lit la valeur courante et `setBooks` demande sa mise à jour. Ces noms sont choisis ; on conserve la convention `set` suivie du nom de l’état.

Après un renommage, tous les affichages doivent lire **`books`**, pas `initialBooks`. Le tableau initial reste le point de départ ; React ne le relit pas pour annuler vos changements à chaque rendu. Nous ne modifierons directement ni ce tableau ni ses objets.

## 2 · Retrouver l’objet courant

Dans le composant, après les états et avant le JSX, on peut retrouver le livre à partir du choix :

```ts
// find parcourt les données courantes et renvoie le premier objet correspondant.
// Le catalogue de cet exemple contient toujours ses deux livres.
const selectedBook = books.find((book) => book.id === selectedBookId) ?? books[0]
```

`book` est un nom de paramètre choisi. `find` appelle cette fonction pour chaque objet jusqu’à ce que la comparaison stricte `===` donne `true`. Il renvoie alors **cet objet**, et non un tableau. Sans correspondance, il renvoie `undefined`, c’est-à-dire l’absence de résultat.

L’opérateur JavaScript `??` se lit « sinon, en cas d’absence ». Il garde la valeur à gauche, sauf si elle vaut `undefined` ou `null` ; il utilise alors celle de droite. Il ne remplace pas une chaîne vide ou le nombre zéro. `books[0]` désigne le premier objet : les indices commencent à zéro.

Ce repli est justifié ici parce que le catalogue contient toujours deux objets et que le renommage ne retire aucun objet. **Il ne suffirait pas pour un tableau vide.** Dans le refuge, les trois héros restent toujours présents et dans le même ordre : le premier est le guerrier. On pourra donc employer le même principe avec `heroes[0]`.

`selectedBook` est recalculé à chaque rendu à partir du tableau courant. Ce n’est pas un état supplémentaire. Si le titre change, l’objet retrouvé porte le nouveau titre. Un ancien objet conservé séparément risquerait, lui, d’afficher l’ancien titre.

## 3 · Construire un nouveau tableau avec `map`

Au bloc 11, `map` produisait des éléments JSX pour l’affichage. La méthode JavaScript peut produire d’autres valeurs. Ici, **chaque passage renvoie un objet de données**.

Dans le gestionnaire d’un renommage, supposons que `cleanTitle` contienne déjà le titre accepté et nettoyé. Voici la mise à jour :

```ts
// React fournit à cette fonction le tableau courant à mettre à jour.
setBooks((currentBooks) => {
  // map fabrique un nouveau tableau, de même longueur et dans le même ordre.
  return currentBooks.map((book) => {
    if (book.id === selectedBook.id) {
      // Copier les propriétés, puis remplacer seulement le titre de la cible.
      return { ...book, title: cleanTitle }
    }
    // Les autres livres gardent leur objet, donc aussi leurs titres précédents.
    return book
  })
})
```

Deux fonctions sont transmises, et leurs rôles diffèrent :

| Fonction | Valeur reçue | Valeur renvoyée | Qui utilise le résultat ? |
| --- | --- | --- | --- |
| `(currentBooks) => { … }` | Le tableau courant fourni par React. | Le nouveau tableau. | React, pour mettre à jour l’état. |
| `(book) => { … }` | Un objet de ce tableau, à chaque passage. | L’objet copié et modifié, ou l’objet inchangé. | `map`, pour remplir le nouveau tableau. |

`currentBooks` et `book` sont des noms locaux choisis, pas des commandes. La flèche `=>` définit une fonction. Avec des accolades pour son corps, `return` est nécessaire pour renvoyer une valeur. Le `return book` concerne seulement le passage courant de `map` ; il n’arrête pas tout le parcours.

Pourquoi recevoir `currentBooks` ? Le prochain tableau dépend du précédent. React fournit à la fonction de mise à jour l’état sur lequel travailler, y compris les mises à jour déjà en attente. Repartir de `initialBooks` reconstruirait les anciens titres et ferait perdre un premier renommage lors du suivant. Cette fonction doit seulement calculer le nouveau tableau, sans modifier les objets reçus ni déclencher d’autre action.

### Copier l’objet ciblé

Dans `return { ...book, title: cleanTitle }`, les accolades construisent un nouvel objet. Les trois points, appelés syntaxe de décomposition ou *spread*, recopient les propriétés de `book`. Ensuite, `title: cleanTitle` remplace la valeur de la propriété `title`. Le nom à gauche des deux-points est la propriété ; celui de droite est la variable dont on prend la valeur.

L’ordre compte : la dernière valeur d’une même propriété l’emporte. Placer `...book` après `title: cleanTitle` rétablirait l’ancien titre. Ici, `id` et `pages` restent identiques. C’est une copie superficielle : un éventuel objet imbriqué resterait partagé. Les propriétés que nous modifions dans ce bloc sont des textes, pas des objets imbriqués.

On ne fait donc pas d’affectation directe telle que changer la propriété de l’objet reçu. Un nouveau tableau **et** un nouvel objet pour la cible permettent à React de disposer de la nouvelle valeur sans altérer l’ancienne. Cette copie en mémoire ne demande aucune copie du projet.

| Action sur le catalogue d’exemple | Titres après l’action |
| --- | --- |
| État initial | Atlas, Jardin. |
| Renommer le livre atlas en « Atlas bleu ». | Atlas bleu, Jardin. |
| Choisir garden puis le renommer en « Jardin vert ». | Atlas bleu, Jardin vert. |

## 4 · Séparer le brouillon, l’erreur et le titre enregistré

Le formulaire a besoin d’un texte en cours de saisie et d’un message d’erreur. Dans le composant d’exemple :

```tsx
// Le brouillon ne modifie pas immédiatement le livre enregistré.
const [draftTitle, setDraftTitle] = useState('')
// Une chaîne vide signifie qu’aucune erreur n’est affichée.
const [titleError, setTitleError] = useState('')
```

Voici les imports de cet exemple ; dans le refuge, ils existent déjà :

```tsx
// Importer la fonction React et les types des événements utilisés.
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
```

Les gestionnaires se placent **dans le composant**, après les états et les calculs nécessaires, avant le `return` JSX :

```tsx
function changeTitle(event: ChangeEvent<HTMLInputElement>) {
  // Le gestionnaire reçoit un événement ; cette expression en lit le texte.
  setDraftTitle(event.currentTarget.value)
  // Une nouvelle saisie retire le message précédent, sans enregistrer le livre.
  setTitleError('')
}
```

`event` est notre nom pour l’événement transmis par React. `ChangeEvent<HTMLInputElement>` décrit un événement de saisie sur un champ HTML ; `currentTarget` est ce champ et `value` son texte. `setDraftTitle` reçoit ce texte, pas l’événement. Au rendu suivant, `value={draftTitle}` affichera l’état : c’est un **champ contrôlé**.

## 5 · Nettoyer, vérifier, puis enregistrer

Le formulaire utilise ce gestionnaire complet. Il reprend la mise à jour de la section 3 ; les deux extraits montrent **le même mécanisme**, ils ne sont pas à additionner.

```tsx
function submitTitle(event: SubmitEvent<HTMLFormElement>) {
  // Gérer l’envoi dans React sans recharger la page.
  event.preventDefault()
  // trim produit un texte sans espaces aux extrémités ; le brouillon reste intact.
  const cleanTitle = draftTitle.trim()

  if (cleanTitle.length === 0) {
    setTitleError('Saisissez un titre.')
    return // Arrêter ce gestionnaire avant toute mise à jour des livres.
  }
  if (cleanTitle.length > 24) {
    setTitleError('Utilisez au plus 24 caractères.')
    return // Le texte refusé reste dans le champ pour pouvoir être corrigé.
  }

  setBooks((currentBooks) => {
    return currentBooks.map((book) => {
      if (book.id === selectedBook.id) {
        return { ...book, title: cleanTitle } // Seul le titre de la cible change.
      }
      return book // Préserver chaque autre objet courant.
    })
  })
  setTitleError('') // Un envoi réussi ne conserve pas d’ancienne erreur.
  setDraftTitle('') // Le livre conserve le titre ; le champ redevient vide.
}
```

`SubmitEvent<HTMLFormElement>` décrit l’événement d’envoi du formulaire. `preventDefault()` empêche son comportement habituel de navigation. Les noms `submitTitle`, `cleanTitle` et `titleError` sont libres ; `preventDefault`, `trim` et `length` sont des noms standards.

`trim()` est un appel de méthode : il retire les espaces de début et de fin, pas ceux entre les mots. `length` est une propriété et s’écrit sans parenthèses. Le test se fait **après** le nettoyage : trois espaces deviennent une chaîne vide ; «  Atlas bleu  » devient « Atlas bleu ». Une longueur de 24 est acceptée, 25 est refusée. On utilise ici la longueur JavaScript, comme au bloc 10 ; certains symboles composés peuvent compter pour plusieurs unités.

Un `return` sans valeur dans le gestionnaire signifie « terminer maintenant ». Les instructions situées après le refus ne sont donc pas exécutées : aucun titre enregistré ne change, et le brouillon reste disponible. Ce rôle diffère du `return book` qui fournit un objet à `map`.

Le livre consulté **au moment de l’envoi** reçoit le titre. Changer de livre ne vide pas le brouillon : les boutons de choix changent seulement `selectedBookId`. Par exemple, saisir « Horizon », consulter Jardin puis envoyer renomme Jardin. Aucun ancien choix n’est mémorisé à la première frappe.

## 6 · Relier le formulaire et expliquer ses identifiants

Ce fragment JSX représente le formulaire de l’exemple dans le `return` du composant, à côté de sa fiche. Il utilise les états et gestionnaires des sections précédentes :

```tsx
// Le formulaire reçoit une fonction ; elle sera appelée lors de l’envoi.
<form onSubmit={submitTitle}>
  {/* Le libellé et le champ partagent exactement le même identifiant. */}
  <label htmlFor="book-title">Nouveau titre du livre consulté</label>
  <input
    id="book-title"
    type="text"
    value={draftTitle}
    onChange={changeTitle}
    aria-invalid={titleError !== ''}
    aria-describedby={titleError !== '' ? 'book-help book-error' : 'book-help'}
  />
  {/* L’aide existe toujours ; l’erreur existe seulement si son texte est non vide. */}
  <p id="book-help">De 1 à 24 caractères après retrait des espaces aux extrémités.</p>
  {titleError !== '' && <p id="book-error" role="alert">{titleError}</p>}
  <button type="submit">Enregistrer le titre</button>
</form>
```

`onSubmit={submitTitle}` et `onChange={changeTitle}` transmettent les fonctions **sans les appeler au rendu**. Le bouton `type="submit"` envoie ce formulaire ; la touche Entrée dans le champ permet aussi l’envoi. `value` impose le texte de l’état au champ.

Les accolades d’un attribut JSX permettent d’évaluer une expression JavaScript. Les apostrophes ou guillemets délimitent un texte littéral. `titleError` sans guillemets désigne une variable ; `'book-error'` est une valeur texte distincte, choisie pour identifier un élément.

| Écriture | Rôle |
| --- | --- |
| `id="book-title"` | Donne au champ un identifiant unique dans la page. |
| `htmlFor="book-title"` | Relie le libellé à ce champ ; cliquer le libellé y place le focus. |
| `id="book-help"` | Identifie le paragraphe d’aide toujours présent. |
| `id="book-error"` | Identifie le paragraphe d’erreur lorsqu’il existe. |
| `aria-describedby` | Énumère les identifiants des textes décrivant le champ ; un espace sépare deux références. |
| `aria-invalid={titleError !== ''}` | Décrit un état invalide quand la comparaison donne `true`. |
| `role="alert"` | Signale l’apparition du message aux technologies d’assistance. |

Les noms `book-title`, `book-help` et `book-error` sont choisis, pas des instructions React. Le ternaire `condition ? valeurSiVrai : valeurSiFaux` associe l’aide **et** l’erreur si le message existe, seulement l’aide sinon. Chaque référence désigne ainsi un paragraphe présent. Le test `!== ''` signifie « différent de la chaîne vide ». Avec `condition && élément`, React affiche ici le paragraphe seulement lorsque cette condition est vraie.

Ces attributs décrivent les relations et l’état du champ ; **les conditions dans `submitTitle` effectuent la validation**. Nous n’ajoutons pas `maxLength` ni `required` à cet exemple : le gestionnaire vérifie le texte nettoyé et affiche ses propres messages, y compris lorsqu’on saisit 25 lettres.

## 7 · Suivre le trajet des valeurs

1. Vous tapez : React transmet l’événement à `changeTitle`.
2. `event.currentTarget.value` fournit le texte à `setDraftTitle` ; `setTitleError('')` retire l’erreur précédente.
3. React recalcule l’affichage. Le champ affiche le brouillon ; le titre enregistré n’a pas changé.
4. Vous envoyez : `submitTitle` reçoit l’événement, empêche la navigation et calcule `cleanTitle`.
5. En cas de refus, le message apparaît et le gestionnaire s’arrête. Le catalogue reste identique.
6. En cas de succès, la fonction reçue par `setBooks` construit le tableau suivant depuis le tableau courant. Seul l’objet ciblé est copié avec son nouveau titre.
7. Le rendu suivant lit les livres courants : le titre affiché change, le champ est vide et aucun message d’erreur n’est présent.

Ces états vivent en mémoire. Actualiser la page retrouve les données initiales : ce bloc ne les enregistre pas sur un serveur ou dans un fichier.

## 8 · Passer des livres aux héros

Les exercices donnent les emplacements dans `src/App.tsx`. Vous n’ajoutez aucun composant de livres. Les trois héros existants deviennent les données initiales, sans changer leurs propriétés.

| Exemple lu | Nom conservé dans le refuge | Sens |
| --- | --- | --- |
| `Book`, `initialBooks` | `Hero`, `initialHeroes` | Type existant et tableau initial hors de `App`. |
| `books`, `setBooks` | `heroes`, `setHeroes` | Tableau courant et sa fonction de mise à jour. |
| `selectedBookId` | `selectedChoice` déjà présent | Identifiant du héros consulté. |
| `selectedBook` | `selectedHero` | Objet retrouvé dans les données courantes. |
| `currentBooks`, `book` | `currentHeroes`, `hero` | Paramètres locaux de la mise à jour puis de `map`. |
| `title`, `cleanTitle` | `name`, `cleanName` | Propriété modifiée et nouveau texte nettoyé. |
| `draftTitle`, `setDraftTitle` | `draftHeroName`, `setDraftHeroName` | Brouillon du nouveau nom. |
| `titleError`, `setTitleError` | `heroError`, `setHeroError` | Message de refus, distinct de l’erreur du nom d’équipe. |
| `changeTitle`, `submitTitle` | `changeHeroName`, `submitHeroName` | Gestionnaires du formulaire de renommage. |
| `book-title`, `book-help`, `book-error` | `hero-name`, `hero-help`, `hero-error` | Identifiants choisis du champ, de l’aide et de l’erreur. |

`hero` signifie héros, `name` nom, `help` aide et `error` erreur. Ainsi, `heroError` est une **variable qui contient un message** ; `'hero-error'` est une **chaîne qui identifie son paragraphe**. En adaptant le formulaire, les références `htmlFor` et `aria-describedby` doivent correspondre exactement aux nouveaux `id`.

Les noms sont choisis pour notre projet mais doivent rester ceux du tableau pour préparer la suite. Le `cleanName` du formulaire de héros est local à son gestionnaire ; il n’entre pas en conflit avec le `cleanName` du formulaire d’équipe.

Tous les affichages de héros doivent lire `heroes` ou `selectedHero` : boutons, résumé, fiche et ligne « En première ligne ». Cette dernière lit `heroes[0].name` : le guerrier reste le premier objet et peut être renommé. Le `map` de mise à jour ne trie ni ne supprime les héros. `HeroCard` continue à recevoir `hero={selectedHero}` ; ses calculs et ses statistiques restent valables.

Pour l’apparence, une feuille [hero-rename.css](ressources/hero-rename.css) est fournie. Comme au bloc 11, copiez-la dans `src`, puis importez-la après les autres feuilles :

```tsx
// Le chemin ./ désigne un fichier dans le même dossier que App.tsx.
import './hero-rename.css'
```

`className="hero-rename"` relie le formulaire aux règles de cette feuille. Ce nom de classe est choisi, comme ses règles CSS ; il ne réalise pas le renommage. Les exercices précisent où ajouter ce formulaire indépendant de celui de l’équipe.
