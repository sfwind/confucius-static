import * as React from "react"
import { Route } from "react-router"
import Main from "./modules/main/Main"

const routes = (
	<Route path="/">
		<Route path="/main" component={Main}/>
	</Route>
)

export default routes
