const fs = require('fs')
module.exports = {
  token: '1179736799:AAEFTs0-vGbMubitGPa8l4YmafLP_qzUaZ4',
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
      }
      let admins = JSON.parse(data)
      this.userOptionsData = admins
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