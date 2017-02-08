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
    changeTitle("RISE");
  }
  render(){
    const {point} = this.state;
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          RISE积分
        </div>
        <div className="point-tip-container">
          描述balabal巴拉巴拉描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉描述balabal巴拉巴拉描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
          描述balabal巴拉巴拉
        </div>
      </div>
    )
  }
}
