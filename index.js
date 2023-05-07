const TelegramBot = require('node-telegram-bot-api');
const token = '5910448330:AAGnUN_30ZnI-5_wVPcBghVUyXG68g5ng3Q'


const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to BMI Calculator Bot! Please enter your height in cm:');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const height = parseFloat(msg.text);

  if (isNaN(height)) {
    bot.sendMessage(chatId, 'Invalid input. Please enter a valid height in cm:');
    return;
  }

  bot.sendMessage(chatId, 'Please enter your weight in kg:');

  bot.once('message', (msg) => {
    const weight = parseFloat(msg.text);

    if (isNaN(weight)) {
      bot.sendMessage(chatId, 'Invalid input. Please enter a valid weight in kg:');
      return;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const result = `Your BMI is ${bmi.toFixed(2)}.`;

    bot.sendMessage(chatId, result);
  });
});