# Bonus du bloc 02 · L’identité du guerrier

Votre fiche donne des nombres, mais le groupe aimerait aussi connaître le rôle de son compagnon. Composez un encart d’identité sous les statistiques, à partir de l’essentiel terminé du bloc 02. Comptez environ 20 à 30 minutes selon votre rédaction. Aucun autre bonus n’est requis.

Conservez votre version essentielle ; vous pouvez travailler dans une copie distincte du projet, sans `node_modules`, puis y lancer `npm ci` et `npm run dev`.

Ajoutez trois variables de type `string` dans `App`, avant `return` : `heroRole`, `heroStrengths` et `heroMotto`. Les données de départ proposées sont respectivement « Protéger le groupe », « Constitution et force » et « Tenir la ligne pour ouvrir la voie ». Vous pouvez reformuler ces textes en gardant le rôle du guerrier.

Dans un nouvel `article` de classe `hero-card`, donnez un titre à cet encart. Affichez la classe et le nom à partir des variables essentielles, les trois informations nouvelles depuis vos variables, ainsi que la force et l’armure depuis les variables numériques existantes. Choisissez une disposition avec les balises déjà utilisées. Ne dupliquez pas les valeurs dans les textes JSX.

**Résultat observable.** Modifier le nom ou la force dans une seule déclaration actualise la fiche essentielle et l’encart d’identité. Les informations restent lisibles à largeur réduite, la compilation réussit, et le refuge essentiel est conservé. Les textes sont fournis ci-dessus et le style est celui du bloc : aucune image ou ressource supplémentaire n’est requise. Cet encart ne conditionne pas les prochaines séances.
