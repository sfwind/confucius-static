import * as React from "react"
import * as _ from "lodash"
import "./SignUp.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button } from "react-weui"
import Audio from "../../components/Audio"
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
    this.picHeight = window.innerWidth * 342/640;
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget(`/introduction/course/${location.query.courseId}`).then(res => {
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
		this.context.router.push({ pathname: '/pay/course', query: { courseId: this.props.location.query.courseId } })
	}


	render() {
		const { signup } = this.props
		const data = _.get(signup, 'data', {})
		console.log(data)

		return (
			<div className="signup">
				<div style={{paddingBottom: 70}}>
					<div style={{height:`${this.picHeight}px`}} className="top-panel">
						<img style={{height:`${this.picHeight}px`}} src={data.introPic} alt=""/>
					</div>
					<div className="introduction">
						{ data.voice ? <div className="audio-div"><Audio url={data.voice}/></div> : null}
						<div className="text" dangerouslySetInnerHTML={{__html: data.intro}}></div>
					</div>
				</div>
				<section className="footer-btn">
					<div className="btn-container">
						<Button onClick={this.signup.bind(this)}>我要报名</Button>
					</div>
				</section>
			</div>
		)
	}
}
