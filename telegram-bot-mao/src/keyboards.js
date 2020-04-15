const btns = require("./keyboard-buttons")
module.exports = {
  main: [
    [btns.main.offer, btns.main.report],
    [btns.main.communication],
    [btns.main.info]
  ],
  offer: [
    [btns.offer.toMessage],
    [btns.common.back]
  ],
  report: [
    [btns.report.toMessage],
    [btns.common.back]
  ],
  communication: [
    [btns.communication.toMessage],
    [btns.common.back]
  ],
}