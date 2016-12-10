import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import { connect } from "react-redux"
import { ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
const P = "signup"
const numeral = require('numeral');

@connect(state => state)
export default class SignUp extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			tab: 1,
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

	render() {
		const { signup } = this.props
		const data = _.get(signup, 'payData', {})
		const classData = _.get(data, 'quanwaiClass', {})
		const courseData = _.get(data, 'course', {})
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
					</div>
					<img src={data.qrcode} alt=""/><br/>
					<b className="next">付款完成后, 点一下:</b>
				</div>
				<Button onClick={() => this.done()}>付款完成, 下一步</Button>
				<Button onClick={() => this.help()} plain>付款出现问题</Button>
			</div>
		)
	}
}
