const kb = require("./keyboards")
const keyboard_btns = require('./keyboard-buttons')
const config = require('./config')

const functions = {
  // start: (bot, msg) => {
  //   bot.sendMessage(msg.chat.id, `Здравствуйте, ${msg.chat.first_name}. Я бот Министерства Сельского хозяйства РК, который поможет вам. Пожалуйста, выберите интересующий вас пункт:`, {
  //     reply_markup: {
  //       keyboard: kb.main,
  //       resize_keyboard: true
  //     },
  //     parse_mode: 'HTML'
  //   })
  // },
  start: (bot, msg) => {
    bot.sendMessage(msg.chat.id, `Выбрать язык:\nТілді таңдау:`, {
      reply_markup: {
        keyboard: kb.lang,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  langChoose(bot, msg, lang) {
    let text = null
    if (lang === 'rus') {
      text = `Здравствуйте, ${msg.chat.first_name}. Я бот Министерства Сельского хозяйства РК, который поможет вам. Пожалуйста, выберите интересующий вас пункт:`
    } else {
      text = `Сәлеметсіз бе, ${msg.chat.first_name}. Мен Сізге көмек көрсететін ҚР Ауыл шаруашылығы министрлігінің боты. Қажетті мәселеңізді таңдауыңызды өтінем:`
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  offer: (bot, msg, lang) => {
    let text = null
    if(lang === 'rus') {
      text = `Отлично! Вы можете написать нам предложение по почте: muratova.a@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.offer[lang].toMessage}" и отправить нам ваше предложение прямо сюда!`
    } else {
      text = `Өте жақсы! Сіз ұсынысыңызды бізге электронды пошта арқылы muratova.a@minagri.gov.kz мекен-жайына жолдай аласыз. Немесе "${keyboard_btns.offer[lang].toMessage}" сілтемесін басып,  бізге өз ұсынысыңызды дәл осында жіберіңіз! `
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].offer,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  info: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, `Справочная информация:\n1. Справочная информация 1.\n2. Справочная информация 2.\n3. Справочная информация 3.\n4. Справочная информация 4.\n5. Справочная информация 5.`)
  },
  communication: (bot, msg, lang) => {
    if (lang === 'rus') {
      let text = `Отлично! Вы можете связаться с нами по почте muratova.a@minagri.gov.kz или написать оператору.\nВремя работы: 9:00 - 18:00`
    } else {
      let text = `Бәрекелді! Сіз бізбен muratova.a@minagri.gov.kz электронды пошта арқылы хабарласа аласыз немесе тікелей операторға жаза аласыз.\nЖұмыс уақыты: 9:00-18:00`
    }

    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb.communication,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  report: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, `Отлично! Вы можете написать нам вашу жалобу по почте muratova.a@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.report.toMessage}" ниже и отправить нам вашу жалобу прямо сюда!`, {
      reply_markup: {
        keyboard: kb.report,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  back: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Главное меню:', {
      reply_markup: {
        keyboard: kb.main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  toMessage_offer: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Пожалуйста, введите ваше предложение:')
  },
  toMessage_report: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Пожалуйста, введите вашу жалобу:')
  },
  toMessage_communication: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Пожалуйста, введите ваше предложение:')
  },
  HANDLER_OFFER: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Спасибо, ваше предложение принято и будет рассмотрено Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваше предложение, направленное посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения.', {
      reply_markup: {
        keyboard: kb.main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_REPORT: (bot, msg, lang) => {
    bot.sendMessage(msg.chat.id, 'Спасибо, Ваша жалоба принята и будет рассмотрена Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваша жалоба, направленная посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения.', {
      reply_markup: {
        keyboard: kb.main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_COMMUNICATION: (bot, msg, lang) => {
    let admins = config.adminsID
    for(let i = 0; i < admins.length; i++) {
      bot.sendMessage(admins[i], `<b>Вопрос от пользователя ${msg.chat.first_name}:</b>\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
        parse_mode: "HTML"
      })
    }
    bot.sendMessage(msg.chat.id, `Ожидаем ответ от оператора...`, {
      reply_markup: {
        keyboard: kb.main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_ADMIN_ANSWER: (bot, msg, data, lang) => {
    bot.sendMessage(data.forUser, msg.text)
  }
}



module.exports = functions