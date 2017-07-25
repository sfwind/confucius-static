import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import {pget, ppost} from "utils/request"
import "./NormalQuestion.less"
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
    const {memberType} = this.props.location.query;
    ppost('/b/mark', {
      module: "打点",
      function: "付费相关",
      action: "会员详情",
      memo: memberType
    });
  }

  render() {
    const {memberType} = this.props.location.query;
    return (
      <div className="point-tip">
        {/*<div className="point-tip-title">*/}
          {/**/}
        {/*</div>*/}
        {Number(memberType) === 3 || Number(memberType) === 4?(
          <div className="point-tip-container">
            <div className="title">
              一、产品介绍<br/>
            </div>


            【圈外同学】是一个提升个体势能，让你在职场更值钱的能力提升产品。<br/><br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg4.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg4.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg4.png"])}/><br/>


            <b style={{fontSize:"16px"}}>基于个体势能模型的课程体系</b><br/>
            圈圈用9年时间，经历6个行业50家公司400多个岗位的人才发展体系的设计和深入研究，搭建出完善的个体势能模型，用顶级公司培养人才的方式，培养你自己。<br/><br/>

            <b style={{fontSize:"16px"}}>支撑碎片时间学习的移动工具</b><br/>
            【圈外同学】把每个知识点都拆成5分钟可以学习的结构，而串联起来又是极其系统的课程内容。 不管你用手机、iPad还是电脑，通勤的路上还是下班回家，都可以利用时间，学习起来。<br/><br/>

            <b style={{fontSize:"16px"}}>全年50+节课&100+场学习活动</b><br/>
            一个在职场中具备竞争力的人，不同阶段所需的能力，可以用个体势能模型来总结，【圈外同学】的课程就是根据此设计（过去一个月我们更新了7节，所以可能超过50节）：<br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg1.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg1.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg1.png"])}/><br/>

            除了学习，我们还有各领域大咖直播（大咖选择标准：不看流量看干货，目前我们请到的大咖都是那些只在重要场合露脸，平时极少愿意对外宣传的行业牛人）、好评率超过99.9999%的案例吊打、帮助你累积职场资源的线下学习工作坊、游戏化学习的地域PK.......<br/><br/>


            <b style={{fontSize:"16px"}}>输入+输出+讨论的刻意练习环境</b><br/>
            能力的学习，跟我们去学习某个知识（比如牛奶是白色的）不同，不会只是信息理解和记忆。因为从我们知道一个方法，到真正理解它跟其它知识的联系，再到能够用它来解决问题，最终内化为自己的能力，中间需要一系列的刻意练习。<br/><br/>

            【圈外同学】小课都分了章节，而每小节都由知识理解、巩固练习、应用练习组成。<br/><br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg3.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg3.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg3.png"])}/><br/>


            其中，知识理解是本节内容的讲解，巩固练习是通过一些选择题，将内容融入到生活工作场景中，巩固我们对内容的理解。<br/><br/>


            而应用练习，则是真正将所学内容用于实际问题的解决。比如，让你用学到的讲故事方法，设计一段表白词，等等。<br/><br/>


            <b style={{fontSize:"16px"}}>连接高质量职场资源的校友会</b><br/>
            在持续成长中，每个人都离不开这三类人，自己、伙伴和导师。一个人的思考也是有限的，你需要有相同意愿、智商相近的人，与你同行。在你做的好时，给你赞扬，做得不好时，给你建议和鼓励。<br/>
            在圈外学员中，不乏各类大厂、世界500强等企业的童鞋。所以我们在线上设立了各个地区的校友会，并且定期举办各种学习活动，组织大家一起升级打怪，在学习中找到良师益友。<br/><br/><br/>


            <b style={{fontSize:"16px"}}>优秀学员的助教&奖学金计划</b><br/>
            1、圈外助教，预计每季度从优秀学员中选拔一次。这意味着什么呢？<br/>
            &nbsp;1）免费学习圈外所有课程 <br/>
            &nbsp;2）圈圈多年职场经验，倾囊相授 <br/>
            &nbsp;3）全年持续全面的不定期培训，圈外有完备的助教培养体系，帮助大家加速职场发展。<br/>
            &nbsp;4）跟一帮能力超强的小伙伴一起玩耍<br/>
            2、奖学金计划，认真学习的童鞋，我们会根据学习积分情况返回一部分学费。<br/>
            3、跟圈圈一对一交流，如你所知，对外咨询费3000+，视童鞋们的学习情况而定，每季度至少一个名额。<br/>
            4、工作机会推荐 ，包括圈外工作机会。<br/><br/><br/>


            <b style={{fontSize:"16px"}}>精英学员优先得到作业点评和案例分析</b><br/>
            职场中并不是每个人都那么幸运，有mentor天天来指导自己，给自己反馈。<br/>
            【圈外同学】的学习模式是我们提供体系化课程，你负责输出，我们负责反馈，帮助你提升思维能力和方法。<br/>
            &nbsp;1）圈外专业教练点评小课。（前几天圈圈还亲自跑去大家的作业下点评呢，总之会时常有一些小惊喜喔）<br/>
            &nbsp;2）作业案例直播：针对各个课程，以学员作业为案例，进行语音直播讲解和答疑，帮助理解，俗称“吊打”。在【圈外同学】首批吊打中，参加人数超过了2000人，当天大家讨论到晚上10点半才结束。<br/><br/>

            <b style={{fontSize:"16px"}}>精英学员可以免费参加线下活动，结识伙伴&导师</b><br/>
            线下我们会定期举办学习工作坊，很多童鞋还通过线下工作坊勾搭到行业人士，解决了自己的职业困惑。除此之外，各个分舵也会不定期举办一些线下活动，很多童鞋在这里找到了志同道合的朋友。<br/>

            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg", ["https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg"])}/>
            {/*<b style={{fontSize:"14px"}}>六、还有其他问题？请联系我们的小Q帮你解答，记得备注“【圈外同学】小课报名”。</b><br/>*/}
            {/*<img className="pic" src="https://static.iqycamp.com/images/normalquestion10.jpeg" onClick={() => preview("https://static.iqycamp.com/images/normalquestion10.jpeg", ["https://static.iqycamp.com/images/normalquestion10.jpeg"])}/><br/>*/}
            <div className="title">
              <br/>二、Q&A:<br/>
            </div>
            <b style={{fontSize:"16px"}}>Q:精英版有什么优势和福利？</b><br/>
            A:<br/>
            &nbsp;1）免费参加一年至少六场线下学习活动 ，学习提高的同时，还可以结识小伙伴和导师<br/>
            &nbsp;2）一个小课至少得到一次教练点评（优秀作业有机会被圈圈亲自点评），还可以优先作为案例深度分析<br/>
            &nbsp;3）【圈外同学】学习过程中，任何问题都可以在群里讨论，得到解答<br/>
            &nbsp;4）能够优先参与每周官方学习活动<br/>
            &nbsp;5）得到圈外和小伙伴们的定期督促和鞭策<br/><br/>


            <b style={{fontSize:"16px"}}>Q: 我在的城市好像没有线下活动，那是不是就不能报精英了？</b><br/>
            A: 不是的哦。我们目前已经在北上广深策划和举办了线下工作坊，之后还会在杭州、南京等城市举办哦。选择城市的标准是用户量足够大，所以快快把【圈外同学】推荐给你的小伙伴，一起学习吧。<br/>
            若您的城市没有线下活动，您可以选择附近城市参加（如哈尔滨的会员可以选择参加北京场）哦；若附近也无城市举办工作坊，在报名精英版后，您可以选择：<br/>
            1，每个小课增加一次点评<br/>
            2，给您延期4个月精英版的使用期<br/><br/>


            <b style={{fontSize:"16px"}}>Q:线下工作坊一年办几次？</b><br/>
            A:6-20场（差距在于：场数需要根据当地学员的数量来决定。但一年至少六次）<br/><br/>
            <b style={{fontSize:"16px"}}>Q:既然【圈外同学】一直在研发新课程，会不会越迟买越划算？</b><br/>
            A:不会，原因如下：<br/>
            1）【圈外同学】会持续研发和上线新课程，未来还会联合更多优质的学习资源开设丰富多样的主题课程。因此，一年内上线的【圈外同学】课程想全部跟着学完并不简单。我们鼓励大家需要根据个人需求来规划课程学习。<br/>
            2）【圈外同学】是会陆续涨价的哦，早期当然最划算啦。<br/><br/>



            <b style={{fontSize:"16px"}}>Q:【圈外同学】和训练营有什么区别？我参加过训练营还需要报名参加【圈外同学】吗？</b><br/>
            A:两者的区别在于：【圈外同学】提供多种能力每天的刻意练习，训练营则是集中时间、由教练带领、深入练习某个能力。前者培养广度，是每天学习的工具，后者针对深度。<br/>
            此外，从训练营毕业的优秀学员可以申领奖学金，报名【圈外同学】精英版课程可以无条件直接抵扣，金额0-500元不等。<br/><br/>

            <b style={{fontSize:"16px"}}>Q:我点击【圈外同学】付款后是一片空白／提示URL异常／页面样式混乱，怎么办？</b><br/>
            A:遇到此种情况，可以直接联系小Q 解决问题哦（微信ID：quanwaizhushou）<br/>
            <img className="pic" src="https://static.iqycamp.com/images/normalquestion10.jpeg" onClick={() => preview("https://static.iqycamp.com/images/normalquestion10.jpeg", ["https://static.iqycamp.com/images/normalquestion10.jpeg"])}/><br/>
          </div>
        ):(
          <div className="point-tip-container">
            <div className="title">
              一、产品介绍<br/>
            </div>

            【圈外同学】是一个提升个体势能，让你在职场更值钱的能力提升产品。<br/><br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg4.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg4.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg4.png"])}/><br/>


            <b style={{fontSize:"16px"}}>基于个体势能模型的课程体系</b><br/>
            圈圈用9年时间，经历6个行业50家公司400多个岗位的人才发展体系的设计和深入研究，搭建出完善的个体势能模型，用顶级公司培养人才的方式，培养你自己。<br/><br/>

            <b style={{fontSize:"16px"}}>支撑碎片时间学习的移动工具</b><br/>
            【圈外同学】把每个知识点都拆成5分钟可以学习的结构，而串联起来又是极其系统的课程内容。 不管你用手机、iPad还是电脑，通勤的路上还是下班回家，都可以利用时间，学习起来。<br/><br/>

            <b style={{fontSize:"16px"}}>全年50+节课&100+场学习活动</b><br/>
            一个在职场中具备竞争力的人，不同阶段所需的能力，可以用个体势能模型来总结，【圈外同学】的课程就是根据此设计（过去一个月我们更新了7节，所以一年超过50节。半年专业版的同学，就无法接触到后半年的新课了）：<br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg1.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg1.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg1.png"])}/><br/>

            除了学习，我们还有各领域大咖直播（大咖选择标准：不看流量看干货，目前我们请到的大咖都是那些只在重要场合露脸，平时极少愿意对外宣传的行业牛人）、好评率超过99.9999%的案例吊打、帮助你累积职场资源的线下学习工作坊、游戏化学习的地域PK.......<br/><br/>




            <b style={{fontSize:"16px"}}>输入+输出+讨论的刻意练习环境</b><br/>
            能力的学习，跟我们去学习某个知识（比如牛奶是白色的）不同，不会只是信息理解和记忆。因为从我们知道一个方法，到真正理解它跟其它知识的联系，再到能够用它来解决问题，最终内化为自己的能力，中间需要一系列的刻意练习。<br/>

            【圈外同学】小课都分了章节，而每小节都由知识理解、巩固练习、应用练习组成。<br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg3.png"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg3.png", ["https://static.iqycamp.com/images/CreamMoreMsgImg3.png"])}/><br/>


            其中，知识理解是本节内容的讲解，巩固练习是通过一些选择题，将内容融入到生活工作场景中，巩固我们对内容的理解。<br/>


            而应用练习，则是真正将所学内容用于实际问题的解决。比如，让你用学到的讲故事方法，设计一段表白词，等等。<br/><br/>



            <b style={{fontSize:"16px"}}>连接高质量职场资源的校友会</b><br/>
            在持续成长中，每个人都离不开这三类人，自己、伙伴和导师。一个人的思考也是有限的，你需要有相同意愿、智商相近的人，与你同行。在你做的好时，给你赞扬，做得不好时，给你建议和鼓励。<br/>
            在圈外学员中，不乏各类大厂、世界500强等企业的童鞋。所以我们在线上设立了各个地区的校友会，并且定期举办各种学习活动，组织大家一起升级打怪，在学习中找到良师益友。<br/><br/>



            <b style={{fontSize:"16px"}}>优秀学员的助教&奖学金计划</b><br/>
            1、圈外助教，预计每季度从优秀学员中选拔一次。这意味着什么呢？<br/>
            &nbsp;1）免费学习圈外所有课程 <br/>
            &nbsp;2）圈圈多年职场经验，倾囊相授 <br/>
            &nbsp;3）全年持续全面的不定期培训，圈外有完备的助教培养体系，帮助大家加速职场发展。<br/>
            &nbsp;4）跟一帮能力超强的小伙伴一起玩耍<br/>
            2、奖学金计划，认真学习的童鞋，我们会根据学习积分情况返回一部分学费。<br/>
            3、跟圈圈一对一交流，如你所知，对外咨询费3000+，视童鞋们的学习情况而定，每季度至少一个名额。<br/>
            4、工作机会推荐 ，包括圈外工作机会。<br/><br/>


            <b style={{fontSize:"16px"}}>专业版用户可参加作业案例分析</b><br/>
            职场中并不是每个人都那么幸运，有mentor天天来指导自己，给自己反馈。<br/>
            【圈外同学】的学习模式是我们提供体系化课程，你负责输出，我们负责反馈，帮助你提升思维能力和方法。<br/>
            针对各个课程，我们会以学员作业为案例，进行语音直播讲解和答疑，帮助理解，俗称“吊打”。在【圈外同学】首批吊打中，参加人数超过了2000人，当天大家讨论到晚上10点半才结束。<br/><br/>

            <b style={{fontSize:"16px"}}>专业版用户可优惠参加线下活动</b><br/>
            线下我们会定期举办学习工作坊，很多童鞋还通过线下工作坊勾搭到行业人士，解决了自己的职业困惑。除此之外，各个分舵也会不定期举办一些线下活动，很多童鞋在这里找到了志同道合的朋友。<br/>
            专业版会员，可以以覆盖场地、物料等基本成本的价格，优惠参加线下学习活动。<br/>
            <img className="pic" src="https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg"
                 onClick={() => preview("https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg", ["https://static.iqycamp.com/images/CreamMoreMsgImg2.jpg"])}/>

            <div className="title">
              <br/>二、Q&A:<br/>
            </div>
            <b style={{fontSize:"16px"}}>Q: 我想知道半年和一年的课程内容是一样的吗？</b><br/>

            A: 每个月都会有新的小课上线，且对所有会员开放哦，随着时间的推移，一年版的内容相对半年版会更加丰富。<br/><br/>

            <b style={{fontSize:"16px"}}>Q:线下工作坊一年办几次？</b><br/>
            A:6-20场（差距在于：场数需要根据当地学员的数量来决定。但一年至少六次）<br/><br/>

            <b style={{fontSize:"16px"}}>Q:既然【圈外同学】一直在研发新课程，会不会越迟买越划算？</b><br/>
            A:不会，原因如下：<br/>
            1）【圈外同学】会持续研发和上线新课程，未来还会联合更多优质的学习资源开设丰富多样的主题课程。因此，一年内上线的【圈外同学】课程想全部跟着学完并不简单。我们鼓励大家需要根据个人需求来规划课程学习。<br/>
            2）【圈外同学】是会陆续涨价的哦，早期当然最划算啦。<br/><br/>
            <b style={{fontSize:"16px"}}>Q:【圈外同学】和训练营有什么区别？我参加过训练营还需要报名参加【圈外同学】吗？</b><br/>
            A:两者的区别在于：【圈外同学】提供多种能力每天的刻意练习，训练营则是集中时间、由教练带领、深入练习某个能力。前者培养广度，是每天学习的工具，后者针对深度。<br/>
            此外，从训练营毕业的优秀学员可以申领奖学金，报名【圈外同学】精英版课程可以无条件直接抵扣，金额0-500元不等。<br/><br/>

              <b style={{fontSize:"16px"}}>Q:我点击【圈外同学】付款后是一片空白／提示URL异常／页面样式混乱，怎么办？</b><br/>
            A:遇到此种情况，可以直接联系小Q 解决问题哦（微信ID：quanwaizhushou）<br/>
            <img className="pic" src="https://static.iqycamp.com/images/normalquestion10.jpeg" onClick={() => preview("https://static.iqycamp.com/images/normalquestion10.jpeg", ["https://static.iqycamp.com/images/normalquestion10.jpeg"])}/><br/>
          </div>
        )}
      </div>
    )
  }
}
