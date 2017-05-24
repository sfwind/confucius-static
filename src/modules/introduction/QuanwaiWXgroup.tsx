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
        <div className="tip">想找到组织？快快扫描下面你所在地舵主（负责人）的二维码哦～如果联系不上舵主，还可以联系小Q哒（ID：quanwaizhushou）
        </div>
        <div>上海舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_sh2.png"/></div>
        <div>北京+天津舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_bj2.png"/></div>
        <div>深圳舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_sz.jpg"/></div>
        <div>广东副舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_gd.jpeg"/></div>
        <div>江苏+浙江舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_jz2.png"/></div>
        <div>福建舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_fj.jpg"/></div>
        <div>河南+安徽+湖北+湖南+川渝舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_hn2.png"/></div>
        <div>东北+河北+山东+山西+陕西舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_db.jpg"/></div>
        <div>境外桂黔琼甘青蒙宁新舵主</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/wxgroup/wx_other.jpg"/></div>
        <div>联系不上？没关系，小Q来帮您～</div>
        <div className="qrcode"><img className="qrcode-img" src="https://www.iqycamp.com/images/asst.jpeg"/></div>
      </div>
    )
  }
}
