import * as React from "react"
import "./Slick.less"
const Slider = require('react-slick')

export default class Slick extends React.Component {
	render() {
		const settings = {
			dots: false,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 2000,
			speed: 500,
			arrows: false,
		}

		return (
			<div className="am-carousel">
				<Slider {...settings}>
					<div><img className="top-image" src={'/js/image/topimg.jpg'}/></div>
				</Slider>
			</div>
		)
	}
}