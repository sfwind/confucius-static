import * as React from "react";
import {connect} from "react-redux"
import "./ProblemView.less";
import Audio from "../../components/Audio";
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import { Toast, Dialog } from "react-weui";
const { Alert } = Dialog

@connect(state=>state)
export default class ProblemViewer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.close.bind(this)
          },
          {
            label: '想好了',
            onClick: ()=>{this.setState({showAlert:false});this.props.submitProblem(this.props.problem.id)}
          }
        ]
      }
    }
  }


  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    const {location,dispatch} = this.props;
    dispatch(startLoad());
    pget(`/customer/rise/get/${location.query.problemId}`).then(res=>{
      dispatch(endLoad());
      if(res.code === 200){
        console.log(res.msg);
        this.setState({problem:res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }

    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  show() {
    this.setState({showAlert: true})
  }

  close() {
    this.setState({showAlert: false})
  }

  goBack(){
    const {location} = this.props;
    this.context.router.push({pathname:"/personal/static/rise/problem/detail",query:location.query})
  }

  render() {
    const { problem={}} = this.state;
    return (
      <div className="problem-page">
        <div className="container has-footer">
          <div className="problem-intro">
            <div className="page-header">{problem.problem}</div>
            <div className="page-content">
              { problem.audio ? <div className="context-audio">
                <Audio url={problem.audio}/>
              </div> : null }
              <div className="context" dangerouslySetInnerHTML={{__html: problem.description}}></div>
              <div className="context-img">
                <img src={problem.descPic} alt=""/>
              </div>
              <div className="context">上图中，带数字编号的是你接下来<span className="problem-length">{problem.length}</span>天要学习的知识点。你每天会练习到其中的两个。这些知识点会以选择题和应用题的方式，来帮助你更好地掌握。</div>
            </div>
          </div>

        </div>
        <div className="button-footer" onClick={()=>this.goBack()}>返回</div>
        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <p>选择后，需要完成该专题，才能开启下一专题，想好了吗？</p>
        </Alert>
      </div>
    )
  }
}
