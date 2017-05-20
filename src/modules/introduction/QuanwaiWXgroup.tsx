import * as React from "react"
import {connect} from "react-redux"
import "./QuanwaiWXgroup.less"

@connect(state=>state)
export default class QuanwaiWXgroup extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
    }
  }


  render(){
    return (
      <div className="container" style={{textAlign:'center',marginTop:20}}>
        <div className="tip">请大家在下方二维码中自行寻找组织，舵主会在一日内拉大家入群。如联系不上舵主，可联系小Q（见最下方的二维码）</div>
        <div>上海舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_sh.jpg"/></div>
        <div>北京+天津舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_bj.jpg"/></div>
        <div>广东舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_sz.jpg"/></div>
        <div>江浙联系人</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_jz.jpg"/></div>
        <div>福建舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_fj.jpg"/></div>
        <div>河南+安徽+湖北+湖南+四川舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_hn.jpg"/></div>
        <div>东北+河北+山东+山西+陕西舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_db.jpg"/></div>
        <div>其他地区的舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_other.jpg"/></div>
        <div> 联系不上？找小Q帮忙</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/asst.jpeg"/></div>
      </div>
    )
  }
}
