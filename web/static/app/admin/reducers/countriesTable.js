import {
	COUNTRIES_GET_REQUEST,
	COUNTRIES_GET_SUCCESS,
	COUNTRIES_GET_FAILURE,
} from '../constants/CountriesTable'

const initialState = {
	countries: [],
};

export default function countriesReducer(state = initialState, action) {

	switch (action.type) {

		case COUNTRIES_GET_REQUEST:
			return Object.assign({}, state, {
				
			})

		case COUNTRIES_GET_SUCCESS:
			return Object.assign({}, state, {
				countries: action.payload,
			})

		case COUNTRIES_GET_FAILURE:
			return Object.assign({}, state, {
				countries: [],
			})

		default:
			return state;
	}

}

