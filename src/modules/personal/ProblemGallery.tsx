import * as React from "react"
import {connect} from "react-redux"
import "./ProblemGallery.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import * as _ from "lodash"
import {changeTitle} from "utils/helpers"


@connect(state=>state)
export default class ProblemGallery extends React.Component<any,any>{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    changeTitle("RISE");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/rise/plans")
      .then(res=>{
        dispatch(endLoad());
        if(res.code===200){
          this.setState(res.msg);
        } else{
          dispatch(alertMsg(res.msg));
        }
      }).catch(err=>{
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });
  }

  goProblemView(item){
    // this.context.router.push({pathname:"/personal/static/rise/problem/detail",query:{problemId:item.problemId}})
    window.location.href = '/rise/static/practice/knowledge/review?problemId='+item.problemId
  }

  render(){
    const {runningPlans=[],donePlans=[],riseId,riseMember} = this.state;

    const renderGalleyList = (plans)=>{
      console.log(plans);
      return (
        <div className="galley-module-content">
          {plans && plans.length > 0 ?plans.map((item,index)=>{
            return (
              <div key={index} className="item" onClick={()=>this.goProblemView(item)}>
                <div className="item-label">
                  {item.name}
                </div>
                <div className="item-content">
                  {item.point+" 积分"}
                </div>
              </div>
            )
          }):<div className="item">
            <div className="item-label" style={{color:"#999999"}}>
              无
            </div>
          </div>}
        </div>
      )
    }

    const renderRiseMember = (riseMember)=>{
      if(_.isBoolean(riseMember)){
        if(riseMember){}
      } else {
        return null;
      }
    }

    return(
      <div className="problem-gallery">
        <div className="problem-galley-header" style={{    marginBottom:"10px",borderBottom:"none"}}>
          <div className="header-label" style={{float:"left"}}>
            RISE ID
          </div>
          <div className="header-content" style={{float:"right",marginRight:"20px"}}>
            {riseId}
          </div>
        </div>
        <div className="problem-galley-header" onClick={()=>this.context.router.push({
            pathname:'/personal/static/rise/member',
          })} style={{    marginBottom:"10px",borderBottom:"none"}}>
          <div className="header-label" style={{float:"left"}}>
            RISE会员
          </div>
          <div className="header-content arrow" style={{float:"right",marginRight:"20px"}}>
            {renderRiseMember(riseMember)}
          </div>
        </div>
        <div className="problem-galley-header">
          我的小课
        </div>
        <div className="problem-galley-container">
          <div className="galley-module">
           <div className="galley-module-header">
             <div className="label">
               进行中
             </div>
           </div>
            {renderGalleyList(runningPlans)}
          </div>

          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                已完成
              </div>
            </div>
            {renderGalleyList(donePlans)}
          </div>
        </div>
      </div>
    )
  }
}
