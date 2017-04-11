import * as React from "react"
import "./FeedBack.less"
import {changeTitle} from "utils/helpers"
import {pget, ppost} from "utils/request"


export default class FeedBack extends React.Component<any,any>{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    changeTitle("帮助");
    pget("/customer/rise/feedback/open");
  }

  render(){
    return (
      <div className="feedback">
        <div className="feedback-header">
          帮助
        </div>
        <div className="feedback-container">
          <div className="tip">
            <p style={{fontSize:'15px',fontWeight:'bolder'}}>有疑问或建议，请给后台留言</p>
            <div className="serverCode">
              <img src="https://www.iqycamp.com/images/personalFeedbackv1.png"/>
            </div>
            <p style={{fontSize:'15px',fontWeight:'bolder'}}>常见问题</p><br/>

            <p className="q">-理解训练的选择题是单项还是多项呢？</p>
            <p>-都是不定项选择，可能有1或多个答案</p><br/>

            <p className="q">-做完理解训练后有疑问，怎么办？</p>
            <p>-下方的问答区可以提问，被回答后会在首页的消息中心通知你</p><br/>

            <p className="q">-页面文字看起来太小/太大</p>
            <p>-点击右上角三个点，可以调整文字大小</p><br/>

            <p className="q">-可以在电脑端完成RISE训练吗？</p>
            <p>-windows电脑可以在微信客户端—圈外训练营里打开RISE并完成训练，mac微信客户端暂不支持。专题分享、应用训练和小目标，都可以登录www.iquanwai.com/community完成</p><br/>


            <p className="q">-为什么我的训练任务显示锁定？</p>
            <p>-之前的理解训练或知识点没有完成</p><br/>

            <p className="q"> -为什么我的专题到期关闭了？</p>
            <p>-书非借不能读，为了每个人能有动力坚持完成训练，每个专题的开放天数=30天(拖延症福利)，到期后自动关闭</p>
          </div>
        </div>
      </div>
    )
  }

}
