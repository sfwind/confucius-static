import * as React from "react"
import { connect } from "react-redux"
import "./NotOpen.less"

@connect(state => state)
export default class NotOpen extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
  }

  componentWillMount() {
  }


  render() {
    return (
      <div className="not-open">

      </div>
    )
  }
}
