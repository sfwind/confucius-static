import * as React from "react"
import { Link } from "react-router"
import "./Frame.less"
import Icon from "./Icon"
import Slick from "./Slick"

export default class Frame extends React.Component <any, any> {
	constructor() {
		super()
	}

	render() {
		const { location, top } = this.props
		const { pathname, query } = location

		return (
			<div>
				<div>
					<Slick />
				</div>
				<div>
					{this.props.children}
				</div>
				<div className="footer">
					<div className="footer-tab">
						<Link className={`footer-tab-item ${ pathname === '/main' ? 'active' : ''}`}
									to={{pathname: "/main", query: query}}>
							<Icon size={26} type="menu_home"/>
							<div>首页</div>
						</Link>
						<Link className={`footer-tab-item ${ pathname.indexOf('/point-exchange') > -1 ? 'active' : ''}`}
									to={{pathname: "/point-exchange/cart", query: query}}>
							<Icon size={26} type="menu_integral"/>
							<div>积分兑换</div>
						</Link>
						<Link className={`footer-tab-item ${ pathname.indexOf('/personal-info') > -1 ? 'active' : ''}`}
									to={{pathname: "/personal-info/view", query: query}}>
							<Icon size={26} type="menu_usr"/>
							<div>个人资料</div>
						</Link>
						<a className={`footer-tab-item ${ pathname === '/shop-main' ? 'active' : ''}`}
							 onClick={() => window.location.href = 'https://makeupforever.m.tmall.com/'}>
							<Icon size={26} type="menu_shop"/>
							<div>店铺首页</div>
						</a>
					</div>
				</div>
			</div>
		)
	}


}