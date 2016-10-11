import * as React from "react"
import "./Audio.less"
import Sound from "react-sound"

export default class Icon extends React.Component<any, any> {
	constructor(props) {
		super(props)
	}

	render() {
		const { url } = this.props
		return (
			<Sound url={url} playStatus={Sound.status.PAUSED}/>
		)
	}
}
