import React from 'react'
import App from './containers/App'
import HiddenCountries from './components/HiddenCountries'
import HiddenCountry from './components/HiddenCountry'
import CountriesTable from './components/CountriesTable'
import Tools from './components/Tools'
import { Route, IndexRoute, Redirect } from 'react-router'

export const routes = (
	<div>
		<Route path='/' component={App}>
			<Route path="countries" component={CountriesTable} />
			<Route path="countries/:index" component={HiddenCountry} />
			<Route path="tools" component={Tools} />
		</Route>
	</div>
)