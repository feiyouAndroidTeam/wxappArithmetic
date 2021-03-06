// Author: 张凯

const md5 = require('../md5/md5.js')
const sha256 = require('../sha256/lib/sha256.js')

function encrypt(data) {
  let keys = Object.keys(data).sort()
  let result = ''
  for (let i = 0; i < keys.length; i++) {
    result += keys[i] + '=' + data[keys[i]]
    if (i != keys.length - 1) {
      result += '&'
    }
  }
  return md5(sha256(result))
}

// 是今天存储的吗
function isStorageInToday(key) {
  let flag = false
  try {
    var value = wx.getStorageSync(key)
    let date = new Date()
    let currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    flag = (value && currentDate == value)
  } catch (e) {
  }
  return flag
}

// 存储今天
function storageToday(key, callback) {
  try {
    let date = new Date()
    let currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    var value = wx.setStorageSync(key, currentDate)
    if (callback) {
      callback()
    }
  } catch (e) {
  }
}

function share(shareTicket, callback, lp) {
  wx.getShareInfo({
    shareTicket: shareTicket,
    success(res) {
      callback(res.iv, res.encryptedData, lp)
    }
  })
}

module.exports = {
  encrypt: encrypt,
  isStorageInToday: isStorageInToday,
  storageToday: storageToday,
  share: share
}