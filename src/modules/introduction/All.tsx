import * as React from "react"
import * as _ from "lodash"
import "./All.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Icon, Progress } from "react-weui"
const P = "allcourse"

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
		pget("/introduction/allcourse").then(res => {
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


	render() {
		const { allcourse } = this.props
		const data = _.get(allcourse, 'data', [])

		const renderList = () => {
			if (data) {
				return data.map((course) => {
					return (
						<div className="card" key={course.id}
								 style={{backgroundImage: `url('${course.introPic}')`, height: this.picHeight}}
								 onClick={() => this.context.router.push(`/static/signup?courseId=${course.id}`)}>
						</div>
					)
				})
			}
		}

		return (
			<div className="all">
				<div className="title" onClick={() => this.context.router.push(`/static/signup?courseId=${data[0].id}`)}>
					开放的训练课程
				</div>
				{renderList()}
				{/*<div className="plus-btn" onClick={() => window.location.href = 'http://wj.qq.com/s/819392/a912/'}>
				 更多训练马上推出，哪个是你的菜？
				 </div>*/}
			</div>
		)
	}
}
