import * as React from "react"
import {connect} from "react-redux"
import {pget} from "utils/request"
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
      discount: '1',
      showScratch: true,
      showBtnBackImg: true,
      validExpiredDate: false,
      hasBeenValid: false,
      authoriy: true,
    }
  }

  componentDidMount() {
    getDiscount().then(res => {
        if (res.code === 200) {
          const luckyCard = require("./components/lucky-card.js")
          this.setState({luckyCard})
          luckyCard.case({
            coverColor: '', ratio: 0.8, coverImg: 'https://www.iqycamp.com/images/fragment/operation_discount_btn_02.png',
            callback: function () {
              this.clearCover()
            }
          })
          this.setState({
            discount: `￥${res.msg}`,
          })
        } else if (res.code === 201) {
          this.setState({
            discount: '',
            showScratch: false,
            discount: res.msg,
          })
        } else if (res.code === 202) {
          this.setState({
            discount: '',
          })
        }
      }
    ).catch(e => {
      console.error(e)
    })
  }

  onTouchMoveScratch() {
    this.setState({
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
    return (
      <div className="back-btn-img" onClick={() => {
        this.setState({showBtnBackImg: false})
      }}>
        {this.state.showBtnBackImg && this.state.showScratch ?
          <img src="https://www.iqycamp.com/images/fragment/operation_discount_btn_02.png"/>
          : null
        }
      </div>
    )
  }

  renderOrdinary() {
    if (this.state.discount != '') {
      return (
        <div className="lotter-content">
          <div>
            <span style={{fontSize: 16}} id="first-span">恭喜你获得奖学金</span><br/>
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
    if (this.state.authoriy == false) {
      return (
        <div className="lotter-content">
          <div>
            <span style={{fontSize: 16}} id="first-span">抱歉，仅训练营往期学员</span><br/>
          </div>
          <div>
            <span style={{fontSize: 16}}>能获得奖学金</span><br/>
          </div>
          <div>
            <span style={{fontSize: 13}} id="first-span">在RISE中认真学习，收获更多福利吧</span><br/>
          </div>
        </div>
      )
    }
  }

  render() {

    return (
      <div className="body">
        <div className="back-img">
          {this.renderBtnBackImg()}
          <div id="scratch" onTouchMove={this.onTouchMoveScratch.bind(this)}>
            <div id="card">
              {this.renderOrdinary()}
              {this.renderNoAuthority()}
            </div>
          </div>
          <div className="desc-content">
            <ul>
              <li>只有训练营铁杆学员的才能享受到的福利；</li>
              <li>获取后，奖学金自动存入账户，在报名RISE精英版付费时，可以选取并抵用学费；</li>
              <li>金额随机，听说人品最好的会拿到￥500；</li>
              <li>奖学金有效期至 2017.05.31。</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function getDiscount() {
  return pget("/operation/discount")
}

function validDiscount() {
  return pget("/operation/discount/valid")
}
