const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config')
const functions = require('./src/func')
const keyboard_btns = require('./src/keyboard-buttons')
const kb = require('./src/keyboards')


const bot = new TelegramBot(config.token, {
  polling: true
})

config.init()

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
  let admins = config.adminsID
  let isAdmin = admins.find(id => id == msg.chat.id)
  if (match[1] == config.token) {
    if(!isAdmin) {
      config.addAdmin(msg.chat.id)
      bot.sendMessage(msg.chat.id, 'Успешно! Теперь вам будут поступать заявки пользователей.')
    } else {
      bot.sendMessage(msg.chat.id, 'Ошибка. Вы уже являетесь администратором')
    }
  } else {
    bot.sendMessage(msg.chat.id, 'Ошибка. Попробуйте снова.')
  }
})

bot.onText(/\/removeMeAsAdmin/, function (msg) {
  let admins = config.adminsID
  let isAdmin = admins.find(id => id == msg.chat.id)
  if (isAdmin) {
    config.removeAdmin(msg.chat.id)
    bot.sendMessage(msg.chat.id, 'Успешно! Теперь вы не получаете заявок от пользователей.')
  } else {
    bot.sendMessage(msg.chat.id, 'Ошибка. Попробуйте снова.')
  }
})

bot.onText(/\/isMeAdmin/, function (msg) {
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
  let userOptions = config.userOptionsData.find(i => i.userId == userId)
  let lang = userOptions ? userOptions.lang : null
  if (lang === null && msg.text !== 'Русский' && msg.text !== 'Қазақша') {
    functions.start(bot, msg)
  }
  if (!isWaiting) {
    switch (msg.text) {
      case '/start':
        functions.start(bot, msg)
        break;
      
      case keyboard_btns.lang.rus:
        let usersSettings = config.userOptionsData.find(i => i.userId === userId)
        if (usersSettings) {
          let idx = config.userOptionsData.findIndex(i => i === usersSettings)
          config.userOptionsData.splice(idx, 1)
        }
        config.userOptions({userId, lang: 'rus'})
        functions.langChoose(bot, msg, config.userOptionsData.find(i => i.userId == userId).lang)
        break;

      case keyboard_btns.lang.kz:
        let usersSettings2 = config.userOptionsData.find(i => i.userId === userId)
        if (usersSettings2) {
          let idx = config.userOptionsData.findIndex(i => i === usersSettings2)
          config.userOptionsData.splice(idx, 1)
        }
        config.userOptions({ userId, lang: 'kz' })
        functions.langChoose(bot, msg, config.userOptionsData.find(i => i.userId == userId).lang)
        break;

      case keyboard_btns.main[lang].offer:
        functions.offer(bot, msg, lang)
        break;

      case keyboard_btns.main[lang].report:
        functions.report(bot, msg, lang)
        break;
      
      case keyboard_btns.main[lang].info:
        // isWaitingforMessage.push({
        //   userId: userId,
        //   isWaiting: true,
        //   waitingFor: 'info'
        // })
        functions.info(bot, msg, lang)
        break;
      
      // case kb.info_GROUPS:
      //   functions.info(bot, msg, lang)
      //   break;

      case keyboard_btns.main[lang].communication:
        functions.communication(bot, msg, lang)
        break;

      case keyboard_btns.common[lang].back:
        functions.back(bot, msg, lang)
        break;

      case keyboard_btns.offer[lang].toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'offer'
        })
        functions.toMessage_offer(bot, msg, lang)
        break;

      case keyboard_btns.report[lang].toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'report'
        })
        functions.toMessage_report(bot, msg, lang)
        break;

      case keyboard_btns.communication[lang].toMessage:
        isWaitingforMessage.push({
          userId: userId,
          isWaiting: true,
          waitingFor: 'communication'
        })
        functions.toMessage_communication(bot, msg, lang)
        break;

      case keyboard_btns.main[lang].press:
        functions.press(bot, msg, lang)
        break;


      default:
        kb.info_GROUPS[lang].forEach(item => {
          if (item[0].indexOf(msg.text) >= 0) {
            functions.infoGroup(bot, msg, lang)
          }
        })
        let notSended = true
        Object.keys(kb.info_TITLES[lang]).forEach(item => {
         kb.info_TITLES[lang][item].forEach(title => {
           if (title.title.indexOf(msg.text.slice(0, 125)) >= 0 && notSended) {
             functions.infoByTitle(bot, msg, lang, title)
             notSended = false
           }
          })
        })
        break;
    }
  } else if (isWaiting.isWaiting){
    if (isWaiting.waitingFor === 'offer') {
      functions.HANDLER_OFFER(bot, msg, lang)
    } else if (isWaiting.waitingFor === 'report') {
      functions.HANDLER_REPORT(bot, msg, lang)
    } else if (isWaiting.waitingFor === 'communication') {
      functions.HANDLER_COMMUNICATION(bot, msg, lang)
    } else if (isWaiting.waitingFor === 'answer') {
      functions.HANDLER_ADMIN_ANSWER(bot, msg, isWaiting, lang)
    } 
    // else if (isWaiting.waitingFor === 'info') {
    //   functions.HANDLER_INFO(bot, msg, lang)
    // }
    isWaitingforMessage.splice(isWaitingforMessage.findIndex(item => item.userId === userId), 1)
  }
})

