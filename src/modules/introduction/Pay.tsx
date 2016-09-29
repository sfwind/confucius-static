import * as React from "react"
import * as _ from "lodash"
import "./My.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
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

	}

	render() {
		const { pay } = this.props
		const data = _.get(pay, 'data', {})

		return (
			<div className="signup">
				<ButtonArea direction="horizontal">
					<Button>付不了</Button>
					<Button>搞定了</Button>
				</ButtonArea>
			</div>
		)
	}
}
