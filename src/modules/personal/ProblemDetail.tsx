import * as React from "react"
import {connect} from "react-redux"
import "./ProblemDetail.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"

@connect(state=>state)
export default class ProblemDetail extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      showProblem:false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    const {dispatch,location} = this.props;
    dispatch(startLoad());
    pget(`/customer/rise/knowledge/${location.query.problemId}`).then(res=>{
      dispatch(endLoad());
      if(res.code===200){
        console.log(res.msg);
        this.setState({knowledgeList:res.msg})
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goKnowledgeIntro(item){
    console.log(item);
    const {location} = this.props;
    this.context.router.push({pathname:"/personal/static/rise/knowledge/intro",query:{problemId:location.query.problemId,knowledgeId:item.id}});
  }


  goProblemView(){
    const {location} = this.props;
    this.context.router.push({pathname:"/personal/static/rise/problem/view",query:{problemId:location.query.problemId}});
  }

  render(){
    const {knowledgeList,showProblem,problem} = this.state;

    return(
      <div className="problem-detail">
        <div className="detail-header click" onClick={()=>this.goProblemView()} style={{marginBottom:'10px',borderBottom:"none"}}>
          <div className="header-label" style={{float:"left"}}>
            专题详情
          </div>
        </div>
        <div className="detail-header">
          专题知识点
        </div>
        <div className="detail-container">
          {knowledgeList?knowledgeList.map((item,index)=>{
            return(
              <div key={index} className="item" onClick={()=>this.goKnowledgeIntro(item)}>
                <div className="label">
                  {item.knowledge}
                </div>
                <div className="content">

                </div>
              </div>
            )
          }):null}
        </div>
      </div>
    )
  }
}
