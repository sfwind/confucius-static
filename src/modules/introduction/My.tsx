import * as React from "react"
import * as _ from "lodash"
import "./My.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Icon, Progress } from "react-weui"
const P = "mycourse"

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
		pget("/introduction/mycourse").then(res => {
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


	render() {
		const { mycourse } = this.props
		const data = _.get(mycourse, 'data', {})
		const course = data.course || {}

		return (
			<div className="my">
				<div className="title">我的试炼</div>
				<div className="card">
					<div className="card-title">{course.name}</div>
					<Progress value={data.myProgress * 100}/>
				</div>
				<div className="plus-btn">
					+添加试炼
				</div>
			</div>
		)
	}
}
