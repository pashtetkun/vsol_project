import React from 'react'
import EventEmitter from 'wolfy87-eventemitter'
import localizations from '../localizations/localizations'
//import * as appActions from '../actions/AppActions'
import MainTabPanel from '../components/MainTabPanel'
import Country from '../components/Country'
import Countries from '../components/Countries'
import Tools from '../components/Tools'
import RaisedButton from 'material-ui/RaisedButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import { Switch } from 'react-router'

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
			<HashRouter>
				<div>
					<MuiThemeProvider>
						<div>				
							<MainTabPanel />
							<Switch>
								<Route exact path="/countries" component={Countries} />
								<Route exact path="/countries/:index" component={Country} />
								<Route path="/tools" component={Tools} />
							</Switch>
						</div>
					</MuiThemeProvider>
				</div>
			</HashRouter>
		)
	}
}