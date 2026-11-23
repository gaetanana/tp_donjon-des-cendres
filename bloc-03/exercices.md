# Bloc 03 · Travaux pratiques

Les trois exercices sont essentiels et partent de votre propre application du bloc 02. Gardez le [cours](cours.md) et le [tableau des données](ressources/donnees-groupe.md) ouverts. Conservez votre accueil personnel et les deux feuilles CSS.

<a id="exercice-1"></a>
## Exercice 1 · Un héros, un objet

1. Après les imports, avant la fonction `App`, écrivez un alias `type Hero` décrivant les neuf propriétés du tableau, avec leurs types.
2. Dans `App`, remplacez les neuf variables du bloc 02 par un seul objet `warrior: Hero`. Il reprend les données d’Aldric. La propriété `name` remplace l’ancienne variable `heroName` ; les autres noms figurent dans le tableau.
3. Dans le paragraphe « En première ligne » et dans la fiche existante, remplacez chaque lecture des anciennes variables par la propriété correspondante de `warrior`. Pour la vie manquante, lisez les deux propriétés du même objet et effectuez la soustraction.
4. Enregistrez. La page doit conserver le résultat du bloc 02 : Aldric à deux endroits, Guerrier, niveau 1, vie 100 / 100, manque 0, constitution 10, force 12, puissance 2, armure 3.

**Point de passage.** Montrez la différence entre la description `name: string` et la donnée `name: 'Aldric'`.

<a id="exercice-2"></a>
## Exercice 2 · Une présentation réutilisée

1. Sous `Hero`, déclarez le type `HeroCardProps`. Il possède une seule propriété `hero`, de type `Hero`.
2. Avant `App`, écrivez `function HeroCard(props: HeroCardProps)`. Son `return` renvoie l’`article` complet de l’exercice 1, que vous déplacez depuis `App`. Gardez le `h2`, le paragraphe de classe et les sept couples `dt` / `dd`, ainsi que `hero-card` et `hero-stats`.
3. Dans cette fonction, remplacez les accès `warrior.…` par `props.hero.…` : le composant doit pouvoir afficher n’importe lequel des trois héros.
4. À la place de l’ancien `article` dans `App`, écrivez `<HeroCard hero={warrior} />`. Vérifiez la première fiche avant de poursuivre. Le paragraphe « En première ligne » reste dans `App` avec `warrior.name`.
5. Dans `App`, avant `return`, déclarez deux nouveaux objets `mage: Hero` et `priest: Hero`, avec toutes les valeurs du tableau.
6. Sous l’utilisation pour `warrior`, ajoutez une utilisation de `HeroCard` recevant `mage`, puis une autre recevant `priest`. Ne recopiez pas l’`article` et ne créez pas de fonctions `MageCard` ou `PriestCard`.

**Résultat.** Trois fiches successives, dans l’ordre Guerrier, Mage, Prêtre, avec les mêmes libellés mais leurs propres valeurs. Le code contient un seul `article` de classe `hero-card` et trois balises `HeroCard`.

<a id="exercice-3"></a>
## Exercice 3 · Vérifier les données et leur transmission

1. Changez temporairement `name` de `warrior` en **Bérénice**. Les deux emplacements du nom changent, sans modifier `HeroCard`. Les noms Maëlys et Soline restent identiques. Rétablissez **Aldric**.
2. Changez uniquement la propriété `health` de `mage` en **40**. Sa fiche affiche **40 / 60** et **20** de vie manquante. Les deux autres fiches restent à leur vie maximum, manque 0. Rétablissez la vie du mage à **60**.
3. Retirez provisoirement la prop `hero={priest}` de la troisième balise, en conservant `<HeroCard />`. Lancez `npm run build` dans un second terminal à la racine du projet (ou après avoir arrêté Vite). TypeScript doit refuser cette utilisation : la prop `hero` obligatoire est absente. L’application peut aussi afficher une erreur pendant ce test ; il n’est pas nécessaire de la conserver ouverte.
4. Rétablissez `hero={priest}` et relancez `npm run build`. La compilation doit réussir. Ne supprimez pas le type et n’utilisez pas `any` pour contourner le message.
5. Contrôlez les neuf valeurs de chaque objet avec le tableau. Vérifiez le refuge et les trois fiches dans une fenêtre large puis étroite ; faites défiler pour lire les trois. Aucun texte ne doit sortir horizontalement de la page. Arrêtez le serveur et gardez cet état final pour le prochain bloc.
