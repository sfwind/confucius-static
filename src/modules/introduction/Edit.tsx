import * as React from "react"
import {connect} from "react-redux"
import "./Edit.less"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import DropDownList from  "../../components/DropDownList"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import { ButtonArea, Button } from "react-weui"
const EMAIL_REG = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i


const industryList = [
  {id: "1", value: "互联网/电商"},
  {id: "2", value: "软件/IT服务"},
  {id: "3", value: "咨询"},
  {id: "4", value: "人力资源"},
  {id: "5", value: "法律"},
  {id: "6", value: "快消品"},
  {id: "7", value: "银行/证券/保险"},
  {id: "8", value: "机械/重工"},
  {id: "9", value: "房地产"},
  {id: "10", value: "学术/科研/院校"},
  {id: "11", value: "医药/医疗设备"},
  {id: "12", value: "通信/电子"},
  {id: "13", value: "计算机硬件/半导体"},
  {id: "14", value: "能源/化工"},
  {id: "15", value: "物流"},
  {id: "16", value: "政府/公共事业/非营利"},
  {id: "17", value: "其他"}
];


const workingLifeList = [
  {id: "2", value: "0"},
  {id: "3", value: "0~1年"},
  {id: "4", value: "1~3年"},
  {id: "5", value: "3~5年"},
  {id: "6", value: "5~7年"},
  {id: "7", value: "7~10年"},
  {id: "8", value: "10~15年"},
  {id: "9", value: "15年以上"}
];

@connect(state => state)
export default class Profile extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      function: null,
      industry: null,
      workingLife: null,
      city: null,
      province: null,
      isFull: false,
    }
  }


  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    changeTitle("个人信息");
    const {dispatch,region}= this.props;
    dispatch(startLoad());
    pget("/signup/info/load")
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState(res.msg);
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });
  }


  changeValue(path, value) {
    this.setState(_.set(_.merge({}, this.state), path, value))
  }

  bind(field, getValue) {
    return {
      value: this.state[field],
      onChange: (e) => this.changeValue(field, getValue ? getValue(e) : e)
    }
  }

  getInputValue(e) {
    return e.currentTarget.value
  }

  onChoiceRegion(provinceRegion, cityRegion) {
    this.setState({province:provinceRegion.value,provinceId:provinceRegion.id,city:cityRegion.value,cityId:cityRegion.id});
  }


  onChoiceIndustry(industry) {
    this.setState({industry:industry.value});
  }

  onChoiceWorkingLife(workingLife) {
    this.setState({workingLife:workingLife.value});
  }

  submitProfile() {
    const {dispatch}= this.props;
    if (this.check()) {
      dispatch(startLoad());
      ppost(`/signup/info/submit`, _.merge({}, this.state, this.props.location.query))
        .then(res => {
          dispatch(endLoad());
          if (res.code === 200) {
            this.context.router.push({
              pathname: '/static/signup/intro',
              query: {courseId: this.props.location.query.courseId,chapterId:res.msg}
            })
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => {
        dispatch(endLoad());
        dispatch(alertMsg(err+""));
      });
    }
  }

  check() {
    const { dispatch } = this.props
    const { mobileNo, email, industry, workingLife } = this.state
    console.log(mobileNo, email, industry, workingLife );
    if (_.isEmpty(mobileNo)) {
      dispatch(alertMsg('手机号不能为空'))
      return false
    }

    // if (_.isEmpty(email)) {
    // 	dispatch(alertMsg('邮箱不能为空'))
    // 	return false
    // }

    if (_.isEmpty(industry) || industry==="请选择") {
      dispatch(alertMsg('行业不能为空'))
      return false
    }

    if (_.isEmpty(this.state.function)) {
      dispatch(alertMsg('职业不能为空'))
      return false
    }

    if (_.isEmpty(workingLife) || workingLife==="请选择") {
      dispatch(alertMsg('工作年限不能为空'))
      return false
    }

    if (!_.isEmpty(email) && !EMAIL_REG.test(email)) {
      dispatch(alertMsg('请输入格式正确的邮箱'))
      return false
    }

    return true
  }

  render() {
    const {industry, workingLife,email,mobileNo} = this.state;
    const functionValue = _.get(this.state, "function");
    const renderFunction = () => {
      return (
        <div className={functionValue?"select-wrapper-has-no-cut":"select-wrapper"}>
          <input id="functionInput" placeholder="请填写" type="text" {...this.bind('function', this.getInputValue)}/>
        </div>
      )
    }

    const renderRegion = () => {
      const userData = [{value: province, id: provinceId}, {value: city, id: cityId}];
      return (
        <div className={provinceId && cityId?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={2} data={[provinceList,cityList]} userData={userData[1].id?userData:null}
                        onChoice={(one,two)=>this.onChoiceRegion(one,two)}/>
        </div>
      )
    }

    const renderIndustry = () => {
      let myIndustry = {value: industry};
      for (let item in industryList) {
        if (_.isEqual(industryList[item].value, industry)) {
          myIndustry.id = industryList[item].id;
          break;
        }
      }

      return (
        <div className={industry?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={1} data={[industryList]} userData={myIndustry.id?[myIndustry]:null}
                        onChoice={(one)=>this.onChoiceIndustry(one)}/>
        </div>
      )
    }

    const renderWorkingLife = () => {
      let myWorkingLife = {value: workingLife};
      for (let item in workingLifeList) {
        if (_.isEqual(workingLifeList[item].value, workingLife)) {
          myWorkingLife.id = workingLifeList[item].id;
          break;
        }
      }

      return (
        <div className={workingLife?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={1} data={[workingLifeList]} userData={myWorkingLife.id?[myWorkingLife]:null}
                        onChoice={(one)=>this.onChoiceWorkingLife(one)}/>
        </div>
      )
    }

    const renderMobile = () => {
      return (
        <div className={mobileNo?"select-wrapper-has-no-cut":"select-wrapper"}>
          <input id="functionInput" placeholder="请填写" required={true} type="text" {...this.bind('mobileNo', this.getInputValue)}/>
        </div>
      )
    }
    const renderEmail = () => {
      return (
        <div className={email?"select-wrapper-has-no-cut":"select-wrapper"}>
          <input id="functionInput" placeholder="请填写" required={true} type="text" {...this.bind('email', this.getInputValue)}/>
        </div>
      )
    }

    return (
      <div className="personal-edit">
        <div className="edit-header">
          <div className="tips"> 填写信息，完成报名
          <span>成为圈外大家庭的一员，认识更多同路人</span>
          </div>
        </div>
        <div className="profile-container">

          <div className="profile-item">
            <div className="item-label">
              手机号
            </div>
            <div className="item-content">
              {renderMobile()}
            </div>
          </div>
          <div className="profile-item">
            <div className="item-label">
              电子邮箱
            </div>
            <div className="item-content">
              {renderEmail()}
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
              工作年限
            </div>
            <div className="item-content">
              {renderWorkingLife()}
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <div className="submit">
            <Button plain onClick={this.submitProfile.bind(this)}>提交，完成报名</Button>
          </div>
        </div>
      </div>
    )
  }
}
