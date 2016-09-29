import * as React from "react"
import * as _ from "lodash"
import "./My.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Button } from "react-weui"
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

	signup() {
		const { dispatch } = this.props
		dispatch(startLoad())
		ppost(`/signup/course/${this.props.location.query.courseId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/pay' })
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
		})
	}


	render() {
		const { signup } = this.props
		const data = _.get(signup, 'data', {})

		return (
			<div className="signup">
				<Button onClick={this.signup.bind(this)}>报名</Button>
			</div>
		)
	}
}
