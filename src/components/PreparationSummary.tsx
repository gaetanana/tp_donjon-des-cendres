// Depuis components, remonter dans src pour lire les deux types partagés.
import type { Dungeon, Hero } from '../types'

type PreparationSummaryProps = {
    teamName: string                  // Le nom d’équipe déjà enregistré.
    heroes: Hero[]                    // Les héros avec leurs noms actuels.
    selectedDungeon: Dungeon | undefined // La destination si elle existe.
    onClear: () => void               // L’action du parent qui efface le choix.
}

export default function PreparationSummary(props: PreparationSummaryProps) {
    return (
        <section className="dungeon-catalog">
            <h2>Récapitulatif du départ</h2>
            <p>Équipe : <strong>{props.teamName}</strong></p>
            <ul>
                {props.heroes.map((hero) => (
                    <li key={hero.id}>{hero.name} · {hero.heroClass}</li>
                ))}
            </ul>

            <div className="dungeon-summary">
                {props.selectedDungeon ? (
                    <div>
                        <h3>Donjon choisi : {props.selectedDungeon.name}</h3>
                        <p>{props.selectedDungeon.description}</p>
                        <p>Niveau conseillé : {props.selectedDungeon.recommendedLevel}</p>
                        <button type="button" onClick={props.onClear}>Effacer le choix</button>
                    </div>
                ) : (
                    <p>Aucun donjon sélectionné.</p>
                )}
            </div>
        </section>
    )
}
