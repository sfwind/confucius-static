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
				if (!res.msg.course) {
					this.context.router.push("/static/introduction/all")
				} else {
					dispatch(set(`${P}.data`, res.msg))
				}
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
		const course = _.get(data, 'course', {})

		return (
			<div className="my">
				{course.id && !isPending(this.props, 'base.loading') ?
					<div className="title">我的训练</div> : null }
				{!course.id && !isPending(this.props, 'base.loading') ?
					<div className="title">开放的训练课程</div> : null }
				{course.id && !isPending(this.props, 'base.loading') ?
					<div className="card" onClick={() => this.context.router.push(`/static/course/main?courseId=${courseId}`)}
							 style={{backgroundImage: `url('${course.introPic}')`, height: this.picHeight}}>
						<div className="progress">
							<Progress value={data.myProgress * 100}/>
						</div>
					</div> : null}
				{ !course.id && !isPending(this.props, 'base.loading') ?
					<div className="card"
							 style={{backgroundImage: `url('${course.introPic}')`, height: this.picHeight}}>
					</div> : null }
				{ course.id && !isPending(this.props, 'base.loading') ?
					<div className="plus-btn">
						<span onClick={() => window.location.href = 'http://wj.qq.com/s/819392/a912/'}>下个训练营主题？你说了算</span>
					</div> : null }
				{ !course.id && !isPending(this.props, 'base.loading') ?
					<div className="plus-btn" onClick={() => this.context.router.push('/static/introduction/all')}>
						<Icon type="plus" size={24}/>&nbsp;<span>添加训练</span>
					</div> : null }
			</div>
		)
	}


}
