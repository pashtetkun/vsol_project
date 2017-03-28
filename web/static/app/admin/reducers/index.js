import { combineReducers } from 'redux'
import app from './app'
import countries from './countries'
import country from './country'

export default combineReducers({
  app,
  countries,
  country,
})
