import {
	CLUB_GET_REQUEST,
	CLUB_GET_SUCCESS,
	CLUB_GET_FAILURE,
	CLUB_SET_CLUB,
} from '../constants/Club'

const initialState = {
	club: null,
};

export default function clubReducer(state = initialState, action) {

	switch (action.type) {

		case CLUB_GET_REQUEST:
			return Object.assign({}, state, {
				
			})

		case CLUB_GET_SUCCESS:
			return Object.assign({}, state, {
				club: action.payload,
			})

		case CLUB_GET_FAILURE:
			return Object.assign({}, state, {
				club: null,
			})

		case CLUB_SET_CLUB:
			return Object.assign({}, state, {
				club: action.payload,
			})
			
		default:
			return state;
	}

}

