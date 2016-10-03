import * as React from "react"
import * as _ from "lodash"
import "./Main.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
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
		this.state = {
			tab: 1,
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/course/load").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data`, res.msg))
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			alert(err)
		})
	}

	onClickTab(id) {
		this.setState({ tab: id })
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget(`/course/week/1/${id}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data`, res.msg))
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			alert(res.msg)
		})
	}

	onClickChapter(id) {
		this.context.router.push({ pathname: '/static/chapter/detail', query: { chapterId: id, pageId: 1 } })
	}

	render() {
		const { main } = this.props
		const course = _.get(main, 'data.course', {})

		const renderList = () => {
			if (course && course.chapterList) {
				return course.chapterList.map((chapter) => {
					return (
						<li key={chapter.id} onClick={this.onClickChapter.bind(this, chapter.id)}>
							<Icon value="success"/><span>Day{chapter.id}&nbsp;&nbsp;{chapter.name}</span>
						</li>
					)
				})
			}
		}

		const renderNavBar = () => {
			let navList = []

			for (let i = 1; i <= course.week; i++) {
				navList.push(
					<NavBarItem key={i} active={this.state.tab == i} onClick={e=>this.onClickTab(i)}>
						<div className="nav-bar-inner">
							第{charMap[i]}周
						</div>
					</NavBarItem>
				)
			}
			return navList
		}

		return (
			<div className="main">
				<div className="top-panel">
					<div className="title">
						{course.name}
					</div>
				</div>
				<div className="tab">
					<NavBar>
						{renderNavBar()}
					</NavBar>
					<div className="week-title">{course.topic}</div>
					<TabBody>
						<ul className="chapterList">
							{renderList()}
						</ul>
					</TabBody>
				</div>
			</div>
		)
	}
}
