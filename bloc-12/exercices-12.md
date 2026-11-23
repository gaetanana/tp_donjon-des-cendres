# Bloc 12 · Renommer le héros consulté

Partez de votre projet à la fin du bloc 11 : héros, formulaire d’équipe validé, bestiaire, recherche et choix de destination fonctionnent. Lisez d’abord le [cours](cours-12.md). Vous gardez ce projet tout au long des trois exercices ; aucun composant d’exemple n’est à ajouter.

Dans le terminal du projet, si l’application n’est pas déjà lancée :

```sh
# Démarrer l’application et ouvrir l’adresse indiquée par le terminal.
npm run dev
```

Toutes les modifications se font dans `src/App.tsx`, sauf la feuille fournie. Les noms indiqués sont choisis pour le projet et conservés pour la suite.

## 1 · Faire lire les données courantes à tous les affichages

**Résultat attendu :** le refuge a la même apparence et les mêmes valeurs, mais ses héros proviennent maintenant d’un état React. Le formulaire de renommage sera ajouté à l’exercice 2.

**Pour vous aider :** cours, sections 1–2 et 8 (tableau initial, état, recherche et noms du refuge).

### Installer les données initiales hors de `App`

Dans `App`, repérez les trois déclarations d’objets `warrior`, `mage`, `priest`, puis le tableau `const heroes: Hero[] = [warrior, mage, priest]`.

1. Juste **avant** `export default function App()`, créez le tableau `initialHeroes`, typé `Hero[]`.
2. Placez-y les trois objets existants, dans l’ordre guerrier, mage, prêtre. Pour chaque objet, déplacez son contenu entre accolades dans le tableau, sans sa déclaration `const warrior: Hero =`, `const mage: Hero =` ou `const priest: Hero =`. Séparez les objets par des virgules, comme les livres de la section 1. Conservez toutes les propriétés et leurs valeurs, y compris les appels `getMaxHealth(...)`.
3. Retirez de `App` les trois anciennes déclarations devenues vides et l’ancien tableau `heroes`. Le type `Hero`, les fonctions de calcul, les composants et les monstres restent en place. Il ne doit plus y avoir de lecture des anciens noms de variables `warrior`, `mage` ou `priest` ; les chaînes d’identifiant `'warrior'`, `'mage'`, `'priest'`, elles, sont conservées.
4. Dans `App`, **avant** l’état `selectedChoice`, ajoutez l’état `heroes` et sa fonction `setHeroes`, avec `useState<Hero[]>(initialHeroes)` (cours §1). Il ne doit exister qu’une déclaration de `heroes` dans `App`.

Vous pouvez effectuer ces modifications avant de consulter le résultat : les anciennes lectures sont adaptées dans les deux étapes suivantes.

### Remplacer les lectures des anciens objets

5. Dans `App`, remplacez tout l’ancien calcul de `selectedHero` avec ses deux ternaires. Retrouvez maintenant le héros courant par `heroes.find(...)` : son `id` doit correspondre à `selectedChoice`. Ajoutez le repli `?? heroes[0]` (cours §2). Ce calcul reste avant les gestionnaires et le `return` principal.
6. Dans le JSX, remplacez `warrior.name` de la ligne « En première ligne » par `heroes[0].name`. Les héros ne seront ni retirés ni réordonnés : le premier reste le guerrier.
7. Gardez le `heroes.map(...)` des boutons, `selectedHero.name` du résumé et `<HeroCard hero={selectedHero} />`. Ces trois lectures utilisent désormais le tableau courant, sans autre remplacement. Ne changez pas le calcul des statistiques dans `HeroCard`.

**Vérifiez :** les boutons permettent toujours de consulter Aldric (Guerrier, 100 / 100 PV, score 25), Maëlys (Mage, 60 / 60 PV, score 7) et Soline (Prêtre, 80 / 80 PV, score 9). « En première ligne » affiche Aldric quel que soit le héros consulté. Équipe, bestiaire et catalogue restent présents. `setHeroes` sera utilisé dans le prochain exercice.

## 2 · Ajouter le formulaire de renommage

