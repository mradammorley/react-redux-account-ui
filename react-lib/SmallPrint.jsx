import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class TextLink extends React.Component {

	render() {

		return (
			<div className={ combineClasses("SmallPrint", this.props.extraClassName) }>
				{ this.props.text }<br />
			</div>
		)
	}

}


TextLink.propTypes = {
	text: PropTypes.string,
	extraClassName: PropTypes.string
};

export default TextLink
