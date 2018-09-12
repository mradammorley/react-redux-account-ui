import { userService } from "../services/user.service";
import { userConstants } from "../constants/user.constants";
import { alertConstants } from "../constants/alert.constants";
import { modalActions } from "./modal.actions";
import { alertActions } from "./alert.actions";

function signin(email, password) {

	return dispatch => {
		dispatch(request({ email }));

		userService.signin(email, password)
			.then(
				response => {
					dispatch(success(response.data.user));
					dispatch(modalActions.hideModal());
					dispatch(alertActions.success(`${alertConstants.SIGNUP_200} ${response.data.user.first_name} ${response.data.user.last_name}.`));
				},
				error => {
					let message;
					switch (error) {
						case 400:
							message = alertConstants.SIGNIN_400;
							break;
						case 409:
							message = alertConstants.SIGNIN_409;
							break;
						case 500:
						default:
							message = alertConstants.SIGNIN_500;
					}
					dispatch(failure(message));
					dispatch(alertActions.error(message));
				}
			)
			.then(
				() => { dispatch(refreshUser()) }
			);
	};

	function request(user) { return { type: userConstants.SIGNIN_REQUEST, user } }
	function success(user) { return { type: userConstants.SIGNIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.SIGNIN_FAILURE, error } }

}

function signup(userDetails) {

	return dispatch => {
		dispatch(request(userDetails));

		userService.signup(userDetails)
			.then(
				response => {
					dispatch(success(response.user));
					dispatch(modalActions.hideModal());
					dispatch(alertActions.success(`${alertConstants.SIGNUP_200} ${userDetails.firstName} ${userDetails.firstName}.`));
				},
				error => {
					let message;
					switch (error) {
						case 400:
							message = alertConstants.SIGNUP_400;
							break;
						case 409:
							message = alertConstants.SIGNUP_409;
							break;
						case 500:
						default:
							message = alertConstants.SIGNUP_500;
					}
					dispatch(failure(message));
					dispatch(alertActions.error(message));
				}
			)
			.then(
				() => { dispatch(refreshUser()) }
			);
	};

	function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
	function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
	function failure(error) { return { type: userConstants.SIGNIN_FAILURE, error } }
}

function forgotPassword(email) {
	return dispatch => {
		dispatch(request({ email }));

		userService.forgotPassword(email)
			.then(
				() => {
					dispatch(success(alertConstants.FORGOT_PASSWORD_200));
					dispatch(modalActions.hideModal());
					dispatch(alertActions.success(alertConstants.FORGOT_PASSWORD_200));
				},
				error => {
					let message;
					switch (error) {
						case 400:
							message = alertConstants.FORGOT_PASSWORD_400;
							break;
						case 403:
							message = alertConstants.FORGOT_PASSWORD_403;
							break;
						case 500:
						default:
							message = alertConstants.FORGOT_PASSWORD_500;
					}
					dispatch(failure(message));
					dispatch(alertActions.error(message));
				}
			)
			.then(
				() => { dispatch(refreshUser()) }
			);
	};

	function request(message) { return { type: userConstants.RESET_REQUEST, message } }
	function success(message) { return { type: userConstants.RESET_SUCCESS, message } }
	function failure(error) { return { type: userConstants.RESET_FAILURE, error } }
}

function refreshUser() {

	return dispatch => {

		userService.refreshUser()
			.then(
				response => {
					const jsonData = JSON.parse(response.data);
					dispatch(success(jsonData.authentication));
				},
				error => {
					dispatch(failure(error.toString()));
				}
			);
	};

	function success(data) { return { type: userConstants.REFRESH_SUCCESS, data } }
	function failure(error) { return { type: userConstants.REFRESH_FAILURE, error }}
}

export const userActions = {
	signin,
	signup,
	refreshUser,
	forgotPassword
};