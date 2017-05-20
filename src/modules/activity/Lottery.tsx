import * as React from "react"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
import "./components/lucky-card.less"

@connect(state => state)
export default class Lottery extends React.Component<any, any> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.state = {}
    }

    componentDidMount(){
        const luckyCard = require("./components/lucky-card.js")
        this.setState({luckyCard})
        luckyCard.case({coverColor:'#CCCCCC',ratio:.6,callback:function() {
            this.clearCover();
        }});
    }

    render() {
        return (
            <div id="scratch">
                <div id="card">￥500</div>
            </div>
        )
    }
}
