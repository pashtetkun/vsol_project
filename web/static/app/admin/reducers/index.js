import { combineReducers } from 'redux'
import app from './app'
import hiddenCountries from './hiddenCountries'

export default combineReducers({
  app,
  hiddenCountries,
})
