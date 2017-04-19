import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./Courses.less"


@connect(state => state)
export default class Rise extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    changeTitle("训练营");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/course/list")
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          // 分类
          let runningCourses = [];
          let completeCourses = [];
          res.msg.forEach(item => {
            if (item.graduate) {
              completeCourses.push(item);
            } else {
              runningCourses.push(item);
            }
          });
          console.log(runningCourses, completeCourses);
          this.setState({runningCourses: runningCourses, completeCourses: completeCourses});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err + ""));
    });
  }

  goCertificate(course) {
    const {hasCertificateNo, noCertificate, hasRealName} = course;
    const {dispatch} = this.props;
    if (noCertificate) {
      dispatch(alertMsg("该课程没有毕业证书"));
    } else {
      if (hasCertificateNo) {
        if (hasRealName) {
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

  goIntroduction() {
    window.location.href = "http://mp.weixin.qq.com/s?__biz=MzI1OTQ2OTY1OA==&mid=100000014&idx=1&sn=011bf56ec96b01d566c89e5b494c19ce&chksm=6a79393b5d0eb02ddcf019386113e4331dd6d1f20d9ba9e62895e1b58a7d18900882f49c6d96&scene=18#wechat_redirect";
  }

  tip() {
    const {dispatch} = this.props;
    dispatch(alertMsg("该课程正在进行中"));
  }

  render() {
    const {runningCourses = [], completeCourses = []} = this.state;
    return (
      <div className="courses">
        <div className="courses-header">
          我的课程
        </div>
        <div className="courses-container">
          <div className="course-header">
            进行中
          </div>
          {runningCourses.length > 0 ? runningCourses.map((item, index) => {
            return (
              <div key={index} className="item" onClick={()=>this.tip(item)}>
                <div className="label">
                  {item.name}
                </div>
                <div className="content">

                </div>
              </div>
            )
          }) :<div className="item">
            <div className="label" style={{color:"#999999"}}>
              无
            </div>
          </div>}
          <div className="course-header">
            已完成
          </div>
          {completeCourses.length > 0 ? completeCourses.map((item, index) => {
            return (
              <div key={index} className="item" onClick={()=>this.goCertificate(item)}>
                <div className="label">
                  {item.name}
                </div>
                <div className="content">

                </div>
              </div>
            )
          }) :<div className="item">
            <div className="label" style={{color:"#999999"}}>
              无
            </div>
          </div>}
        </div>

        <div onClick={()=>this.goIntroduction()} className="courses-header bottom">
          圈外训练营介绍
        </div>
      </div>
    )
  }
}
