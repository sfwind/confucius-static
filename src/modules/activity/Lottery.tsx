import * as React from "react"
import {connect} from "react-redux"
import {pget, ppost} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {ButtonArea, Button} from "react-weui"
import "./Lottery.less"

@connect(state => state)
export default class Lottery extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      discount: '***',
      showDiscount: false,
      showScratch: true,
      showBtnBackImg: true,
      validExpiredDate: false,
      hasBeenValid: false,
      authority: true,
      showbtn: false,
      sceneone: false, // 有涂层
      scenetwo: false, // 无涂层
      scenethree: false // 无权限
    }
  }

  componentDidMount() {
    getDiscount().then(res => {
        if (res.code === 200) {
          const luckyCard = require("./components/lucky-card.js")
          this.setState({luckyCard})
          luckyCard.case({
            coverColor: '', ratio: 0.8, coverImg: 'https://static.iqycamp.com/images/fragment/operation_discount_btn_03.png',
            callback: function () {
              this.clearCover()
            }
          })
          this.setState({
            discount: `￥${res.msg}`,
            showDiscount: true,
            sceneone: true
          })
        } else if (res.code === 201) {
          this.setState({
            showScratch: false,
            showDiscount: true,
            discount: res.msg,
            scenetwo: true
          })
        } else if (res.code === 202) {
          this.setState({
            discount: '',
            authority: false,
            scenethree: true
          })
        }
      }
    ).catch(e => {
      console.error(e)
    })
  }

  onTouchMoveScratch() {
    this.setState({
      showbtn: true,
      showBtnBackImg: false
    })
    if (!this.state.validExpiredDate && !window.hasBeenValid) {
      window.hasBeenValid = true
      validDiscount().then(() => {
        this.setState({
          validExpiredDate: true,
        })
      }).catch(e => {
        window.hasBeenValid = false
        console.error(e)
      })
    }
  }

  renderBtnBackImg() {
    if (this.state.sceneone) {
      return (
        <div onClick={() => {
          this.setState({showBtnBackImg: false})
        }}>
          {this.state.showBtnBackImg && this.state.showScratch ?
            <img src="https://static.iqycamp.com/images/fragment/operation_discount_btn_03.png?imageslim"/>
            : null
          }
        </div>
      )
    }
  }

  renderOrdinary() {
    if (this.state.sceneone || this.state.scenetwo) {
      return (
        <div className="lotter-content">
          <div>
            <span style={{fontSize: 16}} id="first-span">恭喜你获得RISE券</span><br/>
          </div>
          <span style={{fontSize: 20}}>{this.state.discount}</span><br/>
          <div>
            <span style={{fontSize: 13}}>报名精英版RISE时，选取可抵减学费</span>
          </div>
        </div>
      )
    }
  }

  renderNoAuthority() {
    if (this.state.scenethree) {
      return (
        <div className="lotter-content">
          <div>
            <span style={{fontSize: 16}} id="first-span">抱歉，仅训练营往期学员</span><br/>
          </div>
          <div>
            <span style={{fontSize: 16}}>能获得RISE券</span><br/>
          </div>
          <div>
            <span style={{fontSize: 13}}>在RISE中认真学习，收获更多福利吧</span><br/>
          </div>
        </div>
      )
    }
  }

  renderButton() {
    if ((this.state.sceneone && this.state.showbtn) || this.state.scenetwo || this.state.scenethree) {
      return (
        <div className="submit-btn" style={{width: `150px`}} onClick={() => {this.context.router.push({pathname: '/pay/pay'})}}>
          RISE报名传送门
        </div>
      )
    } else {
      return (
        <div className="submit-btn disabled" style={{width: `150px`}}>
          RISE报名传送门
        </div>
      )
    }
  }

  render() {

    return (
      <div className="lottery-body">
        <div className="back-img">
          <div id="scratch" onTouchMove={this.onTouchMoveScratch.bind(this)}>
            <div className="back-btn-img">{this.renderBtnBackImg()}</div>
            <div id="card">
              {this.renderOrdinary()}
              {this.renderNoAuthority()}
            </div>
          </div>
          <div className="desc-content">
            <ul>
              <li>只有训练营铁杆学员才能享受到的福利；</li>
              <li>获取后，RISE券自动存入账户，在报名RISE精英版付费时，可以选取并抵用学费；</li>
              <li>金额随机，听说人品最好的会拿到￥500；</li>
              <li>精英RISE券有效期至 2017.05.31。</li>
            </ul>
          </div>
          {this.renderButton()}
        </div>
      </div>
    )
  }
}

function getDiscount() {
  return pget("/operation/discount")
}

function validDiscount() {
  return ppost("/operation/discount/valid")
}
