const btns = require("./keyboard-buttons")
module.exports = {
  rus: {
    main: [
      [btns.main.rus.offer, btns.main.rus.report],
      [btns.main.rus.communication],
      [btns.main.rus.info]
    ],
    offer: [
      [btns.offer.rus.toMessage],
      [btns.common.rus.back]
    ],
    report: [
      [btns.report.rus.toMessage],
      [btns.common.rus.back]
    ],
    communication: [
      [btns.communication.rus.toMessage],
      [btns.common.rus.back]
    ],
  },
  kz: {
    main: [
      [btns.main.kz.offer, btns.main.kz.report],
      [btns.main.kz.communication],
      [btns.main.kz.info]
    ],
    offer: [
      [btns.offer.kz.toMessage],
      [btns.common.kz.back]
    ],
    report: [
      [btns.report.kz.toMessage],
      [btns.common.kz.back]
    ],
    communication: [
      [btns.communication.kz.toMessage],
      [btns.common.kz.back]
    ],
  },
  lang: [
    [btns.lang.rus, btns.lang.kz]
  ]
}