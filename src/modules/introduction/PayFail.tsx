import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
const P = "pay"

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
					<br/>
					<div className="intro">
						请在微信后台留言或加下面的微信,让Rosa童鞋帮助你!
					</div>
					<img src={'http://www.iquanwai.com/images/aha.jpeg'} alt=""/>
				</div>
			</div>
		)
	}
}
