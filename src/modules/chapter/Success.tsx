import * as React from "react"
import "./Success.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg, Button } from "react-weui"
import Icon from "../../components/Icon"
const P = "detail"

export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
	}

	render() {
		const buttons = [{
			label: '确定',
			onClick: () => {
			}
		}];

		return (
			<div className="success">
				<div className="success-img">
					<Icon type="success" size="150"/>
				</div>
				<div className="success-msg">
					<p>提交成功</p>
				</div>
				<Button className="success-btn" plain
								onClick={() => this.context.router.push(`/static/course/main?courseId=${this.props.location.query.courseId}`)}>关闭</Button>
			</div>
		)
	}
}
