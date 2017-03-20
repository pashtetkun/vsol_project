import React from 'react'
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { Link } from 'react-router'
import * as countriesTableActions from '../actions/CountriesTableActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class CountriesTable extends React.Component {
	
	componentDidMount() {
		var that = this
		//console.log('countries table did mount')
		//if (!this.props.countries.length == 0)
			this.props.countriesTableActions.getCountries()
	}

	render() {
		
		var that = this
		
		var rows = this.props.countries
		if (!rows)
			rows = [{
						'country': 'Австралия',
					 	'clubs': ['Z', 'V'],
					 	'vsol_id': 1,
					}]
		
		return (
				<div>
					<Table className="wrapper-countries-table" height='400px'>
					
						<TableHeader className="wrapper-countries-table-header"
							displaySelectAll={false}
			            	adjustForCheckbox={false}
						>
							<TableRow className="wrapper-countries-table-header-row">							
								<TableHeaderColumn className={"wrapper-countries-table-header-index"}>
									{localizations.countriesTableHeaderIndex}
								</TableHeaderColumn>
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
									<TableRowColumn className="wrapper-countries-table-column-index">
										{index + 1}
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
		countries: state.countriesTable.countries,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		countriesTableActions: bindActionCreators(countriesTableActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable)