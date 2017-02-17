import * as React from "react"
import { connect } from "react-redux"
import {Button, ButtonArea} from "react-weui"

@connect(state => state)
export default class IntroPic extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
  }

  componentWillMount() {
  }

  goEdit(){
    this.context.router.push({
      pathname: '/personal/edit',
      query: {courseId: this.props.location.query.courseId,noTwo:this.props.location.query.noTwo}
    })
  }


  render() {
    return (
      <div>
        <img></img>
        <Button onClick={()=>this.goEdit()}>下一步</Button>
      </div>
    )
  }
}
