import * as React from "react"
import {connect} from "react-redux"
import {config,configShareFriend,showOptionMenu,hideOptionMenu} from "../helpers/JsConfig";
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import { pget } from "utils/request"


@connect(state => state)
export default class Reject extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }

  clickShareConfigBtn(){
    configShareFriend("投资5分钟，让RISE和你的思维一起升级","考验你对圈外真爱的时候到了",`${window.location.host}/survey/wjx?activity=11918087`,"http://www.iquanwai.com/images/logo.png");
    showOptionMenu();
    alert("您可以分享啦");
  }

  componentWillUnmount(){
    hideOptionMenu();
  }

  render() {
    return (
      <div>
        <Button onClick={()=>this.clickShareConfigBtn()}>分享问卷调查</Button>
      </div>
    )
  }
}
