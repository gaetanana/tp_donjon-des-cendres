import type {Hero} from "../types";

export function getMaxHealth(constitution: number): number {
    return constitution * 10;
}

export function getAttackScore(hero: Hero): number {
    return (hero.strength * 2) + hero.level;
}

export function getHealingEstimate(hero: Hero): number {
    return (hero.power * 3) + hero.level;
}