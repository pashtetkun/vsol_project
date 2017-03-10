import {
	HIDDEN_COUNTRIES_GET_REQUEST,
	HIDDEN_COUNTRIES_GET_SUCCESS,
	HIDDEN_COUNTRIES_GET_FAILURE,
} from '../constants/HiddenCountries'

const initialState = {
	hiddenCountries: [],
};

export default function hiddenCountriesReducer(state = initialState, action) {

	switch (action.type) {

		case HIDDEN_COUNTRIES_GET_REQUEST:
			return Object.assign({}, state, {

			})

		case HIDDEN_COUNTRIES_GET_SUCCESS:
			return Object.assign({}, state, {
				hiddenCountries: action.payload,
			})

		case HIDDEN_COUNTRIES_GET_FAILURE:
			return Object.assign({}, state, {
				hiddenCountries: [],
			})

		default:
			return state;
	}

}

