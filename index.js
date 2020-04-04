const TelegramBot = require("node-telegram-bot-api")

const token = '651138192:AAGFdLyx2NewxP8_C40H_NW8aNin6-Y-1Ps'
const bot = new TelegramBot(token, {
  polling: true
})

bot.on('message', (msg) => {
  const chat_id = msg.chat.id
  const user_name = msg.from.first_name
  bot.sendMessage(chat_id, `Привет, ${user_name}`)
})