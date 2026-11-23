# Bloc 07 · Données et contrats

## Héros

Conservez `HeroChoice = 'warrior' | 'mage' | 'priest'`. Déplacez cette déclaration avant `Hero`, puis ajoutez `id: HeroChoice` dans Hero. Ajoutez les propriétés ci-dessous aux objets existants sans changer les autres données.

| Objet | id | Nom | Score attendu |
| --- | --- | --- | --- |
| warrior | 'warrior' | Aldric | 25 |
| mage | 'mage' | Maëlys | 7 |
| priest | 'priest' | Soline | 9 |

Le tableau `heroes: Hero[]` contient, dans cet ordre, `warrior`, `mage`, `priest`. Les identifiants sont des données stables ; ne les remplacez pas quand un nom affiché change.

## Bestiaire essentiel

Contrat `Monster` : `id: string`, `name: string`, `health: number`, `armor: number`. `MonsterCardProps` contient une propriété `monster: Monster`. Les nombres sont des données de catalogue, pas des vies modifiées par un combat.

Dans App, créez `monsters: Monster[]` avec deux objets littéraux entre les crochets du tableau :

| id | name | health | armor |
| --- | --- | --- | --- |
| 'ash-rat' | 'Rat des cendres' | 20 | 0 |
| 'stone-sentinel' | 'Sentinelle de pierre' | 45 | 4 |

Entrée temporaire de contrôle : id `'mist-wisp'`, name `'Feu follet'`, health 12, armor 1. Ajoutez-la dans le même tableau, avec une virgule entre objets ; retirez-la après l’essai.

Chaque carte contient un `article.monster-card`, un `h3` pour le nom et un `dl.hero-stats` avec deux couples : « Points de vie » et « Armure ». La section `section.bestiary` contient le titre `h2` « Bestiaire » puis un `div.bestiary-grid` accueillant les cartes. Placez cette section après celle du groupe, dans le même main.
