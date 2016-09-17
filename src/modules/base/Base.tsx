import * as React from "react"
import { connect } from "react-redux"
import { isPending } from "utils/helpers"
import { Toast, Dialog } from "react-weui"
const P = "base"
const LOAD_KEY = `${P}.loading`
const { Alert } = Dialog

@connect(state => state)
export default class Main extends React.Component<any, any> {

	constructor() {
		super()
	}

	render() {
		return (
			<div>
				{this.props.children}
				<Toast show={isPending(this.props, LOAD_KEY)} icon="loading">
					加载中...
				</Toast>
			</div>
		)
	}
}
