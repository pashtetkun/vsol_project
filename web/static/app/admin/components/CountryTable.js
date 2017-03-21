import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'


export default class CountryTable extends React.Component {
	
	render() {
		
		var that = this
		
		var rows = this.props.rows
		
		return (
				<div>
					<Table className="wrapper-country-table" height='400px'>
					
						<TableHeader
							displaySelectAll={false}
			            	adjustForCheckbox={false}
						>
							<TableRow>							
								<TableHeaderColumn className="wrapper-country-table-header-index">
									{'N'}
								</TableHeaderColumn>
								<TableHeaderColumn className="wrapper-country-table-header-club">
									{'Name'}
								</TableHeaderColumn>			
						    </TableRow>
						</TableHeader>
						
						<TableBody
							displayRowCheckbox={false}
						>
						
						
							{rows.map((row, index) => (
								<TableRow
									key={index}
								>
									<TableRowColumn className="wrapper-country-table-column-index">
										{index + 1}
									</TableRowColumn>
																		
									<TableRowColumn className="wrapper-country-table-column-club">
										{row}
									</TableRowColumn>
								</TableRow>
			 				))}	
							
							
			        	</TableBody>
			        	
			        </Table>
			        
			    </div>
		)
	}
}