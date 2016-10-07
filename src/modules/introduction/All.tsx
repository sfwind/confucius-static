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
								 style={{backgroundImage: `url('${course.introPic}')`}}
								 onClick={() => this.context.router.push(`/static/signup?courseId=${course.id}`)}>
						</div>
					)
				})
			}
		}

		return (
			<div className="all">
				<div className="title">思维能力</div>
				{renderList()}
				<div className="plus-btn" onClick={() => this.context.router.push('/static/introduction/more')}>
					更多训练马上推出，哪个是你的菜？
				</div>
			</div>
		)
	}
}
