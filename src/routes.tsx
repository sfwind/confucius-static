import * as React from "react"
import { Route } from "react-router"
import Base from "modules/base/Base"
import Main from "modules/course/Main"
import Detail from "modules/chapter/Detail"

const routes = (
	<Route path="/" component={Base}>
		<Route path="/course/main" component={Main}/>
		<Route path="/chapter/detail" component={Detail}/>
	</Route>
)

export default routes
