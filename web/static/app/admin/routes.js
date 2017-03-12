import React from 'react'
import App from './containers/App'
import HiddenCountries from './components/HiddenCountries'
import HiddenCountry from './components/HiddenCountry'
import { Route, IndexRoute, Redirect } from 'react-router'

export const routes = (
	<div>
		<Route path='/' component={App}>
			<IndexRoute component={HiddenCountries} />
			<Route path="/country/:index" component={HiddenCountry} />
		</Route>
	</div>
)