"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./FormLine.less");
var FormLine = (function (_super) {
    __extends(FormLine, _super);
    function FormLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormLine.prototype.render = function () {
        var _a = this.props, required = _a.required, label = _a.label;
        return (<div className="form-line">
				<label>{required ? '*' : ''} {label}:</label>
				<span className="form-control">
					{this.props.children}
				</span>
			</div>);
    };
    return FormLine;
}(React.Component));
exports.default = FormLine;
