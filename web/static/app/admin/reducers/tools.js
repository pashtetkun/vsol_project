import {
	INITIALIZE_DATA_GET_REQUEST,
	INITIALIZE_DATA_GET_SUCCESS,
	INITIALIZE_DATA_GET_FAILURE,
} from '../constants/Tools'

const initialState = {
	initializedData: false,
	refreshStatus: 'hide',
};

export default function toolsReducer(state = initialState, action) {

	switch (action.type) {

		case INITIALIZE_DATA_GET_REQUEST:
			return Object.assign({}, state, {
				refreshStatus: 'loading',
			})

		case INITIALIZE_DATA_GET_SUCCESS:
			return Object.assign({}, state, {
				refreshStatus: 'hide',
				initializedData: true,
			})

		case INITIALIZE_DATA_GET_FAILURE:
			return Object.assign({}, state, {
				refreshStatus: 'hide',
			})

		default:
			return state;
	}

}

