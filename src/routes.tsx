import * as React from "react"
import { Route } from "react-router"
import Base from "modules/base/Base"
import Main from "modules/course/Main"

const routes = (
	<Route path="/" component={Base}>
		<Route path="/course/main" component={Main}/>
	</Route>
)

export default routes
