import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
const P = "signup"

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
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/introduction/mycourse").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data`, res.msg))
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			alert(res.msg)
		})
	}

	done() {
		const { dispatch } = this.props
		dispatch(startLoad())
		ppost(`/signup/paid/*`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/chapter/success' })
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
		const data = _.get(signup, 'payData', {})
		const classData = _.get(data, 'quanwaiClass', {})
		const courseData = _.get(data, 'course', {})

		return (
			<div className="pay">
				<div className="top-panel">
					{courseData.name}
				</div>
				<div className="introduction">
					训练时间: {classData.openTime} - {classData.closeTime} <br/>
					金额: <br/>
					<img src={data.qrcode} alt=""/>
				</div>
				<ButtonArea direction="horizontal">
					<Button onClick={() => this.help()}>付款出现问题</Button>
				</ButtonArea>
			</div>
		)
	}
}
