import './styles/style.css'
import type {tabChoice} from './types'
import {ChangeEvent, FormEvent, useState} from "react";
// App possède toujours l'équipe courante et le donjon choisi.
import type {Hero, HeroChoice} from "./types";
import {guildMaster, initialHeroes} from "./data/heroes";
import {dungeons} from "./data/dungeons";
import {HeroCard} from "./components/HeroCard";
import {TeamPanel} from "./components/TeamPanel";
import {HeroRoster} from "./components/HeroRoster";
import {Bestiary} from "./components/Bestiary";
import DungeonPicker from "./components/DungeonPicker";
import PreparationSummary from "./components/PreparationSummary";

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

const tabs: { id: tabChoice, label: string }[] = [
    {id: 'team', label: 'Équipe'},
    {id: 'hero', label: 'Héros'},
    {id: 'expedition', label: 'Expédition'},
    {id: 'bestiaire', label: 'Bestiaire'},
]

export default function App() {
    const [teamName, setTeamName] = useState<string>('Les Veilleurs');
    const [heroes, setHeroes] = useState<Hero[]>(initialHeroes);
    const [selectedDungeonId, setSelectedDungeonId] = useState<string>('');
    const [tabActive, setTabActive] = useState<tabChoice>('team');

    function renameHero(id: HeroChoice, name: string) {
        // Parcourir la liste courante pour retrouver l’identifiant envoyé par le formulaire.
        setHeroes((currentHeroes) => currentHeroes.map((hero) => {
            if (hero.id === id) {
                return {...hero, name: name}
            }
            return hero
        }))
    }

    // Efface seulement la destination : la recherche et l'équipe restent en place.
    function clearDungeon(): void {
        setSelectedDungeonId('')
    }

    // Chercher dans le catalogue complet pour garder le choix même s'il est masqué.
    const selectedDungeon = dungeons.find((dungeon) => dungeon.id === selectedDungeonId)

    return (
        <main className="refuge">
            <header>
                <h1>Au seuil du refuge du Gonf</h1>
                <p>Bienvenue au refuge du Gonf</p>
                <nav className="tabs" aria-label="Rubriques du refuge">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            aria-pressed={tabActive === tab.id}
                            onClick={() => setTabActive(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="tab-panel" hidden={tabActive !== 'team'}>
                <TeamPanel teamName={teamName} onRename={setTeamName}/>
                <InnSign/>
                <MeetingPoint/>
            </div>

            <div className="tab-panel" hidden={tabActive !== 'hero'}>
                <HeroRoster heroes={heroes} onRename={renameHero}/>
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
            </div>

            <div className="tab-panel" hidden={tabActive !== 'expedition'}>
                <DungeonPicker
                    selectedDungeonId={selectedDungeonId}
                    onChoose={setSelectedDungeonId}
                />

                <PreparationSummary
                    teamName={teamName}
                    heroes={heroes}
                    selectedDungeon={selectedDungeon}
                    onClear={clearDungeon}
                />
            </div>

            <div className="tab-panel" hidden={tabActive !== 'bestiaire'}>
                <Bestiary/>
            </div>
        </main>
    )
}
