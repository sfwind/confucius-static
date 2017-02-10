import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./Rise.less"


@connect(state=>state)
export default class Rise extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      point:null,
    }
  }

  componentWillMount(){
    changeTitle("RISE");
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
    const {point} = this.state;
    return (
     <div className="rise">
       <div className="item" onClick={()=>{this.context.router.push("/personal/static/rise/point/tip")}}>
         <div className="label">
           总积分
         </div>
         <div className="content">
           {point}
         </div>
       </div>

       <div className="item" onClick={()=>{this.context.router.push("/personal/static/rise/problem")}}>
         <div className="label">
           我的专题
         </div>
         <div className="content">
         </div>
       </div>
     </div>
    )
  }
}
