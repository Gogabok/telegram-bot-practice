const functions = {
  COMMANDS: {
    start: ['/start', 'привет', 'старт', 'здравствуйте', 'начать'],
    offers: ['предложения', 'предложение'],
    report: ['жалоба', 'жалобы'],
    communication: ['оперативная связь', 'связь', 'связаться'],
    info: ['инфо', 'справочная информация', 'информация']
  },
  toUnderstandUserMessage: function (msg) {
    let START_COMMAND = this.COMMANDS.start.find(m => m.match(msg))
    let OFFERS_COMMAND = this.COMMANDS.offers.find(m => m.match(msg))
    let REPORT_COMMAND = this.COMMANDS.report.find(m => m.match(msg))
    let COMMUNICATION_COMMAND = this.COMMANDS.communication.find(m => m.match(msg))
    let INFO_COMMAND = this.COMMANDS.info.find(m => m.match(msg))
    if (START_COMMAND && msg.length > 3) {
      return {
        command: '/start',
        text: START_COMMAND
      }
    } else if (OFFERS_COMMAND && msg.length > 3) {
      return {
        command: '/offers',
        text: OFFERS_COMMAND
      }
    } else if (REPORT_COMMAND && msg.length > 3) {
      return {
        command: '/report',
        text: REPORT_COMMAND
      }
    } else if (COMMUNICATION_COMMAND && msg.length > 3) {
      return {
        command: '/communication',
        text: COMMUNICATION_COMMAND
      }
    } else if (INFO_COMMAND && msg.length > 3) {
      return {
        command: '/info',
        text: INFO_COMMAND
      }
    }
  },

  sayHelloMsg: function(currentTime) {
    if (currentTime >= 5 && currentTime < 12) {
      return `Доброе утро`
    } else if (currentTime >= 0 && currentTime < 5) {
      return `Доброй ночи`
    } else if (currentTime >= 12 && currentTime < 18) {
      return `Добрый день`
    } else if (currentTime >= 18 && currentTime < 24) {
      return `Добрый вечер`
    }
  }
}





module.exports = functions