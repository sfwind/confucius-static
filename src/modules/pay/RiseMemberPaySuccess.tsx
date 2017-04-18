import * as React from "react"
import * as _ from "lodash"
import "./RiseMemberPaySuccess.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay} from "modules/helpers/JsConfig"
import PayInfo from "../../components/PayInfo"


const P = "signup"
const numeral = require('numeral');

@connect(state => state)
export default class RiseMemberPaySuccess extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {

    }
    this.cardWidth = 540/750 * window.innerWidth;
    this.cardHeight = 300/750 * window.innerWidth;
    this.bigFontSize = 50/750 * window.innerWidth;
    this.smallFontSize = 26/750 * window.innerWidth;
    this.pd = 130/750 * window.innerWidth;
  }


  componentWillMount() {
    const {dispatch, location} = this.props
    const productId = _.get(location, 'query.productId');
    dispatch(startLoad())
    // 查询订单信息
    pget('/customer/rise/member').then(res=>{
      dispatch(endLoad());
      if(res.code === 200){
        this.setState(res.msg);
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  go(){
    window.location.href = `http://${window.location.hostname}/rise/static/plan/main`;
  }


  render() {
    const { memberTypeId,startTime,endTime } = this.state;
    const memberStyle = (seq) => {
      let color = '';
      switch (seq) {
        case 0:
          color = 'saddlebrown';
          break;
        case 1:
          color = 'blue';
          break;
        case 2:
          color = 'green';
          break;
        default:
          color = '#66ccff';
          break;
      }
      return color;
    }

    return (
      <div className="rise-pay-success">
        <div className={`pay-result member${memberTypeId}`}>
          <div className={`content member${memberTypeId}`} style={{width:this.cardWidth,height:this.cardHeight}}>
            <div className="times">
              {startTime}-{endTime}
            </div>
          </div>
        </div>
        <div className="welcome-tips">
          <span className={`big member${memberTypeId}`} style={{fontSize:`${this.bigFontSize}px`}}>欢迎使用RISE{`${memberTypeId===3?'精英版':'专业版'}`}<br/>{window.ENV.userName}</span>
          <span className="small" style={{fontSize:`${this.smallFontSize}px`,padding:`50px ${this.pd}px`}}>
            RISE全部专题已为你开放，快去学习吧，记得要坚持哦！<br/>
          </span>
        </div>
        <div className="button-footer" onClick={()=>this.go()}>确定</div>
      </div>
    )
  }
}
