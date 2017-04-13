import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./PointTip.less"


@connect(state => state)
export default class RiseMember extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    // changeTitle("RISE");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/rise/member").then(res=>{
      dispatch(endLoad());
      const {code,msg} = res;
      if(code === 200){
        if(msg){
          this.setState({riseMember:true,memberType:msg});
        } else {
          this.setState({riseMember:false})
        }
      } else {
        dispatch(alertMsg(msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })

    this.setState({riseMember: this.props.location.query.riseMember});
  }

  render() {
    console.log(this.state.riseMember);
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          RISE专业版
        </div>
        { this.state.riseMember ?
          <div className="point-tip-container">

          </div>  :

          <div className="point-tip-container">
            <b style={{fontSize:"14px"}}>还未升级成专业版哦！</b><br/>
            -按钮: 升级<br/>
            -正常情况：点击后跳转会员类型选择页面；当开放结束后，跳转页面提示：本次报名已达限额，请关注下期开放信息哦（图片冯赛出）
          </div>
        }
      </div>
    )
  }
}
