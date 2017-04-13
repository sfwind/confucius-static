import * as React from "react";
import "./PayInfo.less"
import Icon from "./Icon";
import * as _ from "lodash";
const numeral = require('numeral');

export default class PayInfo extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {};
  }

  choose(coupon){
    console.log(coupon);
    this.props.choose(coupon,()=>this.setState({openCoupon:false}));
  }

  render(){
    const {openCoupon} = this.state;
    const { final,fee,coupons,startTime,endTime,chose,choose,free } = this.props;
    console.log(coupons);
    const hasCoupons = !_.isEmpty(coupons);
    const height = (hasCoupons?276:226) + 'px';
    const renderPrice = (fee,final,free)=>{
      let priceArr = [];
      if(final || free){
        priceArr.push(<span className="discard" key={0}>{`¥${numeral(fee).format('0.00')}元`}</span>);
        priceArr.push(<span className="final" key={1} style={{marginLeft:'5px'}}>{`¥${numeral(final).format('0.00')}元`}</span>)
      } else {
        priceArr.push(<span className="final" key={0}>{`¥${numeral(fee).format('0.00')}元`}</span>)
      }
      return priceArr;
    }
    return  (<div className="pay-info" style={{height:`${this.props.show?'100%':height}`,transform:`translateY(${this.props.show?0:height})`}}>
      {this.props.show?<div className="close" onClick={()=>this.props.close(()=>this.setState({openCoupon:false}))} style={{bottom:`${hasCoupons?276:226}px`}}>
          <Icon type="white_close_btn" size="40px"/>
        </div>:null}

        <div className="main-container" style={{height:`${hasCoupons?266:216}px`}}>
          <div className="header" style={{transform:`translateY(${openCoupon?'-142px':0})`}}>
            {this.props.header}
          </div>
          <div className="content" style={{transform:`translateY(${openCoupon?'-142px':0})`}}>
            <div className="price item">
              {renderPrice(fee,final,free)}
            </div>
            <div className="open-time item">
              开放时间：{startTime} - {endTime}
            </div>
            <div className={`coupon item ${openCoupon?'open':''}`} onClick={()=>this.setState({openCoupon:!this.state.openCoupon})}>
              {chose?`¥${numeral(chose.amount).format('0.00')}元`:'选择优惠券'}
            </div>
          </div>
          <ul className={`coupon-list ${openCoupon?'open':''}`}  style={{transform:`translateY(${openCoupon?'-142px':0})`}}>
            {coupons?coupons.map((item,seq)=>{
              return (
                <li className="coupon" key={seq}>
                  ¥{numeral(item.amount).format('0.00')}元
                  <span className="expired">{item.expired}过期</span>
                  <div className="btn" onClick={()=>this.choose(item)}>
                    选择
                  </div>
                </li>
              )
            }):null}

          </ul>
        </div>
        <div className="btn-container">
          <div className="btn" onClick={()=>this.props.pay()}>
            {/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="42" width="100%">*/}
              {/*<defs>*/}
                {/*<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">*/}
                  {/*<stop offset="0%" style={{stopColor:'#008000',stopOpacity:1}}/>*/}
                  {/*<stop offset="100%" style={{stopColor:'#ffa500',stopOpacity:1}} />*/}
                {/*</linearGradient>*/}
              {/*</defs>*/}
              {/*<rect x="1" y="1" rx="5" ry="5" width="99%" height="40"*/}
                    {/*style={{ stroke:"url(#grad1)", strokeWidth:'1px',strokeOpacity:'.5',fillOpacity:0}}/>*/}
              {/*<text x="50%" y="50%" fill="url(#grad1)" dy=".1em">{free?'点击报名':'点击付款'}</text>*/}
            {/*</svg>*/}
          </div>
        </div>
      </div>)
  }
}
