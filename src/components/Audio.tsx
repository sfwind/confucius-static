import * as React from "react"
import "./Audio.less"
import * as _ from "lodash"

export default class Icon extends React.Component<any, any> {
	constructor(props) {
		super(props)
	}

	render() {
		const {url} = this.props
		return (
			<audio src=""></audio>
		)
	}
}
