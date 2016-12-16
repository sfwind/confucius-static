import * as React from "react"
import Upload from "rc-upload"
import "./PicUpload.less"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import * as _ from "lodash"

export default class PicUpload extends React.Component<any,any>{
  constructor(props){
    super(props);
    const {disabled=false} = props;

    this.state = {
      disabled:disabled
    }
    this.supportTypes = Array.from(["jpeg","jpg","png","bmp"]);
  }


  private supportTypes:Array<String>;

  onError(err,response,file){
    const {dispatch,alertMsg } = this.props;
    this.setState({disabled:false});
    dispatch(alertMsg("网络异常，请稍后重试"));
  }

  onSuccess(response,file){
    this.setState({disabled:false});
    const {dispatch,alertMsg } = this.props;
    let {code} = response;
    if(_.isEqual(code,200)){
      this.props.picList.push({picSrc:response.msg.picUrl});
      dispatch(alertMsg("上传成功"));
    } else {
      dispatch(alertMsg("上传失败:"+response.msg));
    }
  }

  onStart(){
    this.setState({disabled:true});
  }

  beforeUpload(file,files){
    const {dispatch,alertMsg } = this.props;
    if(file){
      // 检查moduleId和ReferencedId是否存在
      if(!this.props.moduleId || !this.props.referencedId){
        dispatch(alertMsg("模块加载失败，请尝试刷新页面"));
        return false;
      }

       // 选中文件
      let {name,size} = file;

      if(name && _.includes(name,".")){
        // name一定不空，因为accept里限定了不能没有后缀
        let typeName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(_.includes(this.supportTypes,typeName)){
          // 支持的图片类型
          // 再走其他判断逻辑
        } else {
          dispatch(alertMsg("该图片类型不支持,请转换为一下类型:"+this.supportTypes.toString()));
          return false;
        }
      } else {
        dispatch(alertMsg("该图片无法上传"));
        return false;
      }

      if (size && size > 2048*1024) {
        dispatch(alertMsg("上传的图片大小请不要超过2M"));
        return false;
      }
    } else {
      dispatch(alertMsg("请选择要上传的图片"));
      return false;
    }
    // 出现异常时不要上传
    // file字段为空/name为空
    return true;
  }



  render(){
    return (
      <div className="uploadContainer">
        <Upload className="upload"
                action={`/file/image/upload/${this.props.moduleId}/${this.props.referencedId}`} onSuccess={(response,file)=>{this.onSuccess(response,file);}}
                onError={(err,response,file) => {this.onError(err,response,file);}}
                beforeUpload={(file,files)=>{return this.beforeUpload(file,files);}}
                onStart={(file)=>{this.onStart(file);}}
                accept="image/jpeg,image/jpg,image/png,image/bmp"
                component="div"
                disabled={this.state.disabled}
        >
          <Button >上传图片</Button>
        </Upload>
        <div className="picContainer">
          <ul className="picList">
          {this.props.picList.map((pic,sequence)=>{
            // 循环存放picList
            return (
              <li className="picItem" name={pic.id}>
                {/* <label className="picName">{pic.picName}</label> */}
                <img src={pic.picSrc}/>
              </li>
              )
          })}
          </ul>
        </div>
      </div>
    )
  }

}
