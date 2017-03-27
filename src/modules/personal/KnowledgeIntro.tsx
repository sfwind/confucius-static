import * as React from "react";
import { connect } from "react-redux";
import "./KnowledgeIntro.less";
import { startLoad, endLoad, alertMsg } from "../../redux/actions";
import Audio from "../../components/Audio";
import AssetImg from "../../components/AssetImg";
import {pget, ppost} from "utils/request"

@connect(state => state)
export default class Intro extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    pget(`/customer/rise/knowledge/load/${location.query.knowledgeId}`).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.setState({ data: msg })
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goBack(){
    this.context.router.push({pathname:"/personal/static/rise/problem/detail",query:this.props.location.query})
  }
  render() {
    const { data } = this.state
    const { knowledge, audio, pic, analysis, means, keynote } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-intro">
            <div className="page-header">{knowledge}</div>
            <div className="intro-container">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              { pic ? <div className="context-img">
                  <img src={pic}/>
                </div> : null }
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/analysis.png"/>
              </div>
              <div className="context">
                <pre>{analysis}</pre>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/means.png"/>
              </div>
              <div className="context">
                <pre>{means}</pre>
              </div>

              {keynote ?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/keynote.png"/>
                  </div>
                  <div className="context">
                    <pre>{keynote}</pre>
                  </div>
                </div>
                : null}
            </div>
          </div>
        </div>
        <div className="button-footer">
          <div onClick={()=>this.goBack()}>返回
          </div>
        </div>
      </div>
    )
  }
}
