import React from 'react'
import EventEmitter from 'wolfy87-eventemitter'
import localizations from '../localizations/localizations'
//import * as appActions from '../actions/AppActions'
import HiddenCountries from '../components/HiddenCountries'
import RaisedButton from 'material-ui/RaisedButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {

} from '../constants/App'


const style = {
	margin: '20px'
}

window.ee = new EventEmitter()

//localizations.setLanguage('en')

export default class App extends React.Component {

	componentDidMount() {
		var that = this
	}

	render() {
		var that = this

		return (
			<div>
				<MuiThemeProvider>
					<div>
						<HiddenCountries />
					</div>	
				</ MuiThemeProvider>
			</div>
		)
	}
}