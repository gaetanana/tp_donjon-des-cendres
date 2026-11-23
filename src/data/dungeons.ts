import type { Dungeon } from '../types'

// Dungeon[] indique un tableau composé d'objets du type Dungeon.
// L'ordre source Forge/Cave/Crypte reste intact ; l'affichage sera trié séparément.
export const dungeons: Dungeon[] = [
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
