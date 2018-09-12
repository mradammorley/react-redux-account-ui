import React from "react";
import { connect } from "react-redux";
import { alertActions } from "../actions/alert.actions";
import Alert from "../../react-lib/Alert.jsx";

class SignupAlert extends React.Component {

	constructor(props) {
		super(props);

		this.onCloseAlert = this.onCloseAlert.bind(this);
	}

	onCloseAlert() {
		this.props.dispatch(alertActions.clear());
	}

	render() {
		return <Alert type={ this.props.alert.type } text={ this.props.alert.message } isActive={ this.props.alert.isActive } handler={ this.onCloseAlert } extraClassName={ this.props.modal.isVisible ? "alert-mobile-only" : "" }/>
	}

}

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
		dispatch: state.dispatch,
		modal: state.modal
	};
};

export default connect(mapStateToProps)(SignupAlert)
