# Bloc 05 · Sélectionner un héros 🖱️

## Objectif et parcours

Vous allez choisir un héros avec trois boutons et consulter **une seule fiche**, celle de la sélection courante. Le refuge conserve ses trois héros ; choisir une fiche ne change ni leur vie ni leur place dans le groupe. Cette interaction se retrouve dans un catalogue professionnel : choisir un produit puis consulter son détail.

Prérequis : objets `Hero`, composant `HeroCard`, props, booléens, unions, ternaire et `&&` des blocs 01 à 04. Temps indicatif : reprise 5 min, lecture et exemples 20 min, exercice 1 25 min ; pause ; lecture de la sélection 10 min, exercice 2 25 min, vérification 15 min. Les exercices font partie des 100 minutes.

## 1. Reprendre le projet essentiel

Ouvrez votre application terminée au bloc 04. Les vies sont 100, 60 et 80 ; chaque héros est disponible. Gardez les types, les trois objets, l’accueil, l’image du refuge, les statistiques et les styles antérieurs. Aucun bonus précédent n’est requis.

Dans `src/App.tsx`, `HeroCardProps` possède **une seule propriété `hero`**. Au bloc 04, trois utilisations de `HeroCard` lui transmettent chacune un objet avec `hero={…}`. Aujourd’hui, vous les remplacerez par une seule utilisation recevant le héros choisi. Gardez le statut et l’avertissement enfants directs de l’`article` : la feuille du bloc 04 utilise ce placement.

Copiez [hero-selection.css](ressources/hero-selection.css) dans `src/hero-selection.css`. Ajoutez `import './hero-selection.css'` après les imports CSS existants. Aucune nouvelle dépendance à installer ; conservez `package.json` et son verrouillage. Si les dépendances sont absentes, exécutez `npm ci` à la racine du projet, puis `npm run dev`. Ouvrez l’adresse Local annoncée. Ctrl+C arrête le serveur ; `npm run dev` le relance.

## 2. Passer une fonction à un événement

Une fonction rassemble des instructions que l’on peut déclencher. Les composants rencontrés sont déjà des fonctions qui renvoient du JSX. Un gestionnaire d’événement est une fonction exécutée à la suite d’une action de l’utilisateur ; il peut effectuer une mise à jour sans renvoyer de JSX.

```tsx
function handleOpenHelp() {
  console.log('Aide demandée')
}

// Dans le JSX du composant :
<button type="button" onClick={handleOpenHelp}>Aide</button>
```

`function` déclare la fonction ; les parenthèses vides indiquent qu’elle ne demande aucun argument. Son corps est entre accolades. `console.log` écrit un message dans la console de développement du navigateur ; cet exemple sert seulement à montrer le déclenchement et n’est pas à ajouter au TP.

`onClick` est la prop React du clic. Entre les accolades JSX, on transmet **la fonction**, sans `()` après son nom. React l’appellera lors du clic. Écrire `onClick={handleOpenHelp()}` appelle la fonction pendant le rendu, avant l’action de l’utilisateur. Utilisez un vrai `button` : il fonctionne aussi au clavier. `type="button"` précise qu’il s’agit d’une commande ordinaire.

## 3. Mémoriser une valeur avec useState

Une variable locale ordinaire ne suffit pas à signaler un changement à React. L’état, ou *state*, conserve une valeur entre les rendus et permet de demander un nouvel affichage.

Voici un exemple indépendant de choix de vue, à lire sans le recopier dans le projet :

```tsx
import { useState } from 'react'

type ViewMode = 'summary' | 'details'

function ViewPicker() {
  const [viewMode, setViewMode] = useState<ViewMode>('summary')

  function handleShowDetails() {
    setViewMode('details')
  }

  return (
    <section>
      <button type="button" onClick={handleShowDetails}>
        Voir les détails
      </button>
      <p>{viewMode === 'summary' ? 'Résumé' : 'Détails'}</p>
    </section>
  )
}
```

L’import entre accolades récupère `useState`, une fonction nommée fournie par React. `from 'react'` désigne le paquet installé, pas un fichier local. Ajoutez cet import une seule fois en haut de `App.tsx`.

