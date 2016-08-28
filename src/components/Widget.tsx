import * as React from "react"
import "./Widget.less"
import Icon from "./Icon"

class Widget extends React.Component<any, any> {
	constructor(props) {
		super(props)
	}

	render() {
		const { title, canEdit, onEdit, icon } = this.props

		return (
			<div className="widget">
				<div className="widget-header">
					{icon ? <span className="widget-title-icon">
          <Icon {...icon}/>
        </span> : null}
					<span className="widget-title">{title}</span>
					{canEdit ? <span className="widget-title-control" onClick={onEdit}>
          <Icon size={26} type={'icon_edit'}/>
        </span> : null}
				</div>
				<div className="widget-body">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Widget
