# Bloc 05 · Bonus indépendant : un détail repliable

## Objectif

Depuis l’essentiel terminé, ajoutez un bouton « Afficher les détails » permettant d’ouvrir ou fermer un panneau avec le portrait et l’histoire du héros consulté. Si vous changez de héros pendant que le panneau est ouvert, portrait et histoire doivent suivre immédiatement le nouveau choix. Repère libre : environ 25 à 35 minutes, hors essentiel.

Conservez une copie de votre essentiel avant de commencer. Aucun bonus précédent n’est nécessaire. Aucun corrigé de bonus n’est fourni.

## Ressources

Les trois portraits vectoriels sont fournis : [guerrier](../../public/warrior.svg), [mage](../../public/portraits/mage.svg), [prêtre](../../public/priest.svg). Copiez-les dans `public/portraits/`. Dans un attribut `src`, `/portraits/warrior.svg` désigne le fichier public correspondant, comme l’image du refuge du bloc 01. Copiez aussi [hero-details.css](../../src/styles/hero-details.css) dans `src/` et importez cette feuille après les autres CSS dans `App.tsx`. Elle contient les styles du panneau et de son image.

| Choix | Portrait | Histoire fournie |
| --- | --- | --- |
| warrior | /portraits/warrior.svg | Aldric protège le passage du col et veille sur les voyageurs. |
| mage | /portraits/mage.svg | Maëlys étudie les braises anciennes pour éclairer les chemins oubliés. |
| priest | /portraits/priest.svg | Soline accueille les blessés au refuge et entretient sa lumière. |

## Connaissance complémentaire

Un second état booléen est adapté à l’ouverture du panneau : elle est indépendante du choix de héros. L’opérateur `!` inverse un booléen (`!true` vaut false, `!false` vaut true). Dans un gestionnaire, vous pouvez demander au setter la valeur opposée à celle du rendu courant. Ce bouton effectue une seule mise à jour par clic. Placez le Hook au niveau principal de `App` ; démarrez fermé.

## Travail demandé

1. Créez l’état d’ouverture et son gestionnaire de bascule. Le texte du bouton indique l’action suivante : « Afficher les détails » ou « Masquer les détails ». Ajoutez `aria-expanded` avec le booléen d’ouverture pour annoncer cet état.
2. Affichez le panneau seulement lorsqu’il est ouvert, grâce à une comparaison booléenne ou au booléen directement suivi de `&&`. Donnez-lui la classe `hero-details`.
3. Déduisez le chemin du portrait et le texte historique depuis `selectedChoice` avec les ternaires du cours ; ne les stockez pas dans de nouveaux états. Utilisez `selectedHero.name` pour le titre du panneau et le texte alternatif du portrait (`alt`).
4. Conservez le panneau ouvert quand la sélection change ; il doit alors afficher les nouvelles données. Gardez les trois boutons et la fiche essentielle inchangés.

## Résultat observable

Ouvrez sur Aldric, passez à Maëlys puis Soline : texte, titre et portrait correspondent toujours à la fiche. Fermez, changez de sélection puis rouvrez : les détails correspondent au choix actuel. Rechargez : Aldric et panneau fermé. Vérifiez au clavier et à 320 px, puis compilez. Aucun changement de vie, aucune histoire mémorisée séparément du choix et aucune dépendance de l’essentiel à ce panneau.
