/**
 * 
 * @param {string} cId canvas的id
 * @param {string} head 需要绘制的头像/缩略图
 * @param {number} r 头像/缩略图的最短边长
 */

const drawHeader = (cId, head, r) => {
    console.log('我进来绘制了')
    var ctx = wx.createCanvasContext(cId)
    // 开始画头像
    ctx.drawImage('/assets/mapvideo.png', 0, 0, 106, 106)
    
    ctx.save()
    ctx.beginPath()
    ctx.arc(53, 53, 38, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(head, 0, 0, r, r, 16, 16, 76, 76)
    ctx.restore()

    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        destWidth: 106,
        destHeight: 106,
        canvasId: cId,
        success: (res) => {
          console.log(res)
          console.log(res.tempFilePath)
          const t = res.tempFilePath
          return t
        },
        fail: (err) => {
          console.log('我生成图片失败了', err)
        }
      })
    })
}
const drawHeader1 = (x,y) => {
    const z = x + y
    return z
}
// 好吧，涉及到异步操作的，都不能用return去返回数据，直接写方法吧
module.exports = {
    drawHeader,
    drawHeader1
}