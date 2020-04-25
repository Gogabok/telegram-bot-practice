module.exports = {
  token: '1179736799:AAEFTs0-vGbMubitGPa8l4YmafLP_qzUaZ4',
  adminsID: [],
  userOptionsData: [],
  addAdmin: function (userId) {
    this.adminsID.push(userId)
  },
  removeAdmin: function (userId) {
    this.adminsID.splice(this.adminsID.findIndex(item => item == userId), 1)
  },
  userOptions(user) {
    this.userOptionsData.push(user)
  }
}