var Router = require("express").Router;

var router = new Router();

router.get("/customer/profile", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "industry": "人力资源",
        "function": "任务",
        "workingLife": "1~3年",
        "city": "广元市",
        "province": "四川省",
        "provinceId": null
      },
      "code": 200
    }), Math.random() * 1500)
});

router.get("/customer/region", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": [
        {
          "name": "请选择",
          "sub": []
        },
        {
          "name": "北京市",
          "sub": [
            {
              "name": "北京市",
              "sub": null
            }
          ]
        },
        {
          "name": "上海市",
          "sub": [
            {
              "name": "上海市",
              "sub": null
            }
          ]
        },
        {
          "name": "天津市",
          "sub": [
            {
              "name": "天津市",
              "sub": null
            }
          ]
        },
        {
          "name": "重庆市",
          "sub": [
            {
              "name": "重庆市",
              "sub": null
            }
          ]
        },
        {
          "name": "四川省",
          "sub": [
            {
              "name": "成都市",
              "sub": null
            },
            {
              "name": "自贡市",
              "sub": null
            },
            {
              "name": "攀枝花市",
              "sub": null
            },
            {
              "name": "泸州市",
              "sub": null
            },
            {
              "name": "德阳市",
              "sub": null
            },
            {
              "name": "绵阳市",
              "sub": null
            },
            {
              "name": "广元市",
              "sub": null
            },
            {
              "name": "遂宁市",
              "sub": null
            },
            {
              "name": "内江市",
              "sub": null
            },
            {
              "name": "乐山市",
              "sub": null
            },
            {
              "name": "南充市",
              "sub": null
            },
            {
              "name": "眉山市",
              "sub": null
            },
            {
              "name": "宜宾市",
              "sub": null
            },
            {
              "name": "广安市",
              "sub": null
            },
            {
              "name": "达州市",
              "sub": null
            },
            {
              "name": "雅安市",
              "sub": null
            },
            {
              "name": "巴中市",
              "sub": null
            },
            {
              "name": "资阳市",
              "sub": null
            },
            {
              "name": "阿坝藏族羌族自治州",
              "sub": null
            },
            {
              "name": "甘孜藏族自治州",
              "sub": null
            },
            {
              "name": "凉山彝族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "贵州省",
          "sub": [
            {
              "name": "贵阳市",
              "sub": null
            },
            {
              "name": "六盘水市",
              "sub": null
            },
            {
              "name": "遵义市",
              "sub": null
            },
            {
              "name": "安顺市",
              "sub": null
            },
            {
              "name": "铜仁地区",
              "sub": null
            },
            {
              "name": "黔西南布依族苗族自治州",
              "sub": null
            },
            {
              "name": "毕节地区",
              "sub": null
            },
            {
              "name": "黔东南苗族侗族自治州",
              "sub": null
            },
            {
              "name": "黔南布依族苗族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "云南省",
          "sub": [
            {
              "name": "昆明市",
              "sub": null
            },
            {
              "name": "曲靖市",
              "sub": null
            },
            {
              "name": "玉溪市",
              "sub": null
            },
            {
              "name": "保山市",
              "sub": null
            },
            {
              "name": "昭通市",
              "sub": null
            },
            {
              "name": "丽江市",
              "sub": null
            },
            {
              "name": "思茅市",
              "sub": null
            },
            {
              "name": "临沧市",
              "sub": null
            },
            {
              "name": "楚雄彝族自治州",
              "sub": null
            },
            {
              "name": "红河哈尼族彝族自治州",
              "sub": null
            },
            {
              "name": "文山壮族苗族自治州",
              "sub": null
            },
            {
              "name": "西双版纳傣族自治州",
              "sub": null
            },
            {
              "name": "大理白族自治州",
              "sub": null
            },
            {
              "name": "德宏傣族景颇族自治州",
              "sub": null
            },
            {
              "name": "怒江傈僳族自治州",
              "sub": null
            },
            {
              "name": "迪庆藏族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "西藏省",
          "sub": [
            {
              "name": "拉萨市",
              "sub": null
            },
            {
              "name": "昌都地区",
              "sub": null
            },
            {
              "name": "山南地区",
              "sub": null
            },
            {
              "name": "日喀则地区",
              "sub": null
            },
            {
              "name": "那曲地区",
              "sub": null
            },
            {
              "name": "阿里地区",
              "sub": null
            },
            {
              "name": "林芝地区",
              "sub": null
            }
          ]
        },
        {
          "name": "河南省",
          "sub": [
            {
              "name": "郑州市",
              "sub": null
            },
            {
              "name": "开封市",
              "sub": null
            },
            {
              "name": "洛阳市",
              "sub": null
            },
            {
              "name": "平顶山市",
              "sub": null
            },
            {
              "name": "安阳市",
              "sub": null
            },
            {
              "name": "鹤壁市",
              "sub": null
            },
            {
              "name": "新乡市",
              "sub": null
            },
            {
              "name": "焦作市",
              "sub": null
            },
            {
              "name": "濮阳市",
              "sub": null
            },
            {
              "name": "许昌市",
              "sub": null
            },
            {
              "name": "漯河市",
              "sub": null
            },
            {
              "name": "三门峡市",
              "sub": null
            },
            {
              "name": "南阳市",
              "sub": null
            },
            {
              "name": "商丘市",
              "sub": null
            },
            {
              "name": "信阳市",
              "sub": null
            },
            {
              "name": "周口市",
              "sub": null
            },
            {
              "name": "驻马店市",
              "sub": null
            }
          ]
        },
        {
          "name": "湖北省",
          "sub": [
            {
              "name": "武汉市",
              "sub": null
            },
            {
              "name": "黄石市",
              "sub": null
            },
            {
              "name": "十堰市",
              "sub": null
            },
            {
              "name": "宜昌市",
              "sub": null
            },
            {
              "name": "襄阳市",
              "sub": null
            },
            {
              "name": "鄂州市",
              "sub": null
            },
            {
              "name": "荆门市",
              "sub": null
            },
            {
              "name": "孝感市",
              "sub": null
            },
            {
              "name": "荆州市",
              "sub": null
            },
            {
              "name": "黄冈市",
              "sub": null
            },
            {
              "name": "咸宁市",
              "sub": null
            },
            {
              "name": "随州市",
              "sub": null
            },
            {
              "name": "恩施土家族苗族自治州",
              "sub": null
            },
            {
              "name": "省直辖行政单位",
              "sub": null
            }
          ]
        },
        {
          "name": "湖南省",
          "sub": [
            {
              "name": "长沙市",
              "sub": null
            },
            {
              "name": "株洲市",
              "sub": null
            },
            {
              "name": "湘潭市",
              "sub": null
            },
            {
              "name": "衡阳市",
              "sub": null
            },
            {
              "name": "邵阳市",
              "sub": null
            },
            {
              "name": "岳阳市",
              "sub": null
            },
            {
              "name": "常德市",
              "sub": null
            },
            {
              "name": "张家界市",
              "sub": null
            },
            {
              "name": "益阳市",
              "sub": null
            },
            {
              "name": "郴州市",
              "sub": null
            },
            {
              "name": "永州市",
              "sub": null
            },
            {
              "name": "怀化市",
              "sub": null
            },
            {
              "name": "娄底市",
              "sub": null
            },
            {
              "name": "湘西土家族苗族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "广东省",
          "sub": [
            {
              "name": "广州市",
              "sub": null
            },
            {
              "name": "韶关市",
              "sub": null
            },
            {
              "name": "深圳市",
              "sub": null
            },
            {
              "name": "珠海市",
              "sub": null
            },
            {
              "name": "汕头市",
              "sub": null
            },
            {
              "name": "佛山市",
              "sub": null
            },
            {
              "name": "江门市",
              "sub": null
            },
            {
              "name": "湛江市",
              "sub": null
            },
            {
              "name": "茂名市",
              "sub": null
            },
            {
              "name": "肇庆市",
              "sub": null
            },
            {
              "name": "惠州市",
              "sub": null
            },
            {
              "name": "梅州市",
              "sub": null
            },
            {
              "name": "汕尾市",
              "sub": null
            },
            {
              "name": "河源市",
              "sub": null
            },
            {
              "name": "阳江市",
              "sub": null
            },
            {
              "name": "清远市",
              "sub": null
            },
            {
              "name": "东莞市",
              "sub": null
            },
            {
              "name": "中山市",
              "sub": null
            },
            {
              "name": "潮州市",
              "sub": null
            },
            {
              "name": "揭阳市",
              "sub": null
            },
            {
              "name": "云浮市",
              "sub": null
            }
          ]
        },
        {
          "name": "广西省",
          "sub": [
            {
              "name": "南宁市",
              "sub": null
            },
            {
              "name": "柳州市",
              "sub": null
            },
            {
              "name": "桂林市",
              "sub": null
            },
            {
              "name": "梧州市",
              "sub": null
            },
            {
              "name": "北海市",
              "sub": null
            },
            {
              "name": "防城港市",
              "sub": null
            },
            {
              "name": "钦州市",
              "sub": null
            },
            {
              "name": "贵港市",
              "sub": null
            },
            {
              "name": "玉林市",
              "sub": null
            },
            {
              "name": "百色市",
              "sub": null
            },
            {
              "name": "贺州市",
              "sub": null
            },
            {
              "name": "河池市",
              "sub": null
            },
            {
              "name": "来宾市",
              "sub": null
            },
            {
              "name": "崇左市",
              "sub": null
            }
          ]
        },
        {
          "name": "陕西省",
          "sub": [
            {
              "name": "西安市",
              "sub": null
            },
            {
              "name": "铜川市",
              "sub": null
            },
            {
              "name": "宝鸡市",
              "sub": null
            },
            {
              "name": "咸阳市",
              "sub": null
            },
            {
              "name": "渭南市",
              "sub": null
            },
            {
              "name": "延安市",
              "sub": null
            },
            {
              "name": "汉中市",
              "sub": null
            },
            {
              "name": "榆林市",
              "sub": null
            },
            {
              "name": "安康市",
              "sub": null
            },
            {
              "name": "商洛市",
              "sub": null
            }
          ]
        },
        {
          "name": "甘肃省",
          "sub": [
            {
              "name": "兰州市",
              "sub": null
            },
            {
              "name": "嘉峪关市",
              "sub": null
            },
            {
              "name": "金昌市",
              "sub": null
            },
            {
              "name": "白银市",
              "sub": null
            },
            {
              "name": "天水市",
              "sub": null
            },
            {
              "name": "武威市",
              "sub": null
            },
            {
              "name": "张掖市",
              "sub": null
            },
            {
              "name": "平凉市",
              "sub": null
            },
            {
              "name": "酒泉市",
              "sub": null
            },
            {
              "name": "庆阳市",
              "sub": null
            },
            {
              "name": "定西市",
              "sub": null
            },
            {
              "name": "陇南市",
              "sub": null
            },
            {
              "name": "临夏回族自治州",
              "sub": null
            },
            {
              "name": "甘南藏族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "青海省",
          "sub": [
            {
              "name": "西宁市",
              "sub": null
            },
            {
              "name": "海东地区",
              "sub": null
            },
            {
              "name": "海北藏族自治州",
              "sub": null
            },
            {
              "name": "黄南藏族自治州",
              "sub": null
            },
            {
              "name": "海南藏族自治州",
              "sub": null
            },
            {
              "name": "果洛藏族自治州",
              "sub": null
            },
            {
              "name": "玉树藏族自治州",
              "sub": null
            },
            {
              "name": "海西蒙古族藏族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "宁夏省",
          "sub": [
            {
              "name": "银川市",
              "sub": null
            },
            {
              "name": "石嘴山市",
              "sub": null
            },
            {
              "name": "吴忠市",
              "sub": null
            },
            {
              "name": "固原市",
              "sub": null
            },
            {
              "name": "中卫市",
              "sub": null
            }
          ]
        },
        {
          "name": "新疆省",
          "sub": [
            {
              "name": "乌鲁木齐市",
              "sub": null
            },
            {
              "name": "克拉玛依市",
              "sub": null
            },
            {
              "name": "吐鲁番地区",
              "sub": null
            },
            {
              "name": "哈密地区",
              "sub": null
            },
            {
              "name": "昌吉回族自治州",
              "sub": null
            },
            {
              "name": "博尔塔拉蒙古自治州",
              "sub": null
            },
            {
              "name": "巴音郭楞蒙古自治州",
              "sub": null
            },
            {
              "name": "阿克苏地区",
              "sub": null
            },
            {
              "name": "克孜勒苏柯尔克孜自治州",
              "sub": null
            },
            {
              "name": "喀什地区",
              "sub": null
            },
            {
              "name": "和田地区",
              "sub": null
            },
            {
              "name": "伊犁哈萨克自治州",
              "sub": null
            },
            {
              "name": "塔城地区",
              "sub": null
            },
            {
              "name": "阿勒泰地区",
              "sub": null
            },
            {
              "name": "省直辖行政单位",
              "sub": null
            }
          ]
        },
        {
          "name": "河北省",
          "sub": [
            {
              "name": "石家庄市",
              "sub": null
            },
            {
              "name": "唐山市",
              "sub": null
            },
            {
              "name": "秦皇岛市",
              "sub": null
            },
            {
              "name": "邯郸市",
              "sub": null
            },
            {
              "name": "邢台市",
              "sub": null
            },
            {
              "name": "保定市",
              "sub": null
            },
            {
              "name": "张家口市",
              "sub": null
            },
            {
              "name": "承德市",
              "sub": null
            },
            {
              "name": "沧州市",
              "sub": null
            },
            {
              "name": "廊坊市",
              "sub": null
            },
            {
              "name": "衡水市",
              "sub": null
            }
          ]
        },
        {
          "name": "山西省",
          "sub": [
            {
              "name": "太原市",
              "sub": null
            },
            {
              "name": "大同市",
              "sub": null
            },
            {
              "name": "阳泉市",
              "sub": null
            },
            {
              "name": "长治市",
              "sub": null
            },
            {
              "name": "晋城市",
              "sub": null
            },
            {
              "name": "朔州市",
              "sub": null
            },
            {
              "name": "晋中市",
              "sub": null
            },
            {
              "name": "运城市",
              "sub": null
            },
            {
              "name": "忻州市",
              "sub": null
            },
            {
              "name": "临汾市",
              "sub": null
            },
            {
              "name": "吕梁市",
              "sub": null
            }
          ]
        },
        {
          "name": "内蒙古省",
          "sub": [
            {
              "name": "呼和浩特市",
              "sub": null
            },
            {
              "name": "包头市",
              "sub": null
            },
            {
              "name": "乌海市",
              "sub": null
            },
            {
              "name": "赤峰市",
              "sub": null
            },
            {
              "name": "通辽市",
              "sub": null
            },
            {
              "name": "鄂尔多斯市",
              "sub": null
            },
            {
              "name": "呼伦贝尔市",
              "sub": null
            },
            {
              "name": "巴彦淖尔市",
              "sub": null
            },
            {
              "name": "乌兰察布市",
              "sub": null
            },
            {
              "name": "兴安盟",
              "sub": null
            },
            {
              "name": "锡林郭勒盟",
              "sub": null
            },
            {
              "name": "阿拉善盟",
              "sub": null
            }
          ]
        },
        {
          "name": "江苏省",
          "sub": [
            {
              "name": "南京市",
              "sub": null
            },
            {
              "name": "无锡市",
              "sub": null
            },
            {
              "name": "徐州市",
              "sub": null
            },
            {
              "name": "常州市",
              "sub": null
            },
            {
              "name": "苏州市",
              "sub": null
            },
            {
              "name": "南通市",
              "sub": null
            },
            {
              "name": "连云港市",
              "sub": null
            },
            {
              "name": "淮安市",
              "sub": null
            },
            {
              "name": "盐城市",
              "sub": null
            },
            {
              "name": "扬州市",
              "sub": null
            },
            {
              "name": "镇江市",
              "sub": null
            },
            {
              "name": "泰州市",
              "sub": null
            },
            {
              "name": "宿迁市",
              "sub": null
            }
          ]
        },
        {
          "name": "浙江省",
          "sub": [
            {
              "name": "杭州市",
              "sub": null
            },
            {
              "name": "宁波市",
              "sub": null
            },
            {
              "name": "温州市",
              "sub": null
            },
            {
              "name": "嘉兴市",
              "sub": null
            },
            {
              "name": "湖州市",
              "sub": null
            },
            {
              "name": "绍兴市",
              "sub": null
            },
            {
              "name": "金华市",
              "sub": null
            },
            {
              "name": "衢州市",
              "sub": null
            },
            {
              "name": "舟山市",
              "sub": null
            },
            {
              "name": "台州市",
              "sub": null
            },
            {
              "name": "丽水市",
              "sub": null
            }
          ]
        },
        {
          "name": "安徽省",
          "sub": [
            {
              "name": "合肥市",
              "sub": null
            },
            {
              "name": "芜湖市",
              "sub": null
            },
            {
              "name": "蚌埠市",
              "sub": null
            },
            {
              "name": "淮南市",
              "sub": null
            },
            {
              "name": "马鞍山市",
              "sub": null
            },
            {
              "name": "淮北市",
              "sub": null
            },
            {
              "name": "铜陵市",
              "sub": null
            },
            {
              "name": "安庆市",
              "sub": null
            },
            {
              "name": "黄山市",
              "sub": null
            },
            {
              "name": "滁州市",
              "sub": null
            },
            {
              "name": "阜阳市",
              "sub": null
            },
            {
              "name": "宿州市",
              "sub": null
            },
            {
              "name": "巢湖市",
              "sub": null
            },
            {
              "name": "六安市",
              "sub": null
            },
            {
              "name": "亳州市",
              "sub": null
            },
            {
              "name": "池州市",
              "sub": null
            },
            {
              "name": "宣城市",
              "sub": null
            }
          ]
        },
        {
          "name": "福建省",
          "sub": [
            {
              "name": "福州市",
              "sub": null
            },
            {
              "name": "厦门市",
              "sub": null
            },
            {
              "name": "莆田市",
              "sub": null
            },
            {
              "name": "三明市",
              "sub": null
            },
            {
              "name": "泉州市",
              "sub": null
            },
            {
              "name": "漳州市",
              "sub": null
            },
            {
              "name": "南平市",
              "sub": null
            },
            {
              "name": "龙岩市",
              "sub": null
            },
            {
              "name": "宁德市",
              "sub": null
            }
          ]
        },
        {
          "name": "江西省",
          "sub": [
            {
              "name": "南昌市",
              "sub": null
            },
            {
              "name": "景德镇市",
              "sub": null
            },
            {
              "name": "萍乡市",
              "sub": null
            },
            {
              "name": "九江市",
              "sub": null
            },
            {
              "name": "新余市",
              "sub": null
            },
            {
              "name": "鹰潭市",
              "sub": null
            },
            {
              "name": "赣州市",
              "sub": null
            },
            {
              "name": "吉安市",
              "sub": null
            },
            {
              "name": "宜春市",
              "sub": null
            },
            {
              "name": "抚州市",
              "sub": null
            },
            {
              "name": "上饶市",
              "sub": null
            }
          ]
        },
        {
          "name": "山东省",
          "sub": [
            {
              "name": "济南市",
              "sub": null
            },
            {
              "name": "青岛市",
              "sub": null
            },
            {
              "name": "淄博市",
              "sub": null
            },
            {
              "name": "枣庄市",
              "sub": null
            },
            {
              "name": "东营市",
              "sub": null
            },
            {
              "name": "烟台市",
              "sub": null
            },
            {
              "name": "潍坊市",
              "sub": null
            },
            {
              "name": "济宁市",
              "sub": null
            },
            {
              "name": "泰安市",
              "sub": null
            },
            {
              "name": "威海市",
              "sub": null
            },
            {
              "name": "日照市",
              "sub": null
            },
            {
              "name": "莱芜市",
              "sub": null
            },
            {
              "name": "临沂市",
              "sub": null
            },
            {
              "name": "德州市",
              "sub": null
            },
            {
              "name": "聊城市",
              "sub": null
            },
            {
              "name": "滨州市",
              "sub": null
            },
            {
              "name": "荷泽市",
              "sub": null
            }
          ]
        },
        {
          "name": "辽宁省",
          "sub": [
            {
              "name": "沈阳市",
              "sub": null
            },
            {
              "name": "大连市",
              "sub": null
            },
            {
              "name": "鞍山市",
              "sub": null
            },
            {
              "name": "抚顺市",
              "sub": null
            },
            {
              "name": "本溪市",
              "sub": null
            },
            {
              "name": "丹东市",
              "sub": null
            },
            {
              "name": "锦州市",
              "sub": null
            },
            {
              "name": "营口市",
              "sub": null
            },
            {
              "name": "阜新市",
              "sub": null
            },
            {
              "name": "辽阳市",
              "sub": null
            },
            {
              "name": "盘锦市",
              "sub": null
            },
            {
              "name": "铁岭市",
              "sub": null
            },
            {
              "name": "朝阳市",
              "sub": null
            },
            {
              "name": "葫芦岛市",
              "sub": null
            }
          ]
        },
        {
          "name": "吉林省",
          "sub": [
            {
              "name": "长春市",
              "sub": null
            },
            {
              "name": "吉林市",
              "sub": null
            },
            {
              "name": "四平市",
              "sub": null
            },
            {
              "name": "辽源市",
              "sub": null
            },
            {
              "name": "通化市",
              "sub": null
            },
            {
              "name": "白山市",
              "sub": null
            },
            {
              "name": "松原市",
              "sub": null
            },
            {
              "name": "白城市",
              "sub": null
            },
            {
              "name": "延边朝鲜族自治州",
              "sub": null
            }
          ]
        },
        {
          "name": "黑龙江省",
          "sub": [
            {
              "name": "哈尔滨市",
              "sub": null
            },
            {
              "name": "齐齐哈尔市",
              "sub": null
            },
            {
              "name": "鸡西市",
              "sub": null
            },
            {
              "name": "鹤岗市",
              "sub": null
            },
            {
              "name": "双鸭山市",
              "sub": null
            },
            {
              "name": "大庆市",
              "sub": null
            },
            {
              "name": "伊春市",
              "sub": null
            },
            {
              "name": "佳木斯市",
              "sub": null
            },
            {
              "name": "七台河市",
              "sub": null
            },
            {
              "name": "牡丹江市",
              "sub": null
            },
            {
              "name": "黑河市",
              "sub": null
            },
            {
              "name": "绥化市",
              "sub": null
            },
            {
              "name": "大兴安岭地区",
              "sub": null
            }
          ]
        },
        {
          "name": "海南省",
          "sub": [
            {
              "name": "海口市",
              "sub": null
            },
            {
              "name": "三亚市",
              "sub": null
            },
            {
              "name": "省直辖县级行政单位",
              "sub": null
            }
          ]
        },
        {
          "name": "香港特别行政区",
          "sub": [
            {
              "name": "香港特别行政区",
              "sub": null
            }
          ]
        },
        {
          "name": "澳门特别行政区",
          "sub": [
            {
              "name": "澳门特别行政区",
              "sub": null
            }
          ]
        }
      ],
      "code": 200
    }), Math.random() * 1500);
})


module.exports = router;
