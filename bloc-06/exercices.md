# Bloc 06 · Exercices essentiels

Gardez le [cours](cours.md) et les [références](ressources/formules.md) à disposition. Travaillez uniquement dans `src/App.tsx`, depuis votre application essentielle du bloc 05. Aucun bonus requis.

## Exercice 1 · Deux fonctions numériques

1. Après les types et avant `HeroCard`, déclarez `getMaxHealth` avec le paramètre et le retour indiqués dans les références. Traduisez la formule avec un `return`.
2. Au même endroit, écrivez `getMissingHealth`, avec ses deux paramètres dans l’ordre fourni. Renvoyez la soustraction demandée.
3. Dans les objets `warrior`, `mage`, `priest` de `App`, remplacez seulement les valeurs de `maxHealth` par des appels à `getMaxHealth` avec 10, 6 et 8 respectivement. Gardez les vies et constitutions d’origine.
4. Dans le `dd` de « Vie manquante » de `HeroCard`, remplacez la soustraction directe par l’appel à `getMissingHealth`. Transmettez la vie puis le maximum du héros reçu dans les props.
5. Enregistrez, consultez les trois fiches : elles doivent toujours donner 100/100, 60/60 et 80/80, avec manque 0. Lancez `npm run build` dans un second terminal, à la racine du projet.

Point de passage : montrez un appel de fonction dans un objet et un appel dans le JSX. Expliquez oralement à votre formateur quels nombres arrivent dans chaque paramètre.

## Exercice 2 · Un calcul réutilisé par la fiche

1. Après les deux fonctions, avant `HeroCard`, écrivez `getAttackScore(hero: Hero): number`. Utilisez les propriétés du paramètre pour appliquer la formule fournie. Ne modifiez aucune propriété.
2. À la fin du `dl.hero-stats` existant de `HeroCard`, ajoutez un huitième couple : `dt` « Score d’attaque », puis `dd` affichant l’appel à `getAttackScore` avec le héros reçu dans les props.
3. Ne créez ni second composant ni nouvel état. Conservez le statut, l’avertissement conditionnel et les trois gestionnaires sans changement. Les paragraphes statut et avertissement restent enfants directs de l’article.
4. Consultez Aldric, Maëlys, Soline, puis Aldric de nouveau. Comparez les scores à 25, 7 et 9. Recliquez plusieurs fois Maëlys : force 3, score 7 et vie 60 doivent rester identiques.

Le score est un indicateur théorique, pas des dégâts infligés : il ne diminue la vie de personne. Faites défiler pour voir le bas de la fiche.

## Exercice 3 · Vérifier les calculs et la continuité

Réalisez ces contrôles dans l’ordre. Chaque modification temporaire doit être annulée avant la suivante.

| Essai | Manipulation | Résultat attendu |
| --- | --- | --- |
| A | Recharger, puis consulter les trois héros | Une fiche, huit couples, un seul bouton actif ; scores 25, 7, 9 ; vies et maximums inchangés |
| B | Modifier temporairement seulement `mage.health` à 17 ; enregistrer, consulter Maëlys | 17/60, manque 43, Disponible, score 7 ; restaurer la vie à 60 |
| C | Mettre seulement `mage.health` à 0 ; consulter Maëlys puis Aldric | Maëlys : manque 60, Hors combat, un avertissement ; Aldric : Disponible sans avertissement ; restaurer 60 |
| D | Mettre seulement `warrior.level` à 2 ; consulter Aldric, puis Maëlys | Scores 26 puis 7 ; niveau Aldric 2 ; restaurer niveau 1 |
| E | Dans `App`, après les objets et avant `selectedHero`, ajouter temporairement les appels console ci-dessous | Quatre lignes 0, 43, 25, 25 ; force Aldric toujours 12 ; retirer les lignes ensuite |
| F | Après restauration, sélectionner Maëlys puis recharger réellement | Retour Aldric 100/100, score 25 ; `npm run build` réussi |

Lignes temporaires pour E, utilisant le `console.log` rencontré au bloc 05 :

```ts
console.log(getMaxHealth(0))
console.log(getMissingHealth(17, 60))
console.log(getAttackScore(warrior))
console.log(getAttackScore(warrior))
```

Ouvrez la console des outils de développement du navigateur (F12, onglet Console). Effacez les messages, puis rechargez. React en mode développement peut refaire un rendu : le groupe de quatre lignes peut apparaître plusieurs fois ; les valeurs doivent rester identiques. Ne retirez pas le mode strict pour masquer des différences.

À 1366 × 768 puis en largeur 320 px, observez Maëlys et le bas de la fiche : intitulés et nombres lisibles, aucun chevauchement ni débordement horizontal. Le défilement vertical est permis. Testez Tab, Entrée et Espace sur les boutons ; le focus doit rester visible. Conservez l’accueil, l’image et le texte « En première ligne : Aldric ».

## État final

Trois fonctions de calcul hors composants, trois objets Hero sans modification de schéma, un état de sélection, une seule utilisation de HeroCard et huit couples de statistiques. Vies maximales et niveaux 1 restaurés, lignes console retirées. Aucun `any` ni mutation. Vous pouvez reformater le fichier dans WebStorm avec Ctrl+Alt+L avant le dernier build.
