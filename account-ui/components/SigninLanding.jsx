import React from "react";
import { connect } from "react-redux";
import { modalActions } from "../actions/modal.actions";
import { modalConstants } from "../constants/modal.constants";
import ModalWrapperInner from "../../react-lib/ModalWrapperInner.jsx";
import Button from "../../react-lib/Button.jsx";
import TextLink from "../../react-lib/TextLink.jsx";
import SmallPrint from "../../react-lib/SmallPrint.jsx";
import PropTypes from "prop-types";

class SigninLanding extends React.Component {
	constructor(props) {
		super(props);

		this.handleEmailButtonClick = this.handleEmailButtonClick.bind(this);
		this.handleSignupLinkClick = this.handleSignupLinkClick.bind(this);
	}

	handleEmailButtonClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_EMAIL_SIGNIN));
	}

	handleSignupLinkClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_SIGNUP));
	}

	render() {
		return (
			<ModalWrapperInner title="Sign In" contentClassName="SigninLanding" closeHandler={ this.props.closeHandler } key={ this.props.key }>
				<SmallPrint text="with"/>
				<Button isPrimary={ true } text="Email" extraClassName="icon-email" handler={ this.handleEmailButtonClick } />
				<TextLink beforeText={"Don't have an account?"} linkText="Sign up here." handler={ this.handleSignupLinkClick } />
			</ModalWrapperInner>
		)

	}

}

SigninLanding.propTypes = {
	closeHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return { dispatch: state.dispatch };
};

export default connect(mapStateToProps)(SigninLanding)
