import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class Button extends React.Component {

	constructor (props) {
		super(props);

		this.onButtonClick = this.onButtonClick.bind(this);
	}

	onButtonClick(event) {
		event.preventDefault();
		this.props.handler();
	}

	render() {

		let buttonStatus = this.props.isPrimary ? "primary" : "secondary";
		let extraClassName;
		this.props.extraClassName ? extraClassName =  " " + this.props.extraClassName : extraClassName = "";

		return (
			<button className={ combineClasses("Button", buttonStatus, extraClassName)} type={ this.props.isSubmit ? "submit" : "button" } onClick={ this.props.isSubmit ? null : this.onButtonClick }>
				{ this.props.text }
			</button>
		)
	}

}

Button.defaultProps = {
	isPrimary: false,
	isSubmit: false
};

Button.propTypes = {
	isPrimary: PropTypes.bool,
	text: PropTypes.string,
	isSubmit: PropTypes.bool,
	extraClassName: PropTypes.string,
	handler: PropTypes.func
};

export default Button
