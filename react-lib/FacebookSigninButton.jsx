import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class FacebookSigninButton extends React.Component {

	getFacebookSigninButtonHtml() {
		jQuery.get("signup/SocialLogin/facebook", (data) => {
			jQuery(".FacebookSigninButton").append(data);
		});
	}

	componentDidMount() {
		this.getFacebookSigninButtonHtml();
	}

	render() {
		return (
			<button className={ combineClasses("FacebookSigninButton", this.props.extraClassName) }>
				{ this.props.text }
			</button>
		)
	}

}

FacebookSigninButton.propTypes = {
	text: PropTypes.string,
	extraClassName: PropTypes.string
};

export default FacebookSigninButton
