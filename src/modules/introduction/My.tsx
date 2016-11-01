import * as React from "react"
import * as _ from "lodash"
import "./My.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Progress } from "react-weui"
import { isPending } from "utils/helpers"
const P = "mycourse"

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.picHeight = window.innerWidth / 1.875
		this.state = {
			tab: 1,
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/introduction/mycourse").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				// if (!res.msg.course) {
				// this.context.router.push("/static/introduction/all")
				// } else {
				dispatch(set(`${P}.data`, res.msg))
				// }
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(endLoad())
			dispatch(alertMsg(err))
		})
	}


	render() {
		const { mycourse } = this.props
		const data = _.get(mycourse, 'data', {})
		const mCourse = _.get(data, 'myCourses', [])
		const oCourse = _.get(data, 'otherCourses', [])
		console.log(mCourse)

		const renderCourse = (course) => {
			return (
				<div className="card" key={course.course.courseId}
						 onClick={() => this.context.router.push(`/static/course/main?courseId=${course.course.courseId}`)}
						 style={{backgroundImage: `url('${course.course.introPic}')`, height: this.picHeight}}>
					<div className="progress">
						<Progress value={course.myProgress * 100}/>
					</div>
				</div>
			)
		}

		const renderOtherCourse = (course) => {
			return (
				<div className="card" key={course.course.courseId}
						 onClick={() => this.context.router.push(`/static/course/main?courseId=${course.course.courseId}`)}
						 style={{backgroundImage: `url('${course.course.introPic}')`, height: this.picHeight}}>
				</div>
			)
		}

		return (
			<div className="my">
				{mCourse && mCourse.length > 0 && !isPending(this.props, 'base.loading') ?
					<div>
						<div className="title">我的训练</div>
						{mCourse.map((course) => renderCourse(course))}
					</div>: null }
				<br/>
				{oCourse && oCourse.length > 0 && !isPending(this.props, 'base.loading') ?
					<div>
						<div className="title">开放的训练课程</div>
						{oCourse.map((course) => renderOtherCourse(course))}
					</div>: null }
			</div>
		)
	}
}
