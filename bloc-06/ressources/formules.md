# Formules fournies · Bloc 06

## Domaine et règles

Ce sont des calculs de consultation, sans action de combat. Utilisez des nombres entiers positifs ou nuls ; niveau au moins 1, vie entre 0 et le maximum. La gestion générale des bornes et du combat sera étudiée ultérieurement.

| Fonction à écrire | Paramètres, dans l’ordre | Résultat `number` |
| --- | --- | --- |
| `getMaxHealth` | `constitution: number` | constitution × 10 |
| `getMissingHealth` | `health: number`, `maxHealth: number` | maximum − vie actuelle |
| `getAttackScore` | `hero: Hero` | force × 2 + niveau |

En TypeScript, écrivez `*` pour multiplier, `+` pour additionner et `-` pour soustraire. La multiplication est évaluée avant l’addition. Aucune fonction ne modifie ses arguments.

## Références de calcul

| Appel ou données | Résultat |
| --- | ---: |
| `getMaxHealth(10)` | 100 |
| `getMaxHealth(6)` | 60 |
| `getMaxHealth(8)` | 80 |
| `getMaxHealth(0)` | 0 |
| `getMissingHealth(60, 60)` | 0 |
| `getMissingHealth(17, 60)` | 43 |
| `getMissingHealth(0, 60)` | 60 |
| Aldric : force 12, niveau 1 | score 25 |
| Maëlys : force 3, niveau 1 | score 7 |
| Soline : force 4, niveau 1 | score 9 |
| Aldric temporaire : force 12, niveau 2 | score 26 |

Les vies initiales restent 100, 60 et 80. Dans les objets, le maximum devient un appel utilisant la constitution correspondante. Par exemple, une constitution de 5 correspondrait à `maxHealth: getMaxHealth(5)`. Si l’on change la constitution à la main, il faut aussi adapter cet argument et la vie initiale : aucune synchronisation automatique des champs d’un objet n’est supposée.
