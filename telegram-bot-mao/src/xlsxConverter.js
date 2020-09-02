const xlsx = require('xlsx-populate');

const XLSXConverter = async function (filename, msg) {
  const titles = []
  const message = [msg.text]
  await xlsx.fromFileAsync(__dirname + filename).then(wb => {
    const cells = wb.sheet(0).usedRange().value()
    for (let i = 1; i < cells.length; i++) {
      let values = []
      for (let j = 1; j < cells.length; j++) {
        if (cells[i][j]) {
          values.push(cells[i][j])
        }
      }
      titles.push({
        title: cells[i][0],
        values: values
      })
    }
  })
  return titles.filter(source => message.some(substring => source.title.includes(substring)));
}


module.exports = XLSXConverter