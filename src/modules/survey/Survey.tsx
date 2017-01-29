import * as React from "react"
import {connect} from "react-redux"
import {config,configShareFriend,showOptionMenu,hideOptionMenu} from "../helpers/JsConfig";
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"

@connect(state => state)
export default class Reject extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }

  clickShareConfigBtn(){
    configShareFriend("你的打分回左右RISE的方向","感谢您对我们的支持","http://www.confucius.mobi/survey/wjx?activity=11918087","http://www.iquanwai.com/images/logo.png");
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
