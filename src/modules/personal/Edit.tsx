import * as React from "react"
import * as _ from "lodash"
import "./Edit.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
const P = "personal"

const industryList = [
	"互联网/电商",
	"软件/IT服务",
	"咨询",
	"人力资源",
	"法律",
	"快消品",
	"银行/证券/保险",
	"机械/重工",
	"房地产",
	"学术/科研/院校",
	"医药/医疗设备",
	"通信/电子",
	"计算机硬件/半导体",
	"能源/化工",
	"物流",
	"政府/公共事业/非营利",
	"其他"
]

@connect(state => state)
export default class Edit extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			mobileNo: null,
			email: null,
			industry: null,
			function: null,
			workingLife: null
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/signup/info/load").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState(res.msg)
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			alert(err)
		})
	}

	changeValue(path, value) {
		this.setState(_.set(_.merge({}, this.state), path, value))
	}

	bind(field, getValue) {
		return {
			value: this.state[field],
			onChange: (e) => this.changeValue(field, getValue ? getValue(e) : e)
		}
	}

	getInputValue(e) {
		return e.currentTarget.value
	}

	submit() {
		const { dispatch } = this.props
		dispatch(startLoad())
		ppost(`/signup/info/submit`, this.state).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.context.router.push({ pathname: '/static/signup/welcome' })
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
		})
	}

	render() {
		const { main } = this.props
		const course = _.get(main, 'data.course', {})

		const renderIndustryOptions = () => {
			return industryList.map((industry) => {
				return (
					<option value={industry}>{industry}</option>
				)
			})
		}

		return (
			<div className="edit">
				<div className="title">最后一步</div>
				<div className="container">
					填写下面信息,让我们更了解你
					<div className="form">
						<FormItem label="手机号"><input type="text" {...this.bind('mobileNo', this.getInputValue)}/></FormItem>
						<FormItem label="电子邮箱"><input type="text" {...this.bind('email', this.getInputValue)}/></FormItem>
						<FormItem label="行业">
							<select {...this.bind('industry', this.getInputValue)}>
								{renderIndustryOptions()}
							</select>
						</FormItem>
						<FormItem label="职业"><input type="text" {...this.bind('function', this.getInputValue)}/></FormItem>
						<FormItem label="工作年限"><input type="text" {...this.bind('workingLife', this.getInputValue)}/></FormItem>
					</div>
					<div className="submit">
						<Button plain onClick={this.submit.bind(this)}>提交</Button>
					</div>
				</div>
			</div>
		)
	}
}

class FormItem extends React.Component<any, any> {
	render() {
		const { label } = this.props

		return (
			<div className="form-item">
				<div className="label">
					{label}
				</div>
				<div className="control">
					{this.props.children}
				</div>
			</div>
		)
	}
}