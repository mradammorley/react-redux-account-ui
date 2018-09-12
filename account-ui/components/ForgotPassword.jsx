import React from 'react'
import ModalWrapperInner from "../../react-lib/ModalWrapperInner.jsx";
import Input from '../../react-lib/Input.jsx'
import Button from '../../react-lib/Button.jsx'
import TextLink from '../../react-lib/TextLink.jsx'
import { userActions } from '../actions/user.actions'
import { connect } from 'react-redux'
import { modalConstants } from "../constants/modal.constants";
import { modalActions } from "../actions/modal.actions";
import { isEmailValid } from "../../react-lib/Utils";
import PropTypes from "prop-types";
import ErrorText from "../../react-lib/ErrorText.jsx";

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			isHighlightEmpty: false,
			isEmailValid: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSignupLinkClick = this.handleSignupLinkClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
	}

	handleChange(name, value) {
		this.setState({ [name]: value });
		if (name === "email") { this.setState({ isEmailValid: isEmailValid(value) })};
	}

	handleSignupLinkClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_SIGNUP));
	}


	highlightEmailInvalid () {
		this.setState({ isHighlightEmailInvalid: true })
	}


	handleSubmit(e) {
		e.preventDefault();

		if(!isEmailValid(this.state.email)) {
			this.highlightEmailInvalid();
			return false
		}

		const { dispatch } = this.props;
		if (this.state.email) {
			dispatch(userActions.sendPasswordReset(this.state.email));
		}
	}

	handleCloseClick() {
		this.props.dispatch(modalActions.hideModal());
	}

	render() {
		const { email } = this.state;
		return (
			<ModalWrapperInner title="Forgot Password" contentClassName="ForgotPassword" closeHandler={ this.props.closeHandler }>
				<form name="forgotPasswordForm" onSubmit={this.handleSubmit} key={ this.props.key } noValidate={ true }>
					<Input
						type="email"
						placeholder="Email"
						name="email"
						value={ email }
						onChange={ this.handleChange }
						highlighted={
							(!this.state.isEmailValid && this.state.isHighlightEmailInvalid)
						}
					/>
					<Button isPrimary={ true } text="Reset" isSubmit={ true }/>
					<div className="signup-error-text">
						<ErrorText
							text="Please enter a valid email address."
							isActive={ !this.state.isEmailValid && this.state.isHighlightEmailInvalid }
						/>
					</div>
					<TextLink beforeText={"Don't have an account?"} linkText="Sign up here." handler={ this.handleSignupLinkClick }/>
				</form>
			</ModalWrapperInner>
		)

	}

}

ForgotPassword.propTypes = {
	closeHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return { dispatch: state.dispatch };
};

export default connect(mapStateToProps)(ForgotPassword)
