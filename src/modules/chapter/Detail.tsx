import * as React from "react"
import * as _ from "lodash"
import "./Detail.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { materialType } from "./helpers/Const"
const P = "detail"
const { Alert } = Dialog

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
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
				this.getQuestion(res.msg.page.materialList)
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
						this.getQuestion(res.msg.page.materialList)
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
						this.getQuestion(res.msg.page.materialList)
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
				this.getQuestion(res.msg.page.materialList)
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	getQuestion(materialList) {
		if (materialList && materialList.length > 0) {
			materialList.forEach((m) => {
				if (m.type === 5) {
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

	prePage() {
		const { pageId, chapterId } = this.props.location.query
		this.context.router.push({
			pathname: '/static/chapter/detail',
			query: { chapterId: chapterId, pageId: Number(pageId) - 1 }
		})
	}

	nextPage() {
		const { pageId, chapterId } = this.props.location.query
		this.context.router.push({
			pathname: '/static/chapter/detail',
			query: { chapterId: chapterId, pageId: Number(pageId) + 1 }
		})
	}

	showAnswer(id) {
		const { dispatch } = this.props
		const { answers } = this.state
		dispatch(startLoad())
		ppost(`/chapter/answer/${id}`, { answers }).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState({ showModal: true })
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	closeAnswer() {
		this.setState({ showModal: false })
	}

	onChoiceChecked(value) {
		let list = this.state.answers
		if (list.indexOf(value) > -1) {
			_.remove(list, (n) => n === value)
		} else {
			list.push(value)
		}

		this.setState({ answers: list })
	}

	render() {
		const { detail, location } = this.props
		const pageId = Number(location.query.pageId, 0)
		const chapter = _.get(detail, `data[${pageId - 1}]`, {})
		const materialList = _.get(chapter, `page.materialList`, [])
		const questions = _.get(chapter, `questions`, [])

		console.log(chapter)
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
						<img src={material.content} alt=""/>
					)
					break;
				case materialType.SOUND:
					inner = (
						<audio src={material.content} controls="controls"></audio>
					)
					break
				case materialType.HOMEWORK:
					inner = (
						<div>大作业</div>
					)
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

		const renderQuestions = (id) => {
			return (
				<div>
					<div>{questions.subject}</div>
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
								<Checkbox name={choice.id} value={choice.id} onChange={(e) => this.onChoiceChecked(choice.id)}/>
							</CellHeader>
							<CellBody>{choice.subject}</CellBody>
						</FormCell>
					)
				}))
			} else {
				this.loadQuestion(id)
			}
		}

		return (
			<div className="detail">
				<div className="top-panel">
					{chapter.chapterName}
				</div>
				<div className="container" style={{height: this.windowHeight}}>
					{_.map(materialList, material => renderMaterial(material))}
				</div>
				<section className="footer-btn">
					<ButtonArea direction="horizontal">
						<Button className="direct-button" onClick={this.prePage.bind(this)} size="small" plain> {'<'} </Button>
						<Button className="answer-button" onClick={() => this.showAnswer()} size="small" plain>猜完了,瞄答案</Button>
						<Button className="direct-button" onClick={this.nextPage.bind(this)} size="small" plain> {'>'} </Button>
					</ButtonArea>
				</section>
				<Alert {...this.state.alert}
					show={this.state.showModal}>
					{questions.analysis}
				</Alert>
			</div>
		)
	}
}
