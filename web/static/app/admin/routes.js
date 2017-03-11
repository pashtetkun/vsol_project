import React from 'react'
import App from './containers/App'
import HiddenCountry from './components/HiddenCountry'
import { Route, IndexRoute, Redirect } from 'react-router'

export const routes = (
	<div>
		<Route path='/' component={App}>
			<Route path="/country" component={HiddenCountry} />		
		</Route>
	</div>
)