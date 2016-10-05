import * as React from "react"
import * as _ from "lodash"
import "./Welcome.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
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
				alert(res.msg)
			}
		}).catch((err) => {
			alert(res.msg)
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
				alert(res.msg)
			}
		}).catch((err) => {
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
					<div className="head">
						<img src={data.headUrl} className="avatar"/>
						<div className="name">{data.username}</div>
					</div>
					训练时间: {classData.openTime} - {classData.closeTime} <br/>
					长按二维码,加入玩家群
				</div>
				<div className="introduction2">
					<img src={classData.weixinGroup} className="qrcode" alt=""/>
				</div>
			</div>
		)
	}
}
