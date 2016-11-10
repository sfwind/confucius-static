import * as React from "react"
import * as _ from "lodash"
import "./Main.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { NavBar, NavBarItem, TabBody, Icon } from "react-weui"
const P = "main"

const charMap = {
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六',
	7: '七',
	8: '八',
}

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.picHeight = window.innerWidth / 2.586
		this.state = {
			tab: 1,
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget(`/course/load/${location.query.courseId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data`, res.msg))
				this.setState({ tab: res.msg.week })
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	onClickTab(id) {
		this.setState({ tab: id })
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget(`/course/week/${location.query.courseId}/${id}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data`, res.msg))
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	onClickChapter(id, page, chapter) {
		const { dispatch } = this.props
		if (chapter.comment === null) {
			this.context.router.push({
				pathname: '/static/chapter/detail', query: {
					chapterId: id, pageId: page,
					courseId: this.props.location.query.courseId
				}
			})
		} else {
			dispatch(alertMsg(chapter.comment))
		}
	}

	render() {
		const { main } = this.props
		const data = _.get(main, 'data', {})
		const course = _.get(main, 'data.course', {})

		const renderList = () => {
			if (course && course.chapterList) {
				return course.chapterList.map((chapter, idx) => {
					return (
						<li key={chapter.id}
								onClick={this.onClickChapter.bind(this, chapter.id, chapter.pageSequence ? chapter.pageSequence : 1, chapter)}>
							<div className="icon"><img src={chapter.icon} alt=""/></div>
							<span style={{width: window.innerWidth - 58 - 10}}>{chapter.name}</span>
						</li>
					)
				})
			}
		}

		const renderNavBar = () => {
			let navList = []

			if (data.weekIndex && data.weekIndex.length > 0) {
				return data.weekIndex.map((index) => {
					return (
						<NavBarItem key={index.index} active={this.state.tab == index.index}
												onClick={e=>this.onClickTab(index.index)}>
							<div className="nav-bar-inner">
								{index.indexName}
							</div>
						</NavBarItem>
					)
				})
			} else {
				return []
			}
		}

		return (
			<div className="main">
				<div className="top-panel" style={{height: this.picHeight}}>
					<img src={course.pic} alt=""/>
				</div>
				<div className="tab">
					{ data.weekIndex && data.weekIndex.length > 0 ? <NavBar>
						{renderNavBar()}
					</NavBar> : null }
					{ data.weekIndex && data.weekIndex.length > 0 ? <div className="week-title">
						<div className="week-title-name">{data.topic}</div>
					</div> : null}
					<TabBody style={{paddingTop: data.weekIndex && data.weekIndex.length > 0 ? 107 : 0}}>
						<ul className="chapterList">
							{renderList()}
						</ul>
					</TabBody>
				</div>
			</div>
		)
	}
}
