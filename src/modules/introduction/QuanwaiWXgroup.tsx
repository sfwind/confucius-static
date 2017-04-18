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
      <div className="container" style={{textAlign:'center', marginTop:20}}>
        <div>上海舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_sh.jpg"/></div>
        <div>北京舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_bj.jpg"/></div>
        <div>深圳舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_sz.jpg"/></div>
        <div>广州舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_gz.jpg"/></div>
        <div>江浙舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_jz.jpg"/></div>
        <div>福建舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_fj.jpg"/></div>
        <div>河南舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_hn.jpg"/></div>
        <div>东北河北舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_db.jpg"/></div>
        <div>其他地区的舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="http://www.iqycamp.com/images/wxgroup/wx_other.jpg"/></div>
      </div>
    )
  }
}
