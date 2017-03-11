import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import CountriesTable from './CountriesTable'
import RaisedButton from 'material-ui/RaisedButton'
import * as hiddenCountriesActions from '../actions/HiddenCountriesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class HiddenCountries extends React.Component {
	
	showHandler(e){
		e.preventDefault()
		this.props.hiddenCountriesActions.getHiddenCountries()	
	}

	render() {
		
		var that = this
		
		//var rows = this.props.rows
		var rows = this.props.hiddenCountries
		//var rows = !data ? [] : Object.keys(data)
		
		return (
				<div>
					<RaisedButton label={localizations.hiddenCountriesShowBtn} primary={true} onTouchTap={this.showHandler.bind(that)}/>
					<CountriesTable	rows={rows} />		        
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		hiddenCountries: state.hiddenCountries.hiddenCountries,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		hiddenCountriesActions: bindActionCreators(hiddenCountriesActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HiddenCountries)