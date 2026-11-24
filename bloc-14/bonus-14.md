# Bonus 14 · Réorganiser le refuge en onglets

**Point de départ.** Votre bloc 14 fonctionne. Dans votre projet actuel, vous allez d’abord ranger les styles, puis permettre au joueur de choisir la partie du refuge qu’il souhaite consulter.

## 1 · Charger tous les styles depuis un seul fichier

Créez le dossier `src/styles/`. Déplacez-y les feuilles CSS de votre projet en gardant un fichier par sujet. Dans ce même dossier, créez **`style.css`**. Son rôle est de charger les autres feuilles avec une ligne `@import` par fichier, dans leur ordre de chargement actuel. Voici le début pour le refuge de base :

```css
/* Dans src/styles/styles.css, les chemins partent du dossier styles. */
@import './refuge.css';
@import './hero.css';
```

Complétez avec **vos** feuilles, y compris celles de vos ajouts. Dans `src/App.tsx`, remplacez les anciens imports CSS par cette ligne :

```tsx
// App charge toutes les feuilles du refuge par ce fichier.
import './styles/styles.css'
```

Vérifiez aussi les imports CSS dans `main.tsx` et dans vos composants : une feuille déplacée doit être chargée une seule fois. Si une image disparaît, vérifiez le chemin de son `url(...)` depuis le nouveau dossier.

**Votre repère avant de continuer.** Rechargez le refuge. Vous devez retrouver les mêmes couleurs, les mêmes espacements et la même image d’accueil.

## 2 · Regrouper les panneaux derrière des onglets

Placez une rangée de boutons sous le titre du refuge. Au démarrage, une rubrique est visible. Quand le joueur clique sur un autre bouton, cette rubrique prend sa place. L’onglet actif doit être reconnaissable.

**À vous de choisir les noms et le regroupement.** Voici une organisation possible :

| Onglet | Ce que le joueur peut y faire |
| --- | --- |
| Équipe | Renommer l’équipe, consulter et renommer les héros. |
| Expédition | Rechercher un donjon, le choisir et consulter la préparation du départ. |
| Bestiaire | Consulter les monstres. |

Réutilisez vos panneaux existants et trouvez une place à vos ajouts. Quel composant doit connaître l’onglet actif pour que le bouton et le contenu visible soient toujours d’accord ?

**Si vous avez besoin d’un point de départ.** Un `useState` peut garder le nom de l’onglet actif. Des boutons `type="button"` peuvent le changer au clic. Pour garder la saisie et la sélection de chaque rubrique, vous pouvez laisser les panneaux en place et masquer leur groupe avec l’attribut `hidden`. Si vous ajoutez une feuille pour les onglets, importez-la depuis `style.css`.

Si les panneaux perdent leurs marges en passant dans un groupe, regardez la règle `.refuge > section` dans `refuge.css` : le signe `>` vise seulement les sections directement sous le refuge. Adaptez ce sélecteur à votre organisation.

**Quand avez-vous terminé ?** Choisissez la Crypte, tapez `dragon` dans la recherche, passez dans Équipe, puis revenez dans Expédition. Le champ doit toujours contenir `dragon` et la Crypte doit toujours être choisie. Faites aussi le trajet au clavier avec Tab et Entrée.
