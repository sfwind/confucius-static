import * as React from "react"
import "./MobileLoginTip.less"
import {connect} from "react-redux"
import {set, startLoad, endLoad} from "redux/actions"
import {Msg} from "react-weui"
import Icon from "../../components/Icon"
import * as _ from "lodash"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const {location} = this.props;
    const err = _.get(location, "query.err");
    return (
      <div className="pcTipContainer">
        <div className="success-img">
          <img src="https://www.iqycamp.com/images/serverQrCode.jpg" width={"150px"} height={"150px"}/>
        </div>
        <div className="result-title">{err?err:"扫码成功!"}</div>
        {/**<div className="success-msg">
         <p>留意本周六的消息,圈圈姐帮你点评作业!</p>
         <p>记得去群里讨论!</p>
         </div>**/}
      </div>
    )
  }
}
