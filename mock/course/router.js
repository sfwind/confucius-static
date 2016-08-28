var Router = require("express").Router;

var router = new Router();

router.post("/web/memberLoad", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok",
			"data": {
				"id": 13,
				"brandId": 1,
				"memberCard": "1",
				"name": "李莫愁",
				"mobile": "1",
				"tmMixMobile": "1",
				"buyerNick": "1",
				"mixBuyerNick": "1",
				"lastBindTime": "2016-08-02 17:58:01",
				"bindMobile": "1",
				"bindFlag": 2,
				"isSameMobile": "",
				"point": 10000,
				"level": 2,
				"sourceFlag": "2",
				"joinCounter": "4014",
				"currentCounter": "4014",
				"joinDate": "2016-08-11 20:44:56",
				"lastModifyTime": "2016-08-02 17:58:01",
				"gender": 'F',
				"birthYear": null,
				"birthDay": null,
				"birthDay_m": null,
				"birthDay_d": null,
				"email": null,
				"province": null,
				"city": null,
				"validFlag": "1",
				"createTime": "2016-08-02 17:58:01",
				"updateTime": "2016-08-02 17:58:01",
			}
		}), Math.random() * 1500)
});

module.exports = router;
