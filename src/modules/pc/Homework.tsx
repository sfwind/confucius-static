import * as React from "react"
import * as _ from "lodash"
import "./Homework.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { materialType } from "./helpers/Const"
import { config } from "../helpers/JsConfig"
const P = "homework"
const { Alert } = Dialog

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		config(['previewImage'])
		this.analysisCallback = null
		this.state = {
			tab: 1,
			showModal: false,
			alert: {
				buttons: [
					{
						label: '再改改',
						onClick: this.closeModal.bind(this)
					},
					{
						label: '确认提交',
						onClick: this.submitHomework.bind(this)
					},
				]
			},
			answers: [],
			correct: false,
			homeworkAnswer: null,
		}
	}

	componentWillMount() {
		const { dispatch, location, detail } = this.props
		const pageId = Number(location.query.pageId)
		dispatch(startLoad())
		pget(`/homework/load/${this.props.location.query.id}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				if (res.msg.submitted) {
					this.context.router.push({ pathname: '/static/success' })
				} else {
					dispatch(set(`${P}.data`, res.msg))
				}
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	submitHomework() {
		const { dispatch } = this.props
		const { homeworkAnswer } = this.state
		dispatch(startLoad())
		ppost(`/homework/submit/${this.props.location.query.id}`, { answer: homeworkAnswer }).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/success' })
				this.setState({ showModal: true })
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	closeModal() {
		this.setState({ showModal: false })
	}

	render() {
		const { homework, location } = this.props
		const data = _.get(homework, `data`, {})

		const renderHomework = () => {
			if (!homework) {
				data
			}

			return (
				<div className="homework">
					{/**<audio src={data.voice} controls="controls"/>**/}
					<p dangerouslySetInnerHTML={{__html: data.subject}}></p>
					<div style={{color: "#2aa8aa"}}>手机打字不方便，想在电脑上做作业？你的专属作业提交网址如下，用电脑打开即可。</div>
					<div>{data.pcurl}</div>
					<textarea cols="30" rows="10" value={this.state.homeworkAnswer}
										onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
				</div>
			)
		}

		return (
			<div className="pcHomework">
				<div className="container">
					{renderHomework()}
					<ButtonArea direction="horizontal">
						<Button size="small" onClick={() => this.submitHomework(homework.id)} plain>提交</Button>
					</ButtonArea>
				</div>
				<Alert { ...this.state.alert }
					show={this.state.showModal}>
					作业只能提交一次,确认提交吗?
				</Alert>
			</div >
		)
	}
}
