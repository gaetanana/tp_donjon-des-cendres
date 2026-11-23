# Bloc 10 · Valider le nom d’équipe

Partez de la fin du [TP du poste de garde](cours-10.md), composant temporaire retiré. Les exercices 1 et 2 transforment le projet que vous garderez. Travaillez dans `src/App.tsx`.

## 1 · Refuser un envoi en expliquant la raison

Dans `App`, ajoutez un état texte `teamError`, initialement vide, près de `teamName`. À la fin de `changeTeamName`, effacez l’erreur. Gardez la saisie brute dans `draftName`.

Reprenez la démarche de `submitPost` dans `submitTeamName`. Après avoir empêché la navigation, nettoyez le brouillon dans une variable locale. Pour une valeur nettoyée vide, demandez « Saisissez un nom d’équipe. ». Pour une valeur dépassant 24 caractères, demandez « Utilisez au plus 24 caractères. ». Dans chaque cas, décidez à quel endroit quitter la fonction pour conserver le nom précédent. Sur succès, effacez l’erreur et enregistrez la valeur nettoyée.

Dans le formulaire d’équipe, entre le champ et le bouton, affichez un paragraphe uniquement en présence d’une erreur, comme dans le TP. Donnez-lui `id="team-error"` et `role="alert"`. Enregistrez Aube, puis envoyez un espace. Aube doit rester affiché et le message doit expliquer le refus. Tapez B. Le message disparaît et Aube reste affiché jusqu’au prochain envoi.

## 2 · Relier la règle au champ et vérifier les limites

Dans le même formulaire, ajoutez avant l’erreur une aide permanente, d’identifiant `team-help`, qui donne les deux limites et explique le retrait des espaces de début et de fin. Reprenez sur le champ les deux attributs `aria-` du TP en les adaptant aux identifiants d’équipe. Gardez le bouton d’envoi, le libellé et la sélection de héros fonctionnels. Laissez la saisie de 25 lettres possible pour que la personne voie la raison du refus.

Actualisez, consultez Maëlys puis exécutez les lignes dans l’ordre. Les deux chaînes longues sont fournies pour faciliter le copier-coller.

| Saisie et geste | Observation attendue |
| --- | --- |
| Saisissez deux espaces, Aube du Nord, deux espaces. Envoyez avec Entrée. | Le nom enregistré vaut « Aube du Nord » avec ses espaces intérieurs. Le champ contient toujours les espaces de bord. Maëlys affiche 60 / 60. |
| Envoyez un espace seul, puis le champ vide. | Même message de saisie requise, dernier nom conservé. Le champ est relié à l’aide et à l’erreur. |
| Collez `ABCDEFGHIJKLMNOPQRSTUVWXY` (25 lettres). Cliquez sur le bouton. | L’ancienne erreur a disparu au collage. Une nouvelle alerte indique la limite de 24. Le nom reste inchangé. |
| Retirez Y, puis envoyez `ABCDEFGHIJKLMNOPQRSTUVWX` avec Entrée. | Alerte effacée dès la modification. Les 24 lettres sont acceptées. L’inspecteur montre uniquement `team-help` comme description. |
| Envoyez Z, consultez Soline puis actualisez. | Z est accepté. Soline affiche 80 / 80. Après actualisation, Aldric et Les Veilleurs sont de retour, le bestiaire contient deux monstres. |

Si les espaces de bord sont difficiles à distinguer, entourez provisoirement `{teamName}` de crochets dans « Équipe actuelle » et inspectez le texte du paragraphe. Retirez les crochets après l’essai. Exécutez `npm run build` depuis le dossier du projet. Gardez ce projet pour le bloc 11, avec les deux feuilles `team-form.css` et `validation.css`.

## 3 · Diagnostiquer un refus à la frontière (sur copie)

Dupliquez le projet de fin d’exercice 2 dans un autre dossier. Si vous copiez les sources sans les dépendances, gardez les fichiers du projet et lancez `npm ci` dans la copie avant `npm run dev`. Dans `submitTeamName`, remplacez le test de dépassement par `cleanName.length >= 24` (adaptez le nom local). Essayez 23, 24 puis 25 lettres. Quelle observation contredit l’aide ? Réparez la condition et essayez de nouveau les trois valeurs. Justifiez le choix de l’opérateur à partir de la première valeur refusée.

## 4 · Transposer la règle à une enseigne (sur une nouvelle copie)

Repartez d’une autre copie de l’exercice 2. Avant `App`, créez un composant `InnSign` sur le modèle de `GuardPost`. Appelez-le juste après la section équipe. La première enseigne est « Halte ». Elle accepte entre **2 et 12** caractères après nettoyage. Prévoyez un libellé « Enseigne », une aide permanente, deux motifs de refus distincts et une ligne « Enseigne actuelle ». Choisissez des identifiants propres à ce formulaire. Conservez l’enseigne et le brouillon de l’équipe lors d’un refus.

Écrivez Brume dans le champ équipe sans envoyer. Dans l’enseigne, essayez A, AB, ABCDEFGHIJKL puis ABCDEFGHIJKLM. Prédisez les deux acceptations. Envoyez ensuite «  La Halte  ». L’enseigne affiche La Halte et le champ équipe contient encore Brume. Revenez au projet de fin d’exercice 2 pour la suite du parcours. Les [défis du refuge](bonus-10.md) se réalisent eux aussi sur copie.
