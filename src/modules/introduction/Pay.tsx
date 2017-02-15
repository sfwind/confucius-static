import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import { connect } from "react-redux"
import { ppost,pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
const P = "signup"
const numeral = require('numeral');

const showPromoIds = [2,5]

@connect(state => state)
export default class SignUp extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			tab: 1,
      code:''
		}
	}

	componentWillMount() {
		const { dispatch } = this.props
		dispatch(startLoad())
		ppost(`/signup/course/${this.props.location.query.courseId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.payData`, res.msg))
				scroll(0, 2000)
			} else if(res.code=== 20003){
			  this.context.router.push("/static/pay/notopen");
      } else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
		})
	}

	done() {
		const { dispatch, signup } = this.props
		const data = _.get(signup, 'payData', {})
		dispatch(startLoad())
		ppost(`/signup/paid/${data.productId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({
					pathname: '/personal/edit',
					query: { courseId: this.props.location.query.courseId }
				})
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
		})
	}

	help() {
		this.context.router.push({ pathname: '/static/pay/fail' })
	}

  submitPromoCode(){
	  const {signup,dispatch} = this.props;
    const data = _.get(signup, 'payData', {})
    const productId = _.get(data,'productId');
    const {code} = this.state;

    if(!code){
      dispatch(alertMsg("请先输入优惠码"));
      return;
    }


    dispatch(startLoad());
    pget(`/signup/check/${productId}/${code}`)
      .then(res=>{
        dispatch(endLoad());
        console.log(res);
        if(res.code===200){
          // check成功
          dispatch(set(`${P}.payData.qrcode`,res.msg.qrcode));
          dispatch(set(`${P}.payData.fee`,res.msg.fee));
          dispatch(set(`${P}.payData.discount`,res.msg.discount));
          dispatch(set(`${P}.payData.productId`,res.msg.productId));
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err=>{
        dispatch(endLoad());
        dispatch(alertMsg(err));
    })
  }

	render() {
		const { signup } = this.props
		const data = _.get(signup, 'payData', {})
		const classData = _.get(data, 'quanwaiClass', {})
		const courseData = _.get(data, 'course', {})
    const promoCode = _.get(data,'promoCode',{})
    const {courseId} = courseData;

    const renderPromoCode = ()=>{
      const {code,useCount,discount} = promoCode || {};

      if(_.isEmpty(promoCode)){
		    // 没有优惠码，新用户，可以输入
        return (
          <div className="promo-container">
            <div className="tips">
              请输入优惠码
            </div>
            <div className="content">
              <input type="text" placeholder="请输入优惠码" value={this.state.code} onChange={(e)=>this.setState({code:e.target.value})}  /><br/>
              <Button onClick={()=>this.submitPromoCode()}>确定</Button>
            </div>
          </div>
        )
      } else {
		    // 有优惠码，老用户，不可以输入
        return (
          <div className="promo-container">
            <div className="list">
              <div className="item">
                <div className="label">
                  我的优惠码:
                </div>
                <div className="label">
                  {code}
                </div>
              </div>
              <div className="item">
                <div className="label">
                  已使用人数:
                </div>
                <div className="label">
                  {useCount}
                </div>
              </div>
              <div className="item">
                <div className="label">
                  折扣金额:
                </div>
                <div className="label">
                  {numeral(discount).format('0,0.00')}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

		return (
			<div className="pay">
				<div className="top-panel">
					<img src={courseData.introPic} alt=""/>
				</div>
				<div className="introduction">
					<div className="intro"><br/>
						{/**训练时间: {classData.openTime} - {classData.closeTime} <br/>**/}
						金额: <span style={{color: '#2aa8aa', marginRight: 10}}>¥{numeral(data.fee).format('0,0.00')}</span>
						{ data.normal !== null ?
						<span
							style={{color: '#999', textDecoration: 'line-through'}}>¥{numeral(data.normal).format('0,0.00')}</span>
							: null}
						{data.discount !== null ? <span
							style={{color: '#2aa8aa', marginRight: 10}}>(自动使用{data.discount}元抵用券)</span>
							: null}
						<br/>
						<br/>
						如何报名? 一共 <span className="number">2</span> 步, 走起: <br/>
						<span className="number">1</span>. <b>长按识别二维码付款</b>
            {window.ENV.promoStatus && _.indexOf(showPromoIds,courseId)>-1?
              renderPromoCode()
              :null}
					</div>
          {numeral(data.fee).format('0,0.00') === '0.00' ?
            <div>
              您的课程金额已经全免，请直接点击下一步
            </div>:<img src={data.qrcode} alt=""/>
          }
          <br/>
					<b className="next">付款完成后, 点一下:</b>
				</div>
				<Button onClick={() => this.done()}>付款完成, 下一步</Button>
				<Button onClick={() => this.help()} plain>付款出现问题</Button>
			</div>
		)
	}
}
