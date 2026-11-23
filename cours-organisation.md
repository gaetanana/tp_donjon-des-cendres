# Organiser le projet React du refuge 🧭

À la fin du bloc 12, votre refuge permet de consulter des héros, de les renommer et de choisir un donjon. Le but du rangement est simple. Pour modifier la fiche d’un héros, vous ouvrirez `HeroCard.tsx`. Pour modifier sa formule d’attaque, vous ouvrirez `rules/hero.ts`. Dans `App.tsx`, vous pourrez lire la composition de la page.

Partez de **votre projet actuel**. Déplacez vos propres déclarations avec leurs champs, leurs images, leurs textes et leurs bonus. Si vous avez déjà suivi le premier atelier et créé certains fichiers, ouvrez-les et passez directement aux éléments qu’il vous reste à ranger.

## 1. Où ranger chaque morceau du refuge ?

| Ce que vous cherchez | Où le ranger |
| --- | --- |
| Les propriétés d’un héros, d’un monstre ou d’un donjon | `types.ts` décrit les données communes à plusieurs fichiers. |
| Les héros de départ, les donjons du catalogue, les monstres du bestiaire | Un tableau par fichier dans `data/`. |
| Une formule comme le calcul des points de vie | Une fonction dans `rules/hero.ts`. |
| Une partie de l’écran, par exemple la fiche d’un héros | Un composant dans `components/`. Son nom commence par une majuscule. |
| Une information qui change pendant la partie | Dans le composant qui l’utilise. Si deux panneaux en ont besoin, leur parent garde la valeur et la leur transmet. |

Voici le rangement à obtenir dans `src/`. Les composants contiennent du **JSX**, les balises que React affiche. Leurs fichiers se terminent par `.tsx`. Les fichiers qui contiennent uniquement des données, des types ou des calculs se terminent par `.ts`.

```text
src/
  App.tsx
  main.tsx
  types.ts
  data/
    heroes.ts
    monsters.ts
    dungeons.ts
  rules/
    hero.ts
  components/
    HeroCard.tsx
    MonsterCard.tsx
    Bestiary.tsx
    TeamPanel.tsx
    HeroRoster.tsx
```

Créez les dossiers manquants dans `src/`. Les feuilles CSS gardent leur emplacement et leur ordre d’import actuel. Les images déjà affichées depuis `public/` gardent leur adresse. Si vous avez importé une image avec un chemin relatif dans un composant, adaptez ce chemin depuis son nouveau dossier.

## 2. Déplacer une fonction et la retrouver

Commencez par `getMaxHealth`. Dans `App.tsx`, coupez **la définition entière**, de `function getMaxHealth` jusqu’à son accolade de fermeture. Collez-la dans `src/rules/hero.ts` et ajoutez `export` devant `function`. Avec la formule commune, vous obtenez ceci.

```ts
// src/rules/hero.ts — chaque point de constitution donne dix points de vie.
export function getMaxHealth(constitution: number): number {
  return constitution * 10
}
```

Les appels comme `getMaxHealth(6)` restent pour l’instant dans le tableau des héros. En haut de `App.tsx`, indiquez où trouver la fonction.

```ts
// src/App.tsx — partir de src, puis entrer dans le dossier rules.
import { getMaxHealth } from './rules/hero'
```

**`export`** rend la fonction disponible sous son nom. **`import`** permet à un autre fichier d’utiliser ce nom. Les accolades contiennent son orthographe exacte. `./` part du dossier où vous écrivez. `../` remonte d’un dossier. Quand le tableau des héros sera dans `data/heroes.ts`, son chemin vers le calcul deviendra `../rules/hero`.

## 3. Sortir les types, les données et les cartes

Procédez ligne par ligne dans le tableau ci-dessous. **Déplacez la déclaration entière**, avec les valeurs que vous avez choisies. Devant chaque déclaration partagée, ajoutez `export`, par exemple `export type Hero` ou `export const monsters`. Les lignes d’import indiquées vont en haut du fichier de destination. `import type` sert à utiliser une description TypeScript, par exemple la forme d’un objet `Hero`.

