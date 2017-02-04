import * as React from "react"
import { connect } from "react-redux"
import "./Profile.less"
import * as _ from "lodash"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { pget, ppost } from "utils/request"


@connect(state=>state)
export default class Profile extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      mobileNo: '',
      email: '',
      industry: '',
      function: '',
      workingLife: '',
      province: '',
      city: '',
      provinceList: [],
      cityList: []
    }
  }

  componentWillMount(){
    const {dispatch,personal}= this.props;
    const profile = _.get(personal,"profile");
    if(!profile){
      dispatch(startLoad());
      pget('/personal/profile')
        .then(res=>{
          dispatch(endLoad());
          if(res.code===200){
            dispatch(set("personal.profile",res.msg));
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err=>dispatch(alertMsg(err+"")));
    }
  }

  render(){
    return (
      <div className="profile">
        <div className="profile-header"></div>
        <div className="profile-container">
          <div className="profile-item">
            <div className="item-label">
              工作年限
            </div>
            <div className="item-content">
              {render}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
