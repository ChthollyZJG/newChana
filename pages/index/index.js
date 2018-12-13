const app = getApp();
let index = 0;
let flag = true

Page({
  data: {
    mapScale: 16,
    userLng: 113.93041,
    userLat: 22.53332,
    fujinMarkers: [
      {
        id: 111,
        latitude: 22.53332,
        longitude: 113.93041,
        iconPath: "/assets/mapvideo.png",
        width: "53",
        height: "53",
        anchor: {
          x: 0.5,
          y: 0.5
        }
      },
      {
        id: 1111,
        latitude: 22.53332,
        longitude: 113.93041,
        iconPath: "/assets/test.png",
        width: "38",
        height: "38",
        anchor: {
          x: 0.5,
          y: 0.5
        }
      } // 还是得画，头像要圆形，而且算了，能做
    ],
    moved: 0
  },

  onLoad: function(options) {
    this.drawHeader("canvas1", "/assets/kdl.png", 379);
  },

  onReady: function() {},

  onShow: function() {},

  onHide: function() {},

  onUnload: function() {},

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {},

  // 监听滑动(开始)
  recordStart: function(e) {
    this.setData({
      moveStart: e.touches[0].pageX
    })
  },
  // 监听滑动(结束)
  recordEnd: function(e) {
    // console.log(e)
    let end = e.changedTouches[0].pageX
    if(end < this.data.moveStart) {
      // 向左划
      this.toleft()
    }else {
      // 向右划
      this.toright()
    }
  },

  // 向左
  toleft: function() {
    index--;
    this.setData({
      moved: index * 552
    });
  },
  // 向右
  toright: function() {
    if (index + 1 > 0) return;
    index++;
    this.setData({
      moved: index * 552
    });
  },
  // 刷新
  refresh: function() {
    if(flag) {
      clearTimeout(t)
      flag = false
      this.setData({
        mapScale: 16
      })
      this.onShow()
      var t = setTimeout(() => {
        flag = true
      }, 1000)
    }
  },
  // 归位
  goBack: function() {
    const MapContext = wx.createMapContext('map', this)
    MapContext.moveToLocation()
  },

  // 生成头像
  drawHeader: function(cId, head, r) {
    console.log("我进来绘制了");
    var ctx = wx.createCanvasContext(cId);
    // 开始画头像
    ctx.drawImage("/assets/mapvideo.png", 0, 0, 106, 106);

    ctx.save();
    ctx.beginPath();
    ctx.arc(53, 53, 38, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(head, 0, 0, r, r, 16, 16, 76, 76);
    ctx.restore();

    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        destWidth: 212,
        destHeight: 212,
        canvasId: cId,
        success: (res) => {
          console.log(res.tempFilePath);
          let arr = this.data.fujinMarkers;
          arr.push({
            id: 12,
            latitude: 22.53352,
            longitude: 113.93341,
            iconPath: res.tempFilePath,
            width: "53",
            height: "53",
            anchor: {
              x: .5,
              y: .5
            }
          })
          this.setData({
            fujinMarkers: arr
          })
        },
        fail: err => {
          console.log("我生成图片失败了", err);
        }
      });
    });
  }
});
