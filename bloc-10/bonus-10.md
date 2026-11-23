# Bloc 10 · Trois défis pour le refuge

Pour chaque défi, dupliquez le projet conservé après l’[exercice 2](exercices-10.md). Copiez les sources, les ressources, les manifestes et la configuration. Dans une copie sans dépendances, lancez `npm ci`, puis `npm run dev`. Chaque défi fonctionne seul. Vous pouvez ensuite les réunir dans une quatrième copie.

## 1 · Le compteur de l’intendant

Dans `src/App.tsx`, calculez dans `App`, avant son `return`, la longueur du nom nettoyé à partir du brouillon courant. Ce nombre est **dérivé** du texte à chaque affichage. Vous pouvez le calculer comme `const size = '  Val  '.trim().length`, qui donne 3. Remplacez le texte fixe par le brouillon pour suivre chaque frappe.

Dans le formulaire, juste après l’aide permanente, affichez le nombre de caractères encore disponibles jusqu’à 24. Si la limite est dépassée, affichez plutôt le nombre en trop. Le choix entre deux textes peut prendre la forme `size > 8 ? 'Trop long' : 'Dans la limite'`, avec votre propre limite. Copiez [name-meter.css](ressources/bonus/name-meter.css) dans `src/`, importez-le dans `src/App.tsx` comme au cours et donnez au paragraphe la classe `name-meter`.

Essayez deux espaces autour de Val (21 disponibles), 24 lettres (0 disponible), puis 26 lettres (2 en trop). Le compteur change même avant l’envoi. Le nom enregistré reste stable pendant ces essais.

## 2 · Le sceau du registre

Sous « Équipe actuelle », affichez toujours l’un des trois textes suivants pour que le scribe sache ce qui serait envoyé. Dans `App`, avant son `return`, calculez la valeur nettoyée du brouillon. Déclarez une fonction locale `describeSeal()` qui lit cette valeur et le nom enregistré. Une fonction peut rendre un texte directement : `return 'Sceau posé'`. Un `if` suivi de ce `return` termine l’appel comme dans le gestionnaire du TP. Dans le paragraphe JSX, affichez le résultat avec `{describeSeal()}`.

| Situation actuelle | Texte du sceau |
| --- | --- |
| Nom nettoyé vide ou trop long | Sceau impossible |
| Valeur recevable identique au nom enregistré | Sceau posé |
| Autre valeur recevable | Sceau prêt |

Au chargement, le sceau est posé. Saisissez Aube sans envoyer, enregistrez puis ajoutez un espace à la fin. Le sceau passe de prêt à posé et reste posé après l’espace. Effacez tout et envoyez. « Sceau impossible » et l’erreur de saisie doivent être visibles ensemble. Pour réunir deux conditions, `a || b` est vrai dès qu’au moins l’une des deux est vraie. Vous pouvez aussi écrire deux retours successifs.

## 3 · Abandonner une tentative

Dans le formulaire d’équipe, après l’envoi, ajoutez un bouton permanent « Revenir au nom enregistré ». Relisez le bouton de reprise du bloc 9. Dans un formulaire, `type="button"` permet d’exécuter son propre gestionnaire sans soumettre. Dans `App`, à côté de `changeTeamName`, écrivez un gestionnaire qui recopie le dernier nom enregistré dans le champ et retire l’alerte. Branchez-le à `onClick`. Le bouton reste utilisable au clavier.

Enregistrez «  Brume  », consultez Maëlys puis envoyez 25 lettres. Avec Tab, rejoignez le bouton de reprise et activez-le avec Entrée. Le champ doit revenir à Brume, sans espaces de bord. L’aide reste visible, le champ redevient valide et Maëlys reste consultée. Répétez la reprise sur un brouillon recevable mais jamais envoyé. Le dernier nom enregistré reste Brume.

## Réunir les trois défis

Dans la copie combinée, actualisez puis consultez Soline. Saisissez deux espaces autour de Val. Attendez 21 disponibles et « Sceau prêt ». Envoyez, puis saisissez 26 lettres et envoyez encore. Vérifiez ensemble l’alerte, les 2 caractères en trop, « Sceau impossible » et le nom enregistré Val. Activez la reprise. Le champ contient Val, l’alerte disparaît, le compteur revient à 21, le sceau est posé et Soline reste consultée. Compilez chaque copie avec `npm run build`.
