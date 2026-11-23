# Bloc 08 · Bonus · Deux portraits à consulter ✨

## Objectif et départ

Sur une **copie** de votre essentiel restauré, ajoutez un panneau montrant côte à côte le portrait du héros consulté et celui d’un monstre consulté. Le panneau sert à comparer visuellement deux fiches, sans combat. Aucun bonus antérieur requis. Repère : environ 35 à 50 minutes, sans obligation de délai.

Les cinq portraits locaux et le [CSS du panneau](ressources/portraits-bonus.css) sont fournis avec ce bloc. Copiez les SVG de `ressources/portraits-bonus/` dans `public/`. Copiez le CSS dans `src/portraits-bonus.css` et importez-le en conservant les styles existants. Aucun portrait ne dépend d’une adresse distante. Le code React du panneau reste à écrire.

## Données et contrats à adapter dans la copie

Ajoutez `portrait: string` et `portraitAlt: string` aux types `Hero` et `Monster`, puis complétez chaque objet avec son chemin et son texte alternatif :

| Objet | portrait | portraitAlt |
| --- | --- | --- |
| warrior | '/warrior.svg' | 'Silhouette d’Aldric avec des épées croisées, sur fond sombre' |
| mage | '/mage.svg' | 'Silhouette violette de Maëlys avec une étoile, sur fond sombre' |
| priest | '/priest.svg' | 'Silhouette dorée de Soline avec un symbole solaire, sur fond sombre' |
| ash-rat | '/ash-rat.svg' | 'Rat gris aux oreilles rondes, sur fond brun' |
| stone-sentinel | '/stone-sentinel.svg' | 'Sentinelle de pierre aux yeux ambrés, sur fond ardoise' |

Ajoutez une union `MonsterChoice` limitée à `'ash-rat' | 'stone-sentinel'` et utilisez-la pour `Monster.id`. Gardez `HeroChoice` et les trois héros essentiels.

## Travail à réaliser

1. Réutilisez l’état de héros déjà présent : ne créez pas une seconde sélection de héros. Le portrait et le nom du panneau doivent lire `selectedHero`, comme la fiche.
2. Ajoutez dans `App` un état indépendant de type `MonsterChoice`, initialisé au rat. Produisez deux boutons par `monsters.map`, portant une clé stable, un texte « Consulter » suivi du nom et `aria-pressed`. Chaque fonction de clic choisit l’identifiant correspondant, sans appeler le setter pendant le rendu. Les boutons ne changent pas les vies.
3. Calculez `selectedMonster` avec une condition : premier objet `monsters[0]` si le choix est le rat, deuxième objet `monsters[1]` sinon. Les deux objets restent présents, dans cet ordre fixe, dans cette copie bonus. Aucun ajout de monstre ni réordonnancement n’est demandé ici ; cette borne permet de réutiliser seulement les acquis de M1.
4. Après le bestiaire, ajoutez une `section.portrait-panel` avec un titre de niveau 2. Placez les deux boutons monstres dans `div.hero-selector`. Dans `div.portrait-pair`, placez deux articles : chacun contient une image de classe `comparison-portrait` lisant le chemin et le texte alternatif de l’objet sélectionné, puis son nom dans un titre de niveau 3. Pour afficher une image depuis des données, la syntaxe JSX est par exemple `<img src={lieu.image} alt={lieu.description} />` pour un objet lieu. Adaptez-la aux propriétés des objets sélectionnés. Le CSS fourni juxtapose les portraits en largeur normale et les empile en fenêtre étroite.
5. Consultez alternativement les trois héros et les deux monstres. Le portrait du héros suit sa fiche ; choisir un monstre ne change pas le héros, et inversement. Contrôlez noms, images, focus, boutons actifs et absence d’erreurs à 1366 px et 320 px, puis la compilation.

## Résultat observable et indépendance

Un panneau, deux portraits locaux et deux choix indépendants. Les trois héros essentiels, leur fiche et les deux cartes de bestiaire restent corrects ; aucun dégât ni soin. Un rechargement revient à Aldric et au rat. La prochaine séance repart de votre essentiel sauvegardé, sans ce panneau ni les champs ajoutés.

Aucun corrigé de bonus.
