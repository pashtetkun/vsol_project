import { combineReducers } from 'redux'
import app from './app'
import countries from './countries'
import tools from './Tools'

export default combineReducers({
  app,
  countries,
  tools,
})
