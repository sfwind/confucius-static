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
			showConfirmModal: false,
			confirmAlert: {
				buttons: [
					{
						label: '再改改',
						onClick: this.closeConfirm.bind(this)
					},
					{
						label: '确认提交',
						onClick: this.submitHomework.bind(this)
					}
				]
			},
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
					// this.context.router.push({ pathname: '/static/success' })
					this.setState({ homeworkAnswer: res.msg.content })
					dispatch(set(`${P}.data`, res.msg))
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
		if (_.isEmpty(homeworkAnswer)) {
			dispatch(alertMsg('作业还没写哦'))
			return
		}
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

	showConfirm() {
		this.setState({ showConfirmModal: true })
	}

	closeConfirm() {
		this.setState({ showConfirmModal: false })
	}

	closeModal() {
		this.setState({ showModal: false })
	}

	render() {
		const { homework, location } = this.props
		const data = _.get(homework, `data`, {})
		const renderHomework = () => {
			return (
				<div className="homework">
					{/**<audio src={data.voice} controls="controls"/>**/}
					<p dangerouslySetInnerHTML={{__html: data.subject}}></p>
					<div className="tip">
						<div style={{color: "#2aa8aa"}}>提醒一下：作业只能提交一次，因此需在本地完善好作业，再贴进去哦！</div>
						<div style={{color: "#2aa8aa"}}>该网址不支持图片，如作业较长，需列出提纲，可以用编号的形式来展示层次。</div>
					</div>
					<textarea cols="30" rows="10" value={this.state.homeworkAnswer}
										readOnly={data.submitted}
										onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
				</div>
			)
		}

		return (
			<div className="pcHomework">
				<div className="container">
					{renderHomework()}
					{data.submitted ? null : <div className="btn-container">
						<Button size="small" onClick={() => this.showConfirm()} plain>提交</Button>
					</div>}
				</div>
				<Alert { ...this.state.alert }
					show={this.state.showModal}>
					作业只能提交一次,确认提交吗?
				</Alert>
				<Alert { ...this.state.confirmAlert }
					show={this.state.showConfirmModal}>
					作业只能提交一次、确认提交吗？
				</Alert>
			</div >
		)
	}
}