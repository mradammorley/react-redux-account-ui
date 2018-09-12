import React from 'react';
import PropTypes from 'prop-types';
import { combineClasses } from "./Utils.js";

class ErrorText extends React.Component {

	render() {

		let active = this.props.isActive ? "active" : "inactive";

		return (
			<div className={ combineClasses("ErrorText", active, this.props.extraClassName) }>
				{ this.props.text }<br />
			</div>
		)
	}

}

ErrorText.defaultProps = {
	isActive: false
};

ErrorText.propTypes = {
	text: PropTypes.string,
	isActive: PropTypes.bool,
	extraClassName: PropTypes.string
};

export default ErrorText
