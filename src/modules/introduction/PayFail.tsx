import * as React from "react"
import * as _ from "lodash"
import "./Pay.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Button, ButtonArea } from "react-weui"
import AssetImg from "../../components/AssetImg";
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
	}

	render() {
		const { signup } = this.props
		const data = _.get(signup, 'payData', {})
		const classData = _.get(data, 'quanwaiClass', {})
		const courseData = _.get(data, 'course', {})

		return (
			<div className="pay">
        {courseData.introPic?<div className="top-panel">
					<AssetImg url={courseData.introPic} alt=""/>
				</div>:null}
				<div className="introduction">
					<br/>
					<div className="intro">
						请在微信后台留言或加下面的微信,让小Q童鞋帮助你!
					</div>
					<AssetImg url={'https://static.iqycamp.com/images/asst.jpeg?imageslim'} alt=""/>
				</div>
			</div>
		)
	}
}
