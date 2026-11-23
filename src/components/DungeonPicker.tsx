import { ChangeEvent, useState } from 'react'
// Depuis components, remonter dans src pour lire le catalogue complet.
import { dungeons } from '../data/dungeons'

type DungeonPickerProps = {
    selectedDungeonId: string           // L'identifiant gardé par App.
    onChoose: (dungeonId: string) => void // L'action du parent qui enregistre le choix.
}

export default function DungeonPicker(props: DungeonPickerProps) {
    // La recherche ne sert qu'à filtrer les cartes : elle reste dans le catalogue.
    const [dungeonQuery, setDungeonQuery] = useState<string>('')

    function changeDungeonQuery(event: ChangeEvent<HTMLInputElement>): void {
        setDungeonQuery(event.currentTarget.value)
    }

    // Copie préparée de la recherche : l'état dungeonQuery n'est pas modifié.
    const normalizedQuery = dungeonQuery.trim().toLowerCase()
    // Garder les donjons dont le nom contient la recherche.
    const matchingDungeons = dungeons.filter((dungeon) =>
        dungeon.name.toLowerCase().includes(normalizedQuery)
    )
    // Trier une copie par niveau conseillé croissant.
    const visibleDungeons = matchingDungeons
        .slice()
        .sort((a, b) => a.recommendedLevel - b.recommendedLevel)

    return (
        <section className="dungeon-catalog">
            <h2>Catalogue de donjons</h2>
            <div className="catalog-search">
                <label htmlFor="dungeon-query">Rechercher un donjon</label>
                <input
                    id="dungeon-query"
                    type="search"
                    value={dungeonQuery}
                    onChange={changeDungeonQuery}
                />
            </div>

            <p role="status">Résultats : {visibleDungeons.length}</p>
            {visibleDungeons.length === 0 && (
                <p>Aucun donjon ne correspond à la recherche.</p>
            )}

            <ul className="dungeon-list">
                {visibleDungeons.map((dungeon) => (
                    <li key={dungeon.id}>
                        <h3>{dungeon.name}</h3>
                        <p>Niveau conseillé : {dungeon.recommendedLevel} · Difficulté : {dungeon.difficulty}</p>
                        <button
                            type="button"
                            aria-pressed={props.selectedDungeonId === dungeon.id}
                            onClick={() => props.onChoose(dungeon.id)}
                        >
                            Choisir {dungeon.name}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
