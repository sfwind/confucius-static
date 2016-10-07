import * as React from "react"
import * as _ from "lodash"
import "./Welcome.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
const P = "signup"

@connect(state => state)
export default class Welcome extends React.Component<any, any> {

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
		const { dispatch, location, signup } = this.props
		dispatch(startLoad())
		const data = _.get(signup, 'payData', {})
		pget(`/signup/welcome/${data.productId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.welcomeData`, res.msg))
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	done() {
		const { dispatch, signup } = this.props
		const data = _.get(signup, 'payData', {})
		dispatch(startLoad())
		ppost(`/signup/paid/${data.productId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/personal/edit' })
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	help() {
		this.context.router.push({ pathname: '/static/pay/fail' })
	}

	render() {
		const { signup } = this.props
		const data = _.get(signup, 'welcomeData', {})
		const classData = _.get(data, 'quanwaiClass', {})
		const courseData = _.get(data, 'course', {})

		return (
			<div className="welcome">
				<div className="top-panel">
					<img src={courseData.introPic} alt=""/>
				</div>
				<div className="introduction">
					<div className="success-title">报名成功!</div>
					<br/>
					<div className="head">
						<img src={data.headUrl} className="avatar"/>
						<div className="name">{data.username}</div>
					</div>
					你的学号: {data.memberId} <br/>
					训练时间: {classData.openTime} - {classData.closeTime} <br/>
					<br/>
					<div className="text2">
						<div>接下来，你需要：</div>
						<div>1，置顶本服务号（圈外训练营），保证及时收到开课提醒；</div>
						<div>2，进入服务号，点击下方按钮“训练营”，按提示完成当天解锁的任务；</div>
						<div>3，长按二维码，入群认识一下圈圈和其它童鞋吧!</div>
					</div>
				</div>
				<div className="introduction2">
					<img src={classData.weixinGroup} className="qrcode" alt=""/>
				</div>
			</div>
		)
	}
}
