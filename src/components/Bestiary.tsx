// La section utilise la liste de monstres et une carte pour chaque entrée.
import { monsters } from '../data/monsters'
import { MonsterCard } from './MonsterCard'

export function Bestiary() {
    return (
        <section className="bestiary">
            <h2>Bestiaire</h2>
            <div className="bestiary-grid">
                {monsters.map((monster) => (
                    <MonsterCard monster={monster} key={monster.id}/>
                ))}
            </div>
        </section>
    )
}
