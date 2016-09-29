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

const routes = (
	<Route path="/" component={Base}>
		<Route path="/static/course/main" component={Main}/>
		<Route path="/static/chapter/detail" component={Detail}/>
		<Route path="/static/chapter/success" component={SubmitSuccess}/>
		<Route path="/static/introduction/my" component={MyCourse}/>
		<Route path="/static/introduction/all" component={AllCourse}/>
		<Route path="/static/introduction/more" component={MoreCourse}/>
		<Route path="/static/signup" component={SignUp}/>
		<Route path="/static/pay" component={Pay}/>
	</Route>
)

export default routes
