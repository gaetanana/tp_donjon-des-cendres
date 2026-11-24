# Bloc 11 · Exercices · Rechercher et choisir un donjon

Après le [cours](cours-11.md), vous allez ajouter le catalogue directement dans votre refuge. Vous conservez **le même projet** pendant tous les exercices et pour le bloc suivant.

Votre point de départ est la fin du bloc 10 de M2.1 : les héros et le bestiaire sont visibles ; le formulaire d'équipe accepte un nom de 1 à 24 caractères après nettoyage et refuse une saisie vide. Aucun exemple de livres du cours n'est à ajouter dans le projet.

Ouvrez ce projet dans votre éditeur. Depuis le terminal du dossier qui contient `package.json`, lancez :

```sh
# Démarrer le projet actuel pour voir les changements enregistrés.
npm run dev
```

Ouvrez l'adresse indiquée par le terminal. Toutes les modifications suivantes se font dans `src/App.tsx`, sauf la feuille de style fournie. Gardez les noms indiqués pour les nouvelles variables et fonctions : ils permettront de les retrouver dans les prochains blocs. Ce sont des noms choisis pour le projet, pas des mots spéciaux de React.

## 1 · Installer le catalogue et son champ de recherche

**Ce que vous préparez :** un nouveau panneau après le bestiaire, contenant le titre « Catalogue de donjons » et un champ dans lequel vous pouvez écrire. Les donjons apparaîtront à l'exercice suivant.

**Pour vous aider :** relisez les sections 1, 2 et 9 du [cours](cours-11.md) : objets du catalogue, champ contrôlé et correspondance entre les noms de l'exemple et ceux du refuge.

### Ajouter les ressources

1. Copiez le fichier [dungeon-catalog.css](../src/styles/dungeon-catalog.css) dans le dossier `src` de votre projet. Cette feuille fournit l'apparence du panneau ; vous n'avez pas de CSS à inventer.
2. Dans `src/App.tsx`, juste après les imports des autres feuilles de style, ajoutez :

   ```tsx
   // Charger l'apparence du catalogue fourni avec ce bloc.
   import './dungeon-catalog.css'
   ```

3. Ouvrez [les données du catalogue](ressources/catalogue.md). Copiez son type `Dungeon` et son tableau `dungeons` dans `src/App.tsx`, **après les imports et avant le premier type déjà présent**. Ils sont ainsi en dehors de la fonction `App`. Gardez les données fournies : Forge, Cave et Crypte.

### Relier la saisie à React

4. Dans la fonction `App`, près des autres déclarations `useState`, ajoutez un état texte nommé `dungeonQuery`, avec sa fonction de mise à jour `setDungeonQuery`. Sa valeur initiale est la chaîne vide `''` : personne n'a encore lancé de recherche.
5. Toujours dans `App`, après la fonction `submitTeamName` et avant le `return` principal, créez le gestionnaire `changeDungeonQuery`. Il reçoit un événement de saisie du type `ChangeEvent<HTMLInputElement>` et transmet le texte du champ à `setDungeonQuery`. Adaptez le modèle `changeQuery` de la section 2 du cours. L'import de `ChangeEvent` existe déjà en haut de votre fichier.
6. Dans le JSX retourné par `App`, repérez la section dont le titre est « Bestiaire ». **Après sa balise de fermeture, mais avant la fermeture de `main`**, ajoutez une section de classe `dungeon-catalog`. Elle contient un titre `h2` « Catalogue de donjons » et un `div` de classe `catalog-search`.
7. Dans ce `div`, ajoutez un libellé « Rechercher un donjon », puis un champ `type="search"`. Donnez au champ l'identifiant `dungeon-query` et au libellé un `htmlFor` de même valeur. Reliez `value` à `dungeonQuery` et `onChange` à `changeDungeonQuery`, comme dans le cours. Ce champ reste dans le catalogue, **en dehors du formulaire de nom d'équipe**.

