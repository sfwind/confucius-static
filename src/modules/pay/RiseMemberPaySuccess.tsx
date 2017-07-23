import * as React from "react"
import * as _ from "lodash"
import "./RiseMemberPaySuccess.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay} from "modules/helpers/JsConfig"
import PayInfo from "../../components/PayInfo"
import {changeTitle} from "utils/helpers"


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
    this.cardHeight = this.cardWidth * (208/375);
    this.bigFontSize = 50/750 * window.innerWidth;
    this.smallFontSize = 26/750 * window.innerWidth;
    this.pd = 130/750 * window.innerWidth;
  }


  componentWillMount() {
    changeTitle("了解更多");
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

    pget('/customer/profile').then(res=>{
      if(res.code === 200){
        console.log(res.msg);
        const {isFull } = res.msg;
        this.setState({isFull:isFull})
      } else {
        dispatch(alertMsg(ex));
      }
    }).catch(ex=>{
      dispatch(alertMsg(ex));
    });
  }

  go(){
    // 查看是否填写完毕信息，如果没有填写的话则跳到填写页面
    const {isFull,bindMobile} = this.state;
    if(!isFull){
      window.location.href = `https://${window.location.hostname}/rise/static/customer/profile?goRise=true`;
      return;
    }
    if(!bindMobile){
      window.location.href = `https://${window.location.hostname}/rise/static/customer/mobile/check?goRise=true`;
      return;
    }
    window.location.href = `https://${window.location.hostname}/rise/static/plan/main?goRise=true`;
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
          <span className={`big member${memberTypeId}`} style={{fontSize:`${this.bigFontSize}px`}}>Hi，{window.ENV.userName}<br/>欢迎使用RISE{`${memberTypeId===3?'精英版':'专业版'}`}</span>
          <span className="small" style={{fontSize:`${this.smallFontSize}px`,padding:`50px ${this.pd}px`}}>
            所有RISE小课已为你开放，开始学习吧！<br/><br/>
            更多会员权益，可进入RISE-我的账户中查看
          </span>
        </div>
        <div className="button-footer" onClick={()=>this.go()}>确定</div>
      </div>
    )
  }
}
