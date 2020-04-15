const TelegramBot = require('node-telegram-bot-api');
const config = require('./config')
const functions = require('./functions')
const kb = require('./keyboards')
const bot = new TelegramBot(config.token, {
  polling: true
})

// let waitingForReply = false
// let onReplyMessageId = null

let replyMessage = {
  waitingForReply: false,
  onReplyMessageId: null,
  text: ''
}
  bot.on('message', msg => {
    let chatID = msg.chat.id
    let currentHour = new Date(msg.date * 1000).getHours()
    let greetings = functions.sayHelloMsg(currentHour)
    let userName = msg.from.first_name
    let userText = msg.text.toLowerCase()
    let command = functions.toUnderstandUserMessage(userText)
    
    if (!replyMessage.waitingForReply) {
      switch (command ? command.command : false ) {
        case '/start':
          bot.sendMessage(chatID, `${greetings}, ${userName}. \nЯ бот Минестерства Сельского хозяйства РК, который поможет вам.\n<b>Пожалуйста, выберите интересующий вас пункт</b>`, {
            reply_markup: {
              keyboard: kb.basic
            },
            parse_mode: 'HTML'
          })
          break;
        case '/offers':
          bot.sendMessage(chatID, `Отлично! Вы можете написать нам предложение по почте muratova.a@minagri.gov.kz\n<strong>Или нажать на кнопку "Предложить"</strong> ниже и отправить нам ваше предложение прямо сюда!`, {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Предложить',
                    callback_data: 'offer'
                  }
                ]
              ]
            }
          })
          break;

        case '/report':
          bot.sendMessage(chatID, `Отлично! Вы можете написать нам вашу жалобу по почте muratova.a@minagri.gov.kz\n<strong>Или нажать на кнопку "Жалоба"</strong> ниже и отправить нам вашу жалобу прямо сюда!`, {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Жалоба',
                    callback_data: 'report'
                  }
                ]
              ]
            }
          })
          break;
        case '/communication':
          bot.sendMessage(chatID, `Отлично! Вы можете связаться с нами по почте muratova.a@minagri.gov.kz\n<b>Время работы с 9.00 ч. До 18.00.ч</b>`, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: kb.basic,
            }
          })
          break;

        case '/info':
          bot.sendMessage(chatID, `Справочная информация:\n1. Справочная информация 1.\n2. Справочная информация 2.\n3. Справочная информация 3.\n4. Справочная информация 4.\n5. Справочная информация 5.`, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: kb.basic,
            }
          })
          break;

        default:
          let text = 
          `<strong>К сожалению, Ваш запрос не распознан.</strong>\nПожалуйста, свяжитесь с нами:\n<a href="https://www.gov.kz/memleket/entities/moa?lang=kk">www.gov.kz</a>\nИли выберите интересующий вас пункт:`
          bot.sendMessage(chatID, text, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: kb.basic,
            }
          })
          break;
      }
    } else if (msg.reply_to_message) {
      if (msg.reply_to_message.message_id === ++replyMessage.onReplyMessageId) {
        bot.sendMessage(msg.chat.id, replyMessage.text, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: kb.basic,
          }
        })
      } 
    } else {
      bot.sendMessage(msg.chat.id, 'Возникла ошибка. Пожалуйста, попробуйте ещё раз', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: kb.basic,
        }
      })
    }
    replyMessage = {
      waitingForReply: false,
      onReplyMessageId: null,
      text: ''
    }
  })



bot.on('callback_query', query => {
  const { chat, message_id, text } = query.message
  switch(query.data) {
    case 'offer':
      bot.sendMessage(chat.id, 'Пожалуйста, введите ваше предложение: ', {
        reply_markup: {
          force_reply: true
        },
        parse_mode: 'HTML'
      })
      replyMessage.onReplyMessageId = message_id
      replyMessage.waitingForReply = true
      replyMessage.text = 'Спасибо, ваше предложение принято и будет рассмотрено Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваше предложение, направленное посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения'
      break

    case 'report':
      bot.sendMessage(chat.id, 'Пожалуйста, введите вашу жалобу: ', {
        reply_markup: {
          force_reply: true
        },
        parse_mode: 'HTML'
      })
      replyMessage.onReplyMessageId = message_id
      replyMessage.waitingForReply = true
      replyMessage.text = 'Спасибо, Ваша жалоба принята и будет рассмотрена Министерством сельского хозяйства РК для улучшения качества государственных услуг! Напоминаем, что в соответствии с действующим законодательством Республики Казахстан, Ваша жалоба, направленная посредством социальных мессенджеров, не является обращением и не имеет конкретных сроков рассмотрения'
      break
  }
  bot.answerCallbackQuery({
    callback_query_id: query.id
  })
})