**Résultat attendu :** le héros consulté au moment de l’envoi reçoit le nouveau nom nettoyé. Un nom vide ou de plus de 24 caractères est refusé. Un renommage ne rétablit jamais les anciens noms des autres héros.

**Pour vous aider :** cours §3 pour `map` et la copie d’objet, §4–7 pour la saisie, l’envoi et les identifiants ; §8 pour tous les noms à adapter.

### Ressource et états

1. Copiez [hero-rename.css](ressources/hero-rename.css) dans `src`. Importez `./hero-rename.css` après les autres feuilles de `App.tsx`, selon le modèle du cours §8.
2. Dans `App`, près des états d’équipe, ajoutez `draftHeroName` / `setDraftHeroName` et `heroError` / `setHeroError`, tous deux initialisés à `''`. Le brouillon démarre vide, même quand un héros est consulté. Gardez séparément tous les états existants, notamment `draftName`, `teamName`, `teamError` et ceux du catalogue.

### Gestionnaires

3. **Après** la fonction `submitTeamName`, avant `changeDungeonQuery`, ajoutez `changeHeroName`. Comme `changeTitle` du cours §4, cette fonction reçoit un `ChangeEvent<HTMLInputElement>`, transmet le texte du champ à `setDraftHeroName`, puis efface `heroError`. Les imports de types existent déjà.
4. À la suite, ajoutez `submitHeroName`, qui reçoit un `SubmitEvent<HTMLFormElement>`. Reprenez le déroulement de `submitTitle` du cours §5 :
   - empêcher le rechargement ;
   - calculer `cleanName` avec `trim()` sur `draftHeroName` ;
   - si la longueur nettoyée est nulle, afficher « Saisissez un nom de héros. » dans `heroError`, puis arrêter ce gestionnaire ;
   - si elle dépasse 24, afficher « Utilisez au plus 24 caractères. », puis arrêter ;
   - sinon, appeler `setHeroes` avec une fonction recevant `currentHeroes`. Renvoyer le résultat de `currentHeroes.map(...)`. À chaque passage, si `hero.id` correspond à `selectedHero.id`, renvoyer un nouvel objet copiant `hero` puis remplaçant uniquement `name` par `cleanName`. Sinon, renvoyer `hero` inchangé ;
   - après cette mise à jour, effacer l’erreur et vider le brouillon.

La fonction reçue par `setHeroes` ne doit contenir que le calcul du nouveau tableau. Ne repartez pas de `initialHeroes`, ne modifiez pas directement un objet, et ne changez ni identifiant, ni classe, ni caractéristique. Le formulaire d’équipe continue à utiliser son propre gestionnaire.

### Formulaire et relations entre les éléments

5. Dans la section « Avant le départ », **juste après** `<HeroCard hero={selectedHero} />` et avant la fermeture de cette section, ajoutez un formulaire de classe `hero-rename`. Il est séparé du formulaire d’équipe, jamais imbriqué dedans. Reliez son `onSubmit` à `submitHeroName`.
6. Adaptez le formulaire du cours §6 avec les correspondances suivantes :

| Élément | Valeur attendue |
| --- | --- |
| Texte du libellé | « Nouveau nom du héros consulté ». |
| `htmlFor` du libellé et `id` du champ | `hero-name`. |
| Type du champ | `text`. |
| `value` et `onChange` | `draftHeroName` et `changeHeroName`. |
| Paragraphe d’aide toujours présent | `id="hero-help"`, texte « De 1 à 24 caractères après retrait des espaces aux extrémités. ». |
| Paragraphe d’erreur conditionnel | `id="hero-error"`, `role="alert"`, texte contenu dans `heroError`. |
| `aria-invalid` | Booléen obtenu en comparant `heroError` à `''`. |
| `aria-describedby` | `'hero-help hero-error'` si l’erreur est non vide, sinon `'hero-help'`. |
| Bouton | `type="submit"`, texte « Renommer le héros ». |

N’ajoutez ni `required` ni `maxLength` : le gestionnaire contrôle lui-même le nom nettoyé. Les identifiants sont des chaînes choisies ; la variable `heroError` contient le message. L’erreur doit apparaître uniquement lorsqu’il y a un message.

