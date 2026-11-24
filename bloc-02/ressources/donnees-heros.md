# Données du bloc 02 · Le guerrier

Ces valeurs sont fournies pour l’affichage de la fiche. Déclarez chaque variable dans `App`, avant `return`. Vous ne devez ni inventer un équilibrage ni calculer les statistiques du héros aujourd’hui.

| Variable | Type | Valeur initiale | Sens |
| --- | --- | --- | --- |
| `heroName` | `string` | `'Aldric'` | Nom du héros |
| `heroClass` | `string` | `'Guerrier'` | Classe affichée |
| `health` | `number` | `100` | Points de vie actuels |
| `maxHealth` | `number` | `100` | Maximum des points de vie |
| `constitution` | `number` | `10` | Constitution |
| `strength` | `number` | `12` | Force |
| `power` | `number` | `2` | Puissance |
| `armor` | `number` | `3` | Armure |
| `level` | `number` | `1` | Niveau |

Dans la fiche, la vie manquante est une expression : maximum moins points actuels. Références : `100 - 100` vaut `0` ; `100 - 80` vaut `20`. Le changement à 80 sert seulement au contrôle d’affichage ; revenez ensuite à 100. Les règles de progression et de combat seront introduites au moment de les programmer.

## Ressource de présentation

Copiez [hero.css](../../src/styles/hero.css) dans `src`, puis importez-le depuis `App.tsx`. Le fichier complète le style du refuge déjà présent ; aucun remplacement de `refuge.css` ni nouvelle installation de dépendances n’est nécessaire.
