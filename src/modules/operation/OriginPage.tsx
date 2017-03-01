import * as React from "react"
import "./OriginPage.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Icon, Progress } from "react-weui"
import { config_share } from "../helpers/JsConfig"

@connect(state => state)
export default class OriginPage extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			data:{},
      tutorial: false,
		}
	}

	componentWillMount() {
		const { dispatch, location } = this.props
		dispatch(startLoad())
		pget("/operation/my/promoCode").then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				this.setState({data: res.msg})
        config_share([''], res.msg.url,
          '这个春天，一起来重新认识职业发展！', 'http://www.iquanwai.com/images/career_activity_share.jpg',
          `${res.msg.name}推荐给你求职&职业规划课并送了你一个优惠码`)
			} else {
				dispatch(alertMsg(res.msg))
			}
		}).catch((err) => {
			dispatch(alertMsg(err))
		})

	}

  showShare(){
    this.setState({tutorial:true})
  }

  closeShare(){
    this.setState({tutorial:false})
  }

	render() {
		const { data, tutorial } = this.state
    const { code, id} = data

		return (
			<div className="origin-page">
        <div className="bg"><img className="bgImg" src="http://www.iquanwai.com/images/old_pg4.jpg" alt=""/></div>
        <div className="promoArea">
          <div className="promoCode">优惠码</div>
          <div className="code">{code}</div>
          <div className="share" onClick={this.showShare.bind(this)}>
            <img src={'http://www.iquanwai.com/images/share_friends4.png'} alt="" width={140} height={65}/>
          </div>
        </div>
        { tutorial ?
          <div className="tutorial" onClick={this.closeShare.bind(this)}>
            <img className="tutorial_tip" src={'http://www.iquanwai.com/images/share_tip3.png'} alt=""/>
          </div> : null
        }
			</div>
		)
	}
}
