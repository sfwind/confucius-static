import * as React from "react"
import * as _ from "lodash"
import "./PayPage.less"
import {connect} from "react-redux"
import {ppost, pget,log,getBrowser} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay,config} from "modules/helpers/JsConfig"
import PayInfo from "../../components/PayInfo"
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'



const P = "signup"
const numeral = require('numeral');
const GoodsType = {
  SYSTEMATISM: 'systematism',
  FRAGMENT_MEMBER: 'fragment_member'
}


@connect(state => state)
export default class SignUp extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    let cur = new Date();
    let next = new Date();
    next.setFullYear(cur.getFullYear()+1);
    next.setDate(next.getDate()-1);
    this.state = {
      tab: 1,
      code: '',
      promoSubmit: true,
      err: null,
      selectMember: {
        id: 3,
        fee: 1480.00,
        header: '精英版（一年）',
        startTime: `${cur.getFullYear()}.${cur.getMonth()}.${cur.getDay()}`,
        endTime: `${next.getFullYear()}.${next.getMonth()}.${next.getDay()}`
      },
      showPayInfo: false,
      showId: 3,
      style:{
      },
      timeOut:false,
      showErr:false,
    }
  }

  sliderToMember(sliderId){
    switch(sliderId){
      case 0:return 2;
      case 1:return 3;
      case 2:return 1;
    }
  }
  memberToSlider(member){
    switch(member){
      case 1:return 2;
      case 2:return 0;
      case 3:return 1;
    }
  }

  resize(){
    let padding = 30 / 750 * window.innerWidth
    let margin = 40 / 750 * window.innerWidth;

    this.setState({
      padding:padding,
      margin:margin,
      fontSize:{
        showMember: {
          small: {
            fontSize: `${(24 / 750 * window.innerWidth)>24?24:24 / 750 * window.innerWidth}px`,
            lineHeight: `${(24 / 750 * window.innerWidth)>24?24:24 / 750 * window.innerWidth}px`
          },
          big: {
            fontSize: `${(32 / 750 * window.innerWidth)>32?32:32 / 750 * window.innerWidth}px`,
            lineHeight: `${(32 / 750 * window.innerWidth)>32?32:32 / 750 * window.innerWidth}px`
          },
          name: {
            fontSize: `${(34 / 750 * window.innerWidth)>34?34:34 / 750 * window.innerWidth}px`,
            lineHeight: `${(34 / 750 * window.innerWidth)>34?34:34 / 750 * window.innerWidth}px`
          }
        },
        menu: {
          small: {
            fontSize: `${12}px`,
          },
          big: {
            fontSize: `${17}px`
          }
        }
      },
      btnLeft:(window.innerWidth-padding*2)/2- ((window.innerWidth-padding*2)*0.33)/2
    });
  }

  componentWillMount() {
    // ios／安卓微信支付兼容性
    if(window.ENV.configUrl!== window.location.href){
      ppost('/b/mark', {
        module: "RISE",
        function: "打点",
        action: "刷新支付页面",
        memo: window.ENV.configUrl + "++++++++++" + window.location.href
      });
      window.location.href = window.location.href;
      return;
    }

    const {dispatch, location} = this.props
    const productId = _.get(location, 'query.productId');
    this.resize();
    dispatch(startLoad())
    // 查询订单信息
    pget(`/signup/rise/member`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        const {memberTypes, coupons} = res.msg;
        let types = [];
        types.push(_.find(memberTypes, {id: 2}));
        types.push(_.merge({}, _.find(memberTypes, {id: 3}), {open: true}));
        types.push(_.find(memberTypes, {id: 1}));
        // let state = {goodsType:goodsType,signParams:signParams};
        this.setState({memberTypes: types, coupons: coupons}, () => {
          var mySwiper = new Swiper(`#slider-container`, {
            initialSlide:1,
            slideToClickedSlide:true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
              rotate: 50,
              stretch: 1,
              depth: 100,
              modifier: 1,
              slideShadows : true
            }
          })
          mySwiper.on('onTransitionStart',  (swiper) => {
            const {activeIndex} = swiper;
            this.setState({showId:this.sliderToMember(activeIndex)});
            console.log('onTransitionStart',activeIndex);
          });

          mySwiper.on('onTap',  (swiper)=> {
            console.log('onTap',swiper.activeIndex);
          });
          this.setState({swiper:mySwiper});
        });
        scroll(0, 2000)
      } else {
        dispatch(alertMsg(res.msg))
        this.setState({err: res.msg});
      }
    }).catch((err) => {
      dispatch(endLoad());
      dispatch(alertMsg(err));
    })
  }

  componentDidMount(){
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resize);
  }

  done() {
    const {dispatch} = this.props
    const {selectMember} = this.state;
    if (this.state.err) {
      dispatch(alertMsg("支付失败："+this.state.err));
      return;
    }
    dispatch(startLoad())
    ppost(`/signup/paid/risemember/${selectMember.productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        this.context.router.push('/pay/risemember/success');
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(endLoad())
      dispatch(alertMsg(err))
    })
  }

  help() {
    this.context.router.push({pathname: '/static/pay/fail'})
  }

  risePay() {
    const {dispatch} = this.props;
    const {selectMember} = this.state;
    if (!selectMember) {
      dispatch(alertMsg('支付信息错误，请联系管理员'));
    }
    const {chose} = selectMember;
    let param;
    if (chose) {
      param = {couponId: chose.id, memberType: selectMember.id};
    } else {
      param = {memberType: selectMember.id};
    }
    dispatch(startLoad());
    ppost('/signup/rise/member/pay', param).then(res => {
      dispatch(endLoad());
      if (res.code === 200) {
        const {fee, free, signParams, productId} = res.msg;
        this.setState({selectMember: _.merge({}, selectMember, {productId: productId})});
        if (!_.isNumber(fee)) {
          dispatch(alertMsg('支付金额异常，请联系工作人员'));
          return;
        }
        if (free && numeral(fee).format('0.00') === '0.00') {
          // 免费
          this.done();
        } else {
          // 收费，调微信支付
          this.pay(signParams);
        }

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
      pget(`/signup/mark/pay/paramerror`);
      dispatch(alertMsg("支付信息错误，请刷新"));
      return;
    }

    if (this.state.err) {
      dispatch(alertMsg(this.state.err));
      return;
    }
    this.setState({showPayInfo:false});


    // 支付之前先重新config
    config(['chooseWXPay'],()=> {
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
        (res) => {
          pget(`/signup/mark/pay/cancel`)
          this.setState({showErr: true});
          _.isObjectLike(res) ?
            log(JSON.stringify(res), window.location.href + "--" + window.ENV.configUrl, JSON.stringify(getBrowser())) :
            log(res, window.location.href + "--" + window.ENV.configUrl, JSON.stringify(getBrowser()));
        },
        (res) => {
          pget(`/signup/mark/pay/error`)
          _.isObjectLike(res) ?
            log(JSON.stringify(res), window.location.href + "--" + window.ENV.configUrl, JSON.stringify(getBrowser())) :
            log(res, window.location.href + "--" + window.ENV.configUrl, JSON.stringify(getBrowser()));
          this.help();
        }
      )
    })
  }

  open(showId) {
    this.reConfig();
    const {memberTypes} = this.state;
    const item = _.find(memberTypes,{id:showId});
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget(`/signup/rise/member/check/${showId}`).then(res=>{
      dispatch(endLoad());
      if(res.code === 200){
        let selectMember = {
          id: item.id,
          fee: item.fee,
          header: item.name,
          startTime: item.startTime,
          endTime: item.endTime
        };
        // 查询是否还在报名
        this.setState({showPayInfo: true, selectMember: selectMember});
      } else if(res.code === 214) {
        this.setState({timeOut:true});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(ex);
    });
  }

  chooseCoupon(coupon, close) {
    const {dispatch} = this.props;
    const {selectMember} = this.state;
    dispatch(startLoad());
    ppost(`/signup/coupon/calculate`, {couponId: coupon.id, memberType: selectMember.id}).then((res) => {
      dispatch(endLoad());
      if (res.code === 200) {
        let temp = _.merge({}, selectMember, {
          final: res.msg,
          chose: coupon,
          free: res.msg === 0
        });
        this.setState({selectMember: temp});
      } else {
        dispatch(alertMsg(res.msg));
      }
      close();
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
      close();
    })
  }

  clickMenu(seq) {
    const {memberTypes} = this.state;
    let types = memberTypes.map((item, index) => {
      return _.merge({},item,{open:index === seq});
    });
    const cur = _.find(types, {open: true});
    this.setState({memberTypes: types, showId: cur.id});
  }

  reConfig(){
    // alert('重新注册url');
    config(['chooseWXPay']);
  }

  sliderTo(showId){
    console.log(showId)
    const { swiper } = this.state;
    swiper.slideTo(this.memberToSlider(showId));
  }
  render() {
    const {memberTypes, coupons, selectMember, showPayInfo, showId = 3, timeOut,showErr} = this.state;
    const showMember = _.find(memberTypes, {id: showId});
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

    const renderNewMemberShow = ()=>{
      return (
        <div id="slider-container" className="swiper-container">
          <div className="swiper-wrapper" >
          {memberTypes?memberTypes.map(item=>{
            return renderMemberShow(item);
          }):null}
          </div>
          <div className="pagination">
            <div className={`bg-hr member2`} style={{left:`${55}px`,width:`${(window.innerWidth*0.9 - 140)/2 +10}px`}}></div>
            <div className={`bg-hr member3`} style={{left:`${window.innerWidth*0.9*0.5 + 10}px`,width:`${(window.innerWidth*0.9 - 140)/2 + 10}px`}}></div>
            <div className={`page member2`}>
              <div className={`dot ${showId===2?'show':''}`} onClick={()=>this.sliderTo(2)}>

              </div>
              <div className="str">
                专业版（一年）
              </div>
            </div>
            <div className={`page member3`}>
              <div className={`dot ${showId===3?'show':''}`} onClick={()=>this.sliderTo(3)}>
              </div>
              <div className="str">
                精英版（一年）
              </div>
            </div>
            <div className={`page member1`}>
              <div className={`dot  ${showId===1?'show':''}`} onClick={()=>this.sliderTo(1)}>
              </div>
              <div className="str">
                专业版（半年）
              </div>
            </div>
          </div>
        </div>
      )
    }


    const renderMemberShow = (showMember = {}) => {
      switch (showMember.id) {
        case 3: {
          return (
            <div className="swiper-slide" key={2}>
              <div className="member-show member3">
                {/*style={{padding:`15px ${this.state.padding}px`,margin:`${this.state.margin}px ${this.state.padding}px`}}>*/}
                <div className="name" style={this.state.fontSize.showMember.name}>
                  精英版（一年）
                </div>
                <img src="http://www.iqycamp.com/images/rise-member-3-icon.png" className="member-icon"/>
                {/*<div className="tip1" style={this.state.fontSize.showMember.small}>自购买日期起，一年内你可以：</div>*/}
                <ul>
                  <li style={this.state.fontSize.showMember.big}>课程知识体系</li>
                  <li style={this.state.fontSize.showMember.big}>课程具体内容</li>
                  <li style={this.state.fontSize.showMember.big}>课程配套练习</li>
                  <li style={this.state.fontSize.showMember.big}>学习讨论区</li>
                  <li style={this.state.fontSize.showMember.big}>大咖直播分享</li>
                  <li style={this.state.fontSize.showMember.big}>作业案例直播</li>
                  <li style={this.state.fontSize.showMember.big}>教练文字点评</li>
                  <li style={this.state.fontSize.showMember.big}>免费线下学习活动</li>

                </ul>
                {/*<div className="tip2" style={_.merge({},this.state.fontSize.showMember.small,{paddingTop:'20px'})}>上海、北京、深圳，每处一年举行至少6次</div>*/}
                {/*<div className="tip2" style={this.state.fontSize.showMember.small}>线下工作坊，其他城市陆续推出中</div>*/}
                {/*// <div className={`choose-btn member${showId}`} style={{left:`${this.state.btnLeft}px`}} onClick={()=>this.open(showId)}>*/}
                {/*//   选择*/}
                {/*</div>*/}
              </div>
              <div onClick={()=>this.context.router.push("/pay/risemember/normalquestion")}
                   className={`normal-tips member${showMember.id}`}>
                <b>精英版功能详情</b>
              </div>
            </div>
          )
        }
        case 1: {
          return (
            <div className="swiper-slide" key={0}>
              <div className="member-show member1">
                {/*style={{padding:`15px ${this.state.padding}px`,margin:`${this.state.margin}px ${this.state.padding}px`}}>*/}
                <div className="name" style={this.state.fontSize.showMember.name}>
                  专业版（半年）
                </div>
                <img src="http://www.iqycamp.com/images/rise-member-1-icon.png" className="member-icon"/>
                {/*<div className="tip1" style={this.state.fontSize.showMember.small}>自购买日期起，半年内你可以：</div>*/}
                <ul>
                  <li style={this.state.fontSize.showMember.big}>课程知识体系</li>
                  <li style={this.state.fontSize.showMember.big}>课程具体内容</li>
                  <li style={this.state.fontSize.showMember.big}>课程配套练习</li>
                  <li style={this.state.fontSize.showMember.big}>学习讨论区</li>
                  <li style={this.state.fontSize.showMember.big}>大咖直播分享</li>
                  <li style={this.state.fontSize.showMember.big}>作业案例直播</li>
                  <li className="no-icon member1" style={this.state.fontSize.showMember.big}>教练文字点评</li>
                  <li className="no-icon member1" style={this.state.fontSize.showMember.big}>免费线下学习活动</li>
                </ul>
                {/*// <div className={`choose-btn member${showId}`} style={{left:`${this.state.btnLeft}px`}} onClick={()=>this.open(showId)}>*/}
                {/*//   选择*/}
                {/*</div>*/}
                {/*<div  onClick={()=>this.context.router.push("/pay/risemember/normalquestion")} className={`normal-tips member${showId}`}>*/}
                {/*<b>专业版特权详情</b>*/}
                {/*</div>*/}
              </div>
              <div onClick={()=>this.context.router.push("/pay/risemember/normalquestion")}
                   className={`normal-tips member${showMember.id}`}>
                <b>专业版功能详情</b>
              </div>
            </div>
          );
        }
        case 2: {
          return (
            <div className="swiper-slide" key={1}>
              <div className="member-show member2">
                {/*style={{padding:`15px ${this.state.padding}px`,margin:`${this.state.margin}px ${this.padding}px`}}>*/}
                <div className="name" style={this.state.fontSize.showMember.name}>
                  专业版（一年）
                </div>
                <img src="http://www.iqycamp.com/images/rise-member-2-icon.png" className="member-icon"/>
                {/*<div className="tip1" style={this.state.fontSize.showMember.small}>自购买日期起，一年内你可以：</div>*/}
                <ul>
                  <li style={this.state.fontSize.showMember.big}>课程知识体系</li>
                  <li style={this.state.fontSize.showMember.big}>课程具体内容</li>
                  <li style={this.state.fontSize.showMember.big}>课程配套练习</li>
                  <li style={this.state.fontSize.showMember.big}>学习讨论区</li>
                  <li style={this.state.fontSize.showMember.big}>大咖直播分享</li>
                  <li style={this.state.fontSize.showMember.big}>作业案例直播</li>
                  <li className="no-icon member2" style={this.state.fontSize.showMember.big}>教练文字点评</li>
                  <li className="no-icon member2" style={this.state.fontSize.showMember.big}>免费线下学习活动</li>

                </ul>
                {/*<div className={`choose-btn member${showId}`} style={{left:`${this.state.btnLeft}px`}} onClick={()=>this.open(showId)}>*/}
                {/*选择*/}
                {/*// </div>*/}
                {/*<div  onClick={()=>this.context.router.push("/pay/risemember/normalquestion")} className={`normal-tips member${showId}`}>*/}
                {/*<b>专业版特权详情</b>*/}
                {/*// </div>*/}
              </div>
              <div onClick={()=>this.context.router.push("/pay/risemember/normalquestion")}
                   className={`normal-tips member${showMember.id}`}>
                <b>专业版功能详情</b>
              </div>
            </div>
          );
        }
        default: {
          return null;
        }
      }
    }


    {/*let color = "";*/}
    // switch (item.id) {
    //   case 1:
    //     color = '#4ecece';
    //     break;
    //   case 2:
    //     color = '#41b4ec';
    //     break;
    //   case 3:
    //     color = '#7d98fc';
    //     break;
    //   default:
    //     color = '#ffffff';
    // }
    // let style = {
    //   backgroundColor: color,
    //   width:window.innerWidth/3
    // };

    const renderMenu = (showMember = {})=>{
      let name = '';
      switch(showMember.id){
        case 1:name = '专业版';break;
        case 2:name = '专业版';break;
        case 3:name = '精英版';break;
      }
      return (
        <span>报名{name}（¥{numeral(showMember.fee).format('0.00')}/{showMember.id===1?'半年':'年'}）</span>
      )
    }

    return (
      <div className="rise-pay">
        {renderNewMemberShow(showMember)}

        <div className={`member-menu member${showId}`} onClick={()=>this.open(showId)}>
          {renderMenu(showMember)}
        </div>
        {timeOut?<div className="mask" onClick={()=>{window.history.back()}} style={{background:'url("http://www.iquanwai.com/images/riseMemberTimeOut.png") center center/100% 100%'}}>
        </div>:null}
        {showErr?<div className="mask" onClick={()=>this.setState({showErr:false})}>
          <div className="tips"> 无法支付？联系小Q帮你解决吧</div>
          <img className="xiaoQ" src="http://www.iqycamp.com/images/asst.jpeg"/>
        </div>:null}
        <PayInfo pay={()=>this.risePay()} close={(callback)=>{this.setState({showPayInfo:false});callback()}}
                 choose={(coupon,close)=>this.chooseCoupon(coupon,close)} show={showPayInfo} {...selectMember}
                 coupons={coupons}/>
        {showPayInfo?<div className="mask">
        </div>:null}
      </div>
    )
  }
}
