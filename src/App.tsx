import "./style/refuge.css"
import "./style/hero.css"
import "./style/hero-status.css"
import "./style/health-bonus.css"
import "./style/hero-selection.css"
import "./style/hero-details.css"
import "./style/bestiary.css"
import "./style/team-form.css"
import "./style/team-banner.css"
import "./style/validation.css"
import './style/dungeon-catalog.css'
import "./style/hero-rename.css"
import {ChangeEvent, FormEvent, SubmitEvent, useState} from "react";

// Dungeon est le nom choisi pour le type d'un objet destination.
type Dungeon = {
    id: string // Identifiant stable, utilisé pour retrouver cette destination.
    name: string // Nom affiché et recherché dans le catalogue.
    recommendedLevel: number // Nombre utilisé pour le tri croissant.
    difficulty: string // Libellé présenté à l'utilisateur.
    description: string // Texte affiché dans le résumé de la destination choisie.
}

// Dungeon[] indique un tableau composé d'objets du type Dungeon.
// L'ordre source Forge/Cave/Crypte reste intact ; l'affichage sera trié séparément.
const dungeons: Dungeon[] = [
    {
        id: 'ember-forge',
        name: 'Forge des braises',
        recommendedLevel: 3,
        difficulty: 'Difficile',
        description: 'Une ancienne forge au cœur de la montagne.',
    },
    {
        id: 'ash-cellar',
        name: 'Cave des cendres',
        recommendedLevel: 1,
        difficulty: 'Facile',
        description: 'Une réserve oubliée sous le refuge.',
    },
    {
        id: 'silent-crypt',
        name: 'Crypte silencieuse',
        recommendedLevel: 2,
        difficulty: 'Modérée',
        description: 'Des galeries de pierre sous une chapelle abandonnée.',
    },
]

// Les types héros
type HeroChoice = 'warrior' | 'mage' | 'priest' | 'guildMaster';
type propositions = 'Les Archivistes' | 'Les Éclaireurs';
const archivistes: propositions = 'Les Archivistes';
const eclaireurs: propositions = 'Les Éclaireurs';
type Hero = {
    id: HeroChoice,
    name: string,
    heroClass: "Guerrier" | "Mage" | "Prêtre" | "Maître de guilde",
    level: number,
    health: number,
    maxHealth: number,
    constitution: number,
    strength: number,
    power: number,
    armor: number
}

type HeroStatus = 'available' | 'unvailable';
type HealthState = 'Normal' | 'Blessé' | 'Critique';
type HeroCardProps = {
    hero: Hero
}
// Les types monstres
type Monster = {
    id: string,
    name: string,
    health: number,
    armor: number,
    portrait: string,
    portraitAlt: string,
};
type MonsterCardProps = {
    monster: Monster
}

// Les fonctions
function getMaxHealth(constitution: number): number {
    return constitution * 10;
}


function getAttackScore(hero: Hero): number {
    return (hero.strength * 2) + hero.level;
}

function getHealingEstimate(hero: Hero): number {
    return (hero.power * 3) + hero.level;
}

