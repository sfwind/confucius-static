import * as React from "react"
import * as _ from "lodash"
import "./Homework.less"
import { connect } from "react-redux"
import { pget, ppost } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { materialType } from "./helpers/Const"
import { config } from "../helpers/JsConfig"
import PicUpload from "../../components/PicUpload"

const P = "homework"
const { Alert } = Dialog

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		config(['previewImage'])
		this.analysisCallback = null
		this.state = {
			tab: 1,
			showModal: false,
			alert: {
				buttons: [
					{
						label: '再改改',
						onClick: this.closeModal.bind(this)
					},
					{
						label: '确认提交',
						onClick: this.submitHomework.bind(this)
					},
				]
			},
			answers: [],
			correct: false,
			homeworkAnswer: null,
			showConfirmModal: false,
			confirmAlert: {
				buttons: [
					{
						label: '再改改',
						onClick: this.closeConfirm.bind(this)
					},
					{
						label: '确认提交',
						onClick: this.submitHomework.bind(this)
					}
				]
			},
      picList:[],
      moduleId:null,
      submitId:null,
      isEdited:false
		}
	}

	componentWillMount() {
		const { dispatch, location, detail } = this.props
		const pageId = Number(location.query.pageId)
		dispatch(startLoad())
    console.log("parent mount");
		pget(`/homework/load/${this.props.location.query.id}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
        console.log(res.msg);
				if (res.msg.homework.submitted) {
					// this.context.router.push({ pathname: '/static/success' })
          this.setState({
            homeworkAnswer: res.msg.homework.content,
            moduleId:res.msg.moduleId,
            submitId:res.msg.submitId,
            picList:res.msg.picList,
            readOnly: res.msg.homework.submitted
          });
					dispatch(set(`${P}.data`, res.msg.homework))
				} else {
          this.setState({moduleId:res.msg.moduleId,submitId:res.msg.submitId,picList:res.msg.picList})
					dispatch(set(`${P}.data`, res.msg.homework))
				}
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	submitHomework() {
		const { dispatch } = this.props
		const { homeworkAnswer } = this.state
    console.log(homeworkAnswer);
		if (_.isEmpty(homeworkAnswer)) {
			dispatch(alertMsg('输入文字解释再提交吧，让你的作业更易懂'));
			return
		}
		dispatch(startLoad())
		ppost(`/homework/submit/${this.props.location.query.id}`, { answer: homeworkAnswer }).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
			  console.log("成功");
				// this.context.router.push({ pathname: '/static/success' })
				// this.setState({ showModal: true })
        this.closeConfirm();
        dispatch(alertMsg("提交成功"));


			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})
	}

	showConfirm() {
		this.setState({ showConfirmModal: true })
	}

	closeConfirm() {
		this.setState({ showConfirmModal: false })
	}

	closeModal() {
		this.setState({ showModal: false })
	}
  clickSubmitBtn(){
    let {readOnly} = this.state;
    if(readOnly){
      // 如果是只读状态，点击后将按钮改为修改
      this.setState({readOnly:false});
    } else {
      // 非只读，则提交,将按钮修改为只读
      this.setState({readOnly:true});
      this.showConfirm();
    }
  }

	render() {
		const { homework, location,dispatch } = this.props
		const data = _.get(homework, `data`, {})
		const renderHomework = () => {
			return (
				<div className="homework">
					{/**<audio src={data.voice} controls="controls"/>**/}
					<p dangerouslySetInnerHTML={{__html: data.subject}}></p>
					<div className="tip">
						<div style={{color: "#2aa8aa"}}>提醒一下：</div>
						<div style={{color: "#2aa8aa"}}>作业支持提交后电脑端修改啦！<br/>看下面，还可以上传图片给圈圈和助教。<br/>如作业较长，需列出提纲，可以用编号的形式来展示层次。</div>
					</div>
          {this.state.readOnly?<div><pre>{this.state.homeworkAnswer}</pre></div>:
            <textarea cols="30" rows="10"
                      value={this.state.homeworkAnswer}
                      readOnly={this.state.readOnly}
                      onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
          }
				</div>
			)
		}

		return (
			<div className="pcHomework">
				<div className="container">
					{renderHomework()}
          <div className="btn-container">
						<Button size="small" onClick={() => this.clickSubmitBtn()} >{this.state.readOnly?"修改":"提交"}</Button>
					</div>
				</div>
        <PicUpload dispatch={dispatch} state={this.state}  alertMsg={alertMsg} picList={this.state.picList} referencedId={this.state.submitId} moduleId={this.state.moduleId}/>
				<Alert { ...this.state.alert }
					show={this.state.showModal}>
					确认提交吗?
				</Alert>
				<Alert { ...this.state.confirmAlert }
					show={this.state.showConfirmModal}>
					确认提交吗？
				</Alert>
			</div >
		)
	}
}
