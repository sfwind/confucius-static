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
      pathname: '/static/chapter/detail',
      query: { chapterId: this.props.location.query.chapterId, pageId: 1, courseId: this.props.location.query.courseId }
    })
  }


  render() {
    return (
      <div style={{textAlign:'center'}}>
        <div>        <img style={{marginTop:'75px',width:'134px'}} src="http://www.confucius.mobi/images/signupSuccess.png"/>
        </div>
        <div>
          <img style={{marginTop:'60px',width:'212px'}} src="http://www.confucius.mobi/images/getClassMethod.png"/>
        </div>
        <Button style={{marginTop:'120px',width: '300px',fontSize:'16px'}}  onClick={()=>this.goEdit()}>开始上课</Button>
      </div>
    )
  }
}
