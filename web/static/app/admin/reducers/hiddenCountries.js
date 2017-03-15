import {
	HIDDEN_COUNTRIES_GET_REQUEST,
	HIDDEN_COUNTRIES_GET_SUCCESS,
	HIDDEN_COUNTRIES_GET_FAILURE,
	HIDDEN_COUNTRIES_POST_REQUEST,
	HIDDEN_COUNTRIES_POST_SUCCESS,
	HIDDEN_COUNTRIES_POST_FAILURE,
} from '../constants/HiddenCountries'

const initialState = {
	hiddenCountries: [],
	refreshStatus: 'hide',
};

export default function hiddenCountriesReducer(state = initialState, action) {

	switch (action.type) {

		case HIDDEN_COUNTRIES_GET_REQUEST:
			return Object.assign({}, state, {
				refreshStatus: 'loading',
			})

		case HIDDEN_COUNTRIES_GET_SUCCESS:
			return Object.assign({}, state, {
				hiddenCountries: action.payload,
				refreshStatus: 'hide',
			})

		case HIDDEN_COUNTRIES_GET_FAILURE:
			return Object.assign({}, state, {
				hiddenCountries: [],
				refreshStatus: 'hide',
			})

		case HIDDEN_COUNTRIES_POST_REQUEST:
			return Object.assign({}, state, {
				refreshStatus: 'loading',
			})

		case HIDDEN_COUNTRIES_POST_SUCCESS:
			return Object.assign({}, state, {
				refreshStatus: 'hide',
			})

		case HIDDEN_COUNTRIES_POST_FAILURE:
			return Object.assign({}, state, {
				refreshStatus: 'hide',
			})

		default:
			return state;
	}

}

