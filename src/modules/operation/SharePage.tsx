import * as React from "react"
import "./SharePage.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { Icon, Progress } from "react-weui"
import { config_share } from "../helpers/JsConfig"

@connect(state => state)
export default class SharePage extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      data:{},
    }
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const promo_id = location.query.id
    dispatch(startLoad())
    pget(`/operation/promoCode/${promo_id}`).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        this.setState({data: res.msg})
        config_share([''], res.msg.url,
          '这个春天，一起来重新认识职业发展', 'http://www.iquanwai.com/images/logo.png',
          `${res.msg.name}推荐给你求职&职业规划课并送了你一个优惠码`)
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  render() {
    const { data } = this.state
    const { code, id, avatar, name} = data

    return (
      <div className="share-page">
        <div className="bg"><img className="bgImg" src="http://www.iquanwai.com/images/new_bg6.jpg" alt=""/></div>
        <div className="promoArea">
          <div className="avatar"><img className="avatar-img" src={avatar} alt=""/></div>
          <div className="text"><span className="name">{name}</span>推荐给你求职&职业规划课</div>
          <div className="text">并送了你一个8折优惠码</div>
          <div className="code">{code}</div>
        </div>

      </div>
    )
  }
}
