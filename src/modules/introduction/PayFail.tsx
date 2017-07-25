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
            出现问题的童鞋看这里<br/>
            1如果显示“URL未注册”，请重新刷新页面即可<br/>
            2如果遇到“支付问题”，扫码联系小黑，并将出现问题的截图发给小黑<br/>
					</div>
					<AssetImg url={'https://www.iqycamp.com/images/asst_xiaohei.jpeg?imageslim'} alt=""/>
				</div>
			</div>
		)
	}
}
