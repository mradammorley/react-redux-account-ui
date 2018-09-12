import { modalConstants } from '../constants/modal.constants';

const initialState = {
	isVisible: false,
	isBookAViewing: false,
	modalStep: modalConstants.STEP_LANDING
};

export function modal(state = initialState, action) {
	switch (action.type) {
		case modalConstants.CONTROL_MODAL:
			return {
				...state,
				...action.payload
			};
		default:
			return state
	}
}