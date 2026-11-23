# Bloc 9 · Donner un nom à l’équipe

Reprenez `src/App.tsx` à la fin du [cours](cours-9.md). La fiche des héros affiche les points de vie sur une ligne. L’exemple `WelcomeNote` a servi à apprendre à saisir et envoyer un texte. Vous allez reprendre ces deux gestes pour nommer l’équipe du refuge.

## 1 · Voir ce que l’on tape

**Ce que vous construisez.** Entre l’image du refuge et « Avant le départ », on doit voir le titre **Votre équipe**, le libellé **Nom de l’équipe**, un champ contenant **Les Veilleurs** et, dessous, **Brouillon : Les Veilleurs**. Le mot *brouillon* désigne le texte que la personne est en train d’écrire.

1. Dans la fonction `App`, juste après l’état qui mémorise le héros sélectionné, créez un état texte. Nommez la valeur `draftName`, la fonction de mise à jour `setDraftName` et donnez-lui la valeur de départ `'Les Veilleurs'`.
2. Toujours dans `App`, avant son `return`, écrivez la fonction `changeTeamName`. Elle reçoit l’événement de saisie, lit le texte du champ et met à jour le brouillon. Retrouvez ces trois opérations dans le [champ du cours](cours-9.md#repere-champ).
3. Dans le `main`, juste après `</header>`, ajoutez une section de classe `team-panel` avec le titre `h2` « Votre équipe ». Dans cette section, placez un `div` de classe `team-form`. Il contient le libellé et le champ de texte. Associez le libellé au champ avec l’identifiant `team-name`. Reliez `value` à votre brouillon et `onChange` à votre fonction.
4. Sous le `div`, dans la même section, affichez un paragraphe « Brouillon : » suivi de la valeur de `draftName`.

**Vérifiez.** Cliquez sur « Nom de l’équipe » puis tapez `Aube` à la place du texte. Le curseur doit se trouver dans le champ et le paragraphe doit afficher « Brouillon : Aube ». Effacez le `e` puis consultez Maëlys. Le champ et le paragraphe affichent encore `Aub`. Le nom de Maëlys reste sur sa propre fiche.

## 2 · Choisir quand le nom devient officiel

**Ce que vous construisez.** Dans le champ, on peut essayer plusieurs noms. En dessous, **Équipe actuelle** affiche le dernier nom enregistré. Ces deux textes peuvent donc être différents à l’écran.

1. À côté de `draftName`, créez l’état `teamName` et sa fonction `setTeamName`. Lui aussi commence à `'Les Veilleurs'`.
2. Dans `App`, écrivez `submitTeamName` en reprenant [l’envoi du cours](cours-9.md#repere-envoi). À l’envoi du formulaire, cette fonction empêche le rechargement habituel de la page et copie le brouillon dans le nom enregistré.
3. Transformez le `div` de classe `team-form` en `form` de même classe. Pensez à changer aussi la balise fermante. Reliez `onSubmit` à votre fonction. Après le champ, dans ce formulaire, ajoutez le bouton d’envoi **Enregistrer le nom**.
4. Remplacez le paragraphe « Brouillon » par un paragraphe de classe `team-current`. Il affiche « Équipe actuelle : » puis la valeur de `teamName`. Les boutons pour consulter les héros restent dans la section suivante.

Actualisez la page, puis essayez cette suite de gestes dans l’ordre.

| Action | Champ | Équipe actuelle | Héros consulté |
| --- | --- | --- | --- |
| Consultez Maëlys. Saisissez `Aube du Nord`. | Aube du Nord | Les Veilleurs | Maëlys |
| Appuyez sur Entrée dans le champ. | Aube du Nord | Aube du Nord | Maëlys |
| Saisissez `Les Éclats`, puis cliquez sur « Enregistrer le nom ». | Les Éclats | Les Éclats | Maëlys |
| Consultez Soline, puis effacez tout le texte du champ. | Vide | Les Éclats | Soline |
| Appuyez sur Entrée dans le champ vide. | Vide | Le libellé reste seul | Soline |
| Actualisez la page dans le navigateur. | Les Veilleurs | Les Veilleurs | Aldric |

Le bloc accepte la saisie telle quelle, y compris les espaces. Vérifiez aussi que Soline a **80 / 80** points de vie et que les deux monstres sont visibles. Lancez `npm run build` à côté de `package.json`.

**Gardez cette version pour le bloc 10.** Copiez votre fichier `App.tsx` hors de `src`, dans un dossier personnel nommé `fin-bloc-9`. Pour commencer chacun des entraînements ci-dessous, recopiez ce fichier dans `src/App.tsx`. À la fin des entraînements, remettez encore une fois cette version dans `src`. Vous pouvez ainsi essayer les exercices suivants dans l’ordre de votre choix.

## 3 · Reprendre le dernier nom enregistré

Vous écrivez un nouveau nom puis changez d’avis. Ajoutez une commande **Reprendre le nom enregistré** pour remettre le dernier nom enregistré dans le champ. Retrouvez le rôle de `type="button"` dans les [commandes du cours](cours-9.md#repere-commandes).

- **Où travailler ?** Dans `App`, à côté de `submitTeamName`, créez une fonction nommée `restoreTeamName`. Dans le formulaire, ajoutez le nouveau bouton à côté du bouton d’envoi.
- **Que doit faire le clic ?** Il modifie le brouillon en utilisant la valeur de `teamName`. Le nom enregistré garde sa valeur. Choisissez le type de bouton adapté à cette action.
- **Comment savoir si c’est juste ?** Enregistrez `Brume`, tapez `Orage` puis cliquez sur le nouveau bouton. Le champ revient à `Brume` et « Équipe actuelle » affiche toujours `Brume`. Recommencez en effaçant tout le champ avant le clic. Le résultat doit être identique.

## 4 · Expliquer deux comportements inattendus 🔎

Partez de votre version de fin d’exercice 2. Faites un seul essai à la fois. Pour chacun, observez ce qui se passe, nommez la valeur ou l’action responsable, puis réparez et refaites l’essai.

| Dans `src/App.tsx`, modifiez temporairement… | Faites l’essai | Question à résoudre |
| --- | --- | --- |
| Dans « Équipe actuelle », affichez `draftName` à la place de `teamName`. | Actualisez puis tapez `Loups` sans envoyer. | Pourquoi le nom semble-t-il déjà enregistré ? Quelle valeur ce paragraphe doit-il lire ? |
| Après la première réparation, retirez uniquement la ligne `event.preventDefault()` dans `submitTeamName`. | Consultez Maëlys, tapez `Aube`, puis appuyez sur Entrée dans le champ. | Pourquoi revient-on au choix initial du héros ? Quelle instruction doit précéder l’enregistrement ? |

**Une réparation réussie** permet de saisir `Aube` sans changer le nom enregistré, puis d’enregistrer avec Entrée en gardant la fiche de Maëlys à l’écran.

## 5 · Ajouter un lieu de rendez-vous

Repartez de la fin de l’exercice 2. En parallèle du nom d’équipe, le groupe veut choisir un lieu. Construisez un **deuxième formulaire** avec le même mécanisme que celui du [TP guidé](cours-9.md#repere-champ).

1. Dans `App.tsx`, avant la déclaration de `App`, créez un composant `MeetingPoint`. Il possède ses propres valeurs pour le lieu saisi et le lieu confirmé. Toutes deux commencent à `'La porte nord'`.
2. Dans ce composant, ajoutez un titre « Rendez-vous », un libellé « Lieu de rendez-vous », un champ d’identifiant `meeting-point`, un bouton d’envoi « Confirmer le lieu » et un paragraphe « Lieu confirmé : … ». Utilisez les classes du premier formulaire pour retrouver sa présentation.
3. Dans le `main` de `App`, placez `<MeetingPoint />` après la section « Votre équipe », avant celle des héros. Le panneau « Rendez-vous » doit apparaître sous « Votre équipe ». Chacun contient son propre formulaire.

**Vérifiez leur indépendance.** Enregistrez l’équipe `Les Éclats`. Dans le champ du lieu, écrivez `Le pont`. Avant Entrée, le lieu confirmé indique toujours « La porte nord ». Après Entrée, il indique « Le pont », tandis que le nom d’équipe reste « Les Éclats ». Tapez un autre nom d’équipe sans l’enregistrer, puis confirmez un nouveau lieu : le brouillon d’équipe doit encore être là.
