# Bloc 01 · Travaux pratiques

Ouvrez votre copie personnelle du projet. Gardez le [cours](cours.md) à portée de main. Les trois exercices forment le parcours essentiel de cette séance.

<a id="exercice-1"></a>
## Exercice 1 · Retrouver la ligne affichée

**Point de départ.** Vite tourne et le navigateur affiche « Atelier prêt ».

1. Dans `src/App.tsx`, repérez le texte situé entre les balises `<h1>` et `</h1>`. Remplacez seulement ce texte par **Au seuil du refuge**.
2. Enregistrez avec **Ctrl+S** sous Windows ou **Cmd+S** sous macOS. Regardez le navigateur, puis le titre de son onglet.
3. Changez à nouveau un mot du titre de la page pour vérifier que vous travaillez sur la bonne copie.

**Contrôle.** Le grand titre suit vos modifications. Le titre de l’onglet reste « Donjon des Cendres ». Retrouvez dans le tableau du cours le fichier qui explique cette différence.

<a id="exercice-2"></a>
## Exercice 2 · Accueillir l’équipe au refuge

Construisez un premier écran à partir des balises ci-dessous. Écrivez le texte d’accueil et faites-le lire à une personne qui découvre le jeu.

1. Dans `src/App.tsx`, ajoutez l’import du CSS donné dans le cours. Conservez la déclaration de la fonction `App`. Remplacez son ancien `return` par un retour entre parenthèses.
2. L’élément extérieur est un `<main className="refuge">`. Il rassemble le contenu principal de la page. Fermez-le par `</main>`.
3. À l’intérieur, ajoutez un `<header>` et sa fermeture. Cet en-tête contient un `<h1>` affichant **Le refuge des Cendres** et un `<p>` contenant **votre phrase d’accueil**. Dites à l’équipe pourquoi elle se rassemble ici avant le départ.
4. Toujours dans `main`, **après** la fermeture de `header`, ajoutez une `<section>`. Elle contient un `<h2>` affichant **Avant le départ** puis un `<p>` qui nomme les trois rôles de votre équipe, **guerrier, mage et prêtre**. Formulez vous-même la phrase.
5. Enregistrez et comparez votre écran à la description ci-dessous. Modifiez ensuite un seul mot de votre phrase d’accueil et vérifiez le changement en direct.

| Zone à observer | Résultat attendu |
| --- | --- |
| Haut de la carte | Une illustration de refuge apparaît en arrière-plan. Le grand titre et la phrase d’accueil restent lisibles en bas de l’image |
| Sous l’image | Un panneau contient le titre « Avant le départ » et votre phrase sur les trois héros |
| Fenêtre rétrécie | Le texte peut passer à la ligne. Aucun mot ni morceau du panneau ne disparaît hors de l’écran |

Voici une [capture du refuge terminé](ressources/apercu-refuge.jpg). Comparez la disposition et la lisibilité avec votre résultat. Les deux phrases proposées sur la capture peuvent différer des vôtres.

Le CSS fourni dessine le cadre et charge l’image `public/refuge.jpg` quand la classe `refuge` est placée sur `main` et que `header` est son enfant direct. Si vous voyez vos textes sur une page blanche, vérifiez la présence de l’import dans **votre** `App.tsx`.

<a id="exercice-3"></a>
## Exercice 3 · Quitter et reprendre votre poste

1. Notez l’adresse affichée par Vite. Cliquez dans le **terminal qui fait tourner le serveur** et appuyez sur **Ctrl+C**, y compris sous macOS. Si Windows demande une confirmation, suivez le choix affiché. Le terminal doit de nouveau accepter une commande.
2. Actualisez la page dans le navigateur. Le serveur arrêté ne peut plus fournir la page.
3. Dans le dossier qui contient `package.json`, relancez `npm run dev`. Ouvrez l’adresse annoncée. Vérifiez que le titre du refuge, votre formulation personnelle et l’équipe sont de retour.
4. Réduisez la largeur de la fenêtre, puis agrandissez-la. Vérifiez que les deux zones de l’exercice 2 restent lisibles. Quand vous quittez le poste, arrêtez proprement le serveur.

**Pour reprendre plus tard.** Conservez le dossier personnel entier. Vous aurez besoin du même `src/App.tsx` au bloc 02. Vous pouvez à présent expliquer à un autre élève où ouvrir le terminal, quel fichier modifier et comment voir le résultat.
