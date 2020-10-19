const xlsx = require('xlsx-populate');

const XLSXConverter = async function (filename) {
  const titles = []
  // const message = [msg.text.toLowerCase()]
  await xlsx.fromFileAsync(__dirname + filename).then(wb => {
    const cells = wb.sheet(0).usedRange().value()
    for (let i = 1; i < cells.length; i++) {
      let values = []
      for (let j = 1; j < cells.length; j++) {
        if (cells[i][j] && j < 3) {
          values.push(cells[i][j])
        }
      }
      titles.push({
        title: cells[i][0],
        group: cells[i][3],
        groupExtra: cells[i][4] ? cells[i][4] : null,
        values: values.join('\n\n')
      })
    }
  })
  // return titles.filter(source => message.some(substring => source.title.toLowerCase().includes(substring)));
  return titles
}


module.exports = XLSXConverter