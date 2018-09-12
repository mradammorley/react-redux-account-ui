import { modalConstants } from '../constants/modal.constants';

function showModal() {
	return { type: modalConstants.CONTROL_MODAL, payload: { isVisible: true }};
}

function hideModal() {
	return { type: modalConstants.CONTROL_MODAL, payload: { isVisible: false, modalStep: modalConstants.STEP_LANDING }};
}

function gotoStep(step) {
	return { type: modalConstants.CONTROL_MODAL, payload: { modalStep: step }};
}

function setBookAViewingMode(isBookAViewing) {
	return { type: modalConstants.CONTROL_MODAL, payload: { isBookAViewing: isBookAViewing }};
}

export const modalActions = {
	showModal,
	hideModal,
	gotoStep,
	setBookAViewingMode
};