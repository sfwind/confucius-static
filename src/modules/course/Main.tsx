import * as React from "react"
import * as _ from "lodash"
import "./Main.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { NavBar, NavBarItem, TabBody, Icon } from "react-weui"
const P = "main"

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
			alert(res.msg)
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

		return (
			<div className="main">
				<div className="top-panel">
					{course.name}
				</div>
				<div className="tab">
					<NavBar>
						<NavBarItem active={this.state.tab == 1} onClick={e=>this.onClickTab(1)}>第一周</NavBarItem>
						<NavBarItem active={this.state.tab == 2} onClick={e=>this.onClickTab(2)}>第二周</NavBarItem>
						<NavBarItem active={this.state.tab == 3} onClick={e=>this.onClickTab(3)}>第三周</NavBarItem>
						<NavBarItem active={this.state.tab == 4} onClick={e=>this.onClickTab(4)}>第四周</NavBarItem>
					</NavBar>
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
