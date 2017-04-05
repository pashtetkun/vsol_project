import { combineReducers } from 'redux'
import app from './app'
import countries from './countries'
import country from './country'
import club from './club'

export default combineReducers({
  app,
  countries,
  country,
  club,
})
