import * as React from "react"
import "./MobileLoginTip.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg } from "react-weui"
import Icon from "../../components/Icon"
import * as _ from "lodash"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props;
    const err = _.get(location, "query.err");
    return (
      <div className="pcTipContainer">
        <div className="tip-msg">
          <p>Hi 圈柚~</p><br/>
          <p>请先扫码关注【圈外同学】</p>
          <p>关注后根据提示填写</p>
        </div>
        <div className="success-img">
          <img src="https://www.iqycamp.com/images/serverQrCode.jpg" width={"150px"} height={"150px"}/>
        </div>
      </div>
    )
  }
}
