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
      discount: '',
      showScratch: true,
      validExpiredDate: false
    }
  }

  componentDidMount() {
    getDiscount().then(res => {
        if (res.code === 200) {
          const luckyCard = require("./components/lucky-card.js")
          this.setState({luckyCard})
          luckyCard.case({
            coverColor: '', ratio: 0.8, coverImg: 'https://www.iqycamp.com/images/fragment/operation_discount_btn.png',
            callback: function () {
              this.clearCover()
            }
          })
          this.setState({
            discount: `￥${res.msg}`
          })
        } else if (res.code === 201) {
          this.setState({
            showScratch: false,
            discount: res.msg
          })
        }
      }
    ).catch(e => {
      console.error(e)
    })
  }

  onTouchMoveScratch() {
    if (!this.state.validExpiredDate) {
      validDiscount().then(res => {
        console.log(res)
        this.setState({
          validExpiredDate: true
        })
      }).catch(e => {
        console.error(e)
      })
    }
  }

  render() {
    return (
      <div className="body">
        <div className="back-img">
          <img src="https://www.iqycamp.com/images/fragment/operation_discount_back.png"/>
        </div>
        <div id="scratch" onTouchMove={this.onTouchMoveScratch.bind(this)}>
          <div id="card">
            <div className="lotter-content">
              {
                this.state.discount != '' ?
                  <div>
                    <span style={{fontSize: 16}} id="first-span">恭喜你获得奖学金</span><br/>
                  </div>
                  : null
              }
              <span style={{fontSize: 20}}>{this.state.discount}</span><br/>
              {
                this.state.discount != '' ?
                  <div>
                    <span style={{fontSize: 13}}>报名精英版RISE时，选取可抵减学费</span>
                  </div>
                  : null
              }
            </div>
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
    )
  }
}

function getDiscount() {
  return pget("/operation/discount")
}

function validDiscount() {
  return pget("/operation/discount/valid")
}