| Ouvrez ou créez | Déplacez depuis `App.tsx` | Imports dans le fichier de destination |
| --- | --- | --- |
| `src/types.ts` | Les quatre types `HeroChoice`, `Hero`, `Monster`, `Dungeon`. Exportez chacun. | Aucun pour les types de la version commune. |
| `src/rules/hero.ts` | À côté de `getMaxHealth`, ajoutez `getAttackScore` et, si vous l’avez, `getHealingEstimate`. Exportez les fonctions. | `import type { Hero } from '../types'` |
| `src/data/heroes.ts` | Le tableau `initialHeroes`, de `const` au crochet fermant. | `import type { Hero } from '../types'` et `import { getMaxHealth } from '../rules/hero'` |
| `src/data/dungeons.ts` | Le tableau `dungeons`, dans son ordre d’origine. | `import type { Dungeon } from '../types'` |
| `src/data/monsters.ts` | Le tableau `monsters`, situé **à l’intérieur de la fonction App**. Dans son nouveau fichier, placez-le directement après son import. | `import type { Monster } from '../types'` |
| `src/components/HeroCard.tsx` | Le type `HeroStatus`, le type `HeroCardProps` et la fonction `HeroCard` avec tout son affichage. Exportez la fonction. | `import type { Hero } from '../types'` et `import { getAttackScore } from '../rules/hero'`. Ajoutez le nom du calcul de soin à ce dernier import si la fiche l’affiche. |
| `src/components/MonsterCard.tsx` | Le type `MonsterCardProps` et la fonction `MonsterCard`. Exportez la fonction. | `import type { Monster } from '../types'` |

Dans `App.tsx`, importez les noms qu’il utilise encore. Voici les imports du projet commun **à la fin de cette étape**. Gardez aussi vos imports React et CSS. Dans un fichier, chaque nom importé apparaît une seule fois. Retirez de l’import de `./rules/hero` les fonctions qui ne sont plus appelées dans `App`. Si cet import est vide, retirez sa ligne.

```tsx
// App possède toujours l'équipe courante et la sélection du héros.
import type { Hero, HeroChoice } from './types'
import { initialHeroes } from './data/heroes'
import { dungeons } from './data/dungeons'
// Ces trois imports servent au JSX avant de déplacer les panneaux.
import { monsters } from './data/monsters'
import { MonsterCard } from './components/MonsterCard'
import { HeroCard } from './components/HeroCard'
```

**Si vous avez fait des bonus**, un portrait et une histoire restent des propriétés de votre héros. Leur affichage accompagne `HeroCard` s’il se trouve dans cette fiche. Si votre fiche appelle `getHealingEstimate`, le calcul va dans `rules/hero.ts` et la fiche l’importe pour afficher son résultat. Un type utilisé par cette fiche seule, comme `HealthState`, peut rester à côté d’elle. Si vous aviez déjà un fichier pour ce contenu, conservez-le et ajustez son import.

## 4. Donner son propre fichier au bestiaire

Un composant rassemble une partie de l’écran. Créez `src/components/Bestiary.tsx`. Prenez dans `App.tsx` toute la section qui commence par `<section className="bestiary">`, titre et cartes compris. Placez-la dans le `return` du nouveau composant à la place de la balise vide.

```tsx
// La section utilise la liste de monstres et une carte pour chaque entrée.
import { monsters } from '../data/monsters'
import { MonsterCard } from './MonsterCard'

export function Bestiary() {
  return <section /> // Remplacez cette balise par votre section complète.
}
```

Pour une section sur plusieurs lignes, encadrez-la avec `return (` et `)`. Dans `App.tsx`, importez `Bestiary` depuis `./components/Bestiary` et mettez `<Bestiary />` à l’ancien emplacement de la section. Retirez les imports de `monsters` et de `MonsterCard` dans `App.tsx` si seul le bestiaire s’en sert. Si votre bestiaire a déjà son propre filtre, déplacez ses boutons, son état et ses calculs avec lui.

## 5. Le formulaire d’équipe dans `TeamPanel.tsx`

Le champ contient **le nom en cours de saisie** (`draftName`). La page partage **le nom enregistré** (`teamName`). Le brouillon et le message d’erreur appartiennent donc au formulaire. Le nom enregistré reste dans `App`.

Le parent `App` donne deux **props** au formulaire. La première, `teamName`, contient un texte à afficher. La seconde, `onRename`, contient une fonction à appeler quand le nom est accepté. Nous avons choisi le nom `onRename` pour cette action.

