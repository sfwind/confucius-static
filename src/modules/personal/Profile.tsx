import * as React from "react"
import {connect} from "react-redux"
import "./Profile.less"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"

const industryList = [
  "请选择",
  "互联网/电商",
  "软件/IT服务",
  "咨询",
  "人力资源",
  "法律",
  "快消品",
  "银行/证券/保险",
  "机械/重工",
  "房地产",
  "学术/科研/院校",
  "医药/医疗设备",
  "通信/电子",
  "计算机硬件/半导体",
  "能源/化工",
  "物流",
  "政府/公共事业/非营利",
  "其他"
];


const workingLifeList = [
  "请选择",
  "0",
  "0~1年",
  "1~3年",
  "3~5年",
  "5~7年",
  "7~10年",
  "10~15年",
  "15年以上"
];

@connect(state => state)
export default class Profile extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      industry: '',
      function: '',
      workingLife: '',
      province: '',
      city: '',
      provinceList: [],
      cityList: []
    }
  }

  componentWillMount() {
    changeTitle("个人信息");
    const {dispatch, personal, region}= this.props;
    const profile = _.get(personal, "profile");
    if (!profile) {
      dispatch(startLoad());
      pget('/customer/profile')
        .then(res => {
          dispatch(endLoad());
          if (res.code === 200) {
            dispatch(set("personal.profile", res.msg));
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => dispatch(alertMsg(err + "")));
    }
    if (!region) {
      pget('/customer/region')
        .then(res => {
          if (res.code === 200) {
            dispatch(set("region", res.msg));
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => dispatch(alertMsg(res.msg)));
    }
  }

  changeValue(path, value) {
    const {dispatch} = this.props;
    dispatch(set(path, value));
  }

  bind(field, getValue) {
    return {
      value: _.get(this.props, field),
      onChange: (e) => this.changeValue(field, getValue ? getValue(e) : e)
    }
  }

  getInputValue(e) {
    return e.currentTarget.value
  }

  render() {
    const { personal } = this.props;

    const renderFunction = ()=>{
      return (
        <div className="select-wrapper">
          <input type="text" {...this.bind('personal.profile.function', this.getInputValue)}/>
        </div>
      )
    }

    const renderIndustry = ()=> {
      return (
        <div className="select-wrapper">
          <select {...this.bind('personal.profile.industry', this.getInputValue)}>
            {
              industryList.map((industry, idx) => {
                return (
                  <option key={idx} value={industry}>{industry}</option>
                )
              })
            }
          </select>
        </div>
      )
    }

    const renderWorkingLife = () => {
      return (
        <div className="select-wrapper">
          <select {...this.bind('personal.profile.workingLife', this.getInputValue)}>
            {
              workingLifeList.map((workingLife, idx) => {
                return (
                  <option key={idx} value={workingLife}>{workingLife}</option>
                )
              })
            }
          </select>
        </div>
      )
    }

    const renderProfileHeader = ()=>{
      const isFull = _.get(personal,"profile.isFull",false);
      if(isFull){
        return (
          <div className="profile-header-tip" style={{color:"#f7a466",backgroundColor:"#FFFFFF"}}>
           个人资料完整，30积分get！
          </div>
        )
      } else {
        return (
          <div className="profile-header-tip" style={{color:"#FFFFFF",backgroundColor:"#f9b685"}}>
           完整的个人资料=30积分
          </div>
        )
      }
    }
    return (
      <div className="profile">
        <div className="profile-header">
          {renderProfileHeader()}
        </div>
        <div className="profile-container">
          <div className="profile-item">
            <div className="item-label">
              工作年限
            </div>
            <div className="item-content">
              {renderWorkingLife()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              行业
            </div>
            <div className="item-content">
              {renderIndustry()}
            </div>
          </div>


          <div className="profile-item">
            <div className="item-label">
              职业
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>


          <div className="profile-item">
            <div className="item-label">
              省份/城市
            </div>
            <div className="item-content">
              {renderWorkingLife()}
            </div>
          </div>

        </div>
      </div>
    )
  }
}
