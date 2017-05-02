import * as React from "react"
import "./EventWallList.less"
import {connect} from "react-redux"
import {changeTitle} from "utils/helpers"
import {pget, ppost} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import endsWith = require("lodash/endsWith");


@connect(state=>state)
export default class EventWallList extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/customer/event/list")
      .then(res=>{
        dispatch(endLoad());
        if(res.code === 200){
          this.setState({list:res.msg})
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex=>{
        dispatch(endLoad());
        dispatch(alertMsg(ex))
    })
  }

  goEvent(url){
    window.location.href=url;
  }



  render(){
    const {list} = this.state;
    return (<div className="layout">
      <div className="catalog-style-1">
        活动墙
      </div>
      <div className="mg-bg-grey"/>
      <ul className="event-list">
        {list ? list.map((item,idx)=> {
          return <li onClick={()=>this.goEvent(item.destUrl)} key={idx} className="event-item">
            <img className="head-pic"
                 src={item.pic}/>
            <div className="event-info">
              <div className="title">
                {item.title}
              </div>
              <div className="describe">
                {item.publisher}
              </div>
            </div>
          </li>
        }) : null}
      </ul>
    </div>)
  }
}
