import React from 'react'
import localizations from '../localizations/localizations'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import * as toolsActions from '../actions/ToolsActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Tools extends React.Component {
	
	initializeHandler(e){
		e.preventDefault()
		this.props.toolsActions.initializedData()
	}

	render() {
		
		var that = this
		var initializedData = this.props.initializedData
		var refreshStatus = this.props.refreshStatus
		
		return (
				<div>
					<div style={style.container}>
						<RefreshIndicator
      						size={80}
      						left={screen.availWidth/2}
      						top={80}
      						status={refreshStatus}
      						style={style.refresh}
    					/>
    				</div>
					<RaisedButton label={'Инициализировать БД'} primary={true} onTouchTap={this.initializeHandler.bind(that)}
								  disabled={initializedData}
					/>
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		initializedData: state.tools.initializedData,
		refreshStatus: state.tools.refreshStatus,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toolsActions: bindActionCreators(toolsActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools)