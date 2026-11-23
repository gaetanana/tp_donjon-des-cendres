# Bloc 07 · Exercices essentiels

Suivez le [cours](cours.md) et les [données](ressources/donnees.md). Point de départ : essentiel du bloc 06, sans bonus. Seul App.tsx est modifié, en plus du CSS fourni à copier et importer.

## Exercice 1 · Produire les boutons du groupe

1. Placez HeroChoice avant Hero, ajoutez `id: HeroChoice` au type Hero puis les trois identifiants aux objets existants. Gardez les autres types et calculs.
2. Après les trois objets de App, créez le tableau typé heroes dans l’ordre fourni. Gardez l’état selectedChoice et le calcul conditionnel selectedHero.
3. Dans le `div.hero-selector`, remplacez les trois boutons écrits séparément par `heroes.map`. Nommez le paramètre `hero`. Renvoyez un bouton par élément, avec `key={hero.id}`, `type="button"`, `aria-pressed={selectedChoice === hero.id}` et la fonction de clic qui appelle setSelectedChoice avec hero.id. Texte : « Consulter » suivi de hero.name.
4. Retirez les trois anciennes fonctions handleSelectWarrior, handleSelectMage, handleSelectPriest devenues inutiles. Conservez un seul useState, le résumé, le texte « En première ligne : Aldric » et une seule utilisation de HeroCard.
5. Consultez les trois héros : noms, vies et scores doivent rester ceux du bloc 06. Lancez npm run build.

Point de passage : montrez à votre formateur quelle partie reçoit l’élément courant et quelle partie attend le clic.

## Exercice 2 · Construire le bestiaire

1. Ajoutez les types Monster et MonsterCardProps après les types existants. Créez MonsterCard hors de App, après HeroCard : recevez props, renvoyez la structure indiquée dans les références, lisez les trois valeurs depuis props.monster. N’incluez ni bouton ni calcul d’attaque dans cette carte.
2. Dans App, après heroes, écrivez le tableau monsters avec les deux objets fournis. Pas de nouvel état ni de dépendance.
3. Après la section du groupe, dans main, ajoutez la section Bestiaire. Dans sa grille, utilisez monsters.map pour renvoyer un MonsterCard par objet. Placez la clé sur MonsterCard et transmettez aussi la prop monster.
4. Enregistrez : deux cartes distinctes, rat 20/0 et sentinelle 45/4. Le groupe doit encore fonctionner au-dessus. Faites défiler pour atteindre le bestiaire.

## Exercice 3 · Prouver que les données pilotent les cartes

| Essai | Manipulation | Résultat attendu |
| --- | --- | --- |
| A | Ajouter l’entrée temporaire Feu follet au tableau monsters, sans changer le JSX | Trois cartes, Feu follet 12/1 ; sélection de Maëlys toujours possible |
| B | Inverser les deux premières entrées dans monsters, sans changer leurs id | Les cartes suivent le nouvel ordre avec leurs propres valeurs, aucun avertissement de clé ; retirer Feu follet et restaurer rat puis sentinelle |
| C | Consulter les héros plusieurs fois ; temporairement mettre mage.health à 17 puis à 0 | Score 7, manque 43 puis 60 ; Disponible puis Hors combat avec un avertissement. Restaurer 60 |
| D | Sélectionner Soline puis recharger réellement | Retour Aldric, 100/100 et score 25 ; deux cartes de bestiaire |

À 1366 × 768 et à 320 px, capturez ou observez Maëlys et les deux cartes : noms et statistiques lisibles, aucune collision ni barre de défilement horizontale. Le défilement vertical est normal. Testez Tab puis Entrée et Espace : les trois boutons sont accessibles, le focus visible et un seul aria-pressed vaut true. Ouvrez la console (F12, Console) : aucun avertissement de clé ni erreur. Ne retirez pas key pour provoquer artificiellement un avertissement.

## État final

Trois objets Hero avec identifiants stables et un tableau heroes, deux monstres dans monsters, un map pour les boutons, un map pour les cartes. Une fiche HeroCard et deux MonsterCard à l’écran, un seul état de sélection. Trois fonctions pures conservées, vies 100/60/80, niveaux 1, ordre initial restauré. Aucun any ni journal console ajouté. Terminez par npm run build ; reformatez dans WebStorm avec Ctrl+Alt+L si nécessaire.
