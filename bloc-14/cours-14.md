# Bloc 14 · Un cadre commun au catalogue et à la préparation

Dans votre projet de fin du bloc 13, le catalogue et le récapitulatif sont déjà deux composants distincts. Chacun ouvre une section, lui applique une classe CSS et affiche un titre de niveau 2. Au bloc 14, **c’est ce cadre que vous allez réunir dans un seul composant**.

## Les trois fichiers du panneau

| Fichier dans `src/components/` | Son rôle après le bloc |
| --- | --- |
| `Panel.tsx` · à créer | Afficher une section avec la classe reçue, puis son titre, puis le contenu reçu dans `children`. |
| `DungeonPicker.tsx` · déjà présent | Utiliser le cadre avec le titre « Catalogue de donjons » et la classe `dungeon-catalog`. Le champ de recherche et les cartes constituent son contenu. |
| `PreparationSummary.tsx` · déjà présent | Utiliser le cadre avec le titre « Préparation du départ » et la classe `preparation-summary`. L’équipe, les héros, la destination et le bouton d’effacement constituent son contenu. |

## Comment le titre et le contenu arrivent à l’écran

Dans le type `PanelProps`, `title: string` décrit le texte du titre, `className: string` la classe CSS de la section et `children: ReactNode` son contenu. Dans le cadre, `className={props.className}` applique la classe à la `section`, `<h2>{props.title}</h2>` affiche le titre, puis `{props.children}` affiche les enfants directement sous ce titre. C’est le même trajet que pour les mots placés entre les balises de `DownloadLink` dans le [cours sur la composition](notions-14.md).

Dans `Panel.tsx`, le mot `export` devant `function Panel` rend ce nom disponible. Les deux autres fichiers écrivent `import { Panel } from './Panel'`. Les accolades reprennent le nom exporté. `./` indique que le fichier est dans le même dossier.

La balise `<Panel title="Catalogue de donjons" className="dungeon-catalog">` ouvre le cadre du catalogue. Le champ, la liste et les boutons se placent entre cette ouverture et `</Panel>`. L’ancienne ouverture de section, son `h2` et sa fermeture sont désormais fournis par `Panel`. À l’écran, chaque panneau a **un seul titre** et garde sa classe CSS.

## Où reste l’action du bouton ?

**Suivez un clic.** Quand vous cliquez sur « Effacer le choix », le bouton appartient toujours au récapitulatif. Il appelle la fonction reçue d’`App`. Si vous aviez choisi la Crypte, puis recherché `dragon`, le choix s’efface et le champ affiche encore `dragon`. Si votre catalogue possède des boutons de tri ou de filtre, ils accompagnent les cartes dans le contenu du catalogue.

Le cadre se charge du titre commun. Le compteur « Résultats » appartient au catalogue et reste dans `DungeonPicker.tsx`. Retrouvez ces deux endroits dans les [exercices du bloc 14](exercices-14.md).
