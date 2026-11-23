# Bloc 07 · Bonus · Trois créatures illustrées ✨

## Objectif

Enrichissez une copie de votre bestiaire essentiel avec trois créatures supplémentaires et leurs portraits. Aucun bonus précédent requis. Repère : environ 30 à 40 minutes, sans obligation de délai. Les portraits SVG locaux sont fournis dans ressources/portraits-bonus ; leur dessin n’est pas à programmer.

## Données fournies

| id | name | health | armor | portrait |
| --- | --- | --- | --- | --- |
| 'cave-bat' | 'Chauve-souris des grottes' | 16 | 0 | /cave-bat.svg |
| 'ember-spider' | 'Araignée de braise' | 24 | 1 | /ember-spider.svg |
| 'moss-slime' | 'Gelée de mousse' | 30 | 2 | /moss-slime.svg |

Copiez les trois SVG dans public. Pour illustrer aussi les deux créatures essentielles sans nouvelle ressource, elles peuvent utiliser l’image existante /refuge.jpg, avec un texte alternatif décrivant une vue du refuge, sans prétendre représenter le monstre.

## Travail à réaliser

1. Dans votre copie, ajoutez `portrait: string` et `portraitAlt: string` au type Monster. Complétez les deux objets essentiels, puis ajoutez les trois créatures fournies avec leurs chemins et un texte alternatif descriptif propre à chacune.
2. Dans MonsterCard, affichez avant le h3 une image lisant ces deux propriétés et portant className="monster-portrait". En JSX, une image peut recevoir ses valeurs depuis les données. Par exemple, pour un objet nommé lieu, on écrirait `<img src={lieu.image} alt={lieu.description} />`. Adaptez les deux propriétés à votre monstre. Le style est déjà fourni.
3. Modifiez temporairement le nom et l’armure d’une seule nouvelle créature ; vérifiez que sa carte seule change. Déplacez son objet dans le tableau : portrait, nom et statistiques doivent rester ensemble. Restaurez les données.
4. Observez les cinq cartes en largeur normale et à 320 px, puis consultez les trois héros pour vérifier la sélection, les vies et les scores essentiels.

## Résultat observable

Cinq cartes issues d’un seul map, dont trois portraits distincts, aucune clé dupliquée, aucun nom recopié dans MonsterCard. La suite essentielle repart du bestiaire à deux créatures sans portrait. Aucun corrigé de bonus.
