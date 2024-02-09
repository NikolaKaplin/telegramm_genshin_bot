import TelegramBot from 'node-telegram-bot-api';
import { default as listCharacters } from './parsers/listCharacters';

const token = '6687835699:AAH-BxxK8JmN6upta6VSmPNPC2xQjfpTbMA';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/list/, async (msg) => {
  const characters = await listCharacters();

  bot.sendMessage(msg.chat.id, "Список персонажей:\n" + characters.join(", "));
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Скоро здесь будет бот по геншину');
});
