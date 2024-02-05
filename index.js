const TelegramBot = require('node-telegram-bot-api');

const token = '6687835699:AAH-BxxK8JmN6upta6VSmPNPC2xQjfpTbMA';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Скоро здесь будет бот по геншину');
});