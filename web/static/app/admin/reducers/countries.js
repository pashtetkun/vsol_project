import {
	COUNTRIES_GET_REQUEST,
	COUNTRIES_GET_SUCCESS,
	COUNTRIES_GET_FAILURE,
	INIT_COUNTRIES_POST_REQUEST,
	INIT_COUNTRIES_POST_SUCCESS,
	INIT_COUNTRIES_POST_FAILURE,
} from '../constants/Countries'

const initialState = {
	countries: [],
	initCountriesStatus: 'hide',
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

		case INIT_COUNTRIES_POST_REQUEST:
			return Object.assign({}, state, {
				initCountriesStatus: 'loading',
			})

		case INIT_COUNTRIES_POST_SUCCESS:
			return Object.assign({}, state, {
				countries: action.payload,
				initCountriesStatus: 'hide',
			})

		case INIT_COUNTRIES_POST_FAILURE:
			return Object.assign({}, state, {
				countries: [],
				initCountriesStatus: 'hide',
			})

		default:
			return state;
	}

}

