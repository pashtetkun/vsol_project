import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import configureStore from './store/configureStore'
import App from './containers/App'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore()

render(
	<div>
		<Provider store={store}>
			<App/>
		</Provider>
	</div>,
	document.getElementById('container')
)
