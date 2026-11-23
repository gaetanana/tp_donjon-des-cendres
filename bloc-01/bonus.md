# Bonus du bloc 01 · La carte d’accueil de votre refuge

Dans votre version du jeu, les aventuriers consultent à leur arrivée une carte laissée par le gardien du lieu. Composez cette carte en réutilisant les balises du cours. Prévoyez environ 20 à 30 minutes selon le temps que vous consacrez au texte et à la présentation.

**Préparation.** Arrêtez le serveur et conservez votre projet essentiel. Si vous souhaitez séparer cette extension, copiez le projet dans un second dossier en laissant de côté `node_modules`, puis exécutez `npm ci` et `npm run dev` dans cette copie.

Ajoutez une section sous « Avant le départ ». Donnez à votre refuge un nom de votre invention, une devise et une courte présentation qui explique un détail du lieu. Associez une illustration à cette carte. Pour représenter le bâtiment, réutilisez `public/refuge.jpg`. Si vous préférez le blason, copiez le [sceau fourni avec le bonus](ressources/bonus/sceau.svg) dans le dossier `public` de votre propre projet. Dans le JSX, une image locale placée dans `public` s’utilise avec un chemin depuis la racine du site. Par exemple, pour un fichier fictif nommé `carte.png`, on écrirait `<img src="/carte.png" alt="Carte des passages du col" />`. Adaptez le chemin et la description à votre choix.

**Votre carte est prête lorsque** vous pouvez montrer le nom, la devise et le détail du lieu sur une fenêtre large puis étroite, et que le texte alternatif décrit l’illustration si elle apporte une information. Le refuge essentiel et ses trois héros restent lisibles. Cette carte est indépendante des prochaines séances.
