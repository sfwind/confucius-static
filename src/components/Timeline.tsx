import * as React from "react"
import * as _ from 'lodash'
import "./Timeline.less"
import Icon from "./Icon"

export default class Timeline extends React.Component<any, any> {
	constructor(props) {
		super(props)
	}

	render() {
		const icon = { width: 12, height: 32 }
		const { list, current } = this.props

		return (
			<div className="timeline">
				{
					list ? list.map((item, idx) => {
						return (
							<div className="item" key={idx}>
								{ list && idx < list.length - 1 ?
									<Icon {...icon} type={_.findIndex(list, {statusType: current}) < idx ? "node" : "node_n"}/> :
									<Icon size={12} style={{position: 'relative', top: -5}}
												type={_.findIndex(list, {statusType: current}) < idx ? "dot_gray" : "dot_blue"}/>}
								<span
									className={`text ${_.findIndex(list, {statusType: current}) < idx ? '' : 'active'}`}>{item.statusName}</span>
							</div>
						)
					}) : null
				}
			</div>
		)
	}
}
