import type { Monster } from '../types'

type MonsterCardProps = {
    monster: Monster
}

export function MonsterCard({monster}: MonsterCardProps) {

    return (
        <>
            <article className="monster-card">
                <img src={monster.portrait} alt={monster.portraitAlt}/>
                <h3>{monster.name}</h3>
                <dl className="hero-stats">
                    <dt>Points de vie</dt>
                    <dd>{monster.health}</dd>
                    <dt>Armure</dt>
                    <dd>{monster.armor}</dd>
                </dl>
            </article>

        </>
    )
}
