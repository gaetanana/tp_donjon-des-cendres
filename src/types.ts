// Types partagés entre App et les composants du dossier components.

export type HeroChoice = 'warrior' | 'mage' | 'priest' | 'guildMaster'

export type Hero = {
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

// Dungeon est le nom choisi pour le type d'un objet destination.
export type Dungeon = {
    id: string // Identifiant stable, utilisé pour retrouver cette destination.
    name: string // Nom affiché et recherché dans le catalogue.
    recommendedLevel: number // Nombre utilisé pour le tri croissant.
    difficulty: string // Libellé présenté à l'utilisateur.
    description: string // Texte affiché dans le résumé de la destination choisie.
}
