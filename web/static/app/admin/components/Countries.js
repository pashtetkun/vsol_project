import React from 'react'
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Link } from 'react-router-dom'
import * as countriesActions from '../actions/CountriesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


/*const style = {
  backgroundPosition: -0 -15,
};*/

class Countries extends React.Component {
	
	componentDidMount() {
		var that = this
		//console.log('countries table did mount')
		//if (!this.props.countries.length == 0)
			this.props.countriesActions.getCountries()
	}

	initCountries(){
		var that = this
		this.props.countriesActions.initCountries()
	}

	getStyle(th, country){
		var pos = country.colors_position
		var st = Object.assign({}, {
				backgroundPosition: pos.replace('',''),
			})
		return st
	}

	render() {
		
		var that = this
		
		var rows = this.props.countries

		var disabledInitBtn = (rows.length == 0) ? false : true

		var initCountriesStatus = this.props.initCountriesStatus
		
		return (
				<div>
					<RaisedButton 
						label={'инициализировать страны'} primary={true} 
						onTouchTap={this.initCountries.bind(that)}
						disabled={disabledInitBtn}
					/>

					<RefreshIndicator
      						size={40}
      						left={10}
      						top={10}
      						status={initCountriesStatus}
    				/>

					<Table className="wrapper-countries-table" height='400px'>
					
						<TableHeader className="wrapper-countries-table-header"
							displaySelectAll={false}
			            	adjustForCheckbox={false}
						>
							<TableRow className="wrapper-countries-table-header-row">							
								<TableHeaderColumn className={"wrapper-countries-table-header-colors"} />
								<TableHeaderColumn className={"wrapper-countries-table-header-country"}>
									{localizations.countriesTableHeaderCountry}
								</TableHeaderColumn>
								<TableHeaderColumn className={"wrapper-countries-table-header-count"}>
									{localizations.countriesTableHeaderCount}
								</TableHeaderColumn>				
						    </TableRow>
						</TableHeader>
						
						<TableBody className="wrapper-countries-table-body"
							displayRowCheckbox={false}
						>
						
						
							{rows.map((row, index) => (
								<TableRow className="wrapper-countries-table-row"
									key={index}
								>
									<TableRowColumn 
										className="wrapper-countries-table-column-colors" 
										style={{backgroundPositionX: row.colors_position.split(" ")[0],
												backgroundPositionY: row.colors_position.split(" ")[1]}}>
									</TableRowColumn>
																		
									<TableRowColumn className="wrapper-countries-table-column-country">
										<Link to={("/countries/"+row.vsol_id)}>{row.name}</Link>
									</TableRowColumn>

									<TableRowColumn className="wrapper-countries-table-column-count">
										{'n/a'}
									</TableRowColumn>
								</TableRow>
			 				))}
							
							
			        	</TableBody>
			        	
			        </Table>
			        
			    </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		countries: state.countries.countries,
		initCountriesStatus: state.countries.initCountriesStatus,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		countriesActions: bindActionCreators(countriesActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)