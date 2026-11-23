# Bloc 9 · Écrire, relire, puis enregistrer

Au refuge, vous allez afficher un message d’accueil. Vous pourrez le modifier dans un champ et choisir quand publier le nouveau texte. Voici ce que vous obtiendrez en cliquant sur **Publier**.

| Geste | Texte dans le champ | Message affiché |
| --- | --- | --- |
| Ouvrir le refuge | Bienvenue | Bienvenue |
| Effacer le texte et écrire « Entrez ! » | Entrez ! | Bienvenue |
| Cliquer sur Publier | Entrez ! | Entrez ! |

C’est le même geste que sur une page de profil : pendant que vous corrigez votre prénom, le nom public reste celui que vous avez enregistré. Vous apprendrez ce geste sur le message du refuge, puis vous l’appliquerez au nom de l’équipe dans les exercices.

## 1 · Préparer le refuge

1. Ouvrez le projet avec lequel vous avez terminé M1. Si vous avez suivi le rattrapage, ouvrez votre copie **complétée** de `refuge`. Dans le terminal, à côté de `package.json`, lancez `npm run dev` et ouvrez l’adresse indiquée après **Local**.
2. Consultez Maëlys. Sa fiche indique déjà **Points de vie : 60 / 60**. Dans `src/App.tsx`, cherchez le texte **Vie manquante** dans la fonction `HeroCard`. Retirez son libellé `<dt>Vie manquante</dt>` et le `<dd>…</dd>` qui donne sa valeur. Gardez la ligne **Points de vie**. Dans la version essentielle, `getMissingHealth` ne sert plus : retirez sa définition. Les fonctions qui calculent le maximum de vie et le score d’attaque servent encore.
3. Copiez [team-form.css](ressources/team-form.css) dans `src/`. Dans `App.tsx`, après les autres imports CSS, ajoutez `import './team-form.css'`. Ce fichier fournit le style du champ et des boutons.

**Vérifiez** que le score de Maëlys vaut toujours **7** et que les deux monstres sont visibles. Jusqu’à la fin du TP, vous travaillerez dans `src/App.tsx`.

<a id="repere-champ"></a>

## 2 · Voir ce que React lit dans le champ

Un **brouillon** est le texte que vous êtes en train d’écrire. React doit pouvoir le lire même si vous venez d’effacer la dernière lettre.

**En haut du fichier**, gardez la ligne qui importe `useState`. Ajoutez cette autre ligne. Avec `import type`, TypeScript apprend à reconnaître le genre d’événement que recevra votre fonction.

```tsx
import type { ChangeEvent } from 'react'
```

**Juste avant la ligne `export default function App()`**, ajoutez le composant ci-dessous. Comme `HeroCard`, il décrit une partie de la page. Ici, le composant possède son propre brouillon.

```tsx
function WelcomeNote() {
  const [draftMessage, setDraftMessage] = useState('Bienvenue')

  function changeMessage(event: ChangeEvent<HTMLInputElement>) {
    setDraftMessage(event.currentTarget.value)
  }

  return (
    <section className="team-panel">
      <h2>Message du refuge</h2>
      <label htmlFor="welcome-message">Message d’accueil</label>
      <input
        id="welcome-message"
        type="text"
        value={draftMessage}
        onChange={changeMessage}
      />
      <p>Brouillon : {draftMessage}</p>
    </section>
  )
}
```

**Dans le `return` de `App`**, repérez la fin de l’en-tête, `</header>`. Sur la ligne suivante, avant la section des héros, ajoutez **`<WelcomeNote />`**. Enregistrez. Le nouveau champ apparaît sous l’image du refuge.

**Essayez.** Cliquez sur les mots **Message d’accueil**. Le curseur entre dans le champ parce que le `htmlFor` du libellé et l’`id` du champ contiennent le même texte. Remplacez « Bienvenue » par « Entrez ! ». La ligne **Brouillon** doit suivre chaque lettre. Effacez tout : elle doit afficher uniquement « Brouillon : ».

**Suivez une frappe dans le code.** Quand vous tapez :

1. `onChange` demande à React d’appeler la fonction `changeMessage`. Le paramètre `event` décrit la modification. Le type `ChangeEvent<HTMLInputElement>` précise que l’événement vient d’un champ HTML.
2. `event.currentTarget` désigne ce champ. `.value` lit **tout son texte**. Si vous venez de terminer « Entrez ! », la fonction reçoit « Entrez ! ».
3. `setDraftMessage(...)` mémorise le texte lu. React affiche cette valeur dans le champ grâce à `value={draftMessage}` et dans le paragraphe grâce à `{draftMessage}`.

C’est ce que signifie **champ contrôlé** : React fournit le texte affiché et le met à jour à chaque modification. Vous savez maintenant relier un champ à un état.

<a id="repere-envoi"></a>

## 3 · Choisir quand le message devient public

