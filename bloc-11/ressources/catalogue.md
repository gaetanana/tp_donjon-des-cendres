# Ressource · Les trois destinations du refuge

Ces données sont fournies. Copiez le bloc ci-dessous dans `src/App.tsx`, **après les imports et avant les types déjà présents**, donc en dehors de `App`.

`Dungeon` signifie « donjon » et décrit les propriétés de chaque objet. `dungeons` est le tableau qui regroupe ces objets. Les identifiants restent fixes même lorsque l'ordre d'affichage change.

```ts
// Dungeon est le nom choisi pour le type d'un objet destination.
type Dungeon = {
  id: string // Identifiant stable, utilisé pour retrouver cette destination.
  name: string // Nom affiché et recherché dans le catalogue.
  recommendedLevel: number // Nombre utilisé pour le tri croissant.
  difficulty: string // Libellé présenté à l'utilisateur.
  description: string // Texte affiché dans le résumé de la destination choisie.
}

// Dungeon[] indique un tableau composé d'objets du type Dungeon.
// L'ordre source Forge/Cave/Crypte reste intact ; l'affichage sera trié séparément.
const dungeons: Dungeon[] = [
  {
    id: 'ember-forge',
    name: 'Forge des braises',
    recommendedLevel: 3,
    difficulty: 'Difficile',
    description: 'Une ancienne forge au cœur de la montagne.',
  },
  {
    id: 'ash-cellar',
    name: 'Cave des cendres',
    recommendedLevel: 1,
    difficulty: 'Facile',
    description: 'Une réserve oubliée sous le refuge.',
  },
  {
    id: 'silent-crypt',
    name: 'Crypte silencieuse',
    recommendedLevel: 2,
    difficulty: 'Modérée',
    description: 'Des galeries de pierre sous une chapelle abandonnée.',
  },
]
```

Le niveau conseillé sert ici à classer les destinations. Il n'empêche pas de les choisir et ne déclenche pas de combat. Les trois descriptions seront lues dans le résumé de la sélection.
