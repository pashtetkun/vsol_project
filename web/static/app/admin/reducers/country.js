import {
	COUNTRY_CLUBS_GET_REQUEST,
	COUNTRY_CLUBS_GET_SUCCESS,
	COUNTRY_CLUBS_GET_FAILURE,
	INIT_COUNTRY_CLUBS_POST_REQUEST,
	INIT_COUNTRY_CLUBS_POST_SUCCESS,
	INIT_COUNTRY_CLUBS_POST_FAILURE
} from '../constants/Country'

const initialState = {
	clubs: [],
	initCountryClubsStatus: 'hide',
};

export default function countryReducer(state = initialState, action) {

	switch (action.type) {

		case COUNTRY_CLUBS_GET_REQUEST:
			return Object.assign({}, state, {
				
			})

		case COUNTRY_CLUBS_GET_SUCCESS:
			return Object.assign({}, state, {
				clubs: action.payload,
			})

		case COUNTRY_CLUBS_GET_FAILURE:
			return Object.assign({}, state, {
				clubs: [],
			})

		case INIT_COUNTRY_CLUBS_POST_REQUEST:
			return Object.assign({}, state, {
				initCountryClubsStatus: 'loading',
			})

		case INIT_COUNTRY_CLUBS_POST_SUCCESS:
			return Object.assign({}, state, {
				clubs: action.payload,
				initCountryClubsStatus: 'hide',
			})

		case INIT_COUNTRY_CLUBS_POST_FAILURE:
			return Object.assign({}, state, {
				clubs: [],
				initCountryClubsStatus: 'hide',
			})

		default:
			return state;
	}

}

