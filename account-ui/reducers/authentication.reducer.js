import { userConstants } from '../constants/user.constants';

const initialState = {
	"isSignedIn": false,
	"user": {
		"firstname": "",
		"lastname": ""
	}
};

export function authentication(state = initialState, action) {
	switch (action.type) {
		case userConstants.SIGNIN_REQUEST:
			return {
				signingIn: true,
				user: action.user
			};
		case userConstants.SIGNIN_SUCCESS:
			return {
				isSignedIn: true,
				user: action.user
			};
		case userConstants.SIGNIN_FAILURE:
			return {};
		case userConstants.SIGNOUT:
			return {};
		case userConstants.REFRESH_SUCCESS:
			return action.data;
		case userConstants.SIGNUP_REQUEST:
			return {
				signingUp: true
			};
		case userConstants.SIGNUP_SUCCESS:
			return {
				isSignedIn: true,
				user: action.user
			};
		case userConstants.SIGNUP_FAILURE:
			return {};
		default:
			return state
	}
}