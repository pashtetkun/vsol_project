import React from 'react'
import EventEmitter from 'wolfy87-eventemitter'
import localizations from '../localizations/localizations'
//import * as appActions from '../actions/AppActions'
import Country from '../components/Country'
import Countries from '../components/Countries'
import Club from '../components/Club'
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
							<Switch>
								<Route exact path="/" component={Countries} />
								<Route exact path="/countries" component={Countries} />
								<Route exact path="/countries/:index" component={Country} />
								<Route exact path="/club/:index" component={Club} />
							</Switch>
						</div>
					</MuiThemeProvider>
				</div>
			</HashRouter>
		)
	}
}