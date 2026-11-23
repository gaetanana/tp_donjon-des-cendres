# Bloc 04 · Exercices essentiels

Partez du projet essentiel du bloc 03. Gardez l’accueil, les trois objets et l’unique fiche commune. Copiez et importez le CSS comme indiqué dans le cours. Toutes les modifications TypeScript se font dans `src/App.tsx`. Aucun bonus ni corrigé nécessaire.

<a id="exercice-1"></a>
## Exercice 1 · Calculer et nommer la disponibilité

1. Dans le type `Hero`, remplacez le type de `heroClass` par l’union des trois textes exacts `'Guerrier'`, `'Mage'` et `'Prêtre'`. Conservez les objets et leurs neuf propriétés.
2. Après le type `Hero`, déclarez `HeroStatus`, union de `'available'` et `'unavailable'`. Gardez `HeroCardProps` et les trois props existantes.
3. Dans `HeroCard`, avant le `return`, déclarez `isAvailable` de type `boolean` : sa valeur est le résultat de la comparaison de `props.hero.health` avec zéro (strictement supérieur).
4. Au même endroit, déclarez `status` de type `HeroStatus`. Utilisez `? :` pour choisir `'available'` si `isAvailable` est vrai, `'unavailable'` sinon.
5. Après le paragraphe « Classe », ajoutez un paragraphe qui affiche **Disponible** si `status === 'available'`, **Hors combat** sinon. Utilisez une expression JSX conditionnelle, sans recopier l’`article`.

**Point de passage.** Avec les valeurs finales du bloc 03, les trois fiches portent « Disponible ». Aucune nouvelle propriété `status` ou `isAvailable` n’est stockée dans les trois objets. Les props sont lues sans modification.

<a id="exercice-2"></a>
## Exercice 2 · Ajouter les repères visuels et l’avertissement

1. Le paragraphe de disponibilité reçoit un `className` conditionnel : `hero-status--available` pour le statut `'available'`, `hero-status--unavailable` sinon. Ces deux classes sont fournies par `hero-status.css` ; conservez les classes de l’`article` et des statistiques.
2. Immédiatement après ce paragraphe, affichez **« Ce héros ne peut pas agir. »** dans un autre paragraphe, seulement si `status === 'unavailable'`. Utilisez `&&` avec cette comparaison. Ce paragraphe porte la classe fixe `hero-warning`.
3. Gardez toujours la fiche entière et ses sept couples de statistiques visibles. Aucune attaque, sélection ou commande de soin à ajouter.

**Résultat observable.** Un héros à zéro vie reste visible, avec un libellé « Hors combat », un style distinct et la phrase d’avertissement. À vie positive, il affiche « Disponible » et aucun avertissement, même s’il est blessé.

<a id="exercice-3"></a>
## Exercice 3 · Vérifier les frontières et les types

Effectuez les essais dans l’ordre. Ne changez que la propriété indiquée, en enregistrant à chaque fois.

| Essai | Modification | Résultat attendu |
| --- | --- | --- |
| A | Valeurs initiales : vies 100, 60, 80 | Trois « Disponible », aucun avertissement, manque 0 partout |
| B | `mage.health` à 0 | Maëlys : 0 / 60, manque 60, « Hors combat », un avertissement ; les deux autres restent disponibles |
| C | `mage.health` à 1 | Maëlys : 1 / 60, manque 59, « Disponible », avertissement disparu |
| D | Rétablir mage à 60 ; `priest.health` à 0 | Soline seule hors combat, 0 / 80, manque 80 ; Maëlys disponible à 60 / 60 |
| E | Rétablir prêtre à 80 ; `warrior.health` à 0 | Aldric seul hors combat, 0 / 100, manque 100 ; « En première ligne : Aldric » conservé |
| F | Rétablir guerrier à 100 | État final identique à A |

Pendant B, examinez la page large puis étroite (environ 320 px) : les textes doivent rester lisibles, sans déborder horizontalement. Le texte suffit-il pour reconnaître le héros hors combat sans la couleur ?

Testez ensuite le contrat TypeScript : remplacez temporairement `'Mage'` par `'Magge'` dans **l’objet `mage`**, sans changer le type. Lancez `npm run build` à la racine dans un second terminal, ou après arrêt de Vite. Le build doit échouer : cette valeur ne fait pas partie de l’union. Rétablissez `'Mage'` et relancez le build ; il doit réussir, sans `any` et sans élargir le type pour contourner l’erreur.

Contrôlez enfin l’accueil, l’image et les trois fiches à vies maximum, en fenêtre large et étroite. Conservez les statistiques du bloc 03, le paragraphe « En première ligne » et l’unique définition de `HeroCard`. Arrêtez le serveur avec Ctrl+C. Les changements provisoires ne doivent pas rester dans l’état final.
