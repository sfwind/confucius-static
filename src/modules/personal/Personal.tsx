import * as React from "react"
import { connect } from "react-redux"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import "./Personal.less"
import {changeTitle} from "utils/helpers"


@connect(state=>state)
export default class Personal extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
    }
    this.picHeight = window.innerWidth / 2.5;
    this.marginTop = (this.picHeight-65)/2>0?(this.picHeight-65)/2:0;
  }

  componentWillMount(){
    changeTitle("个人中心");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/rise")
      .then(res=>{
        dispatch(endLoad());
        if(res.code===200){
          this.setState(res.msg);
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err=>{
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });

  }


  render(){
    const renderHeader = ()=>{
      return (
        <div className="personal-head" style={{marginTop:this.marginTop+"px"}}>
          <div className="personal-head-pic" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
          <div className="personal-name">
            {window.ENV.userName}
          </div>
        </div>
      )
    }

    const renderContainer= ()=>{
      return (
        <div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/static/profile')}}><span>个人信息</span></div>
          {/*<div className="personal-item" onClick={()=>{this.context.router.push('/personal/accountset')}}><span>账户设置</span></div>*/}
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/static/rise')}} ><span>RISE</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/static/courses')}} ><span>训练营</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push("/personal/static/rise/point/tip")}}>
            <div className="item-label">
              积分
            </div>
            <div className="item-content">
              {this.state.point}
            </div>
          </div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/static/feedback')}} ><span>帮助</span></div>

        </div>
      )
    }
    return (
      <div className="personal">
        <div className="personal-header"  style={{height:this.picHeight}}>
          {renderHeader()}
          <div className="personal-mask" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
        </div>
        <div className="personal-container">
          {renderContainer()}
        </div>
      </div>
    )
  }
}
