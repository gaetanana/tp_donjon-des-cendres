import type {Hero} from "../types";
import {getMaxHealth} from "../rules/hero";

export const initialHeroes: Hero[] = [
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

export const guildMaster: Hero = {
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