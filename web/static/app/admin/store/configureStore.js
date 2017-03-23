import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default function configureStore(initialState){
	const logger = createLogger()
	const store = compose(
		applyMiddleware(thunk, logger)
	)(createStore)(rootReducer, initialState)
	
	return store
}