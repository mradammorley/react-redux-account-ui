import React from "react";
import isEmpty from "lodash/isempty";
import { userActions } from "../actions/user.actions";
import { connect } from "react-redux";
import { modalConstants } from "../constants/modal.constants";
import { modalActions } from "../actions/modal.actions";
import { isEmailValid } from "../../react-lib/Utils";
import ModalWrapperInner from "../../react-lib/ModalWrapperInner.jsx";
import Input from "../../react-lib/Input.jsx";
import Checkbox from "../../react-lib/Checkbox.jsx";
import Button from "../../react-lib/Button.jsx";
import TextLink from "../../react-lib/TextLink.jsx";
import SmallPrint from "../../react-lib/SmallPrint.jsx";
import ErrorText from "../../react-lib/ErrorText.jsx";
import FacebookSigninButton from "../../react-lib/FacebookSigninButton.jsx";
import GoogleSigninButton from "../../react-lib/GoogleSigninButton.jsx";
import PropTypes from "prop-types";

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			telephone: "",
			receiveEmails: false,
			password: "",
			confirmPassword: "",
			privacyAccepted: false,
			isEmailValid: false,
			isHighlightEmpty: false,
			isHighlightPasswordMismatch: false,
			isHighlightEmailInvalid: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSigninLinkClick = this.handleSigninLinkClick.bind(this);
	}

	handleChange(name, value) {
		this.setState({ [name]: value });
		if (name === "email") { this.setState({ isEmailValid: isEmailValid(value) })};
		this.setState({ isFormComplete: !!this.isFormComplete() });
	}

	handleSigninLinkClick () {
		this.props.dispatch(modalActions.gotoStep(modalConstants.STEP_LANDING))
	}

	highlightEmptyFields () {
		this.setState({ isHighlightEmpty: true })
	}

	highlightPasswordMismatch () {
		this.setState({ isHighlightPasswordMismatch: true })
	}

	highlightEmailInvalid () {
		this.setState({ isHighlightEmailInvalid: true })
	}

	isPasswordsMatch () {
		return (this.state.password === this.state.confirmPassword && this.state.password)
	}

	isFormComplete () {
		return (
			this.state.firstName &&
			this.state.lastName &&
			this.state.email &&
			this.state.password &&
			this.state.confirmPassword &&
			this.state.privacyAccepted
		)
	}

	handleSubmit(e) {
		e.preventDefault();

		if (!this.isFormComplete()) {
			this.highlightEmptyFields();
			return false
		}

		if(!this.isPasswordsMatch()) {
			this.highlightPasswordMismatch();
			return false
		}

		if(!isEmailValid(this.state.email)) {
			this.highlightEmailInvalid();
			return false
		}

		const { dispatch } = this.props;
		dispatch(userActions.signup(
			{
				"firstname": this.state.firstName,
				"lastname": this.state.lastName,
				"email": this.state.email,
				"telephone": this.state.telephone,
				"receiveEmails": this.state.receiveEmails,
				"password": this.state.password,
				"confirmation": this.state.confirmPassword
			}
		));
	}

	render() {
		return (
			<ModalWrapperInner title="Sign Up" contentClassName="Signup" closeHandler={ this.props.closeHandler }>
				<form name="signupForm" onSubmit={this.handleSubmit} noValidate={ true }>
					<Input
						placeholder="First Name"
						name="firstName"
						value={ this.state.firstName }
						onChange={ this.handleChange }
						highlighted={ (isEmpty(this.state.firstName) && this.state.isHighlightEmpty) }
						extraClassName="signup-first-name"
					/>
					<Input
						placeholder="Last Name"
						name="lastName"
						value={ this.state.lastName }
						onChange={ this.handleChange }
						highlighted={ (isEmpty(this.state.lastName) && this.state.isHighlightEmpty) }
						extraClassName="signup-last-name"
					/>
					<Input
						type="email"
						placeholder="Email"
						name="email"
						value={ this.state.email }
						onChange={ this.handleChange }
						highlighted={
							(isEmpty(this.state.email) && this.state.isHighlightEmpty) ||
							(!this.state.isEmailValid && this.state.isHighlightEmailInvalid)
						}
						extraClassName="signup-email"
					/>
					<Input
						type="text"
						placeholder="Telephone"
						name="telephone"
						value={ this.state.telephone }
						onChange={ this.handleChange }
						extraClassName="signup-telephone"
					/>
					<Checkbox
						name="receiveEmails"
						value={ this.state.receiveEmails }
						onToggle={ this.handleChange }
						label="I'd like to receive emails"
						extraClassName="signup-receive"
					/>
					<Input
						type="password"
						placeholder="Password"
						name="password"
						value={ this.state.password }
						onChange={ this.handleChange }
						highlighted={
							(isEmpty(this.state.password) && this.state.isHighlightEmpty) ||
							(this.state.password !== this.state.confirmPassword && this.state.isHighlightPasswordMismatch)
						}
						extraClassName="signup-password"
					/>
					<Input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={ this.state.confirmPassword }
						onChange={ this.handleChange }
						highlighted={
							(isEmpty(this.state.confirmPassword) && this.state.isHighlightEmpty) ||
							(this.state.password !== this.state.confirmPassword && this.state.isHighlightPasswordMismatch)
						}
						extraClassName="signup-confirm"
					/>
					<Checkbox
						name="privacyAccepted"
						value={ this.state.privacyAccepted }
						onToggle={ this.handleChange }
						label="I accept the Privacy Policy"
						highlighted={ (!this.state.privacyAccepted && this.state.isHighlightEmpty) }
						extraClassName="signup-privacy"
					/>
					<Button
						isPrimary={ true }
						text="Submit"
						isSubmit={ true }
						extraClassName="signup-submit"
					/>
					<div className="signup-error-text">
						<ErrorText
							text={ this.props.alert.message }
							isActive={ this.props.alert.isActive}
							extraClassName="alert-desktop-only"
						/>
						<ErrorText
							text="Your password and confirmation do not match"
							isActive={ this.state.password !== this.state.confirmPassword && this.state.isHighlightPasswordMismatch }
						/>
						<ErrorText
							text="Please enter a valid email address."
							isActive={ !this.state.isEmailValid && this.state.isHighlightEmailInvalid }
						/>
						<ErrorText
							text="Required fields cannot be left empty."
							isActive={
								(
									!this.state.firstName ||
									!this.state.lastName ||
									!this.state.email ||
									!this.state.password ||
									!this.state.confirmPassword ||
									!this.state.privacyAccepted
								)
								&& this.state.isHighlightEmpty
							}
						/>
					</div>
					<TextLink
						beforeText={"Already have an account?"}
						linkText="Log in"
						handler={ this.handleSigninLinkClick }
						extraClassName="signup-bottom-text"
					/>
				</form>
			</ModalWrapperInner>

		)
	}
}

Signup.propTypes = {
	closeHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
		dispatch: state.dispatch
	};
};

export default connect(mapStateToProps)(Signup)
