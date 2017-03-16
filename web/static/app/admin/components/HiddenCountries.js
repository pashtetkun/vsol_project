import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import CountriesTable from './CountriesTable'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import * as hiddenCountriesActions from '../actions/HiddenCountriesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    position: 'fixed',
    zIndex: 2000,
    width: 100,
    height: 100,
    background: 'rgba(0,0,0,0.5)',
    display: 'table',
  },
};

class HiddenCountries extends React.Component {
	
	componentDidMount() {
		var that = this
		this.props.hiddenCountriesActions.getHiddenCountries()
	}

	reloadHandler(e){
		e.preventDefault()
		this.props.hiddenCountriesActions.postHiddenCountries()
	}

	render() {
		
		var that = this
		
		//var rows = this.props.rows
		var rows = this.props.hiddenCountries
		//var rows = !data ? [] : Object.keys(data)
		var refreshStatus = this.props.refreshStatus
		
		return (
				<div className="wrapper-hidden-countries">
					<RaisedButton label={localizations.hiddenCountriesReloadBtn} primary={true} onTouchTap={this.reloadHandler.bind(that)}/>
					<RefreshIndicator
      					size={40}
      					left={10}
      					top={0}
      					status={refreshStatus}
      					style={style.refresh}
    				/>
					<CountriesTable	rows={rows} />		        
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		hiddenCountries: state.hiddenCountries.hiddenCountries,
		refreshStatus: state.hiddenCountries.refreshStatus,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		hiddenCountriesActions: bindActionCreators(hiddenCountriesActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HiddenCountries)