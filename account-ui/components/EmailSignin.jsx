import React from "react";
import isEmpty from "lodash/isempty";
import { userActions } from "../actions/user.actions";
import { connect } from "react-redux";
import { modalConstants } from "../constants/modal.constants";
import { modalActions } from "../actions/modal.actions";
import { isEmailValid } from "../../react-lib/Utils";
import ModalWrapperInner from "../../react-lib/ModalWrapperInner.jsx";
import Input from "../../react-lib/Input.jsx";
import Button from "../../react-lib/Button.jsx";
import TextLink from "../../react-lib/TextLink.jsx";
import ErrorText from "../../react-lib/ErrorText.jsx";
import PropTypes from "prop-types";

class EmailSignin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			isSubmitted: false,
			isHighlightEmpty: false,
			isEmailValid: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSignupLinkClick = this.handleSignupLinkClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.highlightEmptyFields = this.highlightEmptyFields.bind(this);
		this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
	}

	isFormComplete () {
		return (
			this.state.email &&
			this.state.password
		)
	}

	handleChange(name, value) {
		this.setState({ [name]: value });
		if (name === "email") { this.setState({ isEmailValid: isEmailValid(value) })};
		this.setState({ isFormComplete: !!this.isFormComplete() });
	}

	handleSignupLinkClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_SIGNUP));
	}

	handleForgotPasswordClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_FORGOT_PASSWORD));
	}

	highlightEmptyFields () {
		this.setState({ isHighlightEmpty: true });
	}

	highlightEmailInvalid () {
		this.setState({ isHighlightEmailInvalid: true })
	}

	handleSubmit(e) {
		e.preventDefault();

		if (!this.isFormComplete()) {
			this.highlightEmptyFields();
			return false
		}

		if(!isEmailValid(this.state.email)) {
			this.highlightEmailInvalid();
			return false
		}

		const { dispatch } = this.props;
		dispatch(userActions.signin(this.state.email, this.state.password));
	}

	render() {
		const { email, password } = this.state;
		return (
			<ModalWrapperInner title="Sign In" contentClassName="EmailSignin" closeHandler={ this.props.closeHandler } key={ this.props.key }>
				<form name="emailSigninForm" onSubmit={this.handleSubmit} noValidate={ true }>
					<Input
						type="email"
						placeholder="Email"
						name="email"
						value={ email }
						onChange={ this.handleChange }
						highlighted={
							(isEmpty(email) && this.state.isHighlightEmpty) ||
							(!this.state.isEmailValid && this.state.isHighlightEmailInvalid)
						}
					/>
					<Input
						type="password"
						placeholder="Password"
						name="password"
						value={ password }
						onChange={ this.handleChange }
						highlighted={ (isEmpty(password) && this.state.isHighlightEmpty) }
					/>
					<Button isPrimary={ true } text="Sign In" isSubmit={ true }/>
					<div className="signup-error-text">
						<ErrorText
							text={ this.props.alert.message }
							isActive={ this.props.alert.isActive}
							extraClassName="alert-desktop-only"
						/>
						<ErrorText
							text="Please enter a valid email address."
							isActive={ !this.state.isEmailValid && this.state.isHighlightEmailInvalid }
						/>
						<ErrorText
							text="Required fields cannot be left empty."
							isActive={
								(
									!this.state.email ||
									!this.state.password
								)
								&& this.state.isHighlightEmpty
							}
						/>
					</div>
					<TextLink linkText="Forgot your password" handler={ this.handleForgotPasswordClick }/>
					<TextLink beforeText={"Don't have an account?"} linkText="Sign up here." handler={ this.handleSignupLinkClick }/>
				</form>
			</ModalWrapperInner>
		)

	}

}

EmailSignin.propTypes = {
	closeHandler: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
	return {
		alert: state.alert,
		dispatch: state.dispatch
	};
};

export default connect(mapStateToProps)(EmailSignin)