**Vérifiez :** cliquer sur le libellé place le curseur dans le champ. Vous pouvez écrire et effacer du texte. Le panneau se trouve sous le bestiaire ; les héros et le nom d'équipe restent présents. Le champ ne filtre encore rien : c'est l'objet de l'exercice 2.

## 2 · Afficher les destinations qui correspondent à la recherche

**Résultat attendu :** sans recherche, le catalogue montre la Cave, la Crypte puis la Forge, du niveau conseillé le plus faible au plus élevé. Avec une recherche, seules les destinations correspondantes restent visibles.

**Pour vous aider :** sections 3 à 6 du [cours](cours-11.md), de la préparation du texte à l'affichage des résultats.

### Calculer les résultats

Dans `App`, **après vos gestionnaires et juste avant le `return` principal** qui affiche le refuge, ajoutez les trois calculs ci-dessous, dans cet ordre. Il s'agit de constantes calculées au rendu, pas de nouveaux états.

| Nom à créer | Travail demandé | Modèle dans le cours |
| --- | --- | --- |
| `normalizedQuery` | Préparer une copie du texte de `dungeonQuery` : retirer les espaces aux extrémités, puis passer en minuscules. | `normalizedQuery`, section 3. |
| `matchingDungeons` | Parcourir `dungeons` avec `filter`. Pour chaque `dungeon`, garder l'objet si son `name` en minuscules contient `normalizedQuery`. | `matchingBooks`, section 4. |
| `visibleDungeons` | Copier le tableau `matchingDungeons` avec `slice()`, puis trier cette copie par `recommendedLevel` croissant avec `sort`. | `visibleBooks`, section 5 ; remplacer le nombre de pages par le niveau conseillé. |

Le contenu du champ doit rester exactement celui que vous saisissez. Préparer `normalizedQuery` ne demande donc pas de modifier l'état `dungeonQuery`.

### Construire l'affichage

Dans la section « Catalogue de donjons », **après le `div` qui contient le champ** et avant la fin de la section :

1. Ajoutez un paragraphe `role="status"` contenant « Résultats : » suivi de la longueur de `visibleDungeons`. Le rôle décrit le compteur aux technologies d'assistance ; la valeur affichée vient de votre calcul.
2. Si cette longueur vaut zéro, affichez le message « Aucun donjon ne correspond à la recherche. ». Reprenez le rendu conditionnel avec `&&` de la section 6 du cours.
3. Ajoutez une liste `ul` de classe `dungeon-list`. Utilisez `visibleDungeons.map(...)` pour produire un `li` par donjon. Sa clé React `key` doit être l'`id` de ce donjon, qui reste stable lorsque la liste est filtrée ou triée.
4. Dans chaque `li`, affichez le nom dans un `h3`, puis un paragraphe « Niveau conseillé : … · Difficulté : … » utilisant les propriétés `recommendedLevel` et `difficulty`.
5. Ajoutez dans cette même ligne un bouton `type="button"` dont le texte est « Choisir » suivi du nom du donjon. **Il n'a pas encore de gestionnaire de clic** : vous le rendrez actif dans l'exercice 3.

**Vérifiez :**

| Texte saisi dans le champ | Compteur et destinations visibles |
| --- | --- |
| Champ vide | 3 : Cave des cendres (1), Crypte silencieuse (2), Forge des braises (3). |
| Deux espaces, `CRYPTE`, deux espaces | 1 : Crypte silencieuse. Les espaces et majuscules restent dans le champ. |
| `dragon` | 0 et le message d'absence de résultat. |
| Champ de nouveau vide | Les trois destinations, dans l'ordre Cave, Crypte, Forge. |

## 3 · Mémoriser le choix et afficher son résumé

**Résultat attendu :** vous choisissez un donjon avec son bouton. Son résumé reste affiché même si vous changez la recherche et que ce donjon disparaît de la liste visible.

**Pour vous aider :** sections 6 à 8 du [cours](cours-11.md), du clic au résumé conservé.

