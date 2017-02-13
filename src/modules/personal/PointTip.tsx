import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import "./PointTip.less"


@connect(state=>state)
export default class PointTip extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      point:null,
    }
  }

  componentWillMount(){
    changeTitle("积分规则");
  }
  render(){
    const {point} = this.state;
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          积分规则
        </div>
        <div className="point-tip-container">
          <b style={{fontSize:"14px"}}>如何获得积分？ </b><br/>
             -完善个人信息，获得30积分<br/>
             -报名RISE课程后，每天完成2组热身训练。题目根据难度分别对应20、30、50积分，答对就获得了相应的积分；<br/>
             -完成专题训练，获得60积分；<br/>
             -完成选做的应用训练，根据难度获得对应的60或80积分； <br/>
             -优秀的作业更易收到点赞，每获得一个点赞加2积分；<br/><br/>
          <b style={{fontSize:"14px"}}>积分有什么用？</b> <br/>
            -积分换购、延长开放期等功能开发中，敬请关注
        </div>
      </div>
    )
  }
}
