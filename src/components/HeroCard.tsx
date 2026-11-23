import type { Hero } from '../types'
import { getAttackScore, getHealingEstimate } from '../rules/hero'

// Types utilisés par cette fiche seule : ils restent à côté d'elle.
type HeroStatus = 'available' | 'unvailable'
type HealthState = 'Normal' | 'Blessé' | 'Critique'

type HeroCardProps = {
    hero: Hero
}

export function HeroCard({hero}: HeroCardProps) {

    const isAvailable: boolean = hero.health > 0;
    const status: HeroStatus = isAvailable ? 'available' : 'unvailable'; // Peut être remplacé par un boolean

    let healthStateHero: HealthState = 'Normal'; // Normal par défaut
    // Etat critique
    if (hero.health <= (hero.maxHealth * 0.25)) {
        healthStateHero = 'Critique';
    }
    // Etat blessé
    else if ((hero.health > (hero.maxHealth * 0.25)) && (hero.health < hero.maxHealth)) {
        healthStateHero = 'Blessé';
    }
    // Etat normal
    else if (hero.health === hero.maxHealth) {
        healthStateHero = 'Normal';
    }
    return (
        <article className="hero-card">
            <h3>{hero.name}</h3>
            <p>Classe {hero.heroClass}</p>
            {/*<p>{status ? "Disponible" : "Indisponible"}</p>*/}
            {status === 'available' && <p className="hero-status--available">Disponible</p>}
            {status === 'unvailable' &&
                <>
                    <p className="hero-status--unavailable">Hors de combat</p>
                    <p className="hero-warning">Ce héro ne peut pas agir</p>
                </>
            }
            {isAvailable &&
                <>
                    {healthStateHero === 'Normal' && <p className="health-normal">Normal</p>}
                    {healthStateHero === 'Critique' && <p className="health-critical">Critique</p>}
                    {healthStateHero === 'Blessé' && <p className="health-wounded">Blessé</p>}
                </>
            }
            <dl className="hero-stats">
                <dt>Niveau</dt>
                <dd>{hero.level}</dd>
                <dt>Points de vie</dt>
                <dd>{hero.health} / {hero.maxHealth}</dd>

                {/*<dt>Vie manquante</dt>*/}
                {/*<dd>{getMissingHealth(hero.health, hero.maxHealth)}</dd>*/}
                <dt>Constitution</dt>
                <dd>{hero.constitution}</dd>
                <dt>Force</dt>
                <dd>{hero.strength}</dd>
                <dt>Puissance</dt>
                <dd>{hero.power}</dd>
                <dt>Armure</dt>
                <dd>{hero.armor}</dd>
                <dt>Score d'attaque</dt>
                <dd>{getAttackScore(hero)}</dd>
            </dl>
            <div>
                <p>Soin théorique : {getHealingEstimate(hero)} points</p>
                <p>Cette phrase explique que ce n'est pas une restauration effective de vie</p>
            </div>

        </article>
    )
}
