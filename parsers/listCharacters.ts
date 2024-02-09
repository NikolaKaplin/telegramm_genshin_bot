import * as cheerio from "cheerio";
import { satisfies } from "nodemon/lib/utils";

const url = "https://genshin-info.ru/wiki/personazhi/";

export default async function listCharacters () {
    const res = await fetch(url);
    const page = cheerio.load(await res.text())("body");

    return page.find(".itemList__item a.itemcard").toArray().map(e => e.attribs.title);
};