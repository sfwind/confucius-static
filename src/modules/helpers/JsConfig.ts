import { pget } from "utils/request"
import * as _ from "lodash"

export function config(apiList) {
	pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
		if (res.code === 200) {
			wx.config(_.merge({
				debug: false,
				jsApiList: apiList,
			}, res.msg))
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