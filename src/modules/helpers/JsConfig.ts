import { pget } from "utils/request"
import * as _ from "lodash"

export function config(apiList) {
	pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
		if (res.code === 200) {
			wx.config(_.merge({
				debug: false,
				jsApiList: ['hideOptionMenu','showOptionMenu','onMenuShareAppMessage', 'onMenuShareTimeline'].concat(apiList),
			}, res.msg))
			wx.ready(() => {
				hideOptionMenu()
			})
			wx.error(function (e) {
				console.log(e)
			})
		} else {
		}
	}).catch((err) => {
	})
}

export function config_share(apiList, url, title, imgUrl, desc) {
  pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
    if (res.code === 200) {
      wx.config(_.merge({
        debug: false,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'].concat(apiList),
      }, res.msg))
      wx.ready(() => {
        // hideOptionMenu()
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link:url,
          imgUrl: imgUrl // 分享图标
        });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link:url,
          imgUrl: imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
        });
      })
      wx.error(function (e) {
        console.log(e)
      })
    } else {
    }
  }).catch((err) => {
  })
}


export function preview(current, picList) {
	wx.previewImage({
		current: current, // 当前显示图片的http链接
		urls: picList // 需要预览的图片http链接列表
	});
}

export function closeWindow(current, picList) {
	wx.closeWindow();
}

export function hideOptionMenu(current, picList) {
	wx.hideOptionMenu();
}

export function showOptionMenu(){
  wx.showOptionMenu();
}

export function configShareFriend(title,desc,link,imgUrl){
  wx.onMenuShareAppMessage({
    title: title, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
}

export function pay(config, success) {
	wx.chooseWXPay({
		timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: '', // 支付签名随机串，不长于 32 位
		package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		paySign: '', // 支付签名
		success: success
	})
}
