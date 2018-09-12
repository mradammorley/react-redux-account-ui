import React from "react";
import { modalConstants } from "../constants/modal.constants";
import { connect } from "react-redux";
import ModalWrapper from "../../react-lib/ModalWrapper.jsx";
import EmailSignin from "./EmailSignin.jsx";
import SigninLanding from "./SigninLanding.jsx";
import Signup from "./Signup.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import EmailSent from "./EmailSent.jsx";
import { modalActions } from "../actions/modal.actions";


class Modal extends React.Component {

	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.props.dispatch(modalActions.hideModal());
	}

	render() {
		let content;

		if (this.props.modal.isVisible && !this.props.authentication.isSignedIn) {
			switch(this.props.modal.modalStep) {
				case modalConstants.STEP_LANDING:
					content = <SigninLanding key="SigninLanding" closeHandler={ this.handleClose } />;
					break;
				case modalConstants.STEP_EMAIL_SIGNIN:
					content = <EmailSignin key="EmailSignin" closeHandler={ this.handleClose } />;
					break;
				case modalConstants.STEP_SIGNUP:
					content = <Signup key="Signup" closeHandler={ this.handleClose } />;
					break;
				case modalConstants.STEP_FORGOT_PASSWORD:
					content = <ForgotPassword key="ForgotPassword" closeHandler={ this.handleClose } />;
					break;
				case modalConstants.STEP_EMAIL_SENT:
					content = <EmailSent key="EmailSent" closeHandler={ this.handleClose } />;
					break;
				default:
					content = null;
			}

			return (
				<div className="Modal">
					<ModalWrapper title="Sign Up" contentClassName="Signup" closeHandler={ this.handleClose } >
						{ content }
					</ModalWrapper>
				</div>
			);
		}
		 return null;
	}

}

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
		authentication: state.authentication,
		dispatch: state.dispatch
	};
};

export default connect(mapStateToProps)(Modal)
