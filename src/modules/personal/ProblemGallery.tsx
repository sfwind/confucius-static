import * as React from "react"
import {connect} from "react-redux"
import "./ProblemGallery.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
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
      }).catch(err=>dispatch(err));
  }

  render(){
    const {runningPlans=[],donePlans=[]} = this.state;

    const renderGalleyList = (plans)=>{
      console.log(plans);
      return (
        <div className="galley-module-content">
          {plans.map((item,index)=>{
            return (
              <div key={index} className="item">
                <div className="item-label">
                  {item.name}
                </div>
                <div className="item-content">
                  {item.point}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return(
      <div className="problem-gallery">
        <div className="problem-galley-header">
          我的专题
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
          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label" onClick={()=>this.context.router.push.push("/personal/courses/about")}>
                关于训练营
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
