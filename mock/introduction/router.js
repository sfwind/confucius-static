var Router = require("express").Router;

var router = new Router();

router.get("/introduction/mycourse", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"myCourses": [
					{
						"myProgress": 0.06667, //我的课程进度
						"courseProgress": 0.1, //课程实际进度
						"course": {
							"id": 1,
							"courseId": 1, //课程id
							"courseName": "结构化思维", //课程名称
							"free": false,
							"fee": 0.01,
							"length": 21, //课程总长度
							"week": 3, //课程周数
							"introPic": 'http://www.iquanwai.com/images/cintro1_3.png', //介绍头图
							"intro": null, //太长，已置空
							"voice": "http://www.iquanwai.com/images/cintro1_3.png" //课程语音介绍
						}
					}
				],
				"otherCourses": [{
					"id": 1,
					"courseId": 1,
					"courseName": "结构化思维",
					"free": false,
					"fee": 0.01,
					"length": 21,
					"week": 3,
					"voice": null,
					"intro": null,
					"introPic": "http://www.iquanwai.com/images/cintro1_3.png"
				}, {
					"id": 2,
					"courseId": 2,
					"courseName": "结构化思维",
					"free": false,
					"fee": 0.01,
					"length": 21,
					"week": 3,
					"voice": null,
					"intro": null,
					"introPic": "http://www.iquanwai.com/images/cintro1_3.png"
				}, {
					"id": 3,
					"courseId": 3,
					"courseName": "结构化思维",
					"free": false,
					"fee": 0.01,
					"length": 21,
					"week": 3,
					"voice": null,
					"intro": null,
					"introPic": "http://www.iquanwai.com/images/cintro1_3.png"
				}]
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/introduction/course/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
				"code": 200,
				"msg": {
					"id": 1,
					"courseId": 1, //课程id
					"courseName": "结构化思维", //课程名称
					"free": false,
					"fee": 0.01,
					"length": 21,
					"week": 3,
					"introPic": null,
					"intro": "balbalbal",
					"voice": "http://someurl" //课程语音介绍
				}
			}
		), Math.random() * 1500)

});
router.get("/introduction/allcourse", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": [
				{
					"id": 1,
					"courseId": 1, //课程id
					"courseName": "结构化思维", //课程名称
					"free": false,
					"fee": 0.01,
					"length": 21,
					"week": 3,
					"introPic": "http://www.iquanwai.com/images/cintro1.png",
					"intro": "中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文", //课程简介
					"voice": "http://www.iquanwai.com/audio/%E4%B8%89%E5%A4%A7%E7%89%B9%E5%BE%81.m4a" //课程语音介绍
				}
			]
		}), Math.random() * 1500)
});

router.post("/signup/course/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"remaining": 96, //班级剩余人数
				"qrcode": "http://www.confucius.mobi/images/qrcode/wwecvdao8zg64fws.jpg", //付款二维码
				"productId": "8ngybv4rfrdn0urv", //订单号
				"course": {
					"id": 1,
					"type": 1,
					"name": "结构化思维",
					"difficulty": 1,
					"free": true,
					"fee": 10,
					"length": 30,
					"week": 4,
					"pic": null,
					"introPic": "http://www.iquanwai.com/images/cintro1.png",
					"chapterList": null
				},
				"quanwaiClass": {
					"id": 1,
					"openTime": "2016-08-29",
					"closeTime": "2016-09-30",
					"courseId": 1,
					"progress": 3,
					"limit": 100,
					"open": true,
					"weixinGroup": null
				},
				"free": false //是否是白名单
			}
		}), Math.random() * 1500)
});

router.post("/signup/paid/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"username": "风之伤", //微信昵称
				"headUrl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7jtWGMoHYWcJVvuaamv7YV5xETt0uy66sH2RicicQiaYAITvxIbjM0XBNCoF8q08Ovyy3O1ccicxtOwYgyyViamG4FwfVgAo1DVMC0/0", //微信头像url
				"memberId": "4", //学号
				"quanwaiClass": {
					"id": 1,
					"openTime": "2016-08-29",
					"closeTime": "2016-09-30",
					"courseId": 1,
					"progress": 3,
					"limit": 100,
					"open": true,
					"weixinGroup": null //班级微信群二维码url
				},
				"course": {
					"id": 1,
					"type": 1,
					"name": "结构化思维",
					"difficulty": 1,
					"free": true,
					"fee": 10,
					"length": 30,
					"week": 4,
					"pic": null,
					"introPic": 'http://www.iquanwai.com/images/cintro1.png',
					"chapterList": null
				}
			}
		}), Math.random() * 1500)
});


module.exports = router;
