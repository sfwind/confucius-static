import * as React from "react"
import * as _ from "lodash"
import "./Detail.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { materialType } from "./helpers/Const"
import { config, preview } from "../helpers/JsConfig"
import Icon from "../../components/Icon"
const P = "detail"
const { Alert } = Dialog

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		config(['previewImage'])
		this.windowHeight = window.innerHeight - 65 - 60
		this.state = {
			tab: 1,
			showModal: false,
			alert: {
				buttons: [
					{
						label: '明白了',
						onClick: this.closeAnswer.bind(this)
					}
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
		pget(`/chapter/page/${location.query.chapterId}/${pageId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data[${pageId - 1}]`, res.msg))
				if (res.msg.page) {
					this.getQuestionAndHomework(res.msg.page.materialList)
				}
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			console.log(err)
		})
		// 同步加载下一页
		this.silentLoad(pageId + 1)
	}

	componentWillReceiveProps(newProps) {
		if (this.props.location.query.pageId !== newProps.location.query.pageId) {
			const { dispatch, location, detail } = newProps
			const pageId = Number(location.query.pageId)
			// 获取当前页
			const currentPage = _.get(detail, `data[${pageId - 1}]`, null)
			if (currentPage) {
				// 已经预加载了 静默加载下一页
				pget(`/chapter/page/lazyLoad/${location.query.chapterId}/${pageId + 1}`).then(res => {
					if (res.code === 200) {
						dispatch(set(`${P}.data[${pageId}]`, res.msg))
					} else {
						//静默加载 啥都不干
					}
				}).catch((err) => {
					//静默加载 啥都不干
				})
			} else {
				dispatch(startLoad())
				pget(`/chapter/page/${location.query.chapterId}/${pageId}`).then(res => {
					dispatch(endLoad())
					if (res.code === 200) {
						dispatch(set(`${P}.data[${pageId - 1}]`, res.msg))
						if (res.msg.page) {
							this.getQuestionAndHomework(res.msg.page.materialList)
						}
					} else {
						alert(res.msg)
					}
				}).catch((err) => {
					alert(res.msg)
				})
				// 同步加载下一页
				this.silentLoad(pageId + 1)
			}
		}
	}

	silentLoad(id) {
		//静默加载 不loading
		const { dispatch } = this.props
		pget(`/chapter/page/lazyLoad/${this.props.location.query.chapterId}/${id}`).then(res => {
			if (res.code === 200) {
				dispatch(set(`${P}.data[${id - 1}]`, res.msg))
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	getQuestionAndHomework(materialList) {
		if (materialList && materialList.length > 0) {
			materialList.forEach((m) => {
				if (m.type === 4) {
					// 有大作业
					this.loadHomework(m.content)
				} else if (m.type === 5) {
					// 有选择题
					this.loadQuestion(m.content)
				}
			})
		}
	}

	loadQuestion(id) {
		//静默加载 不loading
		const { detail, location, dispatch } = this.props
		const pageId = Number(location.query.pageId, 0)
		pget(`/chapter/question/load/${id}`).then(res => {
			if (res.code === 200) {
				dispatch(set(`${P}.data[${pageId - 1}].questions`, res.msg))
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	loadHomework(id) {
		//静默加载 不loading
		const { detail, location, dispatch } = this.props
		const pageId = Number(location.query.pageId, 0)
		pget(`/chapter/homework/load/${id}`).then(res => {
			if (res.code === 200) {
				dispatch(set(`${P}.data[${pageId - 1}].homework`, res.msg))
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	prePage() {
		const { pageId, chapterId } = this.props.location.query
		this.context.router.push({
			pathname: '/static/chapter/detail',
			query: { chapterId: chapterId, pageId: Number(pageId) - 1 }
		})
	}

	nextPage() {
		const { detail, location } = this.props
		const { pageId, chapterId } = this.props.location.query
		const pageId2 = Number(location.query.pageId, 0)
		const chapter = _.get(detail, `data[${pageId2 - 1}]`, {})
		const questions = _.get(chapter, `questions`, null)
		const { answers } = this.state

		if (questions && answers.length === 0) {
			alert('需要先答题哦')
			return
		}

		this.context.router.push({
			pathname: '/static/chapter/detail',
			query: { chapterId: chapterId, pageId: Number(pageId) + 1 }
		})

		this.setState({ answers: [] })
	}

	showAnswer(id, choices) {
		const { dispatch } = this.props
		const { answers } = this.state

		if (answers.length === 0) {
			alert('需要先答题哦')
			return
		}

		// 判断答案的正确性
		let rightAnswerIdxList = []
		let wrongAnswerIdxList = []
		choices.forEach((choice) => {
			// 正确并且答到 错误没答到
			if (choice.right && answers.indexOf(choice.id) > -1 || !choice.right && answers.indexOf(choice.id) === -1) {
				rightAnswerIdxList.push(choice.id)
			}
			// 错误并且答到 以及 正确没答到
			if (choice.right && answers.indexOf(choice.id) === -1 || !choice.right && answers.indexOf(choice.id) > -1) {
				wrongAnswerIdxList.push(choice.id)
			}
		})

		if (rightAnswerIdxList.length > 0) {
			this.setState({ correct: true })
		}

		if (wrongAnswerIdxList.length > 0) {
			this.setState({ correct: false })
		}

		dispatch(startLoad())
		ppost(`/chapter/answer/${id}`, { answers }).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState({ showModal: true })
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
		})
	}

	submitHomework(id) {
		const { dispatch } = this.props
		const { homeworkAnswer } = this.state
		dispatch(startLoad())
		ppost(`/chapter/homework/submit/${id}`, { answer: homeworkAnswer }).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/chapter/success' })
				this.setState({ showModal: true })
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
		})
	}

	closeAnswer() {
		this.setState({ showModal: false })
	}

	onChoiceChecked(value) {
		const { detail, location } = this.props
		const pageId = Number(location.query.pageId, 0)
		const chapter = _.get(detail, `data[${pageId - 1}]`, {})
		const questions = _.get(chapter, `questions`, null)
		let list = this.state.answers
		if (list.indexOf(value) > -1) {
			_.remove(list, (n) => n === value)
		} else {
			if (questions.type === 1) {
				list = [value]
			} else {
				list.push(value)
			}
		}

		this.setState({ answers: list })
	}

	render() {
		const { detail, location } = this.props
		const pageId = Number(location.query.pageId, 0)
		const chapter = _.get(detail, `data[${pageId - 1}]`, {})
		const page = _.get(chapter, `page`, [])
		if (page === null) {
			return (
				<div>挑战成功页面</div>
			)
		}
		const materialList = _.get(page, `materialList`, [])
		const questions = _.get(chapter, `questions`, null)
		const homework = _.get(chapter, `homework`, null)

		const renderMaterial = (material) => {
			let inner = null
			switch (material.type) {
				case materialType.TEXT:
					inner = (
						<div dangerouslySetInnerHTML={{__html: material.content}}></div>
					)
					break;
				case materialType.PICTURE:
					inner = (
						<img src={material.content} onClick={() => preview(material.content, [material.content])}/>
					)
					break;
				case materialType.SOUND:
					inner = (
						<audio src={material.content} controls="controls"/>
					)
					break
				case materialType.HOMEWORK:
					inner = renderHomework()
					break;
				case materialType.QUESTION:
					inner = renderQuestions(material.content)
					break;
				default:
					inner = null
			}

			return (
				<div className="material-container" key={material.id}>
					{inner}
				</div>
			)
		}

		const renderHomework = () => {
			if (!homework) {
				return
			}

			return (
				<div className="homework">
					<audio src={homework.voice} controls="controls"/>
					<p>{homework.subject}</p>
					<textarea cols="30" rows="10" value={this.state.homeworkAnswer}
										onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
				</div>
			)
		}

		const renderQuestions = (id) => {
			return (
				<div>
					<div>{questions ? questions.subject : null}</div>
					<Form checkbox>
						{renderQuestionList(id)}
					</Form>
				</div>
			)
		}

		const renderQuestionList = (id) => {
			if (questions && questions.choiceList) {
				return (questions.choiceList.map((choice) => {
					return (
						<FormCell checkbox key={choice.id}>
							<CellHeader>
								<Checkbox name={choice.id} value={choice.id}
													checked={this.state.answers.indexOf(choice.id) > -1}
													onChange={(e) => this.onChoiceChecked(choice.id)}/>
							</CellHeader>
							<CellBody>{choice.subject}</CellBody>
						</FormCell>
					)
				}))
			} else {
				this.loadQuestion(id)
			}
		}

		const renderAnalysis = () => {
			if (!questions) {
				return
			}
			const { type, emotionType, analysisType, analysis } = questions
			let inner = null
			switch (analysisType) {
				case 1:
					inner = (
						<div dangerouslySetInnerHTML={{__html: analysis}}></div>
					)
					break;
				case 2:
					inner = (
						<img src={analysis} onClick={() => preview(analysis, [analysis])}/>
					)
					break;
				case 3:
					inner = (
						<audio src={analysis} controls="controls"/>
					)
					break
				default:
					inner = null
			}

			return (
				<div>
					{ emotionType === 1 ? <p>{this.state.correct ? '完全正确' : '答错了'}</p> : null }
					{ emotionType === 2 ?<p>{this.state.correct ? '我同意' : '我不答应'}</p> : null }
					<div>{inner}</div>
				</div>
			)
		}

		return (
			<div className="detail">
				{ pageId < chapter ? chapter.totalPage : 0 + 1 ? <div>
					<div className="top-panel">
						{chapter.chapterName}
					</div>
					<div className="container" style={{height: this.windowHeight}}>
						{_.map(materialList, material => renderMaterial(material))}
						{ questions ? <ButtonArea direction="horizontal">
							<Button className="answer-button"
											onClick={() => this.showAnswer(questions.id, questions.choiceList)} size="small"
											plain>猜完了,瞄答案</Button>
						</ButtonArea>: null}
					</div>
					<section className="footer-btn">
						{ !homework ? <div className="direct-btn-group">
							{ pageId !== 1 ?
							<div className="left-button" onClick={this.prePage.bind(this)}><Icon size={32} type="left_arrow"/></div> :
							<div className="left-button"></div>}
							<div className="page-number">{pageId}/{chapter ? chapter.totalPage : 0}</div>
							<div className="right-button" onClick={this.nextPage.bind(this)}><Icon size={32} type="right_arrow"/>
							</div>
						</div> : null}
						{ homework ?
						<ButtonArea direction="horizontal">
							<Button size="small" onClick={() => this.submitHomework(homework.id)}>提交</Button>
						</ButtonArea>: null }
					</section>
				</div> : <div>
					挑战成功
				</div>}
				< Alert { ...this.state.alert }
					show={this.state.showModal}>
					{renderAnalysis()}
				</Alert>
			</div >
		)
	}
}
