import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./helpers/store";
import CustomerAccount from "./components/CustomerAccount.jsx";
import Modal from "./components/Modal.jsx";
import SignupAlert from "./components/SignupAlert.jsx";

ReactDOM.render(
	<Provider store={ store }>
		<CustomerAccount className="CustomerAccount" isSimpleVersion={ false } />
	</Provider>,
	document.getElementById('js-account')
);

ReactDOM.render(
	<Provider store={ store }>
		<Modal ref={(signupModal) => {window.signupModal = signupModal}} />
	</Provider>,
    document.getElementById('js-modal')
);

ReactDOM.render(
	<Provider store={ store }>
		<SignupAlert />
	</Provider>,
    document.getElementById('js-alert')
);

export default store;

