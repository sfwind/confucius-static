import {pget, getPlatform} from "utils/request"
import * as _ from "lodash"

export function config(apiList, callback) {
  pget(`/wx/js/signature?url=${encodeURIComponent(window.ENV.configUrl)}`).then(res => {
    if (res.code === 200) {
      wx.config(_.merge({
        debug: false,
        jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline'].concat(apiList),
      }, res.msg))
      wx.ready((res) => {
        hideOptionMenu();
        if (callback && _.isFunction(callback)) {
          callback();
        }
      })

      wx.error(function (e) {
        pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
          if (res.code === 200) {
            wx.config(_.merge({
              debug: false,
              jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage'].concat(apiList),
            }, res.msg))
            wx.ready(() => {
              hideOptionMenu();
              if(callback && _.isFunction(callback)){
                callback();
              }
            })
            wx.error(function (e) {
              console.log("error");
            })
          } else {
          }
        }).catch((err) => {
        })
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
          link: url, // 分享链接
          imgUrl: imgUrl, // 分享图标
        });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url, // 分享链接
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

export function showOptionMenu() {
  wx.showOptionMenu();
}

export function configShareFriend(title, desc, link, imgUrl) {
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

export function pay(config, success, cancel, error) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', config,
    (res) => {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        if (success && _.isFunction(success)) {
          success();
        }
      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        if (cancel && _.isFunction(cancel)) {
          cancel(res);
        }
      } else {
        if (_.isFunction(error)) {
          error(res);
        }
      }
    }
  );
}
