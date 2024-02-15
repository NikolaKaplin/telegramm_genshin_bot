import * as cheerio from "cheerio";
import Fuse from "fuse.js";

const baseUrl = "https://genshin-info.ru";
const charactersListUrl = "https://genshin-info.ru/wiki/personazhi/";
const charactersUpdateRate = 1000 * 60 * 60 * 24;

type Character = {
    name: string;
    specialName: string;
    page: string;
}
export default Character;

export async function getCharacters (): Promise<Character[]> {
    const res = await fetch(charactersListUrl);
    const page = cheerio.load(await res.text())("body");

    let characters: Character[] = globalThis.characters;

    if (!globalThis.charactersLastFetch || Date.now() - (globalThis.charactersLastFetch as Date).getTime() > charactersUpdateRate) {
        characters = page.find(".itemList__item a.itemcard").toArray().map(e => ({
            name: e.attribs.title,
            specialName: e.attribs.href.split("/").reverse()[1],
            page: baseUrl + e.attribs.href,
        } satisfies Character));
    
        globalThis.characters = characters;
        globalThis.charactersLastFetch = new Date();
    }

    return characters;
};

export async function getCharacter (specialName: string): Promise<Character> {
    return (await getCharacters()).filter(c => c.specialName === specialName)[0];
}

export async function getCharacterByRussianName (name: string): Promise<Character> {
    return (await getCharacters()).filter(c => c.name === name)[0];
}

export async function findCharactersByRussianName (query: string, limit: number = 3): Promise<Character[]> {
    const fuse = new Fuse(await getCharacters(), {
        keys: ["name", "specialName"],
    });
    let results = fuse.search(query).map(c => c.item).filter((v, i) => i < limit);

    if (results[0]&&results[0].name.toLowerCase() == query.toLowerCase()) results = results.filter((r, i) => i == 0);

    return results;
}