7. Gardez les gestionnaires de clic des boutons « Consulter » tels quels : ils changent seulement `selectedChoice`. Changer de héros **conserve le brouillon**. À l’envoi, c’est le héros alors consulté qui sera renommé.

**Premier contrôle :** consultez Maëlys, saisissez «  Liora  » puis envoyez. Le bouton, le résumé « Héros consulté » et la fiche indiquent Liora, sans les espaces extérieurs. La classe reste Mage, les PV 60 / 60 et le score 7. Le champ est vide, aucune erreur n’est affichée, Aldric et Soline gardent leurs noms.

## 3 · Vérifier les renommages et les fonctions conservées 🔎

Utilisez le refuge normalement ; aucune panne à introduire dans le code. Pour commencer la séquence avec les valeurs connues, actualisez la page : cela remet les **états en mémoire** à leurs valeurs initiales, sans changer vos fichiers.

| Action, dans cet ordre | Résultat attendu |
| --- | --- |
| Enregistrer l’équipe Aube, choisir la Crypte, puis rechercher `dragon`. | Aube reste affiché ; zéro résultat dans le catalogue ; le résumé garde la Crypte. |
| Consulter Maëlys, saisir `  Liora  ` puis envoyer. | Bouton, résumé et fiche : Liora, Mage, 60 / 60, score 7. Brouillon vide. |
| Consulter Aldric, le renommer Roran. | Bouton, résumé, fiche et « En première ligne » : Roran. Guerrier, 100 / 100, score 25. Liora reste renommée. |
| Envoyer le champ de héros vide, puis essayer trois espaces. | « Saisissez un nom de héros. » ; aucun nom enregistré ne change. À la nouvelle saisie, l’ancienne erreur disparaît ; à l’envoi des espaces, elle réapparaît. |
| Saisir `abcdefghijklmnopqrstuvwxy` (25 lettres) puis envoyer. | Refus « Utilisez au plus 24 caractères. » ; texte conservé dans le champ, Roran et Liora inchangés. |
| Retirer le `y` final (il reste 24 lettres), ajouter deux espaces à chaque extrémité puis envoyer. | L’erreur disparaît dès la frappe ; nom de 24 lettres accepté après nettoyage. Brouillon vide. |
| Toujours sur le guerrier, saisir Horizon, **consulter Soline avant d’envoyer**, puis envoyer. | Le brouillon Horizon reste lors du changement de héros ; seule Soline devient Horizon : Prêtre, 80 / 80, score 9. Le guerrier garde son nom de 24 lettres et Liora le sien. |
| Reconsulter les trois héros. | Les trois renommages restent présents ; toutes les caractéristiques d’origine restent identiques. La première ligne affiche toujours le guerrier. |
| Vérifier équipe, bestiaire et catalogue. | Aube conservé ; Rat 20 PV et Sentinelle 45 PV ; recherche `dragon` conservée, résumé Crypte conservé. |
| Envoyer un nom d’équipe vide, puis corriger en Aube. | La validation d’équipe fonctionne encore, sans modifier les noms des héros ni la destination. |
| Effacer la recherche, choisir la Cave. | Cave/Crypte/Forge réapparaissent dans l’ordre des niveaux ; résumé Cave, niveau 1. |
| Cliquer le libellé du nom de héros ; saisir Veille ; avec Tab atteindre « Renommer le héros », puis Entrée. | Focus dans le bon champ, contour visible au clavier, nom Veille enregistré pour le héros consulté. |
| Réduire la largeur du navigateur. | Champ, aide, erreur et bouton lisibles, sans dépassement horizontal du formulaire. |

Dans le terminal du projet :

```sh
# Vérifier les types et la compilation de l’ensemble du refuge.
npm run build
```

Gardez votre projet. Les noms enregistrés restent présents tant que la page n’est pas rechargée ; après actualisation, Aldric, Maëlys et Soline reviennent, comme l’équipe initiale et le catalogue sans choix. Une persistance après actualisation n’est pas demandée ici.
