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
      showPayInfo: false,
      showId: 3
    }

    this.inputWidth = window.innerWidth - 40 - 60;
    this.picHeight = window.innerWidth * 342 / 640;
    this.padding = 30 / 750 * window.innerWidth;
    this.fontSize = {
      showMember: {
        small: {
          fontSize: `${24 / 750 * window.innerWidth}px`,
          lineHeight: `${24 / 750 * window.innerWidth}px`
        },
        big: {
          fontSize: `${32 / 750 * window.innerWidth}px`,
          lineHeight: `${32 / 750 * window.innerWidth}px`
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
    }
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
        let types = [];
        types.push(_.find(memberTypes, {id: 1}));
        types.push(_.merge({}, _.find(memberTypes, {id: 3}), {open: true}));
        types.push(_.find(memberTypes, {id: 2}));
        // let state = {goodsType:goodsType,signParams:signParams};
        this.setState({memberTypes: types, coupons: coupons});
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
    console.log('pay')
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

  open(showId) {
    const {memberTypes} = this.state;
    const item = _.find(memberTypes,{id:showId});
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

  clickMenu(seq) {
    const {memberTypes} = this.state;
    let types = memberTypes.map((item, index) => {
      if (index === seq) {
        item.open = !item.open;
      } else {
        item.open = false;
      }
      return item;
    });
    const cur = _.find(types, {open: true});
    this.setState({memberTypes: types, showId: cur.id});
  }


  render() {
    const {memberTypes, coupons, selectMember, showPayInfo, showId = 3} = this.state;
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

    const renderMemberShow = (showMember = {}) => {
      switch (showMember.id) {
        case 3: {
          return (
            <div className="member-show member3"
                 style={{padding:`15px ${this.padding}px`,margin:`40px ${this.padding}px`}}>
              <div className="name" style={this.fontSize.showMember.small}>
                一年线上+线下会员
              </div>
              <div className="tip1" style={this.fontSize.showMember.small}>自购买日期起，一年内你可以：</div>
              <ul>
                <li style={this.fontSize.showMember.big}>系统学习所有知识</li>
                <li style={this.fontSize.showMember.big}>将知识内化为能力</li>
                <li style={this.fontSize.showMember.big}>分析解决实际问题</li>
                <li style={this.fontSize.showMember.big}>得到圈外教练的反馈</li>
                <li style={this.fontSize.showMember.big}>和职场大咖交流心得</li>
                <li style={this.fontSize.showMember.big}>免费并优先参加所有线下坊</li>
              </ul>
              <div className="tip2" style={this.fontSize.showMember.small}>上海、北京、深圳，每处一年举行至少6次</div>
              <div className="tip2" style={this.fontSize.showMember.small}>线下工作坊，其他城市陆续推出中</div>
            </div>
          )
        }
        case 1: {
          return (
            <div className="member-show member1"
                 style={{padding:`15px ${this.padding}px`,margin:`40px ${this.padding}px`}}>
              <div className="name" style={this.fontSize.showMember.small}>
                半年线上会员
              </div>
              <div className="tip1" style={this.fontSize.showMember.small}>自购买日期起，半年内你可以：</div>
              <ul>
                <li style={this.fontSize.showMember.big}>系统学习所有知识</li>
                <li style={this.fontSize.showMember.big}>将知识内化为能力</li>
                <li style={this.fontSize.showMember.big}>解决实际工作问题</li>
                <li style={this.fontSize.showMember.big}>参与案例分析直播</li>
              </ul>
            </div>
          );
        }
        case 2: {
          return (
            <div className="member-show member2"
                 style={{padding:`15px ${this.padding}px`,margin:`40px ${this.padding}px`}}>
              <div className="name" style={this.fontSize.showMember.small}>
                一年线上会员
              </div>
              <div className="tip1" style={this.fontSize.showMember.small}>自购买日期起，一年内你可以：</div>
              <ul>
                <li style={this.fontSize.showMember.big}>系统学习所有知识</li>
                <li style={this.fontSize.showMember.big}>将知识内化为能力</li>
                <li style={this.fontSize.showMember.big}>解决实际工作问题</li>
                <li style={this.fontSize.showMember.big}>参与案例分析直播</li>
                <li style={this.fontSize.showMember.big}>优先参加所有线下工作坊</li>
              </ul>
            </div>
          );
        }
        default: {
          return null;
        }
      }
    }


    return (
      <div className="rise-pay">
        {renderMemberShow(showMember)}

        <div className="member-menu">
          {memberTypes ? memberTypes.map((item, seq) => {
            let color = "";
            switch (item.id) {
              case 1:
                color = '#4ecece';
                break;
              case 2:
                color = '#41b4ec';
                break;
              case 3:
                color = '#7d98fc';
                break;
              default:
                color = '#ffffff';
            }
            let style = {
              backgroundColor: color,
            };
            return (
              <div className={`menu-item ${item.open?'open':''} member${item.id}`} key={seq} style={style}
                   onClick={()=>this.clickMenu(seq)}>
                <div className="name item" style={this.fontSize.menu.small}>
                  {item.name}
                </div>
                <div className="price item" style={this.fontSize.menu.big}>
                  ¥{numeral(item.fee).format('0.00')}/年
                </div>
              </div>
            )
          }) : null}
        </div>
        <div className={`choose-btn member${showId}`} style={{left:`${(window.innerWidth-175)/2}px`}} onClick={()=>this.open(showId)}>
          选择
        </div>
        <PayInfo pay={()=>this.risePay()} close={()=>this.setState({showPayInfo:false})}
                 choose={(coupon,close)=>this.chooseCoupon(coupon,close)} show={showPayInfo} {...selectMember}
                 coupons={coupons}/>
        {showPayInfo?<div className="mask">
        </div>:null}
      </div>
    )
  }
}