function HeroCard({hero}: HeroCardProps) {

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

function MonsterCard({monster}: MonsterCardProps) {

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

function MeetingPoint() {
    const [draftMeetingPoint, setDraftMeetingPoint] = useState('La porte nord')
    const [publishMeetingPoint, setPublishMeetingPoint] = useState('La porte nord')

    function changeMeetingPoint(event: ChangeEvent<HTMLInputElement>) {
        setDraftMeetingPoint(event.currentTarget.value)
    }

    function submitMeetingPoint(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setPublishMeetingPoint(draftMeetingPoint)
    }

    return (
        <section className="team-panel">
            <form className="team-form" onSubmit={submitMeetingPoint}>
                <label htmlFor="meeting-point">Lieu de rendez-vous</label>
                <input
                    id="welcome-message"
                    type="text"
                    value={draftMeetingPoint}
                    onChange={changeMeetingPoint}
                />
                <button type="submit">Confirmer le lieu</button>
            </form>
            <p className="team-current">Message affiché : {publishMeetingPoint}</p>
        </section>
    )
}

function InnSign() {
    const [draft, setDraft] = useState('Halte')
    const [signName, setSignName] = useState('Halte')
    const [error, setError] = useState('')

    function changeSign(event: ChangeEvent<HTMLInputElement>) {
        setDraft(event.currentTarget.value)
        setError('')
    }

    function submitSign(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const cleanSign = draft.trim()
        if (cleanSign.length < 2) {
            setError('Utilisez au moins 2 caractères.')
            return
        }
        if (cleanSign.length > 12) {
            setError('Utilisez au plus 12 caractères.')
            return
        }
        setError('')
        setSignName(cleanSign)
    }

    return (
        <section className="team-panel">
            <h2>Enseigne de l’auberge</h2>
            <form className="team-form" onSubmit={submitSign}>
                <label htmlFor="sign-name">Enseigne</label>
                <input id="sign-name" value={draft} onChange={changeSign}
                       aria-invalid={error !== ''}
                       aria-describedby={error ? 'sign-help sign-error' : 'sign-help'}/>
                <p id="sign-help">De 2 à 12 caractères. Les espaces au début et à la fin sont retirés.</p>
                {error !== '' && <p id="sign-error" role="alert">{error}</p>}
                <button type="submit">Changer l’enseigne</button>
            </form>
            <p>Enseigne actuelle : {signName}</p>
        </section>
    )
}

const initialHeroes: Hero[] = [
    {
        id: "warrior",
        name: "Aldric",
        heroClass: "Guerrier",
        health: 100,
        maxHealth: getMaxHealth(10),
        constitution: 10,
        strength: 12,
        power: 2,
        armor: 3,
        level: 1
    },
    {
        id: "mage",
        name: "Maëlys",
        heroClass: "Mage",
        health: 60,
        maxHealth: getMaxHealth(6),
        constitution: 6,
        strength: 3,
        power: 14,
        armor: 1,
        level: 1
    },
    {
        id: "priest",
        name: "Soline",
        heroClass: "Prêtre",
        health: 80,
        maxHealth: getMaxHealth(8),
        constitution: 8,
        strength: 4,
        power: 10,
        armor: 2,
        level: 1
    }
]
export default function App() {
    const [selectedChoice, setSelectedChoice] = useState<HeroChoice>('warrior');
    const [draftName, setDraftName] = useState<string>('Les Veilleurs');
    const [teamName, setTeamName] = useState<string>('Les Veilleurs');

    const [draftHeroName, setDraftHeroName] = useState<string>('');
    const [heroError, setHeroError] = useState<string>('')

    const [previousName, setPreviousName] = useState<string>('Les Veilleurs');
    const [canUndo, setCanUndo] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [teamError, setTeamError] = useState<string>('');
    const [dungeonQuery, setDungeonQuery] = useState<string>('');
    const [selectedDungeonId, setSelectedDungeonId] = useState<string>('');

    function handleShowDetail() {
        if (isOpen) setIsOpen(false)
        else setIsOpen(true);

    }

    const guildMaster: Hero = {
        id: "guildMaster",
        name: "David",
        heroClass: "Maître de guilde",
        health: 870,
        maxHealth: 1000,
        constitution: 12,
        strength: 3000,
        power: 1500,
        armor: 1500,
        level: 150
    }

    const ratCendre: Monster = {
        id: 'ash-rat',
        name: 'Rat des cendres',
        health: 20,
        armor: 0,
        portrait: "/ash-rat.svg",
        portraitAlt: "rat des cendres"
    }

    const sentinellePierre: Monster = {
        id: 'stone-sentinel',
        name: 'Sentinelle de pierre',
        health: 45,
        armor: 4,
        portrait: "/stone-sentinel.svg",
        portraitAlt: "stone sentinel"
    }

    const chauve_souris: Monster = {
        id: "cave-bat",
        name: "Chauve-souris des grottes",
        health: 16,
        armor: 0,
        portrait: "/cave-bat.svg",
        portraitAlt: "Chauve souris des grottes",
    }

    const ember_spider: Monster = {
        id: "ember-spider",
        name: "Araignée de braise",
        health: 24,
        armor: 1,
        portrait: "/ember-spider.svg",
        portraitAlt: "Araignée de braise",
    }

    const slime: Monster = {
        id: "moss-slime",
        name: "Gelée de mousse",
        health: 30,
        armor: 2,
        portrait: "/moss-slime.svg",
        portraitAlt: "Gelée de mousse",
    }

    const [heroes, setHeroes] = useState<Hero[]>(initialHeroes);
    const monsters: Monster[] = [ratCendre, sentinellePierre, chauve_souris, ember_spider, slime]

    //const selectedHero: Hero = selectedChoice === 'warrior' ? warrior : selectedChoice === 'mage' ? mage : priest
    const selectedHero: Hero = heroes.find((hero) => hero.id === selectedChoice) ?? heroes[0];

    const portraitHero: string = selectedHero.heroClass === 'Guerrier' ? '/portraits/warrior.svg' : selectedHero.heroClass === 'Mage'
        ? '/portraits/mage.svg' : '/portraits/priest.svg';

    const storyHero: string = selectedHero.heroClass === 'Guerrier' ? "Aldric protège le passage du col et veille sur les voyageurs."
        : selectedHero.heroClass === 'Mage'
            ? "Maëlys étudie les braises anciennes pour éclairer les chemins oubliés." :
            "Soline accueille les blessés au refuge et entretient sa lumière.";

    function changeTeamName(event: ChangeEvent<HTMLInputElement>): void {
        setDraftName(event.currentTarget.value);
        setTeamError('');
    }

    function submitTeamName(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const cleanName = draftName.trim()
        if (cleanName.length === 0) {
            setTeamError('Saisissez un nom d’équipe.')
            return
        }
        if (cleanName.length > 24) {
            setTeamError('Utilisez au plus 24 caractères.')
            return
        }
        setTeamError('')
        if (cleanName !== teamName) {
            setPreviousName(teamName)
            setCanUndo(true)
        }
        setTeamName(cleanName)
    }

    function changeHeroName(event: ChangeEvent<HTMLInputElement>): void {
        setDraftHeroName(event.currentTarget.value);
        setHeroError('');
    }

    function submitHeroName(event: SubmitEvent<HTMLFormElement>): void {
        event.preventDefault();
        const cleanName = draftHeroName.trim();
        if (cleanName.length === 0) {
            setHeroError('Saisissez un nom de héros.');
            return;
        }
        if (cleanName.length > 24) {
            setHeroError('Utilisez au plus 24 caractères.')
            return;
        }
        setHeroes((currentHeroes) => {
            return currentHeroes.map((hero) => {
                if (hero.id === selectedHero.id) {
                    return {...hero, name: cleanName}
                }
                return hero;
            })
        })
        setDraftHeroName('');
        setHeroError('');
    }

    function changeDungeonQuery(event: ChangeEvent<HTMLInputElement>): void {
        setDungeonQuery(event.currentTarget.value)
    }

    function undoTeamName(): void {
        setDraftName(previousName)
        setTeamName(previousName)
        setCanUndo(false)
    }

    function tryArchiviste(): void {
        setDraftName(archivistes)
    }

    function tryScout(): void {
        setDraftName(eclaireurs)
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
    // Chercher dans le catalogue complet pour garder le choix même s'il est masqué.
    const selectedDungeon = dungeons.find((dungeon) => dungeon.id === selectedDungeonId)

    return (
        <main className="refuge">
            <header>
                <h1>Au seuil du refuge du Gonf</h1>
                <p>Bienvenue au refuge du Gonf</p>
            </header>

            <section className="team-panel">
                <h2>
                    Votre équipe
                </h2>
                <form className="team-form" onSubmit={submitTeamName}>
                    <label htmlFor="welcome-message">Message d’accueil</label>
                    <input
                        id="welcome-message"
                        type="text"
                        value={draftName}
                        onChange={changeTeamName}
                        aria-invalid={teamError !== ''}
                        aria-describedby={teamError ? 'team-help team-error' : 'team-help'}
                    />
                    <p id="team-help">Entre 1 et 24 caractères. Les espaces au début et à la fin sont retirés.</p>
                    {teamError !== '' && <p id="team-error" role="alert">{teamError}</p>}
                    <button type="submit">Publier</button>
                    <button type="button" onClick={tryScout}>Essayer Les Éclaireurs</button>
                    <button type="button" onClick={tryArchiviste}>Essayer Les Archivistes</button>

                </form>
                <p className="team-current">Équipe actuelle : {teamName}</p>
                {canUndo && (
                    <button type="button" onClick={undoTeamName}>Annuler le dernier changement</button>
                )}


                <div className="team-banner">
                    <h3>
                        Aperçu de la bannière
                    </h3>
                    <p className="team-banner-name">{draftName.length === 0 ? 'Bannière sans nom' : draftName}</p>
                    <p> {draftName === teamName ? 'Nom enregistré' : ' Aperçu du brouillon'}</p>
                    <p>{draftName === archivistes || draftName === eclaireurs ? 'Nom proposé par le refuge' : 'Nom libre'}</p>
                </div>

            </section>

            <InnSign/>

            <section>
                <h2>Avant le départ</h2>
                <figure className="chat-refuge">
                    <img src="/cat-refuge.png" alt="Le chat du refuge"/>
                    <figcaption>Le chat du refuge vous souhaite la bienvenue</figcaption>
                </figure>
                <p>Les trois rôles de mon équipe sont les suivants : guerrier, mage et prêtre</p>
                <p>En première ligne : {heroes[0].name}</p>
                {/* Chaque héros est passé en entier en props */}
                <div className="hero-selector">

                    {heroes.map((hero) => (
                        <button key={hero.id} aria-pressed={selectedChoice === hero.id} onClick={() => {
                            setSelectedChoice(hero.id);
                        }}>
                            {hero.name}
                        </button>
                    ))}

                </div>
                <p>Héro selectionné : {selectedHero.name}</p>

                <div className="hero-list">
                    <HeroCard hero={selectedHero}/>
                </div>
                <button
                    type="button"
                    onClick={handleShowDetail}
                    aria-pressed={isOpen}>
                    {isOpen ? 'Masquer les détails' : 'Afficher les détails'}
                </button>
                {isOpen &&
                    (<>
                        <div className="hero-details">
                            <img src={portraitHero} alt={selectedHero.name}/>
                            <p>
                                {storyHero}
                            </p>
                        </div>
                    </>)
                }

                <form onSubmit={submitHeroName} className="hero-rename">
                    {/* Le libellé et le champ partagent exactement le même identifiant. */}
                    <label htmlFor="hero-name">Nouveau titre du livre consulté</label>
                    <input
                        id="book-title"
                        type="text"
                        value={draftHeroName}
                        onChange={changeHeroName}
                        aria-invalid={heroError !== ''}
                        aria-describedby={heroError !== '' ? 'book-help book-error' : 'book-help'}
                    />
                    {/* L’aide existe toujours ; l’erreur existe seulement si son texte est non vide. */}
                    <p id="book-help">De 1 à 24 caractères après retrait des espaces aux extrémités.</p>
                    {heroError !== '' && <p id="book-error" role="alert">{heroError}</p>}
                    <button type="submit">Enregistrer le titre</button>
                </form>
            </section>

            <section>
                <h2>À la guilde</h2>

                <figure className="guild-master">
                    <img src="/Hong.jpg" alt="Le maître de guilde"/>
                    <div>
                        <h2>Le HONG</h2>
                        <figcaption>Voici le grand et l'unique Maître de guilde</figcaption>
                    </div>
                </figure>
                <HeroCard hero={guildMaster}/>
            </section>

            <section className="bestiary">
                <h2>Bestiaire</h2>
                <div className="bestiary-grid">
                    {monsters.map((monster) => (
                        <MonsterCard monster={monster} key={monster.id}/>
                    ))}
                </div>
            </section>

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
                                aria-pressed={selectedDungeonId === dungeon.id}
                                onClick={() => setSelectedDungeonId(dungeon.id)}
                            >
                                Choisir {dungeon.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="dungeon-summary">
                    {selectedDungeon ? (
                        <div>
                            <h3>Donjon choisi : {selectedDungeon.name}</h3>
                            <p>{selectedDungeon.description}</p>
                            <p>Niveau conseillé : {selectedDungeon.recommendedLevel}</p>
                        </div>
                    ) : (
                        <p>Aucun donjon sélectionné.</p>
                    )}
                </div>
            </section>

            <MeetingPoint/>

        </main>
    )
}