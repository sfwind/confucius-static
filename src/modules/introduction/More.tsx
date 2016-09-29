import * as React from "react"
import * as _ from "lodash"
import "./More.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Icon, Progress } from "react-weui"
const P = "morecourse"

@connect(state => state)
export default class More extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
	}

	componentWillMount() {
	}


	render() {
		const { morecourse } = this.props
		const data = _.get(morecourse, 'data', {})
		const course = data.course || {}

		return (
			<div className="more">
				<ul>
					<li>更多课程</li>
					<li>更多课程</li>
					<li>更多课程</li>
					<li>更多课程</li>
					<li>更多课程</li>
				</ul>
			</div>
		)
	}
}
