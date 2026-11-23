import type {Monster} from "../types";

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
export const monsters: Monster[] = [ratCendre, sentinellePierre, chauve_souris, ember_spider, slime]
