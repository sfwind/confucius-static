import * as React from "react"
import { connect } from "react-redux"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"


@connect(state=>state)
export default class Personal extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
    }
    this.picHeight = window.innerWidth / 2.5;
    this.marginTop = (this.picHeight-65)/2>0?(this.picHeight-65)/2:0;
  }

  componentWillMount(){
      window.location.href=`https://${window.location.hostname}/rise/static/customer/personal`
  }


  render(){

  }
}
