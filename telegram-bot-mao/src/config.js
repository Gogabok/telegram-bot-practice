module.exports = {
  token: '1179736799:AAEFTs0-vGbMubitGPa8l4YmafLP_qzUaZ4',
  adminsID: [],
  addAdmin: function (userId) {
    this.adminsID.push(userId)
  },
  removeAdmin: function (userId) {
    this.adminsID.splice(this.adminsID.findIndex(item => item == userId), 1)
  },
}