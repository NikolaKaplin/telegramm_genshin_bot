import { getCharacters, findCharactersByRussianName } from "../types/Character";
const query = process.argv[2];

(async () => {
    await getCharacters();

    console.log(`query = ${query}`);
    console.log((await findCharactersByRussianName(query)).map(c => `${c.name} (${c.specialName})`).join(", "));
})();