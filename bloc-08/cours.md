# Bloc 08 · Consolider le refuge 🧭

## Objectif et organisation

Vous disposez d’une première interface React interactive : trois héros consultables et un bestiaire. Vous allez vérifier que les composants affichent réellement leurs données, que les conditions répondent aux cas limites et que la sélection reste indépendante des statistiques. Ces vérifications s’appliquent aussi à une liste de dossiers ou à un catalogue professionnel.

Cette séance consolide les blocs 01 à 07 ; aucune nouvelle notion obligatoire. Partez de votre essentiel du bloc 07, sans bonus. Travaillez dans `src/App.tsx`, avec les styles et l’image déjà présents. Aucune installation supplémentaire ni nouvelle ressource à copier dans le projet essentiel. Les [scénarios](ressources/scenarios.md) et la [fiche réflexe](../fiche-reflexe-M1.md) sont des documents à lire.

| Première période · 50 min | Seconde période · 50 min |
| --- | --- |
| Reprise et lecture ciblée : 10 min ; exercice 1 : 30 min ; premières vérifications : 10 min | Après la pause : exercice 2, 35 min ; exercice 3 et fiche réflexe, 15 min |

Ces repères incluent les corrections ordinaires. Si une difficulté persiste, montrez le fichier, l’action et le message obtenus au formateur. Les bonus restent facultatifs.

## 1. Retrouver le chemin d’une donnée

Pour comprendre un affichage, remontez depuis la valeur visible jusqu’à sa source :

1. `HeroCard` lit `props.hero` ; cette prop reçoit `selectedHero` dans `App`.
2. `selectedHero` est choisi à partir de `selectedChoice` et des trois objets existants.
3. Le clic transmet `hero.id` au setter ; React réévalue alors l’interface.
4. Les boutons sont produits par `heroes.map`. Le bestiaire utilise son propre tableau et son propre composant.

Une prop transmet une donnée à un composant. L’état conserve ici un choix entre deux interactions. Les objets et calculs d’affichage ne deviennent pas des états supplémentaires : le seul `useState` essentiel reste celui de la sélection.

Exemple de lecture déjà rencontré :

```tsx
<HeroCard hero={selectedHero} />
```

La propriété du contrat s’appelle `hero` ; la valeur transmise s’appelle `selectedHero`. Modifier le nom d’un héros dans ses données doit modifier son bouton et sa fiche, sans retoucher leurs textes dans le JSX.

**Réalisez l’exercice 1.** Vous pouvez consulter les paquets précédents et la fiche réflexe, sans utiliser de corrigé.

## 2. Isoler une variation puis restaurer

Un contrôle utile change une seule situation à la fois et annonce le résultat attendu avant de l’observer. Par exemple, une vie nulle doit changer le statut et afficher l’avertissement, sans changer le score d’attaque. Le nom d’un monstre doit rester associé à ses propres statistiques après un déplacement de son objet.

Les scénarios de cette séance sont temporaires. Après chaque scénario, remettez les valeurs initiales avant le suivant. Ne programmez ni bouton de blessure, ni soins, ni combat. Vous changez les données dans le fichier, enregistrez, puis consultez le personnage voulu.

Le rechargement à chaud peut conserver le choix du héros. Un rechargement réel du navigateur réinitialise ce choix à Aldric. La sauvegarde d’une sélection ne fait pas partie de ce module.

`key` aide React à reconnaître un élément entre deux rendus. Gardez les identifiants stables même quand l’ordre change. Nos cartes n’ont pas d’état propre : une clé par position pourrait sembler fonctionner dans ces essais. La différence devient particulièrement visible avec des éléments ayant leur propre état ; l’absence d’avertissement ne prouve donc pas à elle seule que la clé a été bien choisie. Vérifiez aussi le code : `key={monster.id}` ou `key={hero.id}`.

La règle `.monster-portrait` du CSS précédent est réservée au bonus ; elle ne demande aucun ajout dans l’essentiel. L’espace vertical avant le bestiaire permet de séparer les sections ; faites défiler la page pour le consulter.

**Réalisez l’exercice 2** avec les [scénarios fournis](ressources/scenarios.md), puis restaurez toutes les données.

## 3. Diagnostiquer sans masquer l’erreur

| Observation | Point à examiner dans les acquis de M1 |
| --- | --- |
| Le bouton change d’apparence, mais la fiche reste la même | Prop `hero` réellement transmise, puis lecture de `props.hero` dans la carte |
| Une vie à zéro reste disponible | Condition `health > 0`, textes conditionnels et emplacement de l’avertissement dans l’article |
| La vie manquante devient négative | Ordre des arguments : vie actuelle, maximum ; formule maximum moins vie |
| Une carte manque | Retour de `map`, prop et présence de l’objet dans le tableau |
| Le clic provoque trop de rendus | Fonction passée à `onClick`, par exemple `() => setSelectedChoice(hero.id)` |
| Le navigateur semble correct mais la compilation échoue | Lire l’erreur TypeScript ; ne pas remplacer le contrat par `any` |

Lisez d’abord le message et la ligne indiquée, corrigez une cause, enregistrez et refaites le contrôle. Une page peut devenir vide pendant une erreur de code ; ne cherchez pas à corriger le CSS dans ce cas.

À la racine du projet, `npm run dev` lance le serveur et affiche son adresse Local ; Ctrl+C l’arrête. `npm run build`, dans un second terminal, contrôle les types et construit la version distribuable. Si les dépendances manquent après une reprise, `npm ci` les réinstalle depuis le verrou existant. Gardez les versions du projet.

## Fin de module

**Terminez par l’exercice 3.** Le résultat essentiel reste celui du bloc 07, maintenant revérifié : trois boutons, une fiche à huit statistiques, deux cartes de bestiaire et les données initiales. Les consultations ne blessent aucun héros et ne modifient aucune statistique. La fiche reste consultable même si le héros est hors combat.

Le corrigé essentiel est remis en fin de séance. Le bonus, distribué séparément, propose un panneau de portraits à partir d’une copie de cet essentiel ; aucun bonus antérieur n’est nécessaire et ce panneau ne conditionne pas la suite.

Conservez la [fiche réflexe M1 · Composants, props et sélection](../fiche-reflexe-M1.md) pour retrouver rapidement les gestes du module. 📌
