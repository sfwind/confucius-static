import * as React from "react"
import "./NumberSpinner.less"
import * as _ from "lodash"

export default class NumberSpinner extends React.Component<any, any> {
	constructor(props) {
		super(props)
	}

	onChange(value) {
		const { onChange } = this.props
		const inputV = value
		if (inputV === '') {
			onChange(inputV)
		}

		if (!_.isNaN(Number(inputV))) {
			if (Number(inputV) >= 0 && Number(inputV) < 1000) {
				onChange(Number(inputV))
			}
		}
	}

	add() {
		const { value } = this.props
		if (!_.isNaN(Number(value))) {
			this.onChange(Number(value) + 1)
		} else {
			this.onChange(1)
		}
	}

	minus() {
		const { value } = this.props
		if (!_.isNaN(Number(value))) {
			this.onChange(Number(value) - 1)
		} else {
			this.onChange(-1)
		}
	}

	render() {
		const { value } = this.props
		return (
			<div className="number-spinner">
				<span onClick={this.minus.bind(this)}>-</span>
				<input type="number" value={value} onChange={e => this.onChange(e.currentTarget.value)}/>
				<span onClick={this.add.bind(this)}>+</span>
			</div>
		)
	}
}
