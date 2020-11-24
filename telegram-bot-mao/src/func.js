const kb = require("./keyboards")
const keyboard_btns = require('./keyboard-buttons')
const config = require('./config')
const converter = require('./xlsxConverter')
const request = require('request');

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
      text = `Здравствуйте, ${msg.chat.first_name}. Я бот Министерства Сельского хозяйства Республики Казахстан, который поможет Вам получить информацию по государственным услугам, касающиеся вопросов Министерства Сельского хозяйства Республики Казахстан.`
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
      text = `Отлично! Вы можете написать нам предложение по почте: goluslugi@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.offer[lang].toMessage}" и отправить нам Ваше предложение прямо сюда!`
    } else {
      text = `Өте жақсы! Сіз ұсынысыңызды бізге электронды пошта арқылы goluslugi@minagri.gov.kz мекен-жайына жолдай аласыз. Немесе "${keyboard_btns.offer[lang].toMessage}" сілтемесін басып,  бізге өз ұсынысыңызды дәл осында жіберіңіз! `
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
      text = `Отлично! Вы можете связаться с нами по почте: \nminagripress@gmail.com \nВремя работы: 9:00 - 18:30`
    } else {
      text = `Отлично! Вы можете связаться с нами по почте: \nminagripress@gmail.com \nВремя работы: 9:00 - 18:30`
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
  communication: (bot, msg, lang) => {
    let text = null
    if (lang === 'rus') {
      text = `Отлично! Вы можете связаться с нами по почте goluslugi@minagri.gov.kz или написать оператору.\nВремя работы: 9:00 - 18:00`
    } else {
      text = `Бәрекелді! Сіз бізбен goluslugi@minagri.gov.kz электронды пошта арқылы хабарласа аласыз немесе тікелей операторға жаза аласыз.\nЖұмыс уақыты: 9:00-18:00`
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
      text = `Отлично! Вы можете написать нам вашу жалобу по почте goluslugi@minagri.gov.kz. Или нажать на кнопку "${keyboard_btns.report[lang].toMessage}" ниже и отправить нам Вашу жалобу прямо сюда!`
    } else {
      text = `Өте жақсы! Сіз ұсынысыңызды бізге электронды пошта арқылы goluslugi@minagri.gov.kz мекен-жайына жолдай аласыз. Немесе "${keyboard_btns.report[lang].toMessage}" сілтемесін басып,  бізге өз ұсынысыңызды дәл осында жіберіңіз! `
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
      if (msg.photo) {
        bot.getFile(msg.photo[0].file_id).then(data => {
          let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
          var photo = request(filePath)
          bot.sendPhoto(admins[i], photo, { caption: `Предложение от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с фото.'}\n>>Ответить: /answer_${msg.chat.id}` });
        })
      } else if(msg.video) {
        bot.getFile(msg.video.file_id).then(data => {
          let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
          var video = request(filePath)
          bot.sendVideo(admins[i], video, { caption: `Предложение от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с видео.'}\n>>Ответить: /answer_${msg.chat.id}` });
        })
      } else {
        bot.sendMessage(admins[i], `<b>Предложение</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
          parse_mode: "HTML"
        })
      }
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
      if (msg.photo) {
        bot.getFile(msg.photo[0].file_id).then(data => {
            let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
            var photo = request(filePath)
            bot.sendPhoto(admins[i], photo, { caption: `Жалоба от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с фото.'}\n>>Ответить: /answer_${msg.chat.id}` });
          })
      } else if (msg.video) {
        bot.getFile(msg.video.file_id).then(data => {
          let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
          var video = request(filePath)
          bot.sendVideo(admins[i], video, { caption: `Жалоба от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с видео.'}\n>>Ответить: /answer_${msg.chat.id}` });
        })
      }  else {
        bot.sendMessage(admins[i], `<b>Жалоба</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
          parse_mode: "HTML"
        })
      }
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
    for (let i = 0; i < admins.length; i++) {
      if (msg.photo) {
        bot.getFile(msg.photo[0].file_id).then(data => {
            let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
            var photo = request(filePath)
            bot.sendPhoto(admins[i], photo, { caption: `Вопрос от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с фото.'}\n>>Ответить: /answer_${msg.chat.id}` });
          })
      } else if (msg.video) {
        bot.getFile(msg.video.file_id).then(data => {
          let filePath = `https://api.telegram.org/file/bot${config.token}/${data.file_path}`
          var video = request(filePath)
          bot.sendVideo(admins[i], video, { caption: `Вопрос от пользователя ${msg.chat.first_name}:\n${msg.caption ? msg.caption : 'Без сообщения, с видео.'}\n>>Ответить: /answer_${msg.chat.id}` });
        })
      }  else {
        bot.sendMessage(admins[i], `<b>Вопрос</b> от пользователя ${msg.chat.first_name}:\n${msg.text}\n>>Ответить: /answer_${msg.chat.id}`, {
          parse_mode: "HTML"
        })
      }
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
  info: function (bot, msg, lang) {
    
    let text = null
    if (lang === 'rus') {
      text = `Пожалуйста, выберите необходимую группу:`
    } else {
      text = ``
    }
    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: kb.info_GROUPS[lang],
        resize_keyboard: true
      },
    })
  },
  infoGroup: function (bot, msg, lang) {
    const btns = []
    kb.info_TITLES[lang][msg.text].forEach(item => {
      btns.push([item.title])
    })
    let text = null
    if (lang === 'rus') {
      text = `Пожалуйста, выберите подходящий вопрос:`
    } else {
      text = ``
    }
    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: btns,
        resize_keyboard: true
      },
    })
  },
  infoByTitle: function (bot, msg, lang, info) {
    let text = null
    if (lang === 'rus') {
      text = `<b>Возможно, Вас интересует данная услуга:</b> \n${info.title}\n\n${info.values}`
    } else {
      text = ``
    }
    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: kb[lang].main,
        resize_keyboard: true
      },
    })
  }
}



module.exports = functions