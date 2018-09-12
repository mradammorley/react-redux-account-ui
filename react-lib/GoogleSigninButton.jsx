import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class GoogleSigninButton extends React.Component {

	getGoogleSigninButtonHtml() {
		jQuery.get("signup/SocialLogin/google", (data) => {
			jQuery(".GoogleSigninButton").append(data);
		});
	}

	componentDidMount() {
		this.getGoogleSigninButtonHtml();
	}

	render() {
		return (
			<button className={ combineClasses("GoogleSigninButton", this.props.extraClassName) }>
				{ this.props.text }
			</button>
		)
	}

}

GoogleSigninButton.propTypes = {
	text: PropTypes.string,
	extraClassName: PropTypes.string
};

export default GoogleSigninButton