Lisez le type **`onRename: (name: string) => void`** de gauche à droite. Entre les parenthèses, `name: string` indique que la fonction reçoit un texte. Après la flèche, `void` indique que le formulaire n’attend aucune valeur en retour. La fonction met à jour le nom de l’équipe dans `App`.

Quand `App` écrit `onRename={setTeamName}`, il **transmet la fonction** au formulaire. Les parenthèses apparaissent au moment de **l’appeler**. Après validation de la saisie, `props.onRename(cleanName)` lui envoie le nom nettoyé. Si vous entrez «  Val  », l’équipe prend le nom « Val » après l’envoi.

Créez `src/components/TeamPanel.tsx` avec cette structure.

```tsx
// Le formulaire utilise les mêmes états et types d’événements qu’au bloc 12.
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'

type TeamPanelProps = {
  teamName: string                 // Nom actuellement enregistré dans App.
  onRename: (name: string) => void // Action à appeler avec le nouveau nom.
}

export function TeamPanel(props: TeamPanelProps) {
  // Les états et fonctions du formulaire vont ici, avant le return.
  return <section /> // Remplacez cette balise par votre section « Votre équipe ».
}
```

1. Depuis `App.tsx`, déplacez **les deux lignes d’état** de `draftName` et `teamError`, puis **les fonctions entières** `changeTeamName` et `submitTeamName`, juste avant le `return` de `TeamPanel`. Pour le brouillon commun, écrivez `const [draftName, setDraftName] = useState(props.teamName)` afin que le champ démarre avec le nom enregistré. Gardez vos règles de validation.
2. Coupez toute la section `<section className="team-panel">` jusqu’à son `</section>`. Dans `TeamPanel`, remplacez `return <section />` par `return (`, votre section, puis `)`.
3. Dans le code que vous venez de déplacer, remplacez chaque lecture de `teamName` par `props.teamName`, par exemple `{props.teamName}` après « Équipe actuelle ». Dans `submitTeamName`, remplacez `setTeamName(cleanName)` par `props.onRename(cleanName)`. **L’état `[teamName, setTeamName]` reste dans `App`.**
4. Dans `App.tsx`, importez `TeamPanel` depuis `./components/TeamPanel` avec un import nommé. À la place de l’ancienne section, écrivez `<TeamPanel teamName={teamName} onRename={setTeamName} />`. La page reçoit le nouveau nom quand le formulaire est envoyé.

**Si vous avez personnalisé le formulaire**, déplacez son compteur, sa bannière, son sceau ou son bouton d’annulation avec la section. Emportez aussi les calculs, les états et les fonctions qui leur appartiennent. Le bouton « Reprendre le nom » relit `props.teamName` pour remplir le brouillon. Si « Annuler » rétablissait le nom précédent avec `setTeamName(previousName)`, remplacez cet appel par `props.onRename(previousName)` en gardant le nom de votre variable.

## 6. La sélection et le renommage dans `HeroRoster.tsx`

La zone « Avant le départ » affiche les boutons et la fiche des héros. Elle garde en mémoire **le héros consulté** et **le texte saisi**. Le tableau `heroes` reste dans `App`, car le reste du refuge doit aussi voir les nouveaux noms.

Le renommage d’un héros demande deux informations. Dans `(id: HeroChoice, name: string) => void`, le premier paramètre identifie le héros, le second donne son nouveau nom. La fonction modifie le tableau de l’équipe dans `App`. Par exemple, si Maëlys est sélectionnée, le formulaire envoie son identifiant `'mage'` et le nom `'Liora'`. Les autres héros gardent leur nom.

Créez `src/components/HeroRoster.tsx` avec cette structure.

```tsx
// La sélection et les champs utilisent toujours React.
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import type { Hero, HeroChoice } from '../types'
import { HeroCard } from './HeroCard' // La fiche est dans le même dossier.

type HeroRosterProps = {
  heroes: Hero[]                            // Héros actuels, avec leurs noms enregistrés.
  onRename: (id: HeroChoice, name: string) => void // Action pour renommer un héros précis.
}

export function HeroRoster(props: HeroRosterProps) {
  // Les états, le héros sélectionné et les fonctions du formulaire vont ici.
  return <section /> // Remplacez cette balise par votre section « Avant le départ ».
}
```

