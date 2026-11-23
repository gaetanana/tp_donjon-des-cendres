# Bloc 04 · Bonus facultatif · Trois états de santé 🩺

## Objectif

À partir de l’essentiel terminé du bloc 04, ajoutez un second indicateur qui distingue une santé normale, blessée ou critique. Conservez l’indicateur Disponible/Hors combat et son avertissement. Aucun bonus antérieur requis ; repère indicatif de 20 à 30 minutes, sans délai imposé. Aucune interaction à programmer.

## Règles et ressources

| Condition, à examiner dans cet ordre | Texte de santé |
| --- | --- |
| Vie égale à 0 | Aucun indicateur de santé supplémentaire : le héros est déjà signalé hors combat |
| Vie positive et inférieure ou égale au quart de la vie maximum | Critique |
| Vie supérieure au quart mais inférieure à la vie maximum | Blessé |
| Vie égale à la vie maximum | Normal |

Le quart se calcule avec `/ 4` (`/` signifie division). Utilisez seulement des vies entre 0 et le maximum. Pour une vie positive, vous pouvez choisir un premier résultat avec `? :`, puis utiliser **un second ternaire entre parenthèses dans la branche sinon** : `conditionA ? valeurA : (conditionB ? valeurB : valeurC)`. Évaluez les seuils dans l’ordre du tableau.

Copiez [health-bonus.css](ressources/health-bonus.css) dans `src` et importez-le dans `App.tsx`. Il fournit les classes `health-normal`, `health-wounded`, `health-critical`. Aucune image ou installation nécessaire.

## Travail à réaliser

1. Décrivez les trois textes par une union `HealthState` : `'Normal'`, `'Blessé'`, `'Critique'`. Calculez la valeur dans `HeroCard` depuis les props, sans modifier les objets ni stocker un second état indépendant.
2. Affichez un paragraphe de santé seulement pour une vie positive. Choisissez sa classe CSS depuis son texte ; le texte doit suffire pour comprendre son état.
3. Pour Maëlys, vérifiez successivement 60 (Normal), 59 (Blessé), 16 (Blessé), 15 (Critique), 1 (Critique), 0 (Hors combat seulement). Les deux autres héros ne changent pas. Contrôlez la lisibilité large/étroite et la compilation.
4. Rétablissez la vie à 60. L’essentiel doit toujours fonctionner avec ou sans cet indicateur et son import CSS. Aucun nouveau membre ni changement de classe à introduire.

**Résultat observable.** Un indicateur textuel supplémentaire pour chaque héros vivant et des seuils exacts, sans remplacer la règle essentielle de disponibilité. Ce bonus n’a pas de corrigé.
