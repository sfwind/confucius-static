import * as React from "react"
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
		return (
			<div className="pay">
				<div className="top-panel">
					结构化思维
				</div>
				<div className="introduction">
					请在微信后台留言或加下面的微信,让Aha童鞋帮助你!
				</div>
			</div>
		)
	}
}
