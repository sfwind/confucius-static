import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay} from "modules/helpers/JsConfig"
const P = "signup"
const numeral = require('numeral');

const showPromoIds = [2, 5]

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
    const {dispatch} = this.props
    dispatch(startLoad())
    ppost(`/signup/course/${this.props.location.query.courseId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        dispatch(set(`${P}.payData`, res.msg))
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
    const {dispatch, signup} = this.props
    const data = _.get(signup, 'payData', {})
    if(this.state.err){
      dispatch(alertMsg(this.state.err));
      return;
    }
    dispatch(startLoad())
    ppost(`/signup/paid/${data.productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        this.context.router.push({
          pathname: '/personal/edit',
          query: {courseId: this.props.location.query.courseId}
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
    })
  }

  help() {
    this.context.router.push({pathname: '/static/pay/fail'})
  }

  submitPromoCode() {
    const {signup, dispatch} = this.props;
    const data = _.get(signup, 'payData', {})
    const productId = _.get(data, 'productId');
    const {code} = this.state;
    if (data.discount) {
      console.log('已使用优惠码');
      return;
    }

    if (!code) {
      dispatch(alertMsg("请先输入优惠码"));
      return;
    }


    dispatch(startLoad());
    pget(`/signup/check/${productId}/${code}`)
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          // check成功
          dispatch(set(`${P}.payData.qrcode`, res.msg.qrcode));
          dispatch(set(`${P}.payData.fee`, res.msg.fee));
          dispatch(set(`${P}.payData.discount`, res.msg.discount));
          dispatch(set(`${P}.payData.productId`, res.msg.productId));
          dispatch(set(`${P}.payData.normal`, res.msg.normal));
          dispatch(set(`${P}.payData.signParams`,res.msg.signParams));
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err));
    })
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
    const data = _.get(signup, 'payData', {})
    const classData = _.get(data, 'quanwaiClass', {})
    const courseData = _.get(data, 'course', {})
    const promoCode = _.get(data, 'promoCode', {})
    const signParams = _.get(data, 'signParams', {});
    const {courseId} = courseData;

    const renderPromoCode = () => {
      const {code, normal, useCount, discount} = promoCode || {};

      if (_.isEmpty(promoCode)) {
        // 没有优惠码，新用户，可以输入
        return (
          <div className="promo-container">
            <div className="money">
              <span style={{color:"#999999",fontSize:"13px"}}>金额:</span>{data.discount === null ?
              <span style={{marginLeft:'10px',color:'#7a7a7a',fontSize:"13px"}}>¥{numeral(data.fee).format('0,0.00')}</span>:
              <span
                style={{marginLeft:'6px',color:'#cccccc',textDecoration: 'line-through',fontSize:"13px"}}>¥{numeral(courseData.fee).format('0,0.00')}</span>}
              {data.discount !== null ?
                <span
                  style={{marginLeft:'6px',color:'#4aa8aa',fontSize:'16px'}}>¥{numeral(data.fee).format('0,0.00')}</span>: null}
            </div>
            <div className="promo">
              <input disabled={data.discount!==null} type="text"
                     style={{width:`${this.inputWidth}px`,borderColor:`${data.discount?'#ccc':'#4aa8bb'}`,color:`${data.discount?'#ccc':'#000'}`}}
                     placeholder="请输入优惠码" value={this.state.code}
                     onChange={(e)=>this.setState({code:e.target.value})}/>
              <div className={data.discount?"submit-ok":"submit"}
                   onClick={()=>this.submitPromoCode()}>{data.discount ? ' ' : '确认'}</div>
            </div>
            <div style={{width:`${window.innerWidth}px`}} className="split"></div>
          </div>
        )
      } else {
        // 有优惠码，老用户，不可以输入
        return (
          // <div className="promo-container">
          //   <div style={{width:`${window.innerWidth-30}px`}} className="tips">
          //     好友使用你的优惠码（见服务号消息）报名求职/职业规划课，双方都享受20%优惠；5个好友使用，你可免费报名上述任意一门课程
          //   </div>
          //   <div className="item">
          //     使用人数: <span style={{marginLeft:'10px',color:'#4aa8bb'}}>{useCount}</span>
          //   </div>
          //   <div className="item">
          //     折后金额:<span
          //     style={{marginLeft:'10px',color:'#ccc',textDecoration:'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>
          //     <span style={{marginLeft:'10px',color:'#4aa8bb',fontSize:'16px'}}>¥{numeral(data.fee).format('0,0.00')}</span>
          //   </div>
          //   {/*<span style={{fontSize:'11px',color:'#ccc',lineHeight:'15px',*/}
          //   {/*display:'inline-block',marginTop:'5px'}}>求职课程共两门，首先报名的一门自动使用该折扣。</span>*/}
          //   <div style={{width:`${window.innerWidth}px`}} className="split"></div>
          // </div>
          null
        )
      }
    }

    return (
      <div className="pay">
        <div style={{height:`${this.picHeight}px`}} className="top-panel">
          <img style={{height:`${this.picHeight}px`}} src={courseData.introPic} alt=""/>
        </div>
        <div className="introduction">
          <div className="intro">
            <div className="class-tips">
              <div className="title">请核对以下信息</div>
              <div className="tip"><span className="label">课程名称：</span><span className="value">{courseData.courseName}</span></div>
              <div className="tip"><span className="label">上课方式：</span><span className="value">线上-圈外训练营(服务号)</span></div>
              <div className="tip"><span className="label">开放时间：</span><span className="value">{data.classOpenTime}</span></div>
              <div className="tip"><span className="label">课程金额：</span><span className="value">¥{courseData.fee}</span></div>
            </div>
            <div className="">
            </div>
            <div style={{width:`${window.innerWidth}px`}} className="split"></div>

            {/**训练时间: {classData.openTime} - {classData.closeTime} <br/>**/}
            {window.ENV.openPromo && _.indexOf(showPromoIds, courseId) > -1 ?
              renderPromoCode() :null
            }
          </div>
          {numeral(data.fee).format('0,0.00') === '0.00' ?
            <div>
              <span>该课程已对您免费</span><br/>
              <span  style={{fontSize:'11px',color:'#cccccc'}}>免费原因：体验课/优惠券/优惠码</span>
            </div>:null
          }

          {/*<div><br/>金额: <span*/}
            {/*style={{color: '#2aa8aa', marginRight: 10}}>¥{numeral(data.fee).format('0,0.00')}</span>*/}
            {/*{ data.normal !== null && data.discount !== null ?*/}
              {/*<span*/}
                {/*style={{color: '#999', textDecoration: 'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>*/}
              {/*: null}*/}
            {/*{data.discount !== null ? <span*/}
              {/*style={{color: '#2aa8aa', marginRight: 10}}>(自动使用{data.discount}元抵用券)</span>*/}
              {/*: null}*/}
            {/*<br/>*/}
            {/*<br/>*/}
          {/*</div>*/}
          {/*<img src={data.qrcode} alt=""/>*/}
          {/*<b className="next">付款完成后, 点一下:</b>*/}
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
