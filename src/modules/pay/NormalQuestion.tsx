import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import {pget, ppost} from "utils/request"
import "./../personal/PointTip.less"
import { config, preview } from "../helpers/JsConfig"

@connect(state => state)
export default class PointTip extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      point: null,
    }
  }

  componentWillMount() {
    changeTitle("了解更多");
    pget("/signup/mark/normal/question");
  }

  render() {
    return (
      <div className="point-tip">
        {/*<div className="point-tip-title">*/}
          {/*了解更多*/}
        {/*</div>*/}
        <div className="point-tip-container">
          <b style={{fontSize:"14px"}}>一、RISE小课有哪些内容？</b><br/>
          <b>RISE小课以职场常见问题为基础设计：</b><br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion1.png"  onClick={() => preview("http://www.iqycamp.com/images/normalquestion1.png", ["http://www.iqycamp.com/images/normalquestion1.png"])}/><br/>
          <b>一个课程在6-12个小节</b>，如果每天学习1小节（<b>20-30分钟</b>），<b>1-2周时间可以学完一个课程。</b><br/>
          这个设计方式，可以让我们每天学一点、练一下，更好地培养思考习惯。<br/><br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion2.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion2.jpg", ["http://www.iqycamp.com/images/normalquestion2.jpg"])}/><br/>
          目前RISE线上有10门小课，一周内还会上线3门。内容团队在持续更新，今年至少会有50门RISE小课上线。每一门小课的开发，都有非常复杂的流程：<br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion3.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion3.jpg", ["http://www.iqycamp.com/images/normalquestion3.jpg"])}/><br/>
          <b style={{fontSize:"14px"}}>二、RISE的学习方式是什么？</b><br/>
          <b>输入、输出、反馈的循环</b><br/>
          每个RISE小课，都分了章节，而每节小课的组成是一样的：<b>知识理解、巩固练习、应用练习</b>。<br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion4.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion4.jpg", ["http://www.iqycamp.com/images/normalquestion4.jpg"])}/><br/>
          <b>知识理解</b>是本节内容的讲解，<b>巩固练习</b>是通过一些选择题，将内容融入到生活工作场景中，巩固我们对内容的理解。而<b>应用练习</b>，则是真正将所学内容用于实际问题的解决。<br/>
          除了内容和练习本身，每个小课还会有<b>论坛</b>，在这里，大家可以分享自己用所学内容解决实际问题的案例，其他学员可以进行评论和探讨，这个过程就是相互反馈的过程。<br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion5.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion5.jpg", ["http://www.iqycamp.com/images/normalquestion5.jpg"])}/><br/>
          对于每个RISE小课，会限制一个<b>最低学习天数</b>（小节数/2），你可以很快学完，但在这个天数内，还需留在第一门小课内继续练习。因为<b>任何能力的学习，都是需要时间内化的</b>，不赞成一口吃个胖子。<br/><br/>
          <b style={{fontSize:"14px"}}>三、 RISE的学习工具是什么？用app吗？</b><br/>
          <b>无需下载，随时学习</b><br/>
          <b>RISE是基于微信服务号开发的，所以完全不需要另外下载app。</b><br/>
          另外，我们支持移动端和PC端，而且考虑了不同的学习场景，进行了不同的工具适配。<br/>
          比如，需要输出打字的应用练习和论坛，是支持PC端输入的；其它无需太多打字的部分，是支持移动端的。<br/><br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion6.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion6.jpg", ["http://www.iqycamp.com/images/normalquestion6.jpg"])}/><br/>
          <b style={{fontSize:"14px"}}>四、RISE用什么支撑我的学习？</b><br/>
          <b>教练体系、线上活动体系、线下活动体系</b><br/>
          <b>1）教练体系</b><br/>
          一方面，教练为学员提供点评和指导，让更多人可以得到反馈、学得更好；<br/>
          另一方面，对于优秀学员来说，这是继续进阶的一个途径，不仅可以学到更加精深的课程，还能够以教带学。<br/>
          成为圈外教练是需要通过考核认证的，通过之后可以免费使用圈外所有学习产品，并接受线上线下的专属培训<br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion7.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion7.jpg", ["http://www.iqycamp.com/images/normalquestion7.jpg"])}/><br/>
          <b style={{fontSize:"14px"}}>2）线上活动体系</b><br/>
          作业案例直播：定期会针对热点小课，举行线上学员作业的案例讨论会，和一些案例征集赛，进行语音直播讲解和答疑，帮助理解<br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion8.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion8.jpg", ["http://www.iqycamp.com/images/normalquestion8.jpg"])}/><br/>
          大咖直播分享：定期针对学员需求，邀请相关大咖进行直播分享。比如很多学员之前提到“如何分析一个行业”，Bloomberg某个行业的全球主管，5月份会在RISE做一次直播。<br/><br/>
          <b style={{fontSize:"14px"}}>3）线下活动体系</b><br/>
          RISE付费用户，可以参加我们定期举办线下学习活动。每个活动都有自己的主题（比如临场发言、问题分析等等），每场20-30人，圈外认证教练带领学习，并促进学员间进行职场资源对接，4月在上海施行，6月内推广到北京、深圳、广州，其它城市陆续推出，北上广深每个城市1年不少于6场<br/><br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion9.jpg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion9.jpg", ["http://www.iqycamp.com/images/normalquestion9.jpg"])}/><br/>
          <b style={{fontSize:"14px"}}>五、RISE和其他学习产品的不同之处？</b><br/>
          1）课程设计非常体系化；<br/>
          2）学习方式强调了练习；<br/>
          3）除了课程本身还有教练、线下等支撑体系；<br/>
          4）移动端和PC端都可以随时学习，非常灵活。<br/><br/>
          <b style={{fontSize:"14px"}}>六、还有其他问题？请联系我们的小Q帮你解答，记得备注“RISE小课报名”。</b><br/>
          <img className="pic" src="http://www.iqycamp.com/images/normalquestion10.jpeg" onClick={() => preview("http://www.iqycamp.com/images/normalquestion10.jpeg", ["http://www.iqycamp.com/images/normalquestion10.jpeg"])}/><br/>
        </div>
      </div>
    )
  }
}
