import * as React from "react"
import * as _ from "lodash"
import "./SmallCourse.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { materialType } from "../chapter/helpers/Const"
import { config, preview } from "../helpers/JsConfig"
import Icon from "../../components/Icon"
import Audio from "../../components/Audio"
import { isPending } from "utils/helpers"
import { config_share } from "../helpers/JsConfig"
import {changeTitle} from "../../utils/helpers"

const { Alert } = Dialog


@connect(state => state)
export default class SmallCourse extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    changeTitle('圈外见解');
    config_share(['previewImage'], 'http://www.iquanwai.com/static/smallCourse/share',
      '为什么你需要一份个人发展策略', 'http://www.iquanwai.com/images/career_activity_share.jpg',
      `来听听服务过7个行业、60多家企业，给上百面试官做过培训的咨询顾问圈圈如何看这个问题`)
    this.windowHeight = window.innerHeight - 65 - 60
    this.windowHeight2 = window.innerHeight - 65
    this.analysisCallback = null
    this.state = {
      pageId:0,
      detail:{
        data:[
          {
            "chapterId": 58,
            "chapterName": "Task 3 什么是个人战略的懒惰",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 654,
              "chapterId": 58,
              "sequence": 1,
              "topic": "个人要不要有战略",
              "materialList": [
                {
                  "id": 1526,
                  "type": 1,
                  "pageId": 654,
                  "sequence": 1,
                  "content": "<b>测试一下，你是否在“用战术的勤奋代替战略的懒惰”：</b><br/><br/>"
                },
                {
                  "id": 1527,
                  "type": 1,
                  "pageId": 654,
                  "sequence": 2,
                  "content": "<b>问题1：</b>如果你现在工作很不开心，转行、跳槽一时又找不到机会，要不要做职业规划？<br/>" +
                  "<b>问题2：</b>如果你有理想，并且正在努力的路上，目前工作也挺顺利的，要不要做职业规划？<br/>" +
                  "<b>问题3：</b>规划赶不上变化，所以职业规划完全很扯，你是否同意这种说法？<br/><br/>" +
                  "实际上，大多数人对职业规划的理解都是错的<br/>" +
                  "一个企业，需要制定战略，以决定有限的资源向哪里投入，才能实现目标；<br/><br/>" +
                  "<b>而每个人其实就是一个公司：需要盈利、竞争、并且根据自己的优劣势进行定位等。</b><br/>" +
                  "所以个人也需要制定战略，以决定有限的时间精力往哪里投入。<br/><br/>" +
                  "<b>职业规划，就是你的个人发展战略。</b><br/><br/>"
                }
              ]
            }
          },
          {
            "chapterId": 58,
            "chapterName": "Task 3 什么是个人战略的懒惰",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 656,
              "chapterId": 58,
              "sequence": 2,
              "topic": "个人商业模式画布",
              "materialList": [
                {
                  "id": 1530,
                  "type": 1,
                  "pageId": 656,
                  "sequence": 1,
                  "content": "个人商业模式画布是一个战略规划工具，它帮助我们用企业做战略的方式，来规划自己的职业道路。下面我们一起来认识一下这张画布。<br/>"
                },
                {
                  "id": 1531,
                  "type": 2,
                  "pageId": 656,
                  "sequence": 2,
                  "content": "http://www.iqycamp.com/images/c5_4_3.png"
                },
                {
                  "id": 1571,
                  "type": 3,
                  "pageId": 675,
                  "sequence": 3,
                  "content": "http://www.iquanwai.com/audio/c5_T4p3.m4a"
                }
              ]
            }
          },
          {
            "chapterId": 59,
            "chapterName": "Task 4 个人战略规划有哪些因素",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 674,
              "chapterId": 59,
              "sequence": 3,
              "topic": "画布的三大用途",
              "materialList": [
                {
                  "id": 1567,
                  "type":1,
                  "pageId": 674,
                  "sequence": 1,
                  "content": "<b>这张画布，可以帮助我们解决以下三大问题：</b><br/><br/>"
                },
                {
                  "id": 1568,
                  "type": 1,
                  "pageId": 674,
                  "sequence": 2,
                  "content": "1）	分析当前存在的职业发展问题<br/> "+
                  "2）	确定未来的方向<br/>" +
                  "3）	进行职业选择<br/>"
                }
              ]
            }
          },
          {
            "chapterId": 59,
            "chapterName": "Task 4 个人战略规划有哪些因素",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 675,
              "chapterId": 59,
              "sequence": 4,
              "topic": "举个栗子：分析画布",
              "materialList": [
                {
                  "id": 1570,
                  "type": 2,
                  "pageId": 675,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/smallCourse6.jpg"
                },
                {
                  "id": 1709,
                  "type": 1,
                  "pageId": 675,
                  "sequence": 2,
                  "content": "分析这张画布，你觉得有什么问题？<br/><br/>"
                },
                {
                  "id": 1571,
                  "type": 3,
                  "pageId": 675,
                  "sequence": 3,
                  "content": "http://www.iquanwai.com/audio/c5_T5p4.m4a"
                }
              ]
            }
          },
          {
            "chapterId": 60,
            "chapterName": "qiuzhi",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 701,
              "chapterId": 60,
              "sequence": 5,
              "topic": "好简历不只是格式",
              "materialList": [
                {
                  "id":1223,
                  "type":1,
                  "pageId":701,
                  "sequence":1,
                  "content":"假设你完成了职业规划，决定转行或跳槽。那么，该如何准备简历呢？<br/><br/>"
                },
                {
                  "id":1123,
                  "type":1,
                  "pageId":701,
                  "sequence":2,
                  "content":"<b>匹配分析表：帮助你根据企业招聘需求，来匹配自身的卖点。</b><br/><br/>"
                },
                {
                  "id":1423,
                  "type":1,
                  "pageId":701,
                  "sequence":3,
                  "content":"左边第一列是企业招聘需求的类型，第二列是具体招聘需求（可以在招聘广告中看到），第三列是自己的匹配程度，第四列是你打算在简历中如何体现：<br/>"
                },
                {
                  "id": 1615,
                  "type": 2,
                  "pageId": 701,
                  "sequence": 4,
                  "content": "http://www.iqycamp.com/images/qz2_2.png"
                },
                {
                  "id": 1616,
                  "type": 1,
                  "pageId": 701,
                  "sequence": 5,
                  "content": "这张匹配表，能够让你知己知彼，并且在简历中突出卖点。<br/><br/>企业更加看重的需求（一般来说，是招聘广告中列在上面的项目）、自己匹配度更高的项目（有更多事例证明的项目），就是简历中需要重点突出的部分。<br/><br/>"
                }
              ]
            }
          },
          {
            "chapterId": 60,
            "chapterName": "Task 5 如何制定个人战略规划",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 702,
              "chapterId": 60,
              "sequence": 6,
              "topic": "自我介绍的“套路”",
              "materialList": [
                {
                  "id": 1617,
                  "type": 1,
                  "pageId": 702,
                  "sequence": 1,
                  "content": "通过了简历筛选，接下来如何在面试中“愉快地聊天”，赢得面试官青睐呢？<br/><br/>"+
                  "即使是小小的自我介绍，也有大大的套路，而不是把简历再读一遍：<br/><br/>"
                },
                {
                  "id": 1619,
                  "type": 3,
                  "pageId": 702,
                  "sequence": 3,
                  "content": "http://www.iquanwai.com/audio/qz3_6.m4a"
                }
              ]
            }
          },
          {
            "chapterId": 60,
            "chapterName": "Task 5 如何制定个人战略规划",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 8,
            "page": {
              "id": 702,
              "chapterId": 60,
              "sequence": 7,
              "topic": "如何选对Offer",
              "materialList": [
                {
                  "id": 1617,
                  "type": 1,
                  "pageId": 702,
                  "sequence": 1,
                  "content": "最后，当多个offer摆在面前时，如何选择也很重要。具体分析判断后，再送你一个打分工具。<br/><br/>" +
                  "<b>利用以下表格，对目标公司进行打分，以总分作为选择Offer的可靠参考。</b><br/>"
                },
                {
                  "id": 1619,
                  "type": 2,
                  "pageId": 702,
                  "sequence": 2,
                  "content": "http://www.iquanwai.com/images/c5_5_14.png"
                },
                {
                  "id": 1620,
                  "type": 3,
                  "pageId": 702,
                  "sequence": 3,
                  "content": "http://www.iquanwai.com/audio/t6p6.m4a"
                }
              ]
            }
          }
        ]
      }
    }
  }


  prePage(e) {
    this.stopAllSound()
    this.setState({pageId:this.state.pageId-1});
  }

  nextPage() {
    this.stopAllSound()
    this.setState({pageId:this.state.pageId+1})
  }

  firstPage() {
    this.stopAllSound()
    this.setState({pageId:1});
  }



  stopAllSound() {
    const { analysisSound, detailSound, homeworkSound } = this.refs
    if (analysisSound) {
      analysisSound.stop()
    }
    if (detailSound) {
      detailSound.stop()
    }
    if (homeworkSound) {
      homeworkSound.stop()
    }
  }


  render() {
    const {detail,pageId} = this.state;
    const chapter = _.get(detail, `data[${pageId - 1}]`, {})
    const page = _.get(chapter, `page`, [])
    const materialList = _.get(page, `materialList`, [])
    const homework = _.get(chapter, `homework`, null)
    const renderMaterial = (material) => {
      let inner = null
      switch (material.type) {
        case materialType.TEXT:
          inner = (
            <div dangerouslySetInnerHTML={{__html: material.content}}></div>
          )
          break;
        case materialType.PICTURE:
          inner = (
            <img src={material.content} onClick={() => preview(material.content, [material.content])}/>
          )
          break;
        case materialType.SOUND:
          inner = (
            <Audio url={material.content} ref="detailSound"/>
          )
          break
        default:
          inner = null
      }

      return (
        <div className="material-container" key={material.id}>
          {inner}
        </div>
      )
    }

    const renderSpecial = ()=>{
      if(pageId == 0){
        return (
          <div onTouchTap={()=>this.nextPage()} className="first">
          </div>
        )
      } else {
        return (
          <div className="special">
            <div className="tips">
              听完这些，有没有启发呢？<br/><br/>
              如果你想要为自己制定一份个人战略，可以继续学习我们的“<b>战略性职业规划</b>”课程；<br/><br/>
              如果你已经决定有所行动，可以继续学习我们的“<b>求职背后的秘密</b>”课程；<br/><br/>
              <span className="center">长按二维码，关注后按提示报名</span>
              <img src="http://www.iquanwai.com/images/serverQrCode.jpg"/><br/>
              <b>1 课程收获</b><br/>
              这两门课程可以让你：<br/>
              1）	对未来更有策略性<br/>
              2）	对自我有更深的认知<br/>
              3）	增加求职的成功率<br/>
              4）	结识志同道合的小伙伴（还有圈圈和圈外的教练们）<br/><br/>
              <b>2 限时增值服务（3月15日前报名）</b><br/>
              1） 抽出1位，圈圈提供1小时一对一沟通（几乎100倍于报名费用）<br/>
              2） 抽出30位，圈外教练提供简历修改建议<br/>
              3） 抽出30位，圈外教练提供职业规划方案的修改建议<br/>
              4） 抽出10位，送出我的签名版新书<br/>
              5） 每门课程都含有1次答疑直播，在直播时候把你的问题提给我，我会回答<br/>
              6） 如果你有老学员分享给你的优惠码，可以减20%费用<br/>
            </div>
          </div>
        )
      }
    }



    return (
      <div className="detail">

        { pageId > 0 && pageId <= (chapter ? chapter.totalPage : 0 + 1) ? <div>
          <div className="top-panel">
            {page.topic}
          </div>
          <div className="container" style={{height: !homework ? this.windowHeight : this.windowHeight2}}>
            {_.map(materialList, material => renderMaterial(material))}
          </div>
          { !homework && !isPending(this.props, 'base.loading') ? <section className="footer-btn">
            <div className="direct-btn-group">
              { pageId !== 0 ?
                <div className="left-button" onTouchTap={this.prePage.bind(this)}><Icon style={{marginLeft:"15px",width:"50px",height:"30px"}} type="left_arrow_new"/>
                </div> :
                <div className="left-button"></div>}
              <div className="page-number">{pageId}/{chapter ? chapter.totalPage : 0}</div>
              <div className="right-button" onTouchTap={this.nextPage.bind(this)}><Icon style={{marginRight:"15px",width:"50px",height:"30px"}} type="right_arrow_new"/>
              </div>
            </div>
          </section> : null}
        </div> : renderSpecial()}
      </div >
    )
  }
}
