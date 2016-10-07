import * as React from "react"
import * as _ from "lodash"
import "./My.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Progress } from "react-weui"
import { isPending } from "utils/helpers"
import Icon from "../../components/Icon"
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
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}


	render() {
		const { mycourse } = this.props
		const data = _.get(mycourse, 'data', {})
		const course = data.course || {}

		return (
			<div className="my">
				<div className="title">我的试炼</div>
				{course.id && !isPending(this.props, 'base.loading') ?
					<div className="card" onClick={() => this.context.router.push(`/static/course/main`)}
							 style={{backgroundImage: `url('${course.introPic}')`}}>
						<div className="progress">
							<Progress value={data.myProgress * 100}/>
						</div>
					</div> : null}
				{
					!course.id && !isPending(this.props, 'base.loading') ?
						<div className="card"
								 style={{backgroundImage: `url('http://www.iquanwai.com/images/notrain.png')`}}>
						</div> : null
				}
				{ course.id && !isPending(this.props, 'base.loading') ?
					<div className="plus-btn">
						<span onClick={() => window.location.href = 'http://wj.qq.com/s/819392/a912/'}>下个训练营主题？你说了算</span>
					</div> : null }
				{ !course.id && !isPending(this.props, 'base.loading') ?
					<div className="plus-btn" onClick={() => this.context.router.push('/static/introduction/all')}>
						<Icon type="plus" size="24"/>&nbsp;<span>添加试炼</span>
					</div> : null }
			</div>
		)
	}


}
