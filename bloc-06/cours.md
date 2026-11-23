# Bloc 06 · Calculer les statistiques 🧮

## Objectif et parcours

Vous allez nommer des calculs réutilisables et afficher un score d’attaque pour le héros consulté. Les boutons et la sélection du bloc 05 restent opérationnels. Dans une application professionnelle, la même démarche permet de calculer un montant ou un indicateur sans recopier sa formule dans plusieurs écrans.

Prérequis : objets typés, props, expressions arithmétiques, conditions et sélection avec `useState`. Budget indicatif : reprise 5 min, lecture 20 min, exercice 1 25 min ; pause ; lecture et exercice 2 30 min, vérifications 20 min. Total : 100 minutes, bonus exclu.

## 1. Reprendre l’application

Reprenez votre sortie essentielle du bloc 05 : une seule fiche, trois boutons, vies 100, 60 et 80. Ne reprenez aucun bonus. Conservez les imports CSS, l’image, l’accueil, les types et les trois gestionnaires. Dans la section, gardez cet ordre : texte « En première ligne », boutons, résumé « Héros consulté », fiche. Si vos boutons précèdent le texte, vous pouvez les déplacer après lui sans changer leur code.

Tout le travail se fait dans `src/App.tsx`. Aucune dépendance ni feuille CSS nouvelle. Les [formules et références](ressources/formules.md) sont fournies ; gardez ce document ouvert à côté du code. Conservez `package.json` et son verrou. Si les dépendances sont absentes : `npm ci`. Lancez `npm run dev` puis ouvrez l’adresse Local annoncée. Ctrl+C arrête le serveur ; la même commande le relance.

Lors d’un enregistrement, le rechargement à chaud peut conserver le choix courant. Un vrai rechargement du navigateur rétablit Aldric. Faites défiler la page pour observer le résumé et la fiche sous les boutons ; un changement de fiche ne déplace pas automatiquement la page.

## 2. Une fonction reçoit et renvoie des valeurs

Au bloc 05, vos gestionnaires n’avaient pas de paramètre. Une fonction de calcul peut recevoir les valeurs à traiter : ses **paramètres**. Elle renvoie son résultat avec `return`.

Exemple indépendant à lire, sans l’ajouter à l’application :

```ts
function getTotalPrice(unitPrice: number, quantity: number): number {
  return unitPrice * quantity
}

const totalPrice: number = getTotalPrice(7, 3)
// totalPrice vaut 21
```

| Élément | Rôle |
| --- | --- |
| `unitPrice`, `quantity` | Noms locaux des paramètres, accessibles dans le corps de la fonction |
| `: number` après chaque paramètre | Type attendu pour chaque valeur reçue |
| `: number` après `)` | Type du résultat renvoyé |
| `return` | Renvoie une valeur puis termine cet appel de la fonction |
| `7`, `3` dans l’appel | Arguments : valeurs effectivement transmises, dans l’ordre des paramètres |

La déclaration définit une règle ; elle ne calcule rien tant qu’on ne l’appelle pas. Chaque appel possède ses propres paramètres. `getTotalPrice(4, 2)` renvoie 8, sans changer `totalPrice` qui vaut toujours 21. Une variable déclarée dans la fonction reste locale à celle-ci. Une fonction qui se limite à `console.log` affiche un message, mais ne renvoie pas ce nombre à son appelant.

Écrire `getTotalPrice` désigne la fonction ; écrire `getTotalPrice(7, 3)` obtient le résultat de son exécution. Cette distinction explique aussi pourquoi un gestionnaire se transmet sans parenthèses dans `onClick`. Un calcul pur peut, lui, être appelé pendant le rendu.

Gardez le résultat sur la même ligne que `return`, comme dans les exemples. Sans résultat renvoyé, TypeScript signalera que la fonction annoncée `: number` ne respecte pas son contrat.

**Réalisez l’exercice 1** dans [exercices.md](exercices.md).

## 3. Recevoir un objet typé

Un paramètre peut être un objet. Le type décrit les propriétés utilisables ; il ne crée pas un nouvel objet.

```ts
type Parcel = {
  weight: number
  handlingFee: number
}

function getShippingCost(parcel: Parcel): number {
  return parcel.weight * 2 + parcel.handlingFee
}

const sampleParcel: Parcel = { weight: 4, handlingFee: 3 }
const shippingCost = getShippingCost(sampleParcel) // 11
```

`parcel.weight` lit la propriété de l’objet reçu. Le nom du paramètre peut différer de celui de l’argument : ici `parcel` désigne `sampleParcel` pendant l’appel. Dans le TP, le paramètre `hero: Hero` permettra de lire `hero.strength` et `hero.level`.

Attention : recevoir un objet ne vous autorise pas à modifier ses propriétés. `const` empêche de réaffecter une variable ; il ne bloque pas à lui seul les modifications internes d’un objet. Nos fonctions doivent **lire et calculer**, sans écrire dans les objets reçus.

## 4. Calculer pendant le rendu

Une fonction pure donne le même résultat pour les mêmes entrées et ne modifie rien à l’extérieur de son appel. Elle peut servir plusieurs fois sans ajouter de points au héros ni déclencher un nouvel état React.

```tsx
// Exemple de JSX, dans un composant possédant sampleParcel :
<p>Livraison : {getShippingCost(sampleParcel)} pièces</p>
```

Les accolades JSX évaluent l’appel et affichent son résultat. Dans `HeroCard`, utilisez `props.hero` pour calculer à partir du héros reçu. Dans `App`, les trois objets conservent leurs données propres. Ne créez pas d’état pour un résultat que l’on sait recalculer à partir des données : la sélection existante suffit.

Placez les fonctions de calcul **après les types et avant `HeroCard`**, hors des composants. Elles peuvent ainsi être utilisées dans `App` et `HeroCard`, sans dépendre d’une sélection ou d’un objet local particulier. Ne déplacez pas les Hooks dans ces fonctions.

**Réalisez l’exercice 2 puis les contrôles de l’exercice 3.**

## 5. Détecter une erreur

| Symptôme | Vérification |
| --- | --- |
| Un nombre attendu devient une erreur TypeScript | Vérifiez les types des arguments et le `return` |
| Le texte ne montre aucun résultat | Vérifiez l’appel avec `()` et les arguments ; ne passez pas la fonction seule au JSX |
| Le calcul reste celui d’Aldric après sélection de Maëlys | Passez `props.hero`, pas un objet guerrier fixé dans la fonction |
| La force change après plusieurs clics | Retirez toute affectation dans les fonctions : on renvoie un calcul, on ne modifie pas le héros |
| Le navigateur fonctionne malgré une erreur de type | Le serveur de développement ne remplace pas `npm run build` |

## Fin de séance

Vous avez trois fonctions de calcul, huit couples de statistiques par fiche et la même sélection unique. Les données restent intactes après plusieurs appels. Lancez `npm run build`, puis revenez à Aldric par un rechargement réel.

Le bonus, distribué séparément, propose une estimation de soin. Il n’est requis pour aucune séance suivante ; le corrigé essentiel est remis en fin de cours.
