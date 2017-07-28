import * as React from "react"
import { config } from "modules/helpers/JsConfig"
import {Route} from "react-router"

import Base from "modules/base/Base"
import Main from "modules/course/Main"
import Detail from "modules/chapter/Detail"
import SubmitSuccess from "modules/chapter/Success"
import MyCourse from "modules/introduction/My"
import AllCourse from "modules/introduction/All"
import MoreCourse from "modules/introduction/More"
import SignUp from "modules/introduction/SignUp"
import PayCourse from "modules/introduction/Pay"
import PayFail from "modules/introduction/PayFail"
import Welcome from "modules/introduction/Welcome"
import Homework from "modules/pc/Homework"
import PcSuccess from "modules/pc/Success"
import CertificatePersonal from "modules/certificate/Personal"
import CertificateMain from "modules/certificate/Main"
import MobileLoginTip from "modules/pc/MobileLoginTip"
import NotOpen from "modules/introduction/NotOpen"
import Survey from "modules/survey/Survey"
import Personal from "modules/personal/Personal"
import IntroPic from "modules/introduction/IntroPic"
import IntroEdit from "modules/introduction/Edit"
import Pay from "modules/pay/PayPage"
import RiseMemberPaySuccess from "modules/pay/RiseMemberPaySuccess"
import NormalQuestion from "modules/pay/NormalQuestion";
import QuanwaiWXgroup from "modules/introduction/QuanwaiWXgroup"
import Subscribe from "modules/personal/Subscribe"
import ThirdPropagation from "modules/operation/ThirdPropagation"
import SimplePayPage from "modules/pay/SimplePayPage";
import Lottery from "modules/activity/Lottery"

const routes = (
  <Route path="/" >
    <Route component={Base} onChange={
      ()=>{
        if(window.ENV.osName !== 'ios'){
          config(['chooseWXPay']);
        }
      }
    }>
      <Route path="/static/course/main" component={Main}/>
      <Route path="/static/chapter/detail" component={Detail}/>
      <Route path="/static/chapter/success" component={SubmitSuccess}/>
      <Route path="/introduction/my" component={MyCourse}/>
      <Route path="/static/introduction/all" component={AllCourse}/>
      <Route path="/static/introduction/more" component={MoreCourse}/>
      <Route path="/pay/signup" component={SignUp}/>
      <Route path="/pay/course" component={PayCourse}/>
      <Route path="/pay/pay" component={Pay}/>
      <Route path="/pay/simple" component={SimplePayPage}/>
      <Route path="/pay/risemember/success" component={RiseMemberPaySuccess}/>
      <Route path="/pay/risemember/normalquestion" component={NormalQuestion}/>
      <Route path="/static/pay/fail" component={PayFail}/>
      <Route path="/personal/edit" component={IntroEdit}/>
      <Route path="/static/signup/welcome" component={Welcome}/>
      <Route path="/static/h" component={Homework}/>
      <Route path="/static/success" component={PcSuccess}/>
      <Route path="/certificate/personal" component={CertificatePersonal}/>
      <Route path="/certificate/main" component={CertificateMain}/>
      <Route path="/static/login/result" component={MobileLoginTip}/>
      <Route path="/static/pay/notopen" component={NotOpen}/>
      <Route path="/static/survey" component={Survey}/>
      <Route path="/personal/static" component={Personal}/>
      <Route path="/static/signup/intro" component={IntroPic}/>
      <Route path="/static/quanwai/wx/group" component={QuanwaiWXgroup}/>
      <Route path="/operation/static/activity/coupon" component={Lottery}/>
      <Route path="/static/subscribe" component={Subscribe}/>
      <Route path="/promotion/zlj001" component={ThirdPropagation}/>
    </Route>
  </Route>
)

export default routes
