import * as React from "react"
import { Route } from "react-router"
import Base from "modules/base/Base"
import Main from "modules/course/Main"
import Detail from "modules/chapter/Detail"
import SubmitSuccess from "modules/chapter/Success"
import MyCourse from "modules/introduction/My"
import AllCourse from "modules/introduction/All"
import MoreCourse from "modules/introduction/More"
import SignUp from "modules/introduction/SignUp"
import Pay from "modules/introduction/Pay"
import PayFail from "modules/introduction/PayFail"
import Welcome from "modules/introduction/Welcome"
import PersonalEdit from "modules/personal/Edit"
import Homework from "modules/pc/Homework"
import PcSuccess from "modules/pc/Success"
import CertificatePersonal from "modules/certificate/Personal"
import CertificateMain from "modules/certificate/Main"
import MobileLoginTip from "modules/pc/MobileLoginTip"

const routes = (
	<Route path="/" component={Base}>
		<Route path="/static/course/main" component={Main}/>
		<Route path="/static/chapter/detail" component={Detail}/>
		<Route path="/static/chapter/success" component={SubmitSuccess}/>
		<Route path="/introduction/my" component={MyCourse}/>
		<Route path="/static/introduction/all" component={AllCourse}/>
		<Route path="/static/introduction/more" component={MoreCourse}/>
		<Route path="/static/signup" component={SignUp}/>
		<Route path="/pay" component={Pay}/>
		<Route path="/static/pay/fail" component={PayFail}/>
		<Route path="/personal/edit" component={PersonalEdit}/>
		<Route path="/static/signup/welcome" component={Welcome}/>
		<Route path="/static/h" component={Homework}/>
		<Route path="/static/success" component={PcSuccess}/>
		<Route path="/certificate/personal" component={CertificatePersonal}/>
		<Route path="/certificate/main" component={CertificateMain}/>
    <Route path="/static/login/result" component={MobileLoginTip}/>
	</Route>
)

export default routes
