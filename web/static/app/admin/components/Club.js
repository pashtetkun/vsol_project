import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import * as clubActions from '../actions/ClubActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Club extends React.Component {

	componentDidMount() {
		var that = this
		var club_id = parseInt(this.props.match.params.index)
		this.props.clubActions.getClub(club_id)
	}

	render() {
		
		var that = this
		
		var club = this.props.club

		var title = club ? club.name : ""
		
		return (
				<div>
					{title}
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		club: state.club.club,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		clubActions: bindActionCreators(clubActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Club)