import * as React from "react"
import "./Success.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg } from "react-weui"
const P = "detail"

export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	render() {
		const buttons = [{
			label: '确定',
			onClick: () => {
			}
		}];

		return (
			<div>
				<Msg type="success" title="提交成功" description=""/>
				<div className="info">
					<p>留意本周六的消息,圈圈姐帮你点评作业!</p>
					<p>记得去群里讨论!</p>
				</div>
			</div>
		)
	}
}
