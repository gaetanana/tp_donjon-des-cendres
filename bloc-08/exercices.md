# Bloc 08 · Exercices essentiels

## Départ

Reprenez votre essentiel du bloc 07, sans aucun bonus. Conservez vos fichiers et dépendances. Les ressources Markdown de ce bloc restent à côté du cours ; aucune ressource supplémentaire n’est à importer dans l’application. Le [cours](cours.md) organise les deux périodes ; les [scénarios](ressources/scenarios.md) donnent toutes les valeurs de test.

## Exercice 1 · Reprendre et fiabiliser les acquis

1. Lancez l’application, puis consultez Aldric, Maëlys et Soline. Comparez les huit statistiques aux références initiales des scénarios. Vérifiez le résumé, les noms des boutons et les deux monstres. Si votre projet est déjà correct, poursuivez les contrôles : il n’est pas demandé d’y introduire une erreur.
2. Retrouvez dans `App.tsx` le type `Hero`, les trois objets, le tableau `heroes`, l’unique état `selectedChoice`, le calcul conditionnel de `selectedHero` et l’appel à `HeroCard`. Suivez concrètement la valeur de `mage.id` jusqu’au clic, au résumé et à la prop. Montrez ce parcours au formateur dans le code et dans le navigateur, sans réponse écrite à rendre.
3. Vérifiez que la carte lit sa prop pour toutes ses valeurs, que la vie manquante et le score sont des appels aux fonctions pures, et que les textes de statut correspondent à la vie. Les paragraphes de statut et d’avertissement restent enfants directs de l’article, en dehors du `dl`.
4. Retrouvez les deux `map`, leurs clés par identifiant et la prop de `MonsterCard`. Chaque composant est déclaré hors de `App`. Gardez une seule fiche de héros, un seul état essentiel et les trois fonctions pures ; ne créez aucun état pour les calculs ou le bestiaire.
5. Corrigez les écarts éventuels en vous appuyant sur les supports M1. Gardez le refuge, son illustration, son accueil et « En première ligne : Aldric ». Cette première ligne reste le guerrier, quel que soit le héros consulté.
6. Exécutez `npm run build`. Une page visible ne suffit pas à valider les types. N’ajoutez ni `any`, ni calcul modifiant les objets, ni nouvelle fonctionnalité.

## Exercice 2 · Vérifier des situations différentes

Réalisez les scénarios A à D dans l’ordre. Avant chaque manipulation, repérez les résultats attendus dans le tableau fourni. Il s’agit de modifier temporairement les données dans `App.tsx`, sans écrire de nouveau mécanisme de jeu.

- **A · Soline blessée puis hors combat.** Ne changez que sa vie. Consultez les autres héros entre les deux essais : leurs valeurs doivent rester intactes. La consultation de Soline à zéro doit rester possible. Restaurez sa vie initiale.
- **B · Aldric de démonstration.** Changez ensemble les cinq champs indiqués. Vérifiez le maximum, la vie manquante et le score calculés. Consultez Maëlys et Soline ; restaurez ensuite tous les champs d’Aldric.
- **C · Identité des cartes.** Remplacez temporairement le nom et l’armure du rat, ajoutez le Scarabée des marais uniquement dans le tableau `monsters`, puis déplacez l’objet de la sentinelle devant celui du rat. Vérifiez que noms et valeurs suivent les objets. Ne recopiez ni le composant ni un appel à `MonsterCard` pour créer la troisième carte. Restaurez les deux monstres et leur ordre initial.
- **D · Ordre du groupe et sélection.** Écrivez temporairement `const heroes: Hero[] = [priest, warrior, mage]`. Vérifiez l’ordre des trois boutons. Consultez Maëlys, puis Soline, puis Aldric, puis Aldric à nouveau. Le résumé, la fiche et l’unique bouton actif restent cohérents. Les clés sont toujours les identifiants ; le calcul conditionnel de `selectedHero` est conservé. Restaurez `[warrior, mage, priest]`.

Pendant les essais, ouvrez la console du navigateur et recherchez les erreurs et avertissements de clés. Si votre navigateur conserve un ancien message, effacez la console puis reproduisez l’action. Ne laissez aucun message ajouté pour vos essais dans le code final.

## Exercice 3 · Présenter le refuge consolidé

1. Vérifiez toutes les restaurations avec les références initiales. Sélectionnez Soline, puis rechargez réellement la page : Aldric revient, avec 100 / 100 et un score de 25 ; le bestiaire contient exactement deux cartes.
2. Consultez les trois héros plusieurs fois. Un seul bouton porte `aria-pressed=true`. Aucun clic ne change les vies, les scores ni « En première ligne : Aldric ».
3. Utilisez Tab pour atteindre les trois boutons ; activez-en un avec Entrée, un autre avec Espace. Repérez le contour de focus et vérifiez la fiche après chaque action.
4. Observez Maëlys et le bestiaire dans une fenêtre d’environ 1366 × 768, puis en largeur 320 px avec les outils du navigateur. Faites défiler la page. Les boutons, noms et statistiques restent lisibles, sans chevauchement ni défilement horizontal. Le refuge se charge toujours. Lors du scénario A, contrôlez aussi Soline à zéro en largeur 320 px.
5. Relancez `npm run build` sur l’état restauré ; vérifiez que la console ne signale aucune erreur. Montrez au formateur une consultation et la façon dont une donnée traverse sa prop. Il ne s’agit pas d’un questionnaire écrit.
6. Parcourez la [fiche réflexe](../fiche-reflexe-M1.md). Retrouvez dans votre code un exemple de composant, de prop, de condition, d’état et de `map`. Gardez votre essentiel restauré pour la prochaine séance.

## Résultat final attendu

Trois héros et leurs identifiants initiaux, huit statistiques dans une seule fiche, trois fonctions pures, sélection unique par boutons produits avec `map`, deux monstres sans portraits, aucun nouvel état. Le panneau de portraits appartient au bonus uniquement. La compilation réussit et aucun scénario temporaire ne reste dans les données.
