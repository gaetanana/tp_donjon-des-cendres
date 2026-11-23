# Bloc 05 · Exercices essentiels

Travaillez dans `src/App.tsx` depuis le bloc 04 terminé, avec le CSS copié et importé selon le cours. Les trois objets et `HeroCard` restent en place. Aucun tableau, déplacement de fichier ou nouvelle dépendance n’est demandé.

<a id="exercice-1"></a>
## Exercice 1 · Mémoriser le choix

1. Ajoutez l’import nommé `useState` depuis `react` en haut de `App.tsx`.
2. À côté des types existants, déclarez `HeroChoice`, union des trois textes exacts `'warrior'`, `'mage'` et `'priest'`.
3. Dans `App`, avant son `return`, créez le couple `selectedChoice` / `setSelectedChoice` avec `useState<HeroChoice>`. La valeur initiale est `'warrior'`. N’ajoutez aucun état dans `HeroCard`.
4. Au même niveau dans `App`, déclarez trois fonctions sans paramètre : `handleSelectWarrior`, `handleSelectMage`, `handleSelectPriest`. Chacune appelle le setter avec la valeur de choix correspondante. Elles ne renvoient pas de JSX.
5. Avant les fiches, placez un `div` de classe `hero-selector` contenant trois `button` de type `button`. Leurs libellés sont « Consulter Aldric », « Consulter Maëlys », « Consulter Soline ». Reliez chaque `onClick` à son gestionnaire, sans l’appeler pendant le rendu.
6. Ajoutez à chaque bouton `aria-pressed` avec la comparaison de `selectedChoice` et de sa valeur de choix.

**Point de passage.** Aldric est actif au chargement. Cliquer Maëlys, puis Soline, change le bouton encadré ; un seul bouton porte l’état actif. À ce stade, les trois fiches peuvent encore être visibles. Gardez une seule variable d’état pour la sélection.

<a id="exercice-2"></a>
## Exercice 2 · Consulter une seule fiche

1. Après les trois objets et avant le `return` de `App`, calculez `selectedHero`. Deux ternaires successifs choisissent `warrior` pour `'warrior'`, `mage` pour `'mage'`, `priest` pour le dernier cas. Inspirez-vous du choix de boîte expliqué dans le cours. Ce résultat est une constante dérivée, pas un état supplémentaire.
2. Après les boutons, ajoutez un paragraphe de classe `hero-selection-summary` : « Héros consulté : » suivi du nom de `selectedHero` par une expression JSX.
3. Remplacez les trois utilisations de `HeroCard` par **une seule**, à laquelle vous transmettez `selectedHero` dans la prop `hero`. Ne changez pas `HeroCardProps` et ne recopiez pas la structure de la fiche.
4. Conservez le refuge, son image, l’accueil et le paragraphe « En première ligne » fondé sur `warrior.name`. Le choix ne modifie aucun objet, statistique ou statut.

**Résultat observable.** Au chargement, un seul bouton actif, le résumé Aldric et sa fiche. Un clic sur Maëlys change le résumé, le bouton actif et la fiche vers le mage. La sélection reste unique, même après plusieurs clics sur le même bouton.

## Exercice 3 · Vérifier et conserver l’essentiel

Effectuez les essais suivants dans l’ordre. Un rechargement signifie ici le bouton Actualiser du navigateur, pas seulement enregistrer le fichier.

| Essai | Action | Résultat attendu |
| --- | --- | --- |
| A | Recharger la page | Aldric sélectionné, une fiche, Guerrier, 100 / 100, manque 0, Disponible |
| B | Cliquer Maëlys puis recliquer Maëlys | Maëlys seule consultée, Mage, 60 / 60, puissance 14 ; un seul bouton actif, aucune désélection |
| C | Cliquer Soline puis Aldric | Soline : Prêtre, 80 / 80, puissance 10 ; puis retour à Aldric ; « En première ligne : Aldric » toujours présent |
| D | Cliquer Maëlys puis recharger | Le choix revient à Aldric : aucune persistance n’est programmée |
| E | Dans le source, mettre temporairement la vie du mage à 0, enregistrer, puis cliquer Maëlys | Fiche Maëlys consultable : 0 / 60, manque 60, Hors combat et un avertissement ; cliquer Aldric affiche Disponible sans avertissement |
| F | Rétablir la vie du mage à 60, enregistrer puis recharger | Aldric sélectionné ; Maëlys redevient Disponible après clic |

Pendant B, vérifiez en fenêtre large puis à environ 320 px : les trois commandes, le résumé et les statistiques restent lisibles, sans débordement horizontal. Les boutons doivent rester visibles après le changement de fiche. Au clavier, Tab atteint les boutons, l’indicateur de focus est visible, Entrée ou Espace active le bouton atteint. Faites défiler la page si nécessaire.

Dans chaque sélection, les sept couples de statistiques du bloc 04 restent présents. Aucune erreur ne doit apparaître ; une page vide peut signaler une erreur de syntaxe, à lire et corriger. Ne changez ni les types ni les données pour contourner une erreur.

Lancez `npm run build` à la racine du projet dans un autre terminal, ou après Ctrl+C. La compilation doit réussir sans `any`. Gardez une définition de `HeroCard`, une utilisation, les trois objets aux vies maximales, et un seul état de sélection. Arrêtez le serveur. Vous pouvez reformater le fichier avec Code → Reformater le code (Ctrl+Alt+L sous WebStorm Windows).
