import { combineReducers } from 'redux'
import app from './app'
import hiddenCountries from './hiddenCountries'
import countriesTable from './countriesTable'
import tools from './Tools'

export default combineReducers({
  app,
  hiddenCountries,
  countriesTable,
  tools,
})
