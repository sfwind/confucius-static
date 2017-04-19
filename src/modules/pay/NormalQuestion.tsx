import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import "./../personal/PointTip.less"


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
    pget("/singup/mark/normal/question");
  }

  render() {
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          了解更多
        </div>
        <div className="point-tip-container">
          <b style={{fontSize:"14px"}}>-作业案例直播是什么？ </b><br/>
          -定期针对各个课程，以学员作业为案例，进行语音直播讲解和答疑，帮助理解<br/><br/>
          <b style={{fontSize:"14px"}}>-线下学习活动怎么玩？</b><br/>
          -针对部分课程，有线下工作坊，每期20-30人，由圈外教练带领学习，并促进学员间进行职场资源对接，4月在上海施行，6月内推广到北京、深圳、广州，其它城市陆续推出<br/><br/>
          <b style={{fontSize:"14px"}}>-大咖直播分享是什么？</b><br/>
          -定期针对学员需求，邀请相关大咖进行直播分享<br/>
        </div>
      </div>
    )
  }
}
