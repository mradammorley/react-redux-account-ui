import { alertConstants } from '../constants/alert.constants';

const initialState = {
	"isActive": false,
	"type": "neutral",
	"message": ""
};

export function alert(state = initialState, action) {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				isActive: true,
				type: "positive",
				message: action.message
			};
		case alertConstants.ERROR:
			return {
				isActive: true,
				type: "negative",
				message: action.message
			};
		case alertConstants.CLEAR:
			return {
				...state,
				...{ isActive: false }
			};
		default:
			return state
	}
}