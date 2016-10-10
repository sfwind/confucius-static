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
				<div className="introduction">
					<div className="text2">
						<span className="number">3</span>. 记住学号, 加群学习
					</div>
					<div className="head">
						<img src={data.headUrl} className="avatar"/>
						<div className="name">{data.username}</div>
					</div>
					你的学号: {data.memberId} <br/>
					<br/>
					<div className="text2">
						<b>只有加入微信群, 才能顺利开始学习!</b>
					</div>
				</div>
				<div className="introduction2">
					<b>长按二维码</b><br/>
					<img src={classData.weixinGroup} className="qrcode" alt=""/>
				</div>
			</div>
		)
	}
}