1. Dans `App`, près de l'état de recherche, créez l'état texte `selectedDungeonId` et sa fonction `setSelectedDungeonId`. La valeur initiale est `''`, donc aucun donjon n'est encore choisi.
2. Revenez au bouton de chaque ligne du catalogue. Ajoutez un `onClick` qui fournit une fonction fléchée : **au clic**, elle transmet l'identifiant du donjon de la ligne à `setSelectedDungeonId`. Reprenez le bouton des livres, en utilisant les noms du refuge.
3. Sur ce même bouton, ajoutez `aria-pressed`. Sa valeur est le résultat de la comparaison entre `selectedDungeonId` et l'`id` du donjon de la ligne. Ce booléen indique si ce bouton correspond au choix actuel ; il n'effectue pas le choix lui-même.
4. Après les trois calculs de l'exercice 2, toujours avant le `return` principal, créez `selectedDungeon`. Retrouvez avec `find` le donjon dont l'`id` égale `selectedDungeonId`. Parcourez **`dungeons`, le catalogue complet**, et non `visibleDungeons` : un donjon choisi doit rester retrouvable lorsqu'une recherche le masque.
5. Dans la section du catalogue, **après la liste `ul`**, ajoutez un `div` de classe `dungeon-summary`. Dans ce `div`, utilisez le ternaire de la section 7 du cours :
   - Si `selectedDungeon` existe, affichez un `div` contenant un `h3` « Donjon choisi : … » avec son nom, un paragraphe avec sa description, puis un paragraphe « Niveau conseillé : … » avec son niveau. Ce `div` regroupe les trois éléments dans la branche du ternaire.
   - Sinon, affichez un paragraphe « Aucun donjon sélectionné. ».

**Vérifiez :** choisissez la Crypte, puis cherchez `cave`. La liste propose seulement la Cave ; le résumé indique toujours la Crypte. Cherchez ensuite `dragon` : la liste est vide, mais le résumé de la Crypte reste présent. Vous choisissez une destination ; aucun combat ne démarre dans ce bloc.

## 4 · Vérifier le catalogue dans le refuge 🔎

Les trois exercices précédents construisent le résultat du bloc. Utilisez maintenant l'application normalement pour vérifier les éléments suivants. Aucune modification volontairement incorrecte du code n'est demandée.

| Action | Ce que vous devez obtenir |
| --- | --- |
| Actualiser la page. | Recherche vide, trois destinations Cave/Crypte/Forge et « Aucun donjon sélectionné. ». |
| Choisir la Forge, puis chercher `  CRYPTE  `. | Une Crypte visible ; le résumé conserve la Forge et son niveau 3. |
| Chercher `dragon`, puis effacer la recherche. | Zéro résultat puis trois résultats ; la Forge reste choisie. |
| Utiliser Tab pour atteindre « Choisir Cave des cendres », puis Entrée. | Le résumé affiche la Cave, niveau 1. Le bouton atteint au clavier possède un contour visible. |
| Consulter Maëlys puis enregistrer l'équipe « Aube ». | Maëlys reste consultée : Mage, 60 / 60 PV, score 7. Le nom enregistré devient Aube. |
| Effacer le nom d'équipe et envoyer le formulaire. | Le refus du bloc 10 reste visible et Aube reste le nom enregistré. Le choix du donjon est conservé. |
| Réduire la largeur de la fenêtre du navigateur. | Champ, noms, messages et boutons restent lisibles ; le catalogue ne dépasse pas horizontalement la page. |

Dans le terminal du projet, vérifiez aussi la compilation :

```sh
# Vérifier les types et produire les fichiers de l'application.
npm run build
```

Si une commande signale une erreur, lisez le fichier et la ligne indiqués avant de poursuivre. Gardez ce projet pour le bloc 12 : recherche, tri et sélection y seront réutilisés. Dans le code, les deux états du catalogue commencent toujours avec `''` ; les choix effectués dans le navigateur ne changent pas ces valeurs de départ.
