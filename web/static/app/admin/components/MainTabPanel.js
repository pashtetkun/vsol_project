import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs, Tab} from 'material-ui/Tabs'
import localizations from '../localizations/localizations'

export default class MainTabPanel extends React.Component {
	
	tabActiveHandler(tab) {
		var path = tab.props["data-route"]
		var currentPath = this.context.router.location.pathname
		if (currentPath != path)
			this.context.router.push(path)
	}
	
	render() {
		
		var that = this
		
		return (
				<div>
					<div>
						<Tabs initialSelectedIndex={-1}>
						    <Tab
						      	label={'Клубы'}
							    onActive={this.tabActiveHandler.bind(that)}
						    	data-route="/clubs"
						    />
						    <Tab
								label={'Инструменты'}
							    onActive={this.tabActiveHandler.bind(that)}
						    	data-route="/tools"
							/>
						</Tabs>
				    </div>
			    </div>
		)
	}
}

MainTabPanel.contextTypes = {
  router: React.PropTypes.object.isRequired
}