1. Depuis `App.tsx`, déplacez dans `HeroRoster`, avant le `return`, **les lignes d’état** de `selectedChoice`, `draftHeroName` et `heroError`, puis le calcul `selectedHero` et **les fonctions entières** `changeHeroName` et `submitHeroName`.
2. Déplacez la section qui contient le titre « Avant le départ », depuis son `<section>` jusqu’au `</section>` qui suit le formulaire du héros. Placez-la dans `return ( … )`, à la place de la balise vide. Gardez les boutons et l’appel `<HeroCard hero={selectedHero} />`. Dans le calcul du héros consulté et dans la section, les lectures de `heroes` deviennent `props.heroes`. Écrivez par exemple `const selectedHero = props.heroes.find((hero) => hero.id === selectedChoice) ?? props.heroes[0]`. Faites de même pour la liste des boutons et le héros en première ligne.
3. Dans `submitHeroName`, remplacez **seulement** l’appel entier `setHeroes((currentHeroes) => { … })` par `props.onRename(selectedHero.id, cleanName)`. Les contrôles avant cet appel et le nettoyage du champ après l’appel restent dans le formulaire.
4. Dans `App.tsx`, gardez l’état `[heroes, setHeroes]`. Ajoutez cette fonction dans `App`, avant son `return`. Elle réalise la mise à jour qui se trouvait dans le formulaire.

```tsx
function renameHero(id: HeroChoice, name: string) {
  // Parcourir la liste courante pour retrouver l’identifiant envoyé par le formulaire.
  setHeroes((currentHeroes) => currentHeroes.map((hero) => {
    if (hero.id === id) {
      return { ...hero, name: name } // Garder les autres champs. Le champ name reçoit le paramètre name.
    }
    return hero // Les autres héros gardent leurs propres données.
  }))
}
```

5. Dans `App.tsx`, importez `HeroRoster` depuis `./components/HeroRoster` avec un import nommé. À l’emplacement de l’ancienne section « Avant le départ », écrivez `<HeroRoster heroes={heroes} onRename={renameHero} />`. À ce stade, c’est `HeroRoster.tsx` qui importe `HeroCard`. Retirez son ancien import d’`App.tsx` s’il y était encore.

**Si vous avez personnalisé le renommage**, déplacez aussi l’aperçu, les gestionnaires et les boutons qui l’accompagnent. La vérification des doublons consulte `props.heroes` avant d’appeler `props.onRename`. Le bouton « Proposer le nom d’origine » est un autre cas. Il relit les noms de départ. S’il existe dans votre projet, ajoutez dans `HeroRoster.tsx` l’import `import { initialHeroes } from '../data/heroes'` et conservez le calcul qui retrouve le nom initial.


## 7. Lire le résultat dans App.tsx

Dans le `return` de `App`, après le titre du refuge, les trois panneaux doivent maintenant se lire ainsi. Ces balises occupent la place des anciennes sections. La section du catalogue suit directement le bestiaire.

```tsx
{/* L’équipe reçoit son nom enregistré et la fonction qui peut le changer. */}
<TeamPanel teamName={teamName} onRename={setTeamName} />
{/* La sélection et le formulaire du héros partagent la liste courante. */}
<HeroRoster heroes={heroes} onRename={renameHero} />
{/* Le bestiaire retrouve sa liste de monstres dans son propre fichier. */}
<Bestiary />
```

`App` conserve le nom d’équipe, les héros courants, la fonction `renameHero` et le catalogue. Le bloc 13 s’appuie sur ce catalogue pour partager le donjon choisi entre deux panneaux. Si vous avez ajouté un filtre de difficulté, un tri ou un message de destination masquée, laissez-les avec la recherche du catalogue jusqu’à ce bloc. Dans les imports React d’`App.tsx`, gardez `useState` et `ChangeEvent` pour la recherche. Retirez `SubmitEvent` une fois les deux formulaires déplacés, sauf si un autre formulaire du fichier l’utilise encore.

**Vérifiez votre refuge.** Depuis le dossier où se trouve `package.json`, lancez `npm run dev` et ouvrez l’adresse affichée. Sélectionnez Maëlys, renommez-la Liora et vérifiez que le bouton et la fiche suivent. Choisissez un donjon ou essayez un de vos anciens bonus. Si l’éditeur souligne un nom après un déplacement, ouvrez **le fichier qui emploie ce nom**, puis vérifiez son import, son chemin et ses majuscules.
