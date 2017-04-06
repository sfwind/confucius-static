import * as React from "react"
import * as _ from "lodash"
import "./PayPage.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay} from "modules/helpers/JsConfig"

const P = "signup"
const numeral = require('numeral');
const GoodsType = {
  SYSTEMATISM:'systematism',
  FRAGMENT_MEMBER:'fragment_member'
}

@connect(state => state)
export default class SignUp extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      tab: 1,
      code: '',
      promoSubmit: true,
      err:null
    }

    this.inputWidth = window.innerWidth - 40 - 60;
    this.picHeight = window.innerWidth * 342 / 640;
  }

  componentWillMount() {
    const {dispatch,location} = this.props
    const productId = _.get(location,'query.productId');
    if(_.isUndefined(productId) || _.isNull(productId)){
      dispatch(alertMsg("缺少订单参数，请联系管理员"));
      return;
    }
    dispatch(startLoad())
    // 查询订单信息
    pget(`/signup/info/${productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        console.log(res.msg);
        const {goodsType,signParams} = res.msg;
        // let state = {goodsType:goodsType,signParams:signParams};
        this.setState({payData:res.msg});
        scroll(0, 2000)
      } else if (res.code === 20003) {
        this.context.router.push("/static/pay/notopen");
      } else {
        dispatch(alertMsg(res.msg))
        this.setState({err:res.msg});
      }
    }).catch((err) => {
    })
  }

  done() {
    const {dispatch,location} = this.props
    const data = _.get(this.state, 'payData', {})
    if(this.state.err){
      dispatch(alertMsg(this.state.err));
      return;
    }
    dispatch(startLoad())
    ppost(`/signup/paid/${data.productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        if(data.goodsType === GoodsType.SYSTEMATISM){
          this.context.router.push({
            pathname: '/personal/edit',
            query: {courseId: location.query.courseId}
          })
        } else if(data.goodsType === GoodsType.FRAGMENT_MEMBER) {
          window.location.href = `http://www.iquanwai.com/rise/static/plan/main`;
        }

      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
    })
  }

  help() {
    this.context.router.push({pathname: '/static/pay/fail'})
  }


  pay(signParams) {
    const {dispatch} = this.props;

    if (!signParams) {
      dispatch(alertMsg("支付信息错误，请刷新"));
      return;
    }
    if(this.state.err){
      dispatch(alertMsg(this.state.err));
      return;
    }

    pay({
        "appId": signParams.appId,     //公众号名称，由商户传入
        "timeStamp": signParams.timeStamp,         //时间戳，自1970年以来的秒数
        "nonceStr": signParams.nonceStr, //随机串
        "package": signParams.package,
        "signType": signParams.signType,         //微信签名方式：
        "paySign": signParams.paySign //微信签名
      },
      () => {
        console.log('done');
        this.done();
      },
      () => {
        console.log('cancel');
      },
      () => {
        console.log("error");
        this.help();
      }
    )
  }


  render() {
    const {signup} = this.props
    const data = _.get(this.state, 'payData', {})
    const courseData = _.get(data, 'course', {}) || {}
    const signParams = _.get(data, 'signParams', {});
    const memberType = _.get(data, 'memberType',{}) || {};
    const {courseId} = courseData || {};


    return (
      <div className="pay">
        <div style={{height:`${this.picHeight}px`}} className="top-panel">
          <img style={{height:`${this.picHeight}px`}} src={courseData.introPic} alt=""/>
        </div>
        <div className="introduction">
          <div className="intro">
            <div className="class-tips">
              <div className="title">请核对以下信息</div>
              <div className="tip"><span className="label">课程名称：</span><span className="value">{courseData.courseName || memberType.name}</span></div>
              <div className="tip"><span className="label">上课方式：</span><span className="value">线上-圈外训练营(服务号)</span></div>
              <div className="tip"><span className="label">开放时间：</span><span className="value">{data.classOpenTime || '今天'}</span></div>
              <div className="tip"><span className="label">课程金额：</span><span className="value">¥{courseData.fee || memberType.fee}</span></div>
            </div>
            <div className="">
            </div>
            <div style={{width:`${window.innerWidth}px`}} className="split"></div>
          </div>
          {numeral(data.fee).format('0,0.00') === '0.00' ?
            <div>
              <span>该课程已对您免费</span><br/>
              <span  style={{fontSize:'11px',color:'#cccccc'}}>免费原因：体验课/优惠券/优惠码</span>
            </div>:null
          }

        </div>
        {numeral(data.fee).format('0,0.00') !== '0.00' ?
          <Button style={{marginTop:'50px'}} onClick={()=>this.pay(signParams)}>确认支付</Button>:
          <Button style={{marginBottom:'13px',marginTop:'50px'}} onClick={() => this.done()}>确认报名</Button>
        }
        <Button style={{marginBottom:'0px'}} onClick={() => this.help()} plain>付款出现问题</Button>
      </div>
    )
  }
}
