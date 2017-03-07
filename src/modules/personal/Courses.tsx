import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./Courses.less"


@connect(state=>state)
export default class Rise extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
    }
  }

  componentWillMount(){
    changeTitle("训练营");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/course/list")
      .then(res=>{
        dispatch(endLoad());
        if(res.code===200){
          this.setState({courses:res.msg});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err=>{
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });
  }

  goCertificate(course){
    const {hasCertificateNo,noCertificate,hasRealName} = course;
    const {dispatch} = this.props;
    if(noCertificate){
      dispatch(alertMsg("该课程没有毕业证书"));
    } else {
      if(hasCertificateNo) {
        if(hasRealName){
          this.context.router.push({
            pathname: '/certificate/main', query: {courseId: course.id}
          });
        } else {
          this.context.router.push({
            pathname: '/certificate/personal', query: {courseId: course.id}
          });
        }

      } else {
        dispatch(alertMsg("很遗憾，该课程你未顺利毕业，下次加油！"))
      }
    }
  }

  render(){
    const {courses=[]} = this.state;
    return (
      <div className="courses">
        <div className="courses-header">
          完成的课程<span className="tip">（点击查看证书）</span>
        </div>
        <div className="courses-container">
          {courses.length!==0?courses.map((item,index)=>{
            return (
              <div key={index} className="item" onClick={()=>this.goCertificate(item)}>
                <div className="label">
                  {item.name}
                </div>
                <div className="content">
                </div>
              </div>
            )
          }):
          <div className="no-courses">
            <img src="http://www.iqycamp.com/images/personalCourseNoTip.png"/>
            <div className="tip">还没有完成的课程，快去训练营学习吧</div>
          </div>}
        </div>
      </div>
    )
  }
}
