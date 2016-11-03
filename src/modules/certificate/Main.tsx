import * as React from "react"
import "./Main.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
import Icon from "../../components/Icon"
const P = "certificate"

@connect(state => state)
export default class Personal extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget(`/course/certificate/info/${location.query.courseId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState(res.msg)
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	render() {
		const { certificateNo, name, certificateBg, comment } = this.state
		return (
			<div className="certificate">
				<div className="certificate-container">
					<div className="upper">
						<img src={certificateBg} alt=""/>
						<div className="name">{name}</div>
						<div className="cong" dangerouslySetInnerHTML={{__html: comment}}></div>
						<div className="signature">
							<img src={'http://www.iquanwai.com/images/sign1_2.png'} alt=""/>
						</div>
						<div className="code">
							证书编号: {certificateNo}
						</div>
					</div>
				</div>
				<div className="certificate-footer">
					<Icon type="logo" size={25}/><span>圈外训练营</span>
				</div>
			</div>
		)
	}
}