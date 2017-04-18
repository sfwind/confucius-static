import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./PointTip.less"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import AssetImg from "../../components/AssetImg";


@connect(state => state)
export default class RiseMember extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    // changeTitle("RISE");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/rise/member").then(res => {
      dispatch(endLoad());
      const {code, msg} = res;
      if (code === 200) {
        if (msg) {
          console.log(msg);
          this.setState({riseMember: true, memberType: msg});
        } else {
          this.setState({riseMember: false})
        }
      } else {
        dispatch(alertMsg(msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
    // this.setState({riseMember: this.props.location.query.riseMember});
  }

  render() {
    const {memberType} = this.state;
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          RISE正式版
        </div>
        { this.state.riseMember ?
          <div className="point-tip-container">
            <b style={{fontSize:"14px"}}>当前会员：{memberType.name}</b><br/>
            有效期至：{memberType.endTime}<br/><br/>
            会员专享：<br/>
            <ul>
              <li>系统学习所有知识</li>
              <li>将知识内化为能力</li>
              <li>解决实际工作问题</li>
              <li>参与案例分析直播</li>
              <li>得到圈外教练的反馈</li>
            </ul><br/><br/>

            免费并优先参加所有线下工作坊<br/>
            上海、北京、深圳，每处一年至少有6次线下工作坊，其他城市陆续推出中

          </div>  :

          <div className="point-tip-container">
            <b style={{fontSize:"14px"}}>还未升级成正式版哦！</b><br/>
            <div className="rocket-container">
            </div>
            <div className="button" onClick={()=>{window.location.href=`http://${window.location.hostname}/pay/pay`}}>
              升级正式版
            </div>
          </div>
        }
      </div>
    )
  }
}
