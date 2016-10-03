import * as React from "react"
import * as _ from "lodash"
import "./Edit.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { NavBar, NavBarItem, TabBody, Icon } from "react-weui"
const P = "personal"

@connect(state => state)
export default class Edit extends React.Component<any, any> {

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

	render() {
		const { main } = this.props
		const course = _.get(main, 'data.course', {})

		return (
			<div className="edit">
				最后一步
			</div>
		)
	}
}
