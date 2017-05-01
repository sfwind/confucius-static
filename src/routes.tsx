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
import Profile from "modules/personal/Profile"
import CustomerRise from "modules/personal/Rise"
import PointTip from "modules/personal/PointTip"
import ProblemGallery from "modules/personal/ProblemGallery"
import FeedBack from "modules/personal/FeedBack"
import PersonalCourses from "modules/personal/Courses"
import IntroPic from "modules/introduction/IntroPic"
import IntroEdit from "modules/introduction/Edit"
import OriginPage from "modules/operation/OriginPage"
import SharePage from "modules/operation/SharePage"
import Share from "modules/share/Share"
import SmallCourse from "modules/operation/SmallCourse"
import ProblemDetail from "modules/personal/ProblemDetail"
import ProblemView from "modules/personal/ProblemView"
import KnowledgeIntro from "modules/personal/KnowledgeIntro"
import Pay from "modules/pay/PayPage"
import RiseMember from "modules/personal/RiseMember"
import RiseMemberPaySuccess from "modules/pay/RiseMemberPaySuccess"
import NormalQuestion from "modules/pay/NormalQuestion";
import UserProtocol from "modules/personal/UserProtocol"
import QuanwaiWXgroup from "modules/introduction/QuanwaiWXgroup"
import Subscribe from "modules/personal/Subscribe"

const routes = (
  <Route path="/" >
    <Route component={Base} onChange={()=>{config(['chooseWXPay']);}}>
      <Route path="/static/course/main" component={Main}/>
      <Route path="/static/chapter/detail" component={Detail}/>
      <Route path="/static/chapter/success" component={SubmitSuccess}/>
      <Route path="/introduction/my" component={MyCourse}/>
      <Route path="/static/introduction/all" component={AllCourse}/>
      <Route path="/static/introduction/more" component={MoreCourse}/>
      <Route path="/pay/signup" component={SignUp}/>
      <Route path="/pay/course" component={PayCourse}/>
      <Route path="/pay/pay" component={Pay}/>
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
      <Route path="/personal/static/profile" component={Profile}/>
      <Route path="/personal/static/rise" component={CustomerRise}/>
      <Route path="/personal/static/rise/point/tip" component={PointTip}/>
      <Route path="/personal/static/rise/problem" component={ProblemGallery}/>
      <Route path="/personal/static/rise/member" component={RiseMember}/>
      <Route path="/personal/static/feedback" component={FeedBack}/>
      <Route path="/personal/static/courses" component={PersonalCourses}/>
      <Route path="/personal/static/userprotocol" component={UserProtocol} />
      <Route path="/static/signup/intro" component={IntroPic}/>
      <Route path="/static/quanwai/wx/group" component={QuanwaiWXgroup}/>
      <Route path="/static/subscribe" component={Subscribe}/>
    </Route>
  </Route>
)

export default routes
