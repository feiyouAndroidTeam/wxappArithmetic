// pages/rank/rank.js

//获取应用实例
const app = getApp()
const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const co = require('../../libs/co')
const kkservice = require("../../libs/yc/yc-service.js")
const kkconfig = require("../../libs/yc/yc-config.js")
const pagesize = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentNumber:0,
     currentIndex:0,
     aList: [],
     bList: [],
     aTotalPage: 1,
     bTotalPage: 1,
     aPage: 1,
     bPage: 1,
     isALoading: false,
     isBLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadaData()
      this.loadbData()
  },

  loadaData(){
    var thiz = this
    co(function* () {
      wx.showLoading({
        title: '正在加载...',
      })
      thiz.data.isALoading = true
      var aListData= yield kkservice.getTopList(2, thiz.data.aPage, pagesize)
      console.log(aListData)
      thiz.data.aTotalPage = aListData.data.data.total_page
      thiz.setData({
        aList: [...thiz.data.aList,...aListData.data.data.list],
      })
      thiz.data.isALoading = false
      wx.hideLoading()
    })
  },

  loadbData() {
    var thiz = this
    co(function* () {
      wx.showLoading({
        title: '正在加载...',
      })
      thiz.data.isBLoading = true
      var bListData = yield kkservice.getTopList(1, thiz.data.aPage, pagesize)
      thiz.data.bTotalPage = bListData.data.data.total_page
      thiz.setData({
        bList: bListData.data.data.list,
      })
      thiz.data.isBLoading = false
      wx.hideLoading()
    })
  },

  switchPage(e){
    this.setData({
       currentNumber: e.detail.current
    })
  },

  tabPage(e){
    let index = e.target.dataset.index
    this.setData({
      currentNumber: index,
      currentIndex: index
    })
  },

  lower(){
    if (this.data.currentNumber == 0 && !this.data.isALoading ){
       ++this.data.aPage
       if (this.data.aPage <= this.data.aTotalPage){
          this.loadaData()
       }  
    }
    else if (this.data.currentNumber == 1 && !this.data.isBLoading) {
       ++this.data.bPage
       if (this.data.bPage <= this.data.bTotalPage) {
           this.loadbData()
       }
       console.log(this.data.bPage <= this.data.bTotalPage)
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: "pages/index/index"
    }
  }
})