const app = getApp()
let index = 0

Page({
  data: {
    mapScale: 16,
    userLng: 113.93041,
    userLat: 22.53332,
    fujinMarkers: [{
      id: 111,
      latitude: 22.53332,
      longitude: 113.93041,
      iconPath: '/assets/mapvideo.png',
      width: '53',
      height: '53',
      anchor: {
        x: .5,
        y: .5
      }
      },
      {
        id: 1111,
        latitude: 22.53332,
        longitude: 113.93041,
        iconPath: '/assets/test.png',
        width: '38',
        height: '38',
        anchor: {
          x: .5,
          y: .5
        }
      } // 还是得画，头像要圆形，而且算了，能做
    ],
    moved: 0
  },

  onLoad: function(options) {

  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  },

  // 向左
  toleft: function() {
    index--
    this.setData({
      moved: (index * 552)
    })
  },
  // 向右
  toright: function() {
    if(index+1 > 0) return
    index++
    this.setData({
      moved: (index * 552)
    })
  }
});