# Bloc 13 · Partager un état entre deux composants 🔗

Dans une boutique, vous choisissez « Retrait » ou « Livraison ». Le bouton doit indiquer le mode choisi et le récapitulatif de la commande doit afficher la même valeur. **Qui garde le choix en mémoire quand les deux zones de l’écran en ont besoin ?**

| À l’écran | Sélecteur | Récapitulatif |
| --- | --- | --- |
| À l’ouverture | Retrait ✓ | Mode choisi · Retrait |
| Après un clic sur « Livraison » | Livraison ✓ | Mode choisi · Livraison |

## Où placer la valeur ?

Un **état** est une valeur que React conserve entre deux affichages d’un composant. Quand plusieurs composants ont besoin de la même valeur, on la place dans leur **parent commun le plus proche**. Dans la boutique, c’est la page de commande. Cette page transmet la valeur actuelle à ses deux enfants au moyen de **props**, les informations qu’un parent fournit à un composant.

Si le sélecteur avait aussi un champ de recherche servant seulement à filtrer ses options, le texte du champ pourrait rester dans le sélecteur. Pour décider où ranger un état, demandez-vous **quelles parties de l’écran doivent suivre ses changements**.

## Comment un clic remonte-t-il au parent ?

Le parent peut transmettre une fonction comme prop. L’enfant l’appelle quand l’utilisateur agit. Le parent met alors son état à jour et React affiche le nouveau choix aux deux endroits.

Le contrat `(mode: string) => void` se lit « reçoit un texte et effectue une action dont on n’attend aucune valeur de retour ». Dans la liste de boutons, `aria-pressed` indique le choix aux outils d’accessibilité. La coche indique le même choix à l’écran.

**Le sélecteur reçoit une valeur et une action.** Voici la première partie du fichier `OrderPage.tsx`.

```tsx
// useState garde en mémoire le mode de réception choisi.
import { useState } from 'react'

type DeliveryPickerProps = {
  mode: string                     // Valeur à afficher sur les boutons.
  onChoose: (mode: string) => void // Action qui reçoit le prochain mode.
}

function DeliveryPicker(props: DeliveryPickerProps) {
  // La flèche fait attendre le clic avant d’envoyer le texte au parent.
  return (
    <div>
      <button type="button" aria-pressed={props.mode === 'Retrait'}
        onClick={() => props.onChoose('Retrait')}>
        Retrait {props.mode === 'Retrait' && '✓'}
      </button>
      <button type="button" aria-pressed={props.mode === 'Livraison'}
        onClick={() => props.onChoose('Livraison')}>
        Livraison {props.mode === 'Livraison' && '✓'}
      </button>
    </div>
  )
}

```

**La page relie ses deux enfants.** Voici la suite du même fichier. Le résumé utilise simplement la valeur reçue.

```tsx
function OrderSummary(props: { mode: string }) {
  // Le résumé affiche la valeur que la page lui transmet.
  return <p>Mode choisi · <strong>{props.mode}</strong></p>
}

export default function OrderPage() {
  // Le sélecteur et le résumé lisent tous les deux ce même état.
  const [mode, setMode] = useState('Retrait')
  return (
    <main>
      <DeliveryPicker mode={mode} onChoose={setMode} />
      <OrderSummary mode={mode} />
    </main>
  )
}
```

**Lisez le trajet du clic.** Dans `onChoose={setMode}`, la page **transmet** une fonction. Dans `props.onChoose('Livraison')`, le sélecteur **appelle** cette fonction avec un texte. `onChoose` est un nom choisi pour cet exemple. `onClick` est la prop prévue par React pour réagir au clic sur un bouton.

Dans `condition && '✓'`, React affiche la coche quand la condition est vraie. Après le clic, le bouton « Livraison » est coché et le récapitulatif affiche « Livraison ». Un seul état a changé.

**À retenir.** Le parent possède la valeur commune. Le sélecteur reçoit la valeur et l’action. Le résumé a besoin de la valeur seule. [Appliquer ce principe au refuge](cours-13.md)
