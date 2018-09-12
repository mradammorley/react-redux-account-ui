import React from "react";
import { connect } from "react-redux";
import ModalWrapperInner from "../../react-lib/ModalWrapperInner.jsx";
import Button from "../../react-lib/Button.jsx";
import SmallPrint from "../../react-lib/SmallPrint.jsx";
import PropTypes from "prop-types";

class EmailSent extends React.Component {

	render() {
		return (
			<ModalWrapperInner title="Email Sent" contentClassName="EmailSent" closeHandler={ this.closeHandler } key={ this.props.key } >
				<SmallPrint text="We’ve just sent you the reset email. Please click the link in the email and follow the instructions." />
				<Button isPrimary={ true } text="Close window" handler={ this.handleCloseClick }/>
			</ModalWrapperInner>
		)

	}

}

EmailSent.propTypes = {
	closeHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return { dispatch: state.dispatch };
};

export default connect(mapStateToProps)(EmailSent)
