import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class Alert extends React.Component {

	constructor (props) {
		super(props);

		this.onAlertClick = this.onAlertClick.bind(this);
	}

	onAlertClick(event) {
		event.preventDefault();
		this.props.handler();
	}

	render() {
		let active = this.props.isActive ? "active" : "inactive";

		return (
			<div className={ combineClasses("Alert", this.props.type, active, this.props.extraClassName) } onClick={ this.onAlertClick }>
				{ this.props.text }
			</div>
		)
	}

}

Alert.defaultProps = {
	type: "alert-neutral",
	isActive: false
};

Alert.propTypes = {
	isActive: PropTypes.bool,
	type: PropTypes.string,
	text: PropTypes.string,
	handler: PropTypes.func,
	extraClassName: PropTypes.string
};

export default Alert
