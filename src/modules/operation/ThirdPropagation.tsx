import * as React from "react"
import "./ThirdPropagation.less"
import AssetImg from "../../components/AssetImg";

export default class ThirdPropagation extends React.Component<any, any> {

  render() {

    return (
      <div className="propagation-body">
        <div className="propagation-container">
          <div className="prop-desc-container">
            <div className="prop-header">
              <div className="prop-guide">
              【课程】
              </div>
              <div>如何结识比自己牛的人？</div>
            </div>
          </div>
          <div className="prop-description">
            <span>“张良计”和“圈外”首次合作</span>
            <span>Boy 的干货经验分享</span>
          </div>
          <div className="prop-line"/>
          <div className="prop-notify">
            <div className="prop-msg">
              扫描二维码，进入圈外学习号试听&amp;报名
            </div>
          </div>
          <div className="prop-qrcode">
            <AssetImg height={185} width={185} url="https://www.iqycamp.com/images/serverQrCode.jpg"/>
          </div>
        </div>
      </div>
    )

  }

}
