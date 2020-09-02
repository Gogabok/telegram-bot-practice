const fs = require('fs')
module.exports = {
  token: '1313461531:AAGTPq8p1LZhVhQ1IVkL3KaeybqH9ru5PDo',
  adminsID: [],
  userOptionsData: [],
  addAdmin: function (userId) {
    this.adminsID.push(userId)
    this.updateFile()
  },
  removeAdmin: function (userId) {
    this.adminsID.splice(this.adminsID.findIndex(item => item == userId), 1)
    this.updateFile()
  },
  userOptions(user) {
    this.userOptionsData.push(user)
    this.updateUsersSettings()
  },
  init() {
    fs.readFile('adminsLogs.txt', 'utf-8', (err, data) => {
      if (err) {
        return
      }
      let admins = data.split(' ')
      this.adminsID = admins
    })

    fs.readFile('usersLogs.txt', 'utf-8', (err, data) => {
      if (err) {
        return
      } else {
        if(data !== '') {
          let users = JSON.parse(data)
          this.userOptionsData = users
        }
      }
    })
  },
  updateFile() {
    let strAdmins = this.adminsID.join(" ")
    fs.writeFile('adminsLogs.txt', strAdmins, (err) => {
      if (err) {
        return
      }
    })
  },
  updateUsersSettings() {
    let usersSettings = JSON.stringify(this.userOptionsData)
    fs.writeFile('usersLogs.txt', usersSettings, (err) => {
      if (err) {
        return
      }
    })
  }
}