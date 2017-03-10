import {
	APP_SET_USERINFO_INTERVIEWED
} from '../constants/App'

const initialState = {
	isReady: false,
};

export default function appReducer(state = initialState, action) {

	switch (action.type) {

		case APP_SET_USERINFO_INTERVIEWED:
			return Object.assign({}, state, {
							userInfo: action.payload
			})

		default:
			return state;
	}

}

