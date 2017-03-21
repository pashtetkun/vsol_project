import React from 'react'
import App from './containers/App'
import Country from './components/Country'
import Countries from './components/Countries'
import Tools from './components/Tools'
import { Route, IndexRoute, Redirect } from 'react-router'

export const routes = (
	<div>
		<Route path='/' component={App}>
			<Route path="countries" component={Countries} />
			<Route path="countries/:index" component={Country} />
			<Route path="tools" component={Tools} />
		</Route>
	</div>
)