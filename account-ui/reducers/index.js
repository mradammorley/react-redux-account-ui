import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { modal } from './modal.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
	authentication,
	modal,
	alert
});

export default rootReducer;
