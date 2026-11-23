# Bloc 10 · Expliquer et corriger un nom refusé

Dans le refuge, sélectionnez Maëlys, effacez le nom d’équipe puis appuyez sur Entrée. La fiche de Maëlys reste ouverte, mais la ligne « Équipe actuelle » est vide. Comment refuser cet envoi tout en laissant l’élève corriger sa saisie ?

## Préparer le refuge

Ouvrez le projet commun de fin du bloc 9, après l’exercice 2. Depuis son dossier (celui de `package.json`), lancez `npm run dev` et ouvrez l’adresse locale indiquée. Faites l’essai ci-dessus puis actualisez la page pour retrouver « Les Veilleurs ». Copiez [validation.css](ressources/validation.css) dans `src/`. Dans `src/App.tsx`, sous l’import de `./team-form.css`, ajoutez `import './validation.css'`.

## TP · Le nom d’un poste de garde

Vous allez d’abord construire un petit formulaire temporaire. Son poste s’appelle initialement « Porte ». Le garde accepte de **1 à 8 caractères après retrait des espaces aux extrémités**. Le champ doit toujours montrer exactement ce que vous avez saisi.

Avant de coder, prédisez le résultat pour `'  Val  '`. La méthode `.trim()` produit une nouvelle chaîne, ici `'Val'`. Elle conserve les espaces intérieurs. La propriété `.length` donne ici le nombre 3. Elle compte des unités de texte JavaScript ; un emoji peut en occuper plusieurs. Les essais de longueur de ce bloc utilisent des lettres simples.

Dans `src/App.tsx`, juste avant `export default function App()`, insérez le composant entier ci-dessous. Les imports de `useState`, de `ChangeEvent` et de `SubmitEvent` figurent déjà en tête du fichier depuis le bloc 9.

```tsx
function GuardPost() {
  const [draft, setDraft] = useState('Porte')
  const [postName, setPostName] = useState('Porte')
  const [error, setError] = useState('')

  function changePost(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.currentTarget.value)
    setError('')
  }

  function submitPost(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanName = draft.trim()
    if (cleanName.length === 0) {
      setError('Saisissez un nom de poste.')
      return
    }
    if (cleanName.length > 8) {
      setError('Utilisez au plus 8 caractères.')
      return
    }
    setError('')
    setPostName(cleanName)
  }

  return (
    <section className="team-panel">
      <h2>Poste de garde</h2>
      <form className="team-form" onSubmit={submitPost}>
        <label htmlFor="post-name">Nom du poste</label>
        <input id="post-name" value={draft} onChange={changePost}
          aria-invalid={error !== ''}
          aria-describedby={error ? 'post-help post-error' : 'post-help'} />
        <p id="post-help">De 1 à 8 caractères après retrait des espaces aux extrémités.</p>
        {error !== '' && <p id="post-error" role="alert">{error}</p>}
        <button type="submit">Nommer le poste</button>
      </form>
      <p>Poste actuel : [{postName}]</p>
    </section>
  )
}
```

Dans le JSX de `App`, juste après `</header>`, ajoutez `<GuardPost />`. Le nouveau panneau précède « Votre équipe ». Sélectionnez Maëlys puis cliquez sur le libellé « Nom du poste » pour placer le curseur dans le champ.

| Remplacez la saisie | Envoyez avec Entrée et observez |
| --- | --- |
| Trois espaces | L’aide reste visible et une erreur invite à saisir un nom. Le poste reste [Porte]. |
| Tour ouest | La première nouvelle frappe efface l’erreur. À l’envoi, les 10 caractères déclenchent l’erreur de longueur. |
| Deux espaces, Val, deux espaces | Le poste devient [Val]. Revenez dans le champ et placez le curseur en fin de saisie. Les espaces après Val sont encore présents. Maëlys reste consultée. |

### Suivre un envoi instruction par instruction

Sur « Tour ouest », `event.preventDefault()` empêche la navigation qui réinitialiserait le refuge. `cleanName.length === 0` vaut faux. La seconde condition vaut vrai. Le gestionnaire demande à React d’afficher l’erreur puis `return` quitte **cet appel du gestionnaire**. L’instruction `setPostName(cleanName)` reste ainsi réservée aux noms acceptés. Au contraire, `changePost` met à jour le brouillon brut à chaque frappe. Effacer une erreur à ce moment permet une nouvelle tentative ; la vérification complète aura lieu au prochain envoi.

### Examiner le champ après un refus

Dans les outils de développement du navigateur, ouvrez l’inspecteur d’éléments et sélectionnez le champ du poste. Après un refus, retrouvez `aria-invalid="true"` et les deux identifiants dans `aria-describedby`. Cette liste relie le champ à son aide permanente et à son erreur visible. Chaque identifiant doit désigner un élément présent sur la page. Le paragraphe avec `role="alert"` signale l’apparition du message aux technologies d’assistance. Modifiez la saisie. L’erreur disparaît, `aria-invalid` vaut désormais `false` et seul `post-help` demeure dans la liste. Le libellé continue de donner au champ son nom accessible.

## Revenir au projet commun

Retirez l’appel `<GuardPost />` et la fonction `GuardPost`. Conservez le CSS et les imports. Vérifiez que le poste a disparu et que l’équipe peut encore être renommée. Passez aux [exercices du bloc 10](exercices-10.md).
