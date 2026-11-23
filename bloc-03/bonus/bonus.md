# Bloc 03 · Bonus facultatif · Le maître de guilde 🏛️

## Objectif

Ajoutez au refuge une fiche décorative de maître de guilde en réutilisant `HeroCard`. Elle présente un contact du refuge ; elle ne fait pas partie de l’équipe de trois héros. Partez de l’essentiel terminé du bloc 03, sans autre bonus. Repère indicatif : 20 à 30 minutes, sans durée de rendu imposée.

## Données fournies

Créez un objet `guildMaster` de type `Hero` avec les valeurs suivantes :

| Propriété | Valeur |
| --- | --- |
| `name` | Orven |
| `heroClass` | Maître de guilde |
| `level` | 5 |
| `health` | 120 |
| `maxHealth` | 120 |
| `constitution` | 12 |
| `strength` | 8 |
| `power` | 6 |
| `armor` | 4 |

Aucune image ni installation supplémentaire n’est nécessaire. Les feuilles de style de votre essentiel suffisent.

## Travail à réaliser

1. Déclarez l’objet à côté des trois héros, sans changer leurs données ni le type commun.
2. Après la section du groupe, ajoutez une section distincte avec le titre « À la guilde », une courte présentation personnelle et une utilisation de `HeroCard` recevant votre objet.
3. Changez temporairement le nom du maître : seule sa fiche doit changer. Rétablissez Orven. Vérifiez sa vie et sa vie manquante, puis la compilation et la lisibilité large/étroite.
4. Vérifiez que les trois héros restent affichés par les trois utilisations essentielles et que « En première ligne » désigne toujours Aldric. Montrez où se trouve l’unique définition de la fiche.

**Résultat observable.** Une quatrième fiche dans une section explicitement décorative, sans recopier sa structure et sans ajouter de membre au groupe. Aucune règle de combat à programmer. La suite du cours fonctionne avec ou sans cette section. Ce bonus n’a pas de corrigé.
