import * as React from "react";
import { merge } from "lodash";

export default class AssetImg extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { size, type, width, height, marginTop, style } = this.props
    let {url} = this.props
    if(url){
      if(url.indexOf('static.iqycamp.com')!=-1 && url.indexOf('imageslim')!=-1){
        url = url + '?imageslim'
      }
    }
    const _style = {
      width: size || width,
      height: size || height,
      marginTop: marginTop,
    }

    return (
      <img src={type ? require(`../../assets/img/${type}.png`) : url} style={merge(_style, style)}/>
    )
  }
}
