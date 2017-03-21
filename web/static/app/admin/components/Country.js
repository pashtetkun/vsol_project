import React from 'react';
import ReactDOM from 'react-dom';
import CountryTable from './CountryTable'
import localizations from '../localizations/localizations'
import { connect } from 'react-redux'

class Country extends React.Component {

	render() {
		
		var that = this
		var index = this.props.params.index
		var clubs = []
		
		return (
				<div>
					<CountryTable rows={clubs} />
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		countries: state.countries.countries,
	}
}

export default connect(mapStateToProps)(Country)