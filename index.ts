import TelegramBot from "node-telegram-bot-api";
import { findCharactersByRussianName, getCharacters } from "./types/Character";

const token = process.env.TOKEN as string;

getCharacters();
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/list/, async (msg) => {
  const characters = await getCharacters();

  bot.sendMessage(
    msg.chat.id,
    "Список персонажей:\n" + characters.map((c) => c.name).join(", ")
  );
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Привет, я готов тебе помочь");
});

bot.onText(/^((?!\/).)*$/, async (msg) => {
  const query = msg.text || "";
  const characters = await findCharactersByRussianName(query);
  if (characters.length > 1) {
    const response = bot.sendMessage(msg.chat.id, "Возможно, вы имели ввиду:", {
      reply_markup: {
        inline_keyboard: characters.map((c) => [{ text: c.name, url: c.page }]),
      },
    });
  } else {
    bot.sendMessage(msg.chat.id, `Найден персонаж: ${characters[0].name}`);
  }
});
