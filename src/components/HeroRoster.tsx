// La sélection et les champs utilisent toujours React.
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import type { Hero, HeroChoice } from '../types'
import { HeroCard } from './HeroCard' // La fiche est dans le même dossier.

type HeroRosterProps = {
    heroes: Hero[]                                   // Héros actuels, avec leurs noms enregistrés.
    onRename: (id: HeroChoice, name: string) => void // Action pour renommer un héros précis.
}

export function HeroRoster(props: HeroRosterProps) {
    const [selectedChoice, setSelectedChoice] = useState<HeroChoice>('warrior');
    const [draftHeroName, setDraftHeroName] = useState<string>('');
    const [heroError, setHeroError] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedHero: Hero = props.heroes.find((hero) => hero.id === selectedChoice) ?? props.heroes[0];

    // Bonus : portrait et histoire du héros consulté, affichés avec sa fiche.
    const portraitHero: string = selectedHero.heroClass === 'Guerrier' ? '/portraits/warrior.svg' : selectedHero.heroClass === 'Mage'
        ? '/portraits/mage.svg' : '/portraits/priest.svg';

    const storyHero: string = selectedHero.heroClass === 'Guerrier' ? "Aldric protège le passage du col et veille sur les voyageurs."
        : selectedHero.heroClass === 'Mage'
            ? "Maëlys étudie les braises anciennes pour éclairer les chemins oubliés." :
            "Soline accueille les blessés au refuge et entretient sa lumière.";

    function handleShowDetail() {
        if (isOpen) setIsOpen(false)
        else setIsOpen(true);
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
        props.onRename(selectedHero.id, cleanName)
        setDraftHeroName('');
        setHeroError('');
    }

    return (
        <section>
            <h2>Avant le départ</h2>
            <figure className="chat-refuge">
                <img src="/cat-refuge.png" alt="Le chat du refuge"/>
                <figcaption>Le chat du refuge vous souhaite la bienvenue</figcaption>
            </figure>
            <p>Les trois rôles de mon équipe sont les suivants : guerrier, mage et prêtre</p>
            <p>En première ligne : {props.heroes[0].name}</p>
            {/* Chaque héros est passé en entier en props */}
            <div className="hero-selector">

                {props.heroes.map((hero) => (
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
    )
}
