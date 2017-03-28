import React from 'react';
import ReactDOM from 'react-dom';
import ClubsTable from './ClubsTable'
import localizations from '../localizations/localizations'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import * as countryActions from '../actions/CountryActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Country extends React.Component {

	componentDidMount() {
		var that = this
		var country_id = parseInt(this.props.match.params.index)
		var toggleOn = this.props.toggleOn
		this.props.countryActions.getCountryClubs(country_id, toggleOn)
	}

	initClubs(){
		var that = this
		var country_id = parseInt(this.props.match.params.index)
		this.props.countryActions.initCountryClubs(country_id)
	}

	onToggle(event, checked){
		//this.props.countryActions.setToggle(checked)
		var country_id = parseInt(this.props.match.params.index)
		this.props.countryActions.getCountryClubs(country_id, checked)
	}

	render() {
		
		var that = this
		
		var clubs = this.props.clubs

		var disabledInitBtn = (clubs.length == 0) ? false : true

		var initCountryClubsStatus = this.props.initCountryClubsStatus

		var toggleOn = this.props.toggleOn
		
		return (
				<div>
					<RaisedButton 
						label={'инициализировать клубы'} primary={true} 
						onTouchTap={this.initClubs.bind(that)}
						disabled={disabledInitBtn}
					/>

					<RefreshIndicator
      						size={40}
      						left={10}
      						top={10}
      						status={initCountryClubsStatus}
    				/>
    				<Toggle
      					label="Скрытые"
      					onToggle={this.onToggle.bind(that)}
      					toggled={toggleOn}
    				/>
					<ClubsTable rows={clubs}/>
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		clubs: state.country.clubs,
		initCountryClubsStatus: state.country.initCountryClubsStatus,
		toggleOn: state.country.toggleOn,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		countryActions: bindActionCreators(countryActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Country)