Écrivez « Porte ouverte » dans le champ. Vous voulez pouvoir hésiter avant de publier. Il faut donc pouvoir conserver **deux textes différents** : celui du champ et celui que les visiteurs lisent.

En haut du fichier, **remplacez** l’import de types de l’étape 2 par celui-ci :

```tsx
import type { ChangeEvent, SubmitEvent } from 'react'
```

**Remplacez toute la fonction `WelcomeNote` de l’étape 2** par la version suivante. Gardez l’appel `<WelcomeNote />` dans `App`. Les deux états commencent ici avec la même phrase.

```tsx
function WelcomeNote() {
  const [draftMessage, setDraftMessage] = useState('Bienvenue')
  const [publishedMessage, setPublishedMessage] = useState('Bienvenue')

  function changeMessage(event: ChangeEvent<HTMLInputElement>) {
    setDraftMessage(event.currentTarget.value)
  }

  function submitMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPublishedMessage(draftMessage)
  }

  return (
    <section className="team-panel">
      <h2>Message du refuge</h2>
      <form className="team-form" onSubmit={submitMessage}>
        <label htmlFor="welcome-message">Message d’accueil</label>
        <input
          id="welcome-message"
          type="text"
          value={draftMessage}
          onChange={changeMessage}
        />
        <button type="submit">Publier</button>
      </form>
      <p className="team-current">Message affiché : {publishedMessage}</p>
    </section>
  )
}
```

**Essayez d’abord à la souris.** Actualisez la page. Sélectionnez Maëlys, puis écrivez « Entrez ! ». Le champ change et la ligne **Message affiché** reste sur « Bienvenue ». Cliquez sur **Publier**. La ligne devient « Message affiché : Entrez ! » et vous consultez toujours Maëlys.

**Recommencez au clavier.** Écrivez « Refuge ouvert » et appuyez sur **Entrée depuis le champ**. Vous obtenez le même résultat qu’en cliquant sur Publier. Voici pourquoi :

| Écriture | Ce qu’elle fait ici |
| --- | --- |
| `<form onSubmit={submitMessage}>` | Regroupe le champ et le bouton. Quand le formulaire est envoyé, React appelle `submitMessage`. |
| `type="submit"` | Fait de Publier le bouton qui envoie ce formulaire. Entrée dans le champ déclenche aussi cet envoi. |
| `SubmitEvent<HTMLFormElement>` | Indique à TypeScript que la fonction reçoit l’événement d’envoi d’un formulaire. |
| `event.preventDefault()` | Empêche la navigation habituelle du navigateur lors de l’envoi. Vous restez sur le refuge avec le héros sélectionné. |
| `setPublishedMessage(draftMessage)` | Copie le brouillon dans le message publié. Les frappes suivantes modifient uniquement le brouillon. |

Ici « publier » signifie afficher la valeur dans l’application ouverte. Une actualisation volontaire du navigateur remet les deux textes à « Bienvenue ».

<a id="repere-commandes"></a>

## 4 · Essayer un bouton qui agit seulement sur le brouillon

Vous avez publié « Refuge ouvert ». Vous commencez une nouvelle phrase, puis vous changez d’avis. Ajoutez un bouton pour remettre le message publié dans le champ.

Dans `WelcomeNote`, **juste avant son `return`**, ajoutez cette fonction :

```tsx
function restoreMessage() {
  setDraftMessage(publishedMessage)
}
```

Entre le bouton **Publier** et `</form>`, ajoutez :

```tsx
<button type="button" onClick={restoreMessage}>Reprendre le message affiché</button>
```

`type="button"` permet d’effectuer une action à l’intérieur du formulaire sans déclencher son envoi. `onClick={restoreMessage}` donne à React la fonction à appeler au clic. **Essayez** en publiant « Refuge ouvert », puis en tapant « Fermé ». Cliquez sur **Reprendre le message affiché**. Vous devez lire « Refuge ouvert » aux deux endroits.

### Si le résultat vous surprend

- **Le champ revient toujours à son ancienne valeur.** Retrouvez `value`, puis `onChange`. La fonction appelée doit mettre à jour l’état que lit `value`.
- **Le message public change dès la frappe.** Vérifiez ce que lit le paragraphe et quel état la fonction de frappe modifie. Le paragraphe lit `publishedMessage`, la frappe modifie `draftMessage`.
- **Maëlys redevient Aldric après l’envoi.** Vérifiez que `onSubmit` est sur le formulaire et que `event.preventDefault()` est la première instruction du gestionnaire d’envoi.

## Passer au nom de l’équipe

Le panneau de message a servi de modèle. Retirez **son appel `<WelcomeNote />` dans `App`**, puis **la fonction `WelcomeNote` entière**, avec ses fonctions internes. Gardez les imports, la feuille de style et la fiche de héros préparée à l’étape 1. L’écran retrouve son refuge, ses héros et ses monstres.

Ouvrez maintenant les [exercices du bloc 9](exercices-9.md). Vous allez construire le formulaire que votre équipe utilisera au bloc suivant.
