import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'


export default class CountriesTable extends React.Component {
	
	render() {
		
		var that = this
		
		var rows = this.props.rows
		
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
									key={("" + row.country)}
								>
									<TableRowColumn className="wrapper-countries-table-column-index">
										{index + 1}
									</TableRowColumn>
																		
									<TableRowColumn className="wrapper-countries-table-column-country">
										<Link to={("/country/"+index)}>{row.country}</Link>
									</TableRowColumn>

									<TableRowColumn className="wrapper-countries-table-column-count">
										{row.clubs.length}
									</TableRowColumn>
								</TableRow>
			 				))}	
							
							
			        	</TableBody>
			        	
			        </Table>
			        
			    </div>
		)
	}
}