import * as React from "react"
import * as _ from "lodash"
import "./SignUp.less"
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
		pget("/introduction/allcourse").then(res => {
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
				dispatch(set(`${P}.payData`, res.msg))
				this.context.router.push({ pathname: '/static/pay' })
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
		})
	}


	render() {
		const { signup } = this.props
		const data = _.get(signup, 'data[0]', {})

		return (
			<div className="signup">
				<div className="top-panel">
					{data.courseName}
				</div>
				<div className="introduction">
					<audio src={data.voice} controls="controls"/>
					<div className="text">{data.intro}</div>
					<Button onClick={this.signup.bind(this)}>我要报名</Button>
				</div>
			</div>
		)
	}
}