| Écriture | Rôle |
| --- | --- |
| `useState<ViewMode>('summary')` | Crée un état acceptant les deux textes de l’union ; la valeur initiale est summary |
| `[viewMode, setViewMode]` | Récupère les deux éléments renvoyés : la valeur courante et sa fonction de mise à jour ; les crochets ne créent pas deux états |
| `setViewMode('details')` | Demande à React de mémoriser details puis de refaire le rendu |
| `viewMode === 'summary'` | Lit la valeur du rendu courant pour choisir le texte |

Les signes `<ViewMode>` indiquent ici le type de la valeur de l’état ; ce ne sont pas des balises JSX. `const` empêche de réaffecter directement les noms ; la mise à jour passe par le setter. N’écrivez ni `viewMode = …` ni une modification directe des props. Après le setter, la variable du gestionnaire conserve la valeur de son rendu actuel : le nouvel affichage vient au rendu suivant.

`useState` est un **Hook** React. Appelez-le au niveau principal du composant, avant son `return`, toujours au même endroit : jamais dans un gestionnaire ou une condition. Appelez le setter dans le gestionnaire, pas directement pendant le rendu, sinon vous risquez une répétition de rendus. Un état local n’est pas une sauvegarde : recharger la page rétablit la valeur initiale.

Réalisez [l’exercice 1](exercices.md#exercice-1).

## 4. Déduire la fiche depuis un seul choix

Dans le TP, l’état sera une union `HeroChoice` composée de `'warrior'`, `'mage'`, `'priest'`. Une seule valeur suffit à désigner le héros choisi. Trois booléens indépendants pourraient autoriser plusieurs sélections contradictoires.

Pour retrouver l’objet associé, utilisez les ternaires connus. Exemple avec trois objets `smallBox`, `mediumBox` et `largeBox` déjà déclarés :

```tsx
const selectedBox = boxSize === 'small'
  ? smallBox
  : boxSize === 'medium'
    ? mediumBox
    : largeBox
```

Lisez de haut en bas : si le choix vaut small, prendre smallBox ; sinon, si c’est medium, prendre mediumBox ; sinon, prendre largeBox. Ce dernier cas est sûr si l’union limite bien le choix aux trois valeurs prévues. Le type de l’objet obtenu est déduit des objets des branches.

Appliquez cette structure à `selectedChoice` pour calculer `selectedHero` dans `App`, **après la déclaration des trois objets** et avant le `return`. Ce calcul se refait à chaque rendu ; il n’a pas besoin d’un second état. La fiche reçoit ensuite cet objet par sa prop `hero`. `HeroCard` continue à lire ses props sans les modifier et recalcule sa disponibilité.

## 5. Rendre le choix perceptible

Les trois boutons gardent un nom explicite : « Consulter Aldric », « Consulter Maëlys » et « Consulter Soline ». Pour indiquer quel bouton est actif, utilisez une comparaison :

```tsx
<button
  type="button"
  onClick={handleShowDetails}
  aria-pressed={viewMode === 'details'}
>
  Voir les détails
</button>
```

`aria-pressed` reçoit ici un booléen. Il indique l’état du bouton aux technologies d’assistance ; le CSS fourni cible aussi cet attribut pour encadrer le choix actif. Cette valeur est dérivée du même état que le texte ou la fiche. Conservez le bouton actif cliquable : un second clic garde le même choix. N’ajoutez pas `disabled`.

Dans le TP, placez les trois boutons dans un `div` avec `className="hero-selector"`. Ajoutez aussi un paragraphe visible « Héros consulté : … » fondé sur `selectedHero.name`. Le choix se comprend sans la couleur.

Réalisez [l’exercice 2 puis les vérifications](exercices.md#exercice-2).

## Fin de séance

Une seule valeur d’état pilote les trois boutons et l’unique fiche. L’accueil et « En première ligne : Aldric » restent présents : cette dernière phrase décrit le groupe, pas la consultation. Consulter le mage hors combat reste possible ; consulter n’est pas agir pendant un combat.

Conservez le résultat essentiel, vies aux maxima. Le bonus indépendant, remis séparément, est facultatif ; le corrigé est remis en fin de séance. La prochaine séance réutilisera les données sans exiger ce bonus.
