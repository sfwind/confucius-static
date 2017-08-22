import * as React from 'react'
import * as _ from 'lodash'
import './PayPage.less'
import { connect } from 'react-redux'
import { ppost, pget, log, getBrowser } from 'utils/request'
import { getGoodName, GoodsType } from 'utils/helpers'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { Button, ButtonArea } from 'react-weui'
import { pay, config } from 'modules/helpers/JsConfig'
import PayInfo from './components/PayInfo'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

const P = 'signup'
const numeral = require('numeral')

@connect(state => state)
export default class SignUp extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      tab: 1,
      code: '',
      promoSubmit: true,
      err: null,
      showPayInfo: false,
      showId: 3,
      style: {},
      timeOut: false,
      showErr: false,
      showCodeErr: false
    }
  }

  /**
   * swiper的序号到会员类型的对应状态
   * @param sliderId swiper卡片的序号
   * @returns {number} 会员类型id
   */
  sliderToMember(sliderId) {
    switch(sliderId) {
      case 0:
        return 3
      case 1:
        return 5
    }
  }

  /**
   * 会员类型到swpier序号的对应关系
   * @param member 会员类型
   * @returns {number} swiper卡片的序号
   */
  memberToSlider(member) {
    switch(member) {
      case 3:
        return 0
      case 5:
        return 1
    }
  }

  resize() {
    let padding = 30 / 750 * window.innerWidth
    let margin = 40 / 750 * window.innerWidth

    this.setState({
      padding: padding,
      margin: margin,
      fontSize: {
        showMember: {
          small: {
            fontSize: `${(24 / 750 * window.innerWidth) > 24 ? 24 : 24 / 750 * window.innerWidth}px`,
            lineHeight: `${(24 / 750 * window.innerWidth) > 24 ? 24 : 24 / 750 * window.innerWidth}px`
          },
          big: {
            fontSize: `${(32 / 750 * window.innerWidth) > 32 ? 32 : 32 / 750 * window.innerWidth}px`,
            lineHeight: `${(32 / 750 * window.innerWidth) > 32 ? 32 : 32 / 750 * window.innerWidth}px`
          },
          name: {
            fontSize: `${(34 / 750 * window.innerWidth) > 34 ? 34 : 34 / 750 * window.innerWidth}px`,
            lineHeight: `${(34 / 750 * window.innerWidth) > 34 ? 34 : 34 / 750 * window.innerWidth}px`
          }
        },
        menu: {
          small: {
            fontSize: `${12}px`
          },
          big: {
            fontSize: `${17}px`
          }
        }
      },
      btnLeft: (window.innerWidth - padding * 2) / 2 - ((window.innerWidth - padding * 2) * 0.33) / 2
    })
  }

  componentWillMount() {
    // ios／安卓微信支付兼容性
    if(window.ENV.configUrl != '' && window.ENV.configUrl !== window.location.href) {
      ppost('/b/mark', {
        module: 'RISE',
        function: '打点',
        action: '刷新支付页面',
        memo: window.ENV.configUrl + '++++++++++' + window.location.href
      })
      window.location.href = window.location.href
      return
    }

    const { dispatch, location } = this.props
    const productId = _.get(location, 'query.productId')
    this.resize()
    dispatch(startLoad())
    // 查询订单信息
    pget(`/signup/rise/member`).then(res => {
      console.log('rise/member', res)
      dispatch(endLoad())
      if(res.code === 200) {
        const { memberTypes, coupons } = res.msg
        let types = []
        types.push(_.merge({}, _.find(memberTypes, { id: 3 }), { open: true }))
        types.push(_.merge({}, _.find(memberTypes, { id: 5 })))
        this.setState({ memberTypes: types, coupons: coupons }, () => {
          var mySwiper = new Swiper(`#slider-container`, {
            initialSlide: 0,
            slideToClickedSlide: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
              rotate: 50,
              stretch: 1,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }
          })
          mySwiper.on('onTransitionStart', (swiper) => {
            const { activeIndex } = swiper
            this.setState({ showId: this.sliderToMember(activeIndex) })
          })

          mySwiper.on('onTap', (swiper) => {
          })
          this.setState({ swiper: mySwiper })
        })
        scroll(0, 2000)
      } else {
        dispatch(alertMsg(res.msg))
        this.setState({ err: res.msg })
      }
    }).catch((err) => {
      dispatch(endLoad())
      dispatch(alertMsg(err))
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  handlePayedDone() {
    this.context.router.push('/pay/risemember/success')
  }

  /** 处理支付失败的状态 */
  handlePayedError(res) {
    if(param.indexOf('跨公众号发起') != -1) {
      // 跨公众号
      this.setState({ showCodeErr: true })
    } else {
      this.setState({ showErr: true })
    }
  }

  /** 处理取消支付的状态 */
  handlePayedCancel(res) {
    this.setState({ showErr: true })
  }

  /**
   * 打开支付窗口
   * @param showId 会员类型id
   */
  handleClickOpenPayInfo(showId) {
    this.reConfig()
    const { memberTypes } = this.state
    const item = _.find(memberTypes, { id: showId })
    const { dispatch } = this.props
    dispatch(startLoad())
    // 先检查是否能够支付
    console.log('showId', showId)
    pget(`/signup/rise/member/check/${showId}`).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        // 查询是否还在报名
        this.refs.payInfo.handleClickOpen()
      } else if(res.code === 214) {
        this.setState({ timeOut: true })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(ex)
    })
  }

  /**
   * 重新注册页面签名
   */
  reConfig() {
    config([ 'chooseWXPay' ])
  }

  /**
   * 滑动到哪个卡片
   * 为了使页面和数据解耦，将会员类型转换成swiper卡片的序号
   * @param showId 会员类型id
   */
  sliderTo(showId) {
    const { swiper } = this.state
    swiper.slideTo(this.memberToSlider(showId))
  }

  /**
   * 点击进入详情页
   */
  goTips(id) {
    ppost('/b/mark', {
      module: 'RISE',
      function: '打点',
      action: '支付页面点击详情',
      memo: id
    })
    this.context.router.push({
      pathname: '/pay/risemember/normalquestion',
      query: {
        memberType: id
      }
    })
  }

  render() {
    const { memberTypes, showId = 3, timeOut, showErr, showCodeErr } = this.state

    const showMember = _.find(memberTypes, { id: showId })

    /**
     * 渲染展示的会员列表
     * @returns {any}
     */
    const renderNewMemberShow = () => {
      return (
        <div id="slider-container" className="swiper-container">
          <div className="swiper-wrapper">
            {memberTypes ? memberTypes.map(item => {
              // 会员信息
              return renderMemberShow(item)
            }) : null}
          </div>
          {/* 分页面信息 */}
          <div className="pagination">
            <div className={`bg-hr member2`}
                 style={{ left: `${55}px`, width: `${(window.innerWidth * 0.74 - 140) + 10}px` }}/>
            <div className={`bg-hr member3`}
                 style={{
                   left: `${window.innerWidth * 0.74 * 0.5 + 10}px`,
                   width: `${(window.innerWidth * 0.74 - 140) / 2 + 10}px`
                 }}/>
            <div className={`page member3`}>
              <div className={`dot ${showId === 3 ? 'show' : ''}`} onClick={() => this.sliderTo(3)}/>
              <div className="str">
                精英版（一年）
              </div>
            </div>
            <div className={`page member1`}>
              <div className={`dot ${showId === 5 ? 'show' : ''}`} onClick={() => this.sliderTo(4)}/>
              <div className="str">
                小课训练营
              </div>
            </div>
          </div>
        </div>
      )
    }

    /**
     * 渲染具体的会员数据
     * 这么写是为了使不同会员卡片能够排列顺序
     * @param showMember 会员信息,showMember的id是memberTypeId
     * @returns {any} 会员的dom结构
     */
    const renderMemberShow = (showMember = {}) => {
      switch(showMember.id) {
        case 5: {
          return (
            <div className="swiper-slide" key={3}>
              <div className="member-show member1">
                <div className="name" style={this.state.fontSize.showMember.name}>
                  小课训练营
                </div>
                <img src="https://static.iqycamp.com/images/rise-member-1-icon.png?imageslim" className="member-icon"/>
                <ul>
                  <li style={this.state.fontSize.showMember.big}>18门精华小课，含6门主题课</li>
                  <li style={this.state.fontSize.showMember.big}>训练营模式，和同学组队学习</li>
                  <li style={this.state.fontSize.showMember.big}>圈外重点班，50+场学习活动</li>
                  <li style={this.state.fontSize.showMember.big}>专属教练点评，免费线下活动</li>
                  <li style={this.state.fontSize.showMember.big}>优秀学员将入选助教&amp;奖学金计划</li>
                </ul>
              </div>
              <div onClick={() => this.goTips(showMember.id)}
                   className={`normal-tips member1 member${showMember.id}`}>
                <span>精英版功能详情</span>
              </div>
            </div>
          )
        }
        case 3: {
          return (
            <div className="swiper-slide" key={2}>
              <div className="member-show member3">
                <div className="name" style={this.state.fontSize.showMember.name}>
                  精英版（一年）
                </div>
                <img src="https://static.iqycamp.com/images/rise-member-3-icon.png?imageslim" className="member-icon"/>
                <ul>
                  <li style={this.state.fontSize.showMember.big}>36门精华小课，含12门主题课</li>
                  <li style={this.state.fontSize.showMember.big}>训练营模式，和同学组队学习</li>
                  <li style={this.state.fontSize.showMember.big}>圈外重点班，100+场学习活动</li>
                  <li style={this.state.fontSize.showMember.big}>专属教练点评，免费线下活动</li>
                  <li style={this.state.fontSize.showMember.big}>优秀学员将入选助教&amp;奖学金计划</li>
                </ul>
              </div>
              <div onClick={() => this.goTips(showMember.id)}
                   className={`normal-tips member${showMember.id}`}>
                <span>精英版功能详情</span>
              </div>
            </div>
          )
        }
        default: {
          return null
        }
      }
    }

    /**
     * 渲染报名按钮
     * @param showMember
     * @returns {any}
     */
    const renderMenu = (showMember = {}) => {
      let name = ''
      switch(showMember.id) {
        case 3:
        case 4:
          name = '精英版'
          break
        case 5:
          name = '小课训练营'
      }
      return (
        <span>报名{name}（¥{showMember.fee ? numeral(showMember.fee).format('0.00') : null}）</span>
      )
    }

    return (
      <div className="rise-pay">
        {renderNewMemberShow(showMember)}
        { showMember ?
          console.log('showMember', getGoodName(showMember.id)) : null
        }
        < div className={`member-menu member${showId}`} onClick={() => this.handleClickOpenPayInfo(showId)}>
          {renderMenu(showMember)}
        </div>
        {timeOut ? <div className="mask" onClick={() => {window.history.back()}}
                        style={{ background: 'url("https://static.iqycamp.com/images/riseMemberTimeOut.png?imageslim") center center/100% 100%' }}>
        </div> : null}
        {showErr ? <div className="mask" onClick={() => this.setState({ showErr: false })}>
          <div className="tips">
            出现问题的童鞋看这里<br/>
            1如果显示“URL未注册”，请重新刷新页面即可<br/>
            2如果遇到“支付问题”，扫码联系小黑，并将出现问题的截图发给小黑<br/>
          </div>
          <img className="xiaoQ" src="https://static.iqycamp.com/images/asst_xiaohei.jpeg?imageslim"/>
        </div> : null}

        {showCodeErr ? <div className="mask" onClick={() => this.setState({ showCodeErr: false })}>
          <div className="tips">
            糟糕，支付不成功<br/>
            原因：微信不支持跨公众号支付<br/>
            怎么解决：<br/>
            1，长按下方二维码，保存到相册；<br/>
            2，打开微信扫一扫，点击右上角相册，选择二维码图片；<br/>
            3，在新开的页面完成支付即可<br/>
          </div>
          <img className="xiaoQ" style={{ width: '50%' }}
               src="https://static.iqycamp.com/images/rise_member_pay_code.jpeg?imageslim"/>
        </div> : null}

        {showMember ? <PayInfo ref="payInfo"
                               dispatch={this.props.dispatch}
                               goodsType={getGoodName(showMember.id)}
                               goodsId={showMember.id}
                               header={showMember.name}
                               payedDone={() => this.handlePayedDone()}
                               payedCancel={(res) => this.handlePayedCancel(res)}
                               apyedError={(res) => this.handlePayedError(res)}
        /> : null}
      </div>
    )
  }
}
