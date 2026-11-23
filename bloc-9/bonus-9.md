# Bloc 9 · Trois défis pour personnaliser l’équipe 🛡️

Partez de la version gardée à la fin de **l’exercice 2**. Faites une copie du projet dans un dossier personnel réservé aux bonus. Si vous copiez seulement les sources et les fichiers de configuration, gardez aussi le dossier `public/` et les deux fichiers `package.json` et `package-lock.json`, puis lancez `npm ci` dans cette copie. Gardez le projet d’origine pour le bloc 10. Vous pouvez choisir un défi ou combiner les trois dans la même copie.

Dans `src/App.tsx`, repérez le champ « Nom de l’équipe » et le bouton « Enregistrer le nom ». Le champ affiche le **brouillon** (`draftName`). Le paragraphe « Équipe actuelle » affiche le **nom enregistré** (`teamName`). Actualisez la page pour repartir de « Les Veilleurs » avant les essais de chaque défi.

## 1 · Prévisualiser la bannière

**Ce que vous construisez.** Sous « Équipe actuelle », une bannière montre le texte que le joueur est en train d’essayer. Il peut ainsi juger du résultat avant de l’enregistrer.

1. Copiez [team-banner.css](ressources/bonus/team-banner.css) dans `src/`. Dans `App.tsx`, ajoutez `import './team-banner.css'` après les autres imports CSS.
2. Dans la section « Votre équipe », juste après le paragraphe « Équipe actuelle », ajoutez un `div` de classe `team-banner`. Placez-y un titre `h3` « Aperçu de la bannière » et un paragraphe de classe `team-banner-name`.
3. Dans ce paragraphe, affichez le brouillon. Si le champ est vide, affichez « Bannière sans nom ». Vous connaissez le choix `condition ? valeurSiVrai : valeurSiFaux` depuis la fiche des héros. Le texte vide s’écrit `''`.
4. Ajoutez dans la bannière une ligne qui aide le joueur à savoir où il en est. Si le brouillon est égal au nom enregistré, affichez « Nom enregistré ». Sinon, affichez « Aperçu du brouillon ». Le signe `===` permet de comparer les deux textes.

| Geste | Ce que vous devez voir |
| --- | --- |
| Écrire « Brumes du nord » sans envoyer | La bannière affiche « Brumes du nord » et « Aperçu du brouillon ». L’équipe actuelle s’appelle encore « Les Veilleurs ». |
| Appuyer sur Entrée dans le champ | La bannière affiche « Brumes du nord » et « Nom enregistré ». |
| Effacer tout le champ sans envoyer | La bannière affiche « Bannière sans nom » et « Aperçu du brouillon ». Le nom enregistré reste « Brumes du nord ». |

## 2 · Proposer deux noms à essayer

**Ce que vous construisez.** Deux boutons proposent des noms déjà écrits. Le joueur peut choisir l’un d’eux, en modifier une lettre, puis décider de l’enregistrer.

1. Dans le formulaire, entre le champ et le bouton d’enregistrement, ajoutez deux boutons « Essayer Les Éclaireurs » et « Essayer Les Archivistes ». Donnez-leur `type="button"` pour que leur clic exécute seulement votre action.
2. Dans `App`, près de `changeTeamName`, écrivez une fonction par suggestion. Chaque fonction remplace le brouillon par le nom correspondant, sans le mot « Essayer ». Reliez chaque bouton à sa fonction avec `onClick`.
3. Sous ces boutons, affichez « Nom proposé par le refuge » si le texte du champ correspond exactement à l’un des deux noms. Dans les autres cas, affichez « Nom libre ». L’opérateur `||` signifie « ou ». Par exemple, `hero.id === 'mage' || hero.id === 'priest'` donne vrai pour Maëlys et pour Soline, et faux pour Aldric. Appliquez cette lecture au brouillon et aux deux noms proposés.

**Essai.** Cliquez sur « Essayer Les Archivistes ». Le champ doit afficher « Les Archivistes », la ligne « Nom proposé par le refuge » et l’équipe actuelle « Les Veilleurs ». Remplacez « Les Archivistes » par « Les Archivistes du nord » dans le champ : la ligne passe à « Nom libre ». Cliquez sur « Essayer Les Éclaireurs », puis sur « Enregistrer le nom ». Le champ et l’équipe actuelle doivent maintenant afficher « Les Éclaireurs ».

## 3 · Annuler le dernier changement de nom

**Ce que vous construisez.** Un joueur qui vient d’enregistrer un nouveau nom peut revenir au nom qui était enregistré juste avant. Il peut annuler une seule fois. Une simple frappe dans le champ ne crée aucun historique.

1. Dans `App`, près de `teamName`, ajoutez deux états avec `useState`. Le premier garde le nom précédent (un texte). Le second indique si le bouton d’annulation doit être visible (un booléen). Au chargement, l’équipe porte le nom « Les Veilleurs » et aucune annulation n’est possible.
2. Reprenez la fonction `submitTeamName` du formulaire. Gardez `event.preventDefault()`. Si le brouillon est différent du nom actuellement enregistré, mémorisez ce nom actuel comme **nom précédent**, autorisez l’annulation, puis appliquez le brouillon. En cas d’envoi du même nom, conservez le dernier changement annulable. En TypeScript, `!==` signifie « est différent de ». Le mot `if` permet d’exécuter les instructions entre accolades seulement si la condition est vraie.
3. Sous « Équipe actuelle », affichez le bouton « Annuler le dernier changement » uniquement lorsqu’une annulation est possible. Retrouvez le principe de l’avertissement « Hors combat » du module 1 : `condition && élément`. Au clic, redonnez le nom précédent au champ **et** à l’équipe actuelle, puis masquez le bouton.

<details>
<summary>Lire un exemple de condition dans une fonction</summary>

Dans un refuge qui propose de consulter Maëlys, on pourrait écrire cette fonction. Si Maëlys est déjà sélectionnée, React conserve le choix actuel. Sinon, le clic demande de la sélectionner. Pour l’historique, les deux valeurs à comparer sont le brouillon et le nom enregistré.

```tsx
function selectMage() {
  if (selectedChoice !== 'mage') {
    setSelectedChoice('mage')
  }
}
```

</details>

| Geste, dans cet ordre | Résultat attendu |
| --- | --- |
| Écrire « Aube » | Le bouton d’annulation est encore masqué. |
| Enregistrer « Aube », puis enregistrer « Brume » | L’équipe s’appelle « Brume ». Le changement annulable est le passage de « Aube » à « Brume ». |
| Enregistrer une deuxième fois « Brume », puis écrire « Orage » sans envoyer | L’équipe reste « Brume ». Le champ affiche « Orage ». |
| Annuler | Le champ et l’équipe affichent tous les deux « Aube ». Le bouton d’annulation disparaît. |

Après vos essais, consultez Maëlys et Soline : la sélection fonctionne avec chaque défi. Lancez `npm run build` dans votre copie bonus pour vérifier la compilation.
