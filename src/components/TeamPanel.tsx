// Le formulaire utilise les mêmes états et types d’événements qu’au bloc 12.
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'

// Noms proposés par le refuge : seul le formulaire d'équipe s'en sert.
type propositions = 'Les Archivistes' | 'Les Éclaireurs';
const archivistes: propositions = 'Les Archivistes';
const eclaireurs: propositions = 'Les Éclaireurs';

type TeamPanelProps = {
    teamName: string                 // Nom actuellement enregistré dans App.
    onRename: (name: string) => void // Action à appeler avec le nouveau nom.
}

export function TeamPanel(props: TeamPanelProps) {
    // Le brouillon démarre avec le nom enregistré.
    const [draftName, setDraftName] = useState<string>(props.teamName);
    const [teamError, setTeamError] = useState<string>('');
    const [previousName, setPreviousName] = useState<string>(props.teamName);
    const [canUndo, setCanUndo] = useState<boolean>(false);

    function changeTeamName(event: ChangeEvent<HTMLInputElement>): void {
        setDraftName(event.currentTarget.value);
        setTeamError('');
    }

    function submitTeamName(event: SubmitEvent<HTMLFormElement>): void {
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
        if (cleanName !== props.teamName) {
            setPreviousName(props.teamName)
            setCanUndo(true)
        }
        props.onRename(cleanName)
    }

    function undoTeamName(): void {
        setDraftName(previousName)
        props.onRename(previousName)
        setCanUndo(false)
    }

    function tryArchiviste(): void {
        setDraftName(archivistes)
    }

    function tryScout(): void {
        setDraftName(eclaireurs)
    }

    return (
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
            <p className="team-current">Équipe actuelle : {props.teamName}</p>
            {canUndo && (
                <button type="button" onClick={undoTeamName}>Annuler le dernier changement</button>
            )}


            <div className="team-banner">
                <h3>
                    Aperçu de la bannière
                </h3>
                <p className="team-banner-name">{draftName.length === 0 ? 'Bannière sans nom' : draftName}</p>
                <p> {draftName === props.teamName ? 'Nom enregistré' : ' Aperçu du brouillon'}</p>
                <p>{draftName === archivistes || draftName === eclaireurs ? 'Nom proposé par le refuge' : 'Nom libre'}</p>
            </div>

        </section>
    )
}
