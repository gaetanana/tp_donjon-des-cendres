# Bloc 14 · Un même cadre pour deux panneaux

Après les [notions de composition](notions-14.md) et leur [application aux panneaux du refuge](cours-14.md), ouvrez votre projet de fin du bloc 13. Le catalogue et le récapitulatif ont chacun une section, un titre et un contenu. Vous allez écrire le cadre une seule fois dans `Panel.tsx`. Le catalogue fournira toujours la recherche et les cartes. Le récapitulatif fournira toujours l’équipe et le donjon choisi.

## 1. Créer le cadre dans Panel.tsx

Dans « Du composant au lien affiché » du [cours de notion](notions-14.md), `DownloadLink` reçoit le contenu de la page dans `props.children`. Reprenez ce principe avec le titre et la classe du cadre décrits dans « Comment le titre et le contenu arrivent à l’écran » du [cours sur le refuge](cours-14.md). Dans votre jeu, créez **`src/components/Panel.tsx`**. Les trois informations reçues sont les suivantes.

| Prop | Type à écrire | Utilisation dans le cadre |
| --- | --- | --- |
| `title` | `string` | Le texte du titre de niveau 2. |
| `className` | `string` | Le nom de la classe CSS de la section. |
| `children` | `ReactNode` | Le contenu placé entre les deux balises `Panel` par le composant qui l’utilise. |

1. En haut du fichier, importez le **type** `ReactNode` depuis `react`, comme à la première ligne d’import de l’exemple `DownloadLink`.
2. Déclarez le type `PanelProps` avec les trois propriétés du tableau. Créez la fonction `Panel(props: PanelProps)` et ajoutez `export` devant `function`. Les autres fichiers pourront ainsi importer le nom `Panel` entre accolades.
3. Dans son `return`, placez une balise `section` dont l’attribut `className` lit `props.className`. Dans la section, affichez d’abord un `h2` qui lit `props.title`, puis `{props.children}` sous le titre. Écrivez `{props.children}` directement dans la section. Un `div` supplémentaire changerait l’organisation des balises.
4. Enregistrez. À cette étape, le refuge affiche encore ses deux panneaux d’origine. Le nouveau fichier sera utilisé dès l’étape suivante.

## 2. Utiliser le cadre dans le catalogue

Ouvrez **`src/components/DungeonPicker.tsx`**. C’est le fichier qui contient la recherche, les destinations et leurs boutons.

1. En haut, ajoutez `import { Panel } from './Panel'`. Le point indique que les deux composants se trouvent dans le même dossier.
2. Dans le `return`, repérez les deux lignes qui ouvrent `<section className="dungeon-catalog">` et affichent `<h2>Catalogue de donjons</h2>`. Remplacez **ces deux lignes** par `<Panel title="Catalogue de donjons" className="dungeon-catalog">`. Le titre est maintenant transmis au cadre, qui l’affiche lui-même dans son `h2`.
3. À la fin du même `return`, remplacez **le `</section>` qui fermait le catalogue** par `</Panel>`. Tout ce qui était entre le titre et cette fermeture reste à sa place. Cela comprend le champ de recherche, le compteur de résultats, la liste et ses boutons. Les anciens boutons de filtre ou de tri et le message de destination masquée restent aussi à l’intérieur si vous les avez réalisés.
4. Enregistrez et regardez le catalogue. Le titre « Catalogue de donjons » apparaît une seule fois. La recherche et les boutons de choix gardent leur apparence.

## 3. Réutiliser Panel dans le récapitulatif

Ouvrez **`src/components/PreparationSummary.tsx`**. Appliquez le même geste à ce fichier.

1. Ajoutez le même import nommé de `Panel` depuis `./Panel`, en gardant les imports de types du bloc 13.
2. Repérez la section `preparation-summary` et son titre « Préparation du départ ». Remplacez la balise ouvrante et son `h2` par une ouverture de `Panel`. Fournissez ce titre avec la prop `title` et la classe `preparation-summary` avec la prop `className`. Remplacez la fermeture de cette section par `</Panel>`.
3. Laissez entre les balises le nom d’équipe, la liste des héros, l’affichage conditionnel du donjon et le bouton « Effacer le choix ». Dans ce second panneau, ce sont ces éléments qui deviennent `children`.

Le projet utilise maintenant **un fichier créé et deux fichiers modifiés**. Dans `App.tsx`, `DungeonPicker` et `PreparationSummary` sont déjà appelés dans le bon ordre. Les feuilles de style existantes ciblent toujours `.dungeon-catalog` et `.preparation-summary`.

## 4. Lire le résultat dans le refuge

Ouvrez le refuge. Si le serveur est fermé, lancez `npm run dev` dans le dossier contenant `package.json`, puis ouvrez l’adresse locale affichée.

| Geste sur votre projet | Ce que vous devez observer |
| --- | --- |
| Repérez les deux panneaux l’un sous l’autre. | Un titre « Catalogue de donjons », puis un titre « Préparation du départ ». Le champ appartient au catalogue et le bouton « Effacer le choix » au récapitulatif. |
| Choisissez la Crypte, puis recherchez `dragon`. | Le catalogue affiche zéro résultat. La Crypte figure encore dans le récapitulatif. Si le message de destination masquée faisait partie de votre projet, il apparaît au catalogue. |
| Renommez Maëlys en Liora, puis utilisez « Effacer le choix ». | Le récapitulatif affiche Liora parmi les héros et « Aucun donjon sélectionné. ». Le champ de recherche contient encore `dragon`. |
| Videz la recherche et essayez un ajout que vous possédiez, par exemple le tri décroissant ou le compteur du nom d’équipe. | Les cartes réapparaissent selon vos filtres actifs et l’ajout garde son fonctionnement. |

Dans le terminal du projet, lancez `npm run build` pour faire vérifier les nouveaux imports par TypeScript. Enfin, retrouvez dans vos fichiers **la ligne commune qui affiche le titre**, puis **la ligne propre au catalogue qui affiche le nombre de résultats**. Cette distinction permet de savoir immédiatement où intervenir quand seul un panneau doit changer.


**Suite du parcours.** Poursuivez avec ce même refuge au bloc 16, première séance du module 3. Dans cet ancien support, « fin du bloc 15 » ou « essentiel 15 » désigne votre projet actuel de fin du bloc 14 de M2.2. Gardez aussi vos anciens bonus. Si vous avez rangé `Monster` dans `src/types.ts`, laissez-le à cet endroit : `CombatMonster` décrira un autre objet pendant la rencontre.
