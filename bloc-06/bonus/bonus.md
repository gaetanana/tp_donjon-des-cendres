# Bloc 06 · Bonus · Estimer un soin ✨

## Objectif

Ajoutez sous la fiche un aperçu numérique des soins théoriques du héros consulté. Il s’agit d’un indicateur d’entraînement, même si le héros n’est pas prêtre : aucune vie n’est modifiée et aucune action de combat n’est déclenchée.

Partez d’une copie de votre essentiel terminé au bloc 06. Aucun bonus antérieur requis. Repère : environ 25 à 35 minutes, sans obligation de délai. Ressources : données Hero et styles existants ; aucune image ou installation supplémentaire.

## Formule et réalisation

Formule fournie : soin théorique = puissance × 3 + niveau. Données de référence au niveau 1 : Aldric 7, Maëlys 43, Soline 31 ; puissance 0 au niveau 1 donne 1.

1. Écrivez une fonction pure `getHealingEstimate` recevant un `Hero` et renvoyant un `number`.
2. Dans `HeroCard`, après le `dl`, ajoutez un paragraphe « Soin théorique : … points » utilisant cette fonction. Ajoutez une courte phrase qui explique que ce nombre n’est pas une restauration effective de vie.
3. Vérifiez les trois héros, plusieurs sélections répétées et le cas temporaire de puissance nulle. Restaurez les données ensuite.
4. Contrôlez que les scores d’attaque, les statuts et les vies du parcours essentiel restent corrects. Observez aussi une fenêtre étroite.

## Résultat observable

Le soin affiché correspond au héros consulté, sans nombre recopié dans le JSX et sans changement des objets. La sélection reste unique. Ne créez pas de bouton de soin, d’état supplémentaire ou de plafond de restauration à ce stade.

Conservez cette extension dans votre copie facultative ; la suite essentielle repart du bloc 06 sans ce panneau. Aucun corrigé de bonus n’est fourni.
