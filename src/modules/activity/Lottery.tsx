import * as React from "react"
import {connect} from "react-redux"
import {pget} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {ButtonArea, Button} from "react-weui"
import "./components/lucky-card.less"


@connect(state => state)
export default class Lottery extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      discount: '',
    }
  }

  componentDidMount() {
    const {dispatch} = this.props
    getDiscount().then(res => {
      if (res.code === 200) {
        this.setState({
          discount: `￥${res.msg}`,
        })
      } else if (res.code === 201) {
        this.setState({
          discount: '抱歉'
        })
        dispatch(alertMsg("对不起，您暂未购买过任何圈外课程！"))
      } else if (res.code === 202) {
        this.setState({
          discount: '抱歉'
        })
        dispatch(alertMsg("您已参加过此次活动！"))
      }
    });
    const luckyCard = require("./components/lucky-card.js")
    this.setState({luckyCard})
    luckyCard.case({
      coverColor: '#CCCCCC', ratio: .6, callback: function () {
        this.clearCover();
      }
    });
  }

  render() {
    return (
      <div>
        <div id="scratch">
          <div id="card">{this.state.discount}</div>
        </div>
      </div>
    )
  }
}

function getDiscount() {
  return pget("/operation/discount");
}
