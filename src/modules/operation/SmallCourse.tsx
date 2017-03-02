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
    config(['previewImage'])
    this.windowHeight = window.innerHeight - 65 - 60
    this.windowHeight2 = window.innerHeight - 65
    this.analysisCallback = null
    this.defaultCode = '2333';
    this.state = {
      pageId:0,
      detail:{
        data:[
          {
            "chapterId": 58,
            "chapterName": "Task 3 什么是个人战略的懒惰",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 654,
              "chapterId": 58,
              "sequence": 3,
              "topic": "个人要不要制定战略",
              "materialList": [
                {
                  "id": 1526,
                  "type": 2,
                  "pageId": 654,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_3_2.png"
                },
                {
                  "id": 1527,
                  "type": 1,
                  "pageId": 654,
                  "sequence": 2,
                  "content": "问题1：如果你现在工作做得很不开心，转行、跳槽一时又找不到机会，你要不要做职业规划？<br/><br/><br/>问题2：如果你有理想，并且正在努力的路上，目前工作也挺顺利的，需不需要做职业规划？<br/><br/><br/>问题3：以上两个问题回答“要”的朋友，你们做了职业规划吗？<br/><br/><br/><b>我们都认为企业需要战略，但落到个人身上，却从不做规划</b>。"
                }
              ]
            }
          },
          {
            "chapterId": 58,
            "chapterName": "Task 3 什么是个人战略的懒惰",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 656,
              "chapterId": 58,
              "sequence": 5,
              "topic": "个人战略规划的误区",
              "materialList": [
                {
                  "id": 1530,
                  "type": 2,
                  "pageId": 656,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_3_4.png"
                },
                {
                  "id": 1531,
                  "type": 1,
                  "pageId": 656,
                  "sequence": 2,
                  "content": "<b>在个人战略规划方面，我们经常陷入以下误区</b>：<br/><br/>误区1：搞错规划的负责人<br/><br/>误区2：搞错规划的内容<br/><br/>误区3：不关注外部变化<br/>"
                }
              ]
            }
          },
          {
            "chapterId": 59,
            "chapterName": "Task 4 个人战略规划有哪些因素",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 674,
              "chapterId": 59,
              "sequence": 2,
              "topic": "开始做个人战略规划",
              "materialList": [
                {
                  "id": 1567,
                  "type": 2,
                  "pageId": 674,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_4_2.png"
                },
                {
                  "id": 1569,
                  "type": 3,
                  "pageId": 674,
                  "sequence": 2,
                  "content": "http://www.iquanwai.com/audio/c5_T4p2.m4a"
                },
                {
                  "id": 1568,
                  "type": 1,
                  "pageId": 674,
                  "sequence": 3,
                  "content": "听了前面的课程后，想必大家已经跃跃欲试，想要为自己做一个战略规划了。<br/><br/><b>个人商业模式画布就是一个常用的规划工具</b>。<br/><br/>它能解决的问题：<br/><ul><li>分析当前存在的职业发展问题</li><li>确定未来的提升方向</li><li>进行职业选择</li></ul><br/>"
                }
              ]
            }
          },
          {
            "chapterId": 59,
            "chapterName": "Task 4 个人战略规划有哪些因素",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 675,
              "chapterId": 59,
              "sequence": 3,
              "topic": "先来认识一下这个画布",
              "materialList": [
                {
                  "id": 1570,
                  "type": 2,
                  "pageId": 675,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_4_3.png"
                },
                {
                  "id": 1709,
                  "type": 1,
                  "pageId": 675,
                  "sequence": 2,
                  "content": "可点击图片查看大图<br/><br/>"
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
            "chapterId": 60,
            "chapterName": "Task 5 如何制定个人战略规划",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 701,
              "chapterId": 60,
              "sequence": 3,
              "topic": "画布的三大用途",
              "materialList": [
                {
                  "id": 1615,
                  "type": 2,
                  "pageId": 701,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_5_3.png"
                },
                {
                  "id": 1616,
                  "type": 1,
                  "pageId": 701,
                  "sequence": 2,
                  "content": "还记得画布的三大用途吗？<br/><br/>1）\t分析当前存在的职业发展问题<br/><br/>2）\t确定未来的提升方向<br/><br/>3）\t进行职业选择<br/>"
                }
              ]
            }
          },
          {
            "chapterId": 60,
            "chapterName": "Task 5 如何制定个人战略规划",
            "chapterPic": null,
            "chapterType": 6,
            "totalPage": 6,
            "page": {
              "id": 702,
              "chapterId": 60,
              "sequence": 4,
              "topic": "举个栗子",
              "materialList": [
                {
                  "id": 1617,
                  "type": 2,
                  "pageId": 702,
                  "sequence": 1,
                  "content": "http://www.iqycamp.com/images/c5_6_10.png"
                },
                {
                  "id": 1618,
                  "type": 1,
                  "pageId": 702,
                  "sequence": 2,
                  "content": "分析这张画布，你觉得有什么问题？"
                },
                {
                  "id": 1619,
                  "type": 3,
                  "pageId": 702,
                  "sequence": 3,
                  "content": "http://www.iquanwai.com/audio/c5_T5p4.m4a"
                }
              ]
            }
          }
        ]
      }
    }
  }

  componentWillMount() {
    changeTitle('修改标题');
    const { dispatch, location } = this.props
    const promo_id = location.query.id
    dispatch(startLoad())
    pget(`/operation/promoCode/${promo_id?promo_id:this.defaultCode}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        config_share([''], res.msg.url,
          '这个春天，一起来重新认识职业发展！', 'http://www.iquanwai.com/images/career_activity_share.jpg',
          `${res.msg.name}推荐给你求职&职业规划课并送了你一个优惠码`)
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  prePage() {
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
    console.log(pageId);
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
          <div className="">
            <div className="success">
              <div className="success-img">
                <Icon type="success" size="150"/>
              </div>
              <div className="success-title">你已完成本小节</div>
              <div className="success-msg">优惠码如下：{this.props.location.query.id?this.props.location.query.id:this.defaultCode}</div>
              <Button className="success-btn" plain
                      onClick={() => this.setState({pageId:1})}>返回</Button>
              <section className="footer-btn">
                <div className="direct-btn-group">
                  {/*<div className="left-button" onTouchTap={this.prePage.bind(this)}><Icon style={{marginLeft:"15px",width:"50px",height:"30px"}} type="left_arrow_new"/></div>*/}
                  <div className="right-button" onTouchTap={this.firstPage.bind(this)}><Icon style={{marginRight:"15px",width:"50px",height:"30px"}} type="right_arrow_new"/></div>
                </div>
              </section>
            </div>
          </div>
        )
      } else {
        return (
          <div className="success">
            <div className="success-img">
              <Icon type="success" size="150"/>
            </div>
            <div className="success-title">你已完成本小节</div>
            <div className="success-msg">优惠码如下：{this.props.location.query.id?this.props.location.query.id:this.defaultCode}</div>
            <Button className="success-btn" plain
                    onClick={() => this.setState({pageId:1})}>返回</Button>
            <section className="footer-btn">
              <div className="direct-btn-group">
                <div className="left-button" onTouchTap={this.prePage.bind(this)}><Icon style={{marginLeft:"15px",width:"50px",height:"30px"}} type="left_arrow_new"/></div>
                {/*<div className="right-button" onTouchTap={this.firstPage.bind(this)}><Icon style={{marginRight:"15px",width:"50px",height:"30px"}} type="right_arrow_new"/></div>*/}
              </div>
            </section>
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
