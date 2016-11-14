import * as React from "react"
import * as _ from "lodash"
import "./Personal.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
const P = "certificate/personal"
const EMAIL_REG = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
const MOBILE_REG = /^[0-9]{11}$/i

const industryList = [
	"请选择",
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
export default class Personal extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			info: {
				mobileNo: '',
				email: '',
				industry: '',
				function: '',
				workingLife: '',
				province: '',
				city: ''
			},
			provinceList: [],
			cityList: []
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/personal/info/load").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState({ info: res.msg })
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
		pget("/personal/province/load").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState({ provinceList: res.msg.province, cityList: res.msg.city })
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	changeValue(path, value) {
		this.setState(_.set(_.merge({}, this.state), path, value))
	}

	bind(field, getValue) {
		return {
			value: _.get(this.state, field),
			onChange: (e) => this.changeValue(field, getValue ? getValue(e) : e)
		}
	}

	getInputValue(e) {
		return e.currentTarget.value
	}

	submit() {
		const { dispatch } = this.props
		if (this.check()) {
			dispatch(startLoad())
			ppost(`/personal/info/submit`, _.merge({}, this.state.info, this.props.location.query)).then(res => {
				dispatch(endLoad())
				if (res.code === 200) {
					// this.context.router.push({ pathname: '/static/signup/welcome' })
					this.context.router.push({
						pathname: '/certificate/main', query: this.props.location.query
					})
				} else {
					dispatch(alertMsg(res.msg))
				}
			}).catch((err) => {
				dispatch(alertMsg(err))
			})
		}
	}

	check() {
		const { dispatch } = this.props
		const { info } = this.state
		const { realName, mobileNo, email, industry, workingLife, city, province } = info
		if (_.isEmpty(realName)) {
			dispatch(alertMsg('真实姓名不能为空'))
			return false
		}

		if (_.isEmpty(mobileNo)) {
			dispatch(alertMsg('手机号不能为空'))
			return false
		}

		// if (_.isEmpty(email)) {
		// 	dispatch(alertMsg('邮箱不能为空'))
		// 	return false
		// }

		if (_.isEmpty(industry) || industry === "请选择") {
			dispatch(alertMsg('请选择行业'))
			return false
		}

		if (_.isEmpty(this.state.info.function)) {
			dispatch(alertMsg('职业不能为空'))
			return false
		}

		if (_.isEmpty(workingLife)) {
			dispatch(alertMsg('工作年限不能为空'))
			return false
		}

		if (!_.isEmpty(mobileNo) && !MOBILE_REG.test(mobileNo)) {
			dispatch(alertMsg('请输入格式正确的手机'))
			return false
		}

		if (!_.isEmpty(email) && !EMAIL_REG.test(email)) {
			dispatch(alertMsg('请输入格式正确的邮箱'))
			return false
		}

		if (_.isEmpty(province)) {
			dispatch(alertMsg('省份不能为空'))
			return false
		}

		if (_.isEmpty(city)) {
			dispatch(alertMsg('城市不能为空'))
			return false
		}

		return true
	}

	onChangeProvince(value) {
		const cityMap = this.state.cityList
		this.changeValue('info.province', value)
		let self = this
		setTimeout(() => {
			self.changeValue('info.city', cityMap[value][0].name)
		}, 100)
	}

	onChangeCity(value) {
		this.changeValue('info.city', value)
	}

	render() {
		const { provinceList, cityList } = this.state
		const renderIndustryOptions = () => {
			return industryList.map((industry, idx) => {
				return (
					<option key={idx} value={industry}>{industry}</option>
				)
			})
		}

		const renderProvinceOption = () => {
			if (!provinceList) {
				return null
			}

			return provinceList ? provinceList.map((p) => {
				return (
					<option key={p.name} value={p.name}>{p.name}</option>
				)
			}) : null
		}

		const renderCityOption = () => {
			if (!cityList) {
				return null
			}

			return cityList[this.state.info.province] ? cityList[this.state.info.province].map((c) => {
				return (
					<option key={c.name} value={c.name}>{c.name}</option>
				)
			}) : null
		}
		console.log(this.state.info.province)

		return (
			<div className="certificate-edit">
				<div className="container">
					补充完整信息, 才能颁发属于你的证书哦! <br/><span style={{color: '#cccccc', fontSize: 14}}>(为保证证书有效, 请填写真实信息)</span>
					<div className="form">
						<FormItem label="真实姓名" required={true}><input
							type="text" {...this.bind('info.realName', this.getInputValue)}/></FormItem>
						<FormItem label="手机号" required={true}><input
							type="text" {...this.bind('info.mobileNo', this.getInputValue)}/></FormItem>
						<FormItem label="电子邮箱"><input
							type="text" {...this.bind('info.email', this.getInputValue)}/></FormItem>
						<FormItem label="行业" required={true}>
							<div className="select-wrapper">
								<select {...this.bind('info.industry', this.getInputValue)}>
									{renderIndustryOptions()}
								</select>
							</div>
						</FormItem>
						<FormItem label="职业" required={true}><input
							type="text" {...this.bind('info.function', this.getInputValue)}/></FormItem>
						<FormItem label="工作年限" required={true}><input
							type="text" {...this.bind('info.workingLife', this.getInputValue)}/></FormItem>
						<FormItem label="省份" required={true}>
							<div className="select-wrapper">
								<select value={this.state.info.province} onChange={(e) => this.onChangeProvince(e.currentTarget.value)}>
									{renderProvinceOption()}
								</select>
							</div>
						</FormItem>
						<FormItem label="城市" required={true}>
							<div className="select-wrapper">
								<select value={this.state.info.city} onChange={(e) => this.onChangeCity(e.currentTarget.value)}>
									{renderCityOption()}
								</select>
							</div>
						</FormItem>
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
		const { label, required } = this.props

		return (
			<div className="form-item">
				<div className="label">
					{label} <span style={{color: 'red'}}>{required? '*' : null}</span>
				</div>
				<div className="control">
					{this.props.children}
				</div>
			</div>
		)
	}
}