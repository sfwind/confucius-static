import * as React from "react"
import * as _ from "lodash"
import "./Main.less"
import { connect } from "react-redux"
import { ppost } from "utils/request"
import actions from "redux/actions"
const P = "main"
const LOAD_KEY = `${P}.loading`

@connect(state => state)
export default class Main extends React.Component<any, any> {

	constructor() {
		super()
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(actions.start(LOAD_KEY))
		ppost("/web/memberLoad", _.merge(location.query, window.ENV)).then(res => {
			dispatch(actions.end(LOAD_KEY))
			if (res.code === 200) {
				console.log(res.data)
			} else {
				console.log(res.data)
			}
		}).catch(() => {
			this.msgError('系统繁忙，请稍后再试')
		})
	}

	render() {
		return (
			<div className="main">主界面</div>
		)
	}
}
