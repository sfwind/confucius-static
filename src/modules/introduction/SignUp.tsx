import * as React from "react"
import * as _ from "lodash"
import "./SignUp.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
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
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
		})
	}

	signup() {
		// const { dispatch } = this.props
		// dispatch(startLoad())
		// ppost(`/signup/course/${this.props.location.query.courseId}`).then(res => {
		// 	dispatch(endLoad())
		// 	if (res.code === 200) {
		// 		dispatch(set(`${P}.payData`, res.msg))
		// 		this.context.router.push({ pathname: '/static/pay' })
		// 	} else {
		// 		dispatch(alertMsg(res.msg))
		// 	}
		// }).catch((err) => {
		// })
		this.context.router.push({ pathname: '/pay', query: { courseId: this.props.location.query.courseId } })
	}


	render() {
		const { signup } = this.props
		const data = _.get(signup, 'data[0]', {})

		return (
			<div className="signup">
				<div className="top-panel">
					<img src={data.introPic} alt=""/>
				</div>
				<div className="introduction">
					{ data.voice ? <audio src={data.voice} controls="controls"/> : null}
					{/** data.voice ? <Audio url={data.voice}/> : null**/}
					<div className="text" dangerouslySetInnerHTML={{__html: data.intro}}></div>
					<div className="btn-container">
						<Button onClick={this.signup.bind(this)} plain>我要报名</Button>
					</div>
				</div>
			</div>
		)
	}
}
