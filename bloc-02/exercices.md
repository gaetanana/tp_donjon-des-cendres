# Bloc 02 · Travaux pratiques

Les trois exercices sont essentiels. Gardez le [cours](cours.md) et les [données fournies](ressources/donnees-heros.md) ouverts. Travaillez dans votre application issue du bloc 01, sans remplacer votre accueil personnel.

<a id="exercice-1"></a>
## Exercice 1 · Un nom, deux affichages

1. Copiez `hero.css` et ajoutez son import comme indiqué dans le cours. Conservez aussi l’import de `refuge.css`.
2. Dans le corps de `App`, avant `return`, déclarez `heroName` de type `string` avec la valeur **Aldric**, puis `heroClass` de type `string` avec la valeur **Guerrier**.
3. Conservez le `header` et la section « Avant le départ ». Dans cette section, après votre phrase sur les trois rôles, ajoutez un paragraphe annonçant **En première ligne :** suivi du nom issu de `heroName`.
4. Après ce paragraphe, toujours dans la section, ajoutez un `article` de classe `hero-card`. Son `h2` affiche le même nom depuis la variable. Un paragraphe affiche **Classe :** suivi de la valeur de `heroClass`.
5. Changez la valeur initiale de `heroName` en **Bérénice**, enregistrez et vérifiez les deux emplacements. Ils doivent changer ensemble sans modification des balises. Rétablissez ensuite **Aldric**.

**Point de passage.** Montrez la déclaration du nom et ses deux utilisations. La chaîne `Aldric` ne doit être écrite qu’une seule fois dans `App.tsx`.

<a id="exercice-2"></a>
## Exercice 2 · Afficher les statistiques

1. Ajoutez avant `return` les sept variables numériques du tableau de données : `health`, `maxHealth`, `constitution`, `strength`, `power`, `armor` et `level`. Écrivez les types `number` et les valeurs sans guillemets.
2. Dans votre `article`, après le paragraphe de classe, ajoutez un `dl` de classe `hero-stats`. Il contient sept couples `dt` / `dd` dans l’ordre du tableau ci-dessous. Les valeurs proviennent des variables, avec des accolades JSX.

| Libellé (`dt`) | Contenu attendu dans la valeur (`dd`) |
| --- | --- |
| Niveau | La valeur de `level` |
| Points de vie | La valeur de `health`, une barre oblique `/`, puis celle de `maxHealth` |
| Vie manquante | Le résultat de `maxHealth - health` |
| Constitution | La valeur de `constitution` |
| Force | La valeur de `strength` |
| Puissance | La valeur de `power` |
| Armure | La valeur de `armor` |

3. Avec les valeurs initiales, vérifiez **100 / 100** et une vie manquante égale à **0**. Les autres nombres doivent correspondre aux données fournies.
4. Changez uniquement la valeur initiale de `health` en **80** et enregistrez. Vérifiez **80 / 100** et **20** de vie manquante. Ne retouchez pas les valeurs dans le JSX et ne changez pas `maxHealth`.
5. Rétablissez `health` à **100**. La vie manquante revient à **0**. Conservez cet état pour la suite du parcours.

**Contrôle.** Votre fiche doit pouvoir être mise à jour en modifiant ses données avant `return`. Il n’y a aucun bouton ni combat à programmer.

<a id="exercice-3"></a>
## Exercice 3 · Repérer une erreur de type et terminer

1. Remplacez provisoirement la valeur de `health` par le texte `'80'`, avec des guillemets, en gardant `: number`. Enregistrez. Repérez l’indication de l’éditeur, puis lancez `npm run build` comme expliqué dans le cours.
2. Lisez le message TypeScript : un texte (`string`) a été donné là où un nombre (`number`) était attendu. La commande doit échouer sur cette affectation, même si le navigateur affiche encore une page.
3. Corrigez la valeur initiale en remettant **100**, sans guillemets. Enregistrez puis relancez `npm run build`. La commande doit se terminer sans erreur. Ne conservez pas l’erreur volontaire.
4. Dans le navigateur, vérifiez l’accueil antérieur, le nom à ses deux emplacements, la classe et les sept lignes de statistiques. Réduisez la fenêtre puis agrandissez-la : libellés et valeurs restent lisibles, sans partie de la fiche hors écran.
5. Arrêtez le serveur avec Ctrl+C lorsque vous quittez votre poste. Gardez tous les fichiers de votre application pour le prochain bloc.
