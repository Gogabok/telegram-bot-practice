const btns = require("./keyboard-buttons")
const config = require("./config")
module.exports = {
  info_GROUPS: config.infoKeyboardsGroups,
  info_TITLES: config.valuesByGroup,
  rus: {
    main: [
      [btns.main.rus.info],
      [btns.main.rus.offer, btns.main.rus.report],
      [btns.main.rus.communication, btns.main.rus.press]
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
    press: [
      [btns.common.rus.back]
    ]
  },
  kz: {
    main: [
      [btns.main.kz.info],
      [btns.main.kz.offer, btns.main.kz.report],
      [btns.main.kz.communication, btns.main.kz.press]
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
    press: [
      [btns.common.kz.back]
    ],
  },
  lang: [
    [btns.lang.kz, btns.lang.rus]
  ]
}