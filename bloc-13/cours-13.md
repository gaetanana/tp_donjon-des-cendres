# Bloc 13 · Du catalogue au récapitulatif du refuge

**Résultat à obtenir.** Choisissez la **Crypte silencieuse**, puis saisissez `dragon` dans la recherche. Le catalogue affiche zéro résultat. Le récapitulatif sous le catalogue affiche toujours la Crypte, avec le nom de votre équipe et les héros actuels. Vous avez changé la recherche et gardé votre destination.

## La même information à deux endroits

| Dans votre projet | Sa responsabilité |
| --- | --- |
| `src/App.tsx` | Garde l’identifiant du donjon choisi. Retrouve ce donjon dans le tableau **complet** `dungeons`. Garde aussi le nom enregistré de l’équipe et les héros courants. |
| `src/components/DungeonPicker.tsx` | Affiche les cartes, garde la recherche et indique le bouton sélectionné. Quand on clique, il transmet l’identifiant à `App` avec `onChoose`. |
| `src/components/PreparationSummary.tsx` | Reçoit la destination, le nom de l’équipe et les héros. Son bouton « Effacer le choix » appelle l’action `onClear` fournie par `App`. |

## Suivre le choix de la Crypte

1. **Au clic**, le catalogue envoie l’identifiant de la Crypte. `App` enregistre cet identifiant et retrouve sa fiche. Le catalogue et le récapitulatif reçoivent le nouveau choix.
2. **Pendant la recherche**, seul le texte dans `DungeonPicker` change. Chercher dans la liste des cartes visibles ferait perdre la fiche de la Crypte dès que sa carte disparaît. `App` continue donc de chercher le donjon dans toutes les destinations.
3. **À l’effacement**, le récapitulatif appelle `onClear`. `App` efface la destination. Le mot `dragon` reste dans le champ et les noms de l’équipe restent affichés.

Vos filtres, votre tri et votre éventuel message de destination masquée suivent la liste dans `DungeonPicker`. Si Maëlys a été renommée Liora, le récapitulatif reçoit **`heroes`**, la liste courante. `initialHeroes` contient encore les noms de départ.

## Ce que les panneaux reçoivent

`onChoose` et `onClear` sont des noms choisis pour les actions du refuge. `onChoose` reçoit le texte de l’identifiant. `onClear` efface la sélection et ne demande aucun argument. Une parenthèse vide `()` dans son type exprime cette différence.

Dans `src/components/PreparationSummary.tsx`, le contrat suivant décrit les quatre props du récapitulatif. Le trait vertical de `Dungeon | undefined` signifie « un donjon ou une valeur absente ». Quand `find` ne trouve aucun donjon, le récapitulatif affiche « Aucun donjon sélectionné. ». Il peut lire le nom du donjon uniquement quand cet objet existe.

```tsx
// Depuis components, remonter dans src pour lire les deux types partagés.
import type { Dungeon, Hero } from '../types'

type PreparationSummaryProps = {
  teamName: string                  // Le nom d’équipe déjà enregistré.
  heroes: Hero[]                    // Les héros avec leurs noms actuels.
  selectedDungeon: Dungeon | undefined // La destination si elle existe.
  onClear: () => void               // L’action du parent qui efface le choix.
}
```

L’exercice utilise deux écritures de clic. Un bouton du catalogue envoie **son identifiant** avec `onClick={() => props.onChoose(dungeon.id)}`. La flèche fait attendre le clic. Dans le récapitulatif, `onClick={props.onClear}` transmet directement **l’action qui n’a besoin d’aucun argument**. React l’appellera au clic.

Gardez le composant du catalogue dans son propre fichier, déclaré au niveau du fichier. Ainsi sa recherche reste en place quand le parent se réaffiche. Dans le panneau, l’import du catalogue part de `../data/dungeons`. Depuis `App.tsx`, il part de `./data/dungeons`. Si vous avez encore les formulaires dans `App`, conservez les imports qu’ils utilisent.

[Passer aux exercices du bloc 13](exercices-13.md)
