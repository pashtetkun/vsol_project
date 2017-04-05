import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from './app'
import countries from './countries'
import country from './country'
import club from './club'

export default combineReducers({
  app,
  countries,
  country,
  club,
  form: formReducer,
})
