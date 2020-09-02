const kb = require("./keyboards")
const keyboard_btns = require('./keyboard-buttons')
const config = require('./config')
const converter = require('./xlsxConverter')

const functions = {
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
      text = `Здравствуйте, ${msg.chat.first_name}. Я бот Министерства Сельского хозяйства РК, который поможет Вам. Пожалуйста, выберите интересующий Вас пункт:`
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
    if (lang === 'rus') {
      text = `Отлично! Вы можете написать нам предложение по почте: muratova.a@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.offer[lang].toMessage}" и отправить нам Ваше предложение прямо сюда!`
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
  press: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `<b>Наши контакты:</b> \nПочта: test@test.com \nТелефон: 89999999999`
    } else {
      text = `<b>Наши контакты:</b> \nПочта: test@test.com \nТелефон: 89999999999`
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].press,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  info: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Пожалуйста, введите наименование услуги`
    } else {
      text = ``
    }
    bot.sendMessage(msg.chat.id, text)
  },
  communication: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Отлично! Вы можете связаться с нами по почте muratova.a@minagri.gov.kz или написать оператору.\nВремя работы: 9:00 - 18:00`
    } else {
      text = `Бәрекелді! Сіз бізбен muratova.a@minagri.gov.kz электронды пошта арқылы хабарласа аласыз немесе тікелей операторға жаза аласыз.\nЖұмыс уақыты: 9:00-18:00`
    }

    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].communication,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  report: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Отлично! Вы можете написать нам вашу жалобу по почте muratova.a@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.report[lang].toMessage}" ниже и отправить нам Вашу жалобу прямо сюда!`
    } else {
      text = `Өте жақсы! Сіз ұсынысыңызды бізге электронды пошта арқылы muratova.a@minagri.gov.kz мекен-жайына жолдай аласыз. Немесе "${keyboard_btns.report[lang].toMessage}" сілтемесін басып,  бізге өз ұсынысыңызды дәл осында жіберіңіз! `
    }

    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].report,
        one_time_keyboard: true,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  back: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Главное меню:`
    } else {
      text = `Негізгі мәзір:`
    }

    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  toMessage_offer: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Пожалуйста, введите ваше предложение:`
    } else {
      text = `Ұсынысыңызды енгізіңіз:`
    }
    bot.sendMessage(msg.chat.id, text)
  },
  toMessage_report: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = 'Пожалуйста, введите Вашу жалобу:'
    } else {
      text = `Сіздің шағым енгізіңіз:`
    }
    bot.sendMessage(msg.chat.id, text)
  },
  toMessage_communication: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = 'Пожалуйста, введите Ваше сообщение:'
    } else {
      text = `Хабарыңызды енгізіңіз:`
    }
    bot.sendMessage(msg.chat.id, text)
  },
  HANDLER_OFFER: (bot, msg, lang) => {
    let admins = config.adminsID
    for (let i = 0; i < admins.length; i++) {
      bot.sendMessage(admins[i], `<b>Предложение</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
        parse_mode: "HTML"
      })
    }
    let text = null
    if (lang === 'rus') {
      text = 'Спасибо, Ваше предложение принято и будет рассмотрено Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваше предложение, направленное посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения.'
    } else {
      text = 'Рахмет, Cіздің ұсынысыңыз ҚР Ауыл шаруашылығы министрлігімен қабылданды және Мемлекеттік қызмет көрсету сапасын арттыру үшін қарастырылады. Естеріңізге сала кетейік, қолданыстағы заңнамаға сәйкес, Қазақстан Республикасының Сіздің әлеуметтік мессенджер арқылы жолдаған ұсыныстарыңыз өтініш болып табылмайды және нақты бекітілген қарастыру мерзімдері жоқ.'
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_REPORT: (bot, msg, lang) => {
    let admins = config.adminsID
    for (let i = 0; i < admins.length; i++) {
      bot.sendMessage(admins[i], `<b>Жалоба</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
        parse_mode: "HTML"
      })
    }
    let text = null
    if (lang === 'rus') {
      text = 'Спасибо, Ваша жалоба принята и будет рассмотрена Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваша жалоба, направленная посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения.'
    } else {
      text = 'Рахмет, Cіздің шағымыңыз ҚР Ауыл шаруашылығы министрлігімен қабылданды және Мемлекеттік қызмет көрсету сапасын арттыру үшін қарастырылады. Естеріңізге сала кетейік, қолданыстағы заңнамаға сәйкес, Қазақстан Республикасының Сіздің әлеуметтік мессенджер арқылы жолдаған шағымдарыңыз өтініш болып табылмайды және нақты бекітілген қарастыру мерзімдері жоқ.'
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_COMMUNICATION: (bot, msg, lang) => {
    let admins = config.adminsID
    for(let i = 0; i < admins.length; i++) {
      bot.sendMessage(admins[i], `<b>Вопрос</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
        parse_mode: "HTML"
      })
    }
    let text = null
    if (lang === 'rus') {
      text = `Ожидаем ответ от оператора...`
    } else {
      text = `Оператордан жауап күтеміз...`
    }
    bot.sendMessage(msg.chat.id, text, {
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
      parse_mode: 'HTML'
    })
  },
  HANDLER_ADMIN_ANSWER: (bot, msg, data, lang) => {
    bot.sendMessage(data.forUser, msg.text)
  },
  HANDLER_INFO: async function (bot, msg, lang) {
    const filename = `/info_${lang}.xlsx`
    const results = await converter(filename, msg)
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        if (results[i] !== undefined) {
          bot.sendMessage(msg.chat.id, `<b>Возможно, Вас интересует данная услуга:</b> \n${results[i].title}\n ${results[i].values.map(item => item ? `\n${item}` : '')}`, {
            parse_mode: "HTML"
          })
        }
      }
    } else {
      bot.sendMessage(msg.chat.id, `<b>К сожалению, таких услуг не найдено</b>`, {
        parse_mode: "HTML"
      })
    }

  }
}



module.exports = functions