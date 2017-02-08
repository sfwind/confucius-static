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
      }).catch(err=>dispatch(alertMsg(err)));
  }
  render(){
    const {courses=[]} = this.state;
    return (
      <div className="courses">
        <div className="courses-header">
          参与的课程
        </div>
        <div className="courses-container">
          {courses.length!==0?courses.map((item,index)=>{
            return (
              <div key={index} className="item">
                <div className="label">
                  {item.name}
                </div>
                <div className="content">
                </div>
              </div>
            )
          }):
          <div className="no-courses">
            <img src="http://www.iquanwai.com/images/personalCourseNoTip.png"/>
          </div>}
        </div>
      </div>
    )
  }
}
