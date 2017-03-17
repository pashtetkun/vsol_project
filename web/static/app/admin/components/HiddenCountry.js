import React from 'react';
import ReactDOM from 'react-dom';
import HiddenCountryTable from './HiddenCountryTable'
import localizations from '../localizations/localizations'
import { connect } from 'react-redux'

class HiddenCountry extends React.Component {

	render() {
		
		var that = this
		var index = this.props.params.index
		var item = this.props.hiddenCountries[index]
		var clubs = item.clubs
		
		return (
				<div>
					<HiddenCountryTable rows={clubs} />
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		hiddenCountries: state.hiddenCountries.hiddenCountries,
	}
}

export default connect(mapStateToProps)(HiddenCountry)