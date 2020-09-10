const fs = require('fs')
const converter = require('./xlsxConverter')
module.exports = {
  token: '1313461531:AAGTPq8p1LZhVhQ1IVkL3KaeybqH9ru5PDo',
  adminsID: [],
  userOptionsData: [],
  infoKeyboardsGroups: {},
  valuesByGroup: {},
  loadingInfoConfig: async function () {
    let files = ['rus']
    for(let i = 0; i < files.length; i++) {
      const filename = `/info_${files[i]}.xlsx`
      const results = await converter(filename)
      const groups = []
      results.forEach(item => {
        if(!groups.find(el => el === item.group)) {
          groups.push(item.group)
        }
      })
      const groupsEmoodjies = [
        {
          value: 'сельскохозяйственная техника',
          emodji: '\ud83d\ude9a'
        },
        {
          value: 'растениеводство',
          emodji: '\ud83c\udf31'
        },
        {
          value: 'защита растений',
          emodji: '\ud83c\udf40'
        },
        {
          value: 'ветеринария',
          emodji: '\ud83d\udc04'
        },
        {
          value: 'карантин растений',
          emodji: '\ud83c\udf3f'
        },
        {
          value: 'животноводство',
          emodji: '\ud83d\udc0f'
        },
        {
          value: 'лицензирование',
          emodji: '\ud83d\udccb'
        },
        {
          value: 'земельные отношения',
          emodji: '\ud83c\udfe1'
        },
        {
          value: 'субсидирование в АПК',
          emodji: '\ud83d\udcb0'
        }
      ]
      const keyboardGroups = []
      groups.forEach(item => keyboardGroups.push([`${groupsEmoodjies.find(emodji => emodji.value.trim() === item.trim()).emodji} ` + item]))
      const valuesByGroup = {}
      keyboardGroups.forEach(function (item) {
        const groupName = item[0].trim()
        results.forEach(res => {
          let isExtraGroup = false
          if (res.groupExtra) {
            isExtraGroup = groupName.indexOf(res.groupExtra.trim()) >= 0 ? true : false
          }
          if (groupName.indexOf(res.group.trim()) >= 0 || isExtraGroup) {
            if (!valuesByGroup[groupName] || valuesByGroup[groupName].length <= 0) {
              valuesByGroup[groupName] = []
            }
            valuesByGroup[groupName].push(res)
          }
        })
      })
      this.valuesByGroup[files[i]] = valuesByGroup
      this.infoKeyboardsGroups[files[i]] = keyboardGroups
    }
  },
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
    this.loadingInfoConfig()

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