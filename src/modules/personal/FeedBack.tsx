import * as React from "react"
import "./FeedBack.less"
import {changeTitle} from "utils/helpers"


export default class FeedBack extends React.Component<any,any>{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    changeTitle("意见反馈");
  }

  render(){
    return (
      <div className="feedback">
        <div className="feedback-header">
          意见反馈
        </div>
        <div className="feedback-container">
          <div className="tip">和产品经理聊聊你的意见吧，或者发邮件给我们</div>
          <div className="serverCode">
            <img src="http://www.iquanwai.com/images/subscribeCode.jpg"/>
          </div>
          <div className="email">
            iquanwai@163.com
          </div>
        </div>
      </div>
    )
  }

}
