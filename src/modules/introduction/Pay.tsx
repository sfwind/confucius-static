import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
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
      promoSubmit:true
    }

    this.inputWidth = window.innerWidth - 40 - 80;
    this.picHeight = window.innerWidth * 342/640;
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
      }
    }).catch((err) => {
    })
  }

  done() {
    const {dispatch, signup} = this.props
    const data = _.get(signup, 'payData', {})
    dispatch(startLoad())
    ppost(`/signup/paid/${data.productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        this.context.router.push({
          pathname: '/static/signup/intro',
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
    if(data.discount){
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
        console.log(res);
        if (res.code === 200) {
          // check成功
          dispatch(set(`${P}.payData.qrcode`, res.msg.qrcode));
          dispatch(set(`${P}.payData.fee`, res.msg.fee));
          dispatch(set(`${P}.payData.discount`, res.msg.discount));
          dispatch(set(`${P}.payData.productId`, res.msg.productId));
          dispatch(set(`${P}.payData.normal`,res.msg.normal));
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err));
    })
  }

  render() {
    const {signup} = this.props
    const data = _.get(signup, 'payData', {})
    const classData = _.get(data, 'quanwaiClass', {})
    const courseData = _.get(data, 'course', {})
    const promoCode = _.get(data, 'promoCode', {})
    const {courseId} = courseData;
    const renderPromoCode = () => {
      const {code,normal, useCount, discount} = promoCode || {};

      if (_.isEmpty(promoCode)) {
        // 没有优惠码，新用户，可以输入
        return (
          <div className="promo-container">
            <div className="money">
              金额:{data.discount === null ?
              <span style={{marginLeft:'10px',color:'#4aa8aa'}}>¥{numeral(data.fee).format('0,0.00')}</span>:
              <span style={{marginLeft:'6px',color:'#cfcfcf',textDecoration: 'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>}
              {data.discount !== null ?
                <span style={{marginLeft:'6px',color:'#5aa8aa',fontSize:'18px'}}>{numeral(data.fee).format('0,0.00')}</span>: null}
            </div>
            <div className="promo">
              <input disabled={data.discount!==null} type="text" style={{width:`${this.inputWidth}px`,borderColor:`${data.discount?'#ccc':'#4aa8bb'}`}} placeholder="请输入优惠码" value={this.state.code}
                     onChange={(e)=>this.setState({code:e.target.value})}/>
              <div className={data.discount?"submit-ok":"submit"}  onClick={()=>this.submitPromoCode()}>{data.discount?' ':'确认'}</div>
            </div>
            <div style={{width:`${window.innerWidth}px`}} className="split"></div>
          </div>
        )
      } else {
        // 有优惠码，老用户，不可以输入
        return (
          <div className="promo-container">
            <div style={{width:`${window.innerWidth-60}px`}} className="tips">
              活动进行中，新用户使用优惠码（见服务号消息）报名，双方都得20%优惠；集齐5个新用户即可免费学习。
            </div>
            <div className="item">
              使用人数: <span style={{marginLeft:'10px',color:'#4aa8bb'}}>{useCount}</span>
            </div>
            <div className="item">
              折后金额:<span style={{marginLeft:'10px',color:'#ccc',textDecoration:'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>
              <span style={{marginLeft:'10px',color:'#4aa8bb'}}>¥{numeral(data.fee).format('0,0.00')}</span>
            </div>
            <span style={{fontSize:'11px',color:'#ccc',lineHeight:'15px',
            display:'inline-block',marginTop:'5px'}}>求职课程共两门，首先报名的一门自动使用该折扣。</span>
            <div style={{width:`${window.innerWidth}px`}} className="split"></div>
          </div>
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
            {/**训练时间: {classData.openTime} - {classData.closeTime} <br/>**/}
            {window.ENV.openPromo && _.indexOf(showPromoIds, courseId) > -1 ?
              renderPromoCode() :
              <div><br/>金额: <span
                style={{color: '#2aa8aa', marginRight: 10}}>¥{numeral(data.fee).format('0,0.00')}</span>
                { data.normal !== null && data.discount !== null ?
                  <span
                    style={{color: '#999', textDecoration: 'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>
                  : null}
                {data.discount !== null ? <span
                  style={{color: '#2aa8aa', marginRight: 10}}>(自动使用{data.discount}元抵用券)</span>
                  : null}
                <br/>
                <br/>
              </div>
            }
            如何报名? 一共 <span className="number">2</span> 步, 走起: <br/>
            <span className="number">1</span>. <b>长按识别二维码付款</b>
          </div>
          {numeral(data.fee).format('0,0.00') === '0.00' ?
            <div>
              您的课程金额已经全免，请直接点击下一步
            </div>:<img src={data.qrcode} alt=""/>
          }
          {/*<b className="next">付款完成后, 点一下:</b>*/}
        </div>
        <Button style={{marginBottom:'13px'}} onClick={() => this.done()}>付款完成, 下一步</Button>
        <Button style={{marginBottom:'0px'}} onClick={() => this.help()} plain>付款出现问题</Button>
      </div>
    )
  }
}
