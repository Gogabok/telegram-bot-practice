const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config')
const functions = require('./src/func')
const keyboard_btns = require('./src/keyboard-buttons')


const bot = new TelegramBot(config.token, {
  polling: true
})

let isWaitingforMessage = []

bot.onText(/\/answer_(.+)/, function (msg, match) {
  let admins = config.adminsID
  let isAdmin = admins.find(id => id == msg.chat.id)
  if(isAdmin) {
    bot.sendMessage(isAdmin, `Ваше следующее сообщение будет ответом для пользователя с id: ${match[1]}`)
    isWaitingforMessage.push({
      userId: msg.chat.id,
      isWaiting: true,
      waitingFor: 'answer',
      forUser: match[1]
    })
  }
})

bot.onText(/\/regMeAsAdmin_(.+)/, function (msg, match) {
  if (match[1] == config.token) {
    config.addAdmin(msg.chat.id)
    bot.sendMessage(msg.chat.id, 'Успешно! Теперь вам будут поступать заявки пользователей.')
  } else {
    bot.sendMessage(msg.chat.id, 'Ошибка. Попробуйте снова.')
  }
})

bot.onText(/\/removeMeAsAdmin/, function (msg, match) {
  let admins = config.adminsID
  let isAdmin = admins.find(id => id == msg.chat.id)
  if (isAdmin) {
    config.removeAdmin(msg.chat.id)
    bot.sendMessage(msg.chat.id, 'Успешно! Теперь вы не получаете заявок от пользователей.')
  } else {
    bot.sendMessage(msg.chat.id, 'Ошибка. Попробуйте снова.')
  }
})

bot.onText(/\/isMeAdmin/, function (msg, match) {
  let admins = config.adminsID
  let isAdmin = admins.find(id => id == msg.chat.id)
  if (isAdmin) {
    bot.sendMessage(msg.chat.id, 'Вы админ.')
  } else {
    bot.sendMessage(msg.chat.id, 'Вы не админ.')
  }
})


bot.on('message', msg => {
  let userId = msg.chat.id
  let isWaiting = isWaitingforMessage.find(item => item.userId === userId)
  if (!isWaiting) {
    switch (msg.text) {
      case '/start':
        functions.start(bot, msg)
        break;

      case keyboard_btns.main.offer:
        functions.offer(bot, msg)
        break;

      case keyboard_btns.main.report:
        functions.report(bot, msg)
        break;
      
      case keyboard_btns.main.info:
        functions.info(bot, msg)
        break;

      case keyboard_btns.main.communication:
        functions.communication(bot, msg)
        break;

      case keyboard_btns.common.back:
        functions.back(bot, msg)
        break;

      case keyboard_btns.offer.toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'offer'
        })
        functions.toMessage_offer(bot, msg)
        break;

      case keyboard_btns.report.toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'report'
        })
        functions.toMessage_report(bot, msg)
        break;

      case keyboard_btns.communication.toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'communication'
        })
        functions.toMessage_communication(bot, msg)
        break;


      default:
        break;
    }
  } else if (isWaiting.isWaiting){
    if (isWaiting.waitingFor === 'offer') {
      functions.HANDLER_OFFER(bot, msg)
    } else if (isWaiting.waitingFor === 'report') {
      functions.HANDLER_REPORT(bot, msg)
    } else if (isWaiting.waitingFor === 'communication') {
      functions.HANDLER_COMMUNICATION(bot, msg)
    } else if (isWaiting.waitingFor === 'answer') {
      functions.HANDLER_ADMIN_ANSWER(bot, msg, isWaiting)
    }
    isWaitingforMessage.splice(isWaitingforMessage.findIndex(item => item.userId === userId), 1)
  }
})

