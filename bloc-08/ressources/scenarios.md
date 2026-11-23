# Bloc 08 · Références et scénarios temporaires

## État initial et final à conserver

| Champ | Aldric · warrior | Maëlys · mage | Soline · priest |
| --- | --- | --- | --- |
| id | 'warrior' | 'mage' | 'priest' |
| heroClass | 'Guerrier' | 'Mage' | 'Prêtre' |
| level | 1 | 1 | 1 |
| health | 100 | 60 | 80 |
| constitution | 10 | 6 | 8 |
| maxHealth | getMaxHealth(10) → 100 | getMaxHealth(6) → 60 | getMaxHealth(8) → 80 |
| strength | 12 | 3 | 4 |
| power | 2 | 14 | 10 |
| armor | 3 | 1 | 2 |
| Vie manquante affichée | 0 | 0 | 0 |
| Score d’attaque affiché | 25 | 7 | 9 |
| Statut | Disponible | Disponible | Disponible |

Ordre du tableau `heroes` : `[warrior, mage, priest]`. Choix initial du `useState<HeroChoice>` : `'warrior'`. Le nom de Maëlys comporte un tréma ; gardez les noms déjà présents.

Bestiaire initial et final :

| id | name | health | armor |
| --- | --- | --- | --- |
| 'ash-rat' | 'Rat des cendres' | 20 | 0 |
| 'stone-sentinel' | 'Sentinelle de pierre' | 45 | 4 |

## A · Une autre fiche hors combat

Dans l’objet `priest`, modifiez uniquement `health` :

| health temporaire | Vie affichée | Vie manquante | Score | Texte et avertissement |
| --- | --- | --- | --- | --- |
| 33 | 33 / 80 | 47 | 9 | Disponible, aucun avertissement |
| 0 | 0 / 80 | 80 | 9 | Hors combat, un « Ce héros ne peut pas agir. » |

Aldric et Maëlys restent disponibles et à pleine vie. Restaurez `health: 80` avant B.

## B · Calculs cohérents avec les données

Dans l’objet `warrior` uniquement :

| Champ | Valeur temporaire | Restauration |
| --- | --- | --- |
| level | 3 | 1 |
| constitution | 11 | 10 |
| maxHealth | getMaxHealth(11) | getMaxHealth(10) |
| health | 84 | 100 |
| strength | 13 | 12 |

Attendu : Aldric, niveau 3, constitution 11, vie 84 / 110, vie manquante 26, force 13, score 29, Disponible. Puissance 2 et armure 3 restent inchangées. Le calcul ne synchronise pas les champs de l’objet : c’est pourquoi l’argument de `getMaxHealth` et `constitution` sont tous deux adaptés à 11 pour ce test. Les deux autres héros gardent leurs valeurs initiales. Restaurez les cinq champs avant C.

## C · Données de bestiaire, sans nouveau composant

1. Dans l’objet identifié par `'ash-rat'`, remplacez le nom par `'Rat du rempart'` et l’armure par 2 ; vie 20 et identifiant inchangés.
2. Ajoutez à la fin du tableau cette entrée de test :

```ts
{ id: 'marsh-beetle', name: 'Scarabée des marais', health: 28, armor: 3 },
```

3. Déplacez l’objet entier de la sentinelle devant celui du rat. Attendu : Sentinelle de pierre 45/4, Rat du rempart 20/2, Scarabée des marais 28/3. Une seule définition de `MonsterCard`, un seul `map` pour les monstres, clés par `monster.id`.
4. Restaurez le nom et l’armure du rat, retirez le scarabée, remettez le rat avant la sentinelle. Aucun changement dans `Monster`, `MonsterCardProps` ou `MonsterCard` n’est nécessaire.

## D · L’identité ne dépend pas de la position

Ordre temporaire : `[priest, warrior, mage]`. Les boutons affichent Soline, Aldric, Maëlys. La sélection de Maëlys montre 60 / 60 et score 7 ; celle de Soline 80 / 80 et score 9 ; Aldric 100 / 100 et score 25. Répéter Aldric garde les mêmes valeurs. Le résumé suit la fiche, un seul bouton est actif et la première ligne reste Aldric.

Restaurez `[warrior, mage, priest]`. Sélectionnez Soline puis rechargez le navigateur : retour à Aldric avec deux monstres initiaux. Aucune persistance ni modification de vie au clic n’est attendue.
