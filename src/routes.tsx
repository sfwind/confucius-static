import * as React from "react"
import { Route } from "react-router"
import Base from "modules/base/Base"
import Main from "modules/course/Main"
import Detail from "modules/chapter/Detail"
import MyCourse from "modules/introduction/My"
import AllCourse from "modules/introduction/All"

const routes = (
	<Route path="/" component={Base}>
		<Route path="/static/course/main" component={Main}/>
		<Route path="/static/chapter/detail" component={Detail}/>
		<Route path="/static/introduction/my" component={MyCourse}/>
		<Route path="/static/introduction/all" component={AllCourse}/>
	</Route>
)

export default routes
