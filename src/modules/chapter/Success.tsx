import * as React from "react"
import "./Success.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg, Button } from "react-weui"
import { config, closeWindow } from "../helpers/JsConfig"
import Icon from "../../components/Icon"
const P = "detail"

export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		config(['closeWindow'])
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
					<p>周六会有针对此次作业的吊打活动，请留意群里通知哦！</p>
				</div>
				<Button className="success-btn" plain onClick={closeWindow}>关闭</Button>
			</div>
		)
	}
}
