import { alertConstants } from '../constants/alert.constants';

function success(message) {
	return dispatch => {
		dispatch({ type: alertConstants.SUCCESS, message });
		setTimeout(() => dispatch({ type: alertConstants.CLEAR }), alertConstants.ALERT_TIME);
	}
}

function error(message) {
	return dispatch => {
		dispatch({ type: alertConstants.ERROR, message });
		setTimeout(() => dispatch({ type: alertConstants.CLEAR }), alertConstants.ALERT_TIME);
	}
}

function clear() {
	return { type: alertConstants.CLEAR };
}

export const alertActions = {
	success,
	error,
	clear
};