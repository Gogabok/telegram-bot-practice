const XlsxPopulate = require('xlsx-populate');

const XLSXConverter = function (xlsxfile) {
  XlsxPopulate.fromFileAsync("./info_rus.xlsx")
    .then(workbook => {
      // Modify the workbook.
      // const value = workbook.sheet("Sheet1").cell("A1").value();

      // Log the value.
      console.log(workbook);
    }).catch(error => {
      console.log(error)
    })
}


module.exports = XLSXConverter