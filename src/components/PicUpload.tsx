import * as React from "react"
import Upload from "rc-upload"
import "./PicUpload.less"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import * as _ from "lodash"

export default class PicUpload extends React.Component<any,any>{
  constructor(props){
    super(props);
    const picList = [];
    picList.push(...props.picList);
    this.state = {
      picList:picList
    }
    this.supportTypes = Array.from(["jpeg","jpg","png","bmp"]);
  }

  private supportTypes:Array<String>;

  onError(err,response,file){
    console.log(err,response,file);
    console.log(this.state.picList);
  }

  onSuccess(response,file){
    console.log(response,file);
  }

  beforeUpload(file,files){
    const {dispatch,alertMsg } = this.props;
    if(file){
       // 选中文件
      let {name,size} = file;

      if(name && _.includes(name,".")){
        // name一定不空，因为accept里限定了不能没有后缀
        let typeName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(_.includes(this.supportTypes,typeName)){
          // 支持的图片类型，可以上传
          return true;
        } else {
          dispatch(alertMsg("该图片类型不支持,请转换为一下类型:"+this.supportTypes.toString()));
          return false;
        }
      } else {
        dispatch(alertMsg("该图片无法上传"));
        return false;
      }

      if (size && size > 2048) {
        dispatch(alertMsg("上传的图片大小请不要超过2M"));
        return false;
      }
    } else {
      dispatch(alertMsg("请选择要上传的图片"));
      return false;
    }
    // 出现异常时不要上传
    // file字段为空/name为空
    return false;
  }



  render(){
    const { picList } = this.props;
    return (
      <div className="uploadContainer">
        <Upload className="upload"
                action="/file/upload/" onSuccess={(response,file)=>{this.onSuccess(response,file);}}
                onError={(err,response,file) => {this.onError(err,response,file);}}
                beforeUpload={(file,files)=>{return this.beforeUpload(file,files);}}
        accept="image/*"
        component="div"
        >
          <Button >上传图片</Button>
        </Upload>
        <div className="picContainer">
          <ul className="picList">
          {picList.map((pic,sequence)=>{
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
