import * as React from "react"
import { connect } from "react-redux"
import { isPending } from "utils/helpers"
import { Toast, Dialog } from "react-weui"
import { set } from "redux/actions"
import { config } from "../helpers/JsConfig"
const P = "base"
const LOAD_KEY = `${P}.loading`
const SHOW_MODAL_KEY = `${P}.showModal`
const { Alert } = Dialog
import UA from "ua-device";

@connect(state => state)
export default class Main extends React.Component<any, any> {

	constructor() {
		super()
		this.state = {
			alert: {
				buttons: [
					{
						label: '关闭',
						onClick: this.closeAnswer.bind(this)
					}
				]
			},
		}
		console.log(window.location.href);
		window.ENV.configUrl = window.location.href;
		window.ENV.Detected = new UA(window.navigator.userAgent);
		config(['chooseWXPay'])
		console.log(ENV.Detected);
	}

	closeAnswer() {
		const { dispatch } = this.props
		dispatch(set(SHOW_MODAL_KEY, false))
	}

	render() {
		return (
			<div>
				{this.props.children}
				<Toast show={isPending(this.props, LOAD_KEY)} icon="loading">
					加载中...
				</Toast>
				<Alert { ...this.state.alert }
					show={this.props.base.showModal}>
          <pre className="global-pre">{this.props.base.alertMsg}</pre>
				</Alert>
			</div>
		)
	}
}
