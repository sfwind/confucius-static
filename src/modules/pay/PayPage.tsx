import * as React from "react"
import * as _ from "lodash"
import "./PayPage.less"
import {connect} from "react-redux"
import {ppost, pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {Button, ButtonArea} from "react-weui"
import {pay} from "modules/helpers/JsConfig"
import PayInfo from "../../components/PayInfo"

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
    this.state = {
      tab: 1,
      code: '',
      promoSubmit: true,
      err: null,
      selectMember: {},
      showPayInfo: false
    }

    this.inputWidth = window.innerWidth - 40 - 60;
    this.picHeight = window.innerWidth * 342 / 640;
  }

  componentWillMount() {
    const {dispatch, location} = this.props
    const productId = _.get(location, 'query.productId');
    dispatch(startLoad())
    // 查询订单信息
    pget(`/signup/rise/member`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        const {memberTypes, coupons} = res.msg;
        // let state = {goodsType:goodsType,signParams:signParams};
        this.setState({memberTypes: memberTypes, coupons: coupons});
        scroll(0, 2000)
      } else {
        dispatch(alertMsg(res.msg))
        this.setState({err: res.msg});
      }
    }).catch((err) => {
    })
  }

  done() {
    const {dispatch} = this.props
    const {selectMember} = this.state;
    if (this.state.err) {
      dispatch(alertMsg(this.state.err));
      return;
    }
    console.log('done',selectMember);
    dispatch(startLoad())
    ppost(`/signup/paid/risemember/${selectMember.productId}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        window.location.href = `http://www.iquanwai.com/rise/static/plan/main`;
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
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
        console.log(res.msg);
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
        console.log(selectMember);

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
    if (this.state.err) {
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

  open(item) {
    let selectMember = {
      id: item.id,
      fee: item.fee,
      header: item.name,
      startTime: item.startTime,
      endTime: item.endTime
    };
    this.setState({showPayInfo: true, selectMember: selectMember});
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


  render() {
    const {memberTypes, coupons, selectMember, showPayInfo} = this.state;
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
      <div className="rise-pay">
        <div className="tips">请选择</div>
        {memberTypes ? memberTypes.map((item, seq) => {
          return <div onClick={()=>this.open(item)} className="member-type" key={seq}
                      style={{borderColor:`${memberStyle(seq)}`}}>
            <div className="name" style={{backgroundColor:`${memberStyle(seq)}`}}>
              <span>{item.name}</span>
            </div>
            <div className="content">
              <div className="price">
                <span>¥{numeral(item.fee).format('0.00')}/年</span>
              </div>
              <div className="description">
                <span>{item.description}</span>
              </div>
            </div>
          </div>
        })
          : null}
        <PayInfo pay={()=>this.risePay()} close={()=>this.setState({showPayInfo:false})}
                 choose={(coupon,close)=>this.chooseCoupon(coupon,close)} show={showPayInfo} {...selectMember}
                 coupons={coupons}/>
      </div>
    )
  }
}
