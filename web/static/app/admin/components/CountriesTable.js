import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class CountriesTable extends React.Component {
	
	render() {
		
		var that = this
		
		var rows = this.props.rows
		
		return (
				<div>
					<Table className="wrapper-countries-table">
					
						<TableHeader className="wrapper-countries-table-header"
							displaySelectAll={false}
			            	adjustForCheckbox={false}
						>
							<TableRow className="wrapper-countries-table-header-row">							
								<TableHeaderColumn className={"wrapper-countries-table-header-1"}>
									index
								</TableHeaderColumn>
								<TableHeaderColumn className={"wrapper-countries-table-header-2"}>
									name
								</TableHeaderColumn>					
						    </TableRow>
						</TableHeader>
						
						<TableBody className="wrapper-countries-table-body"
							displayRowCheckbox={false}
						>
						
						
							{rows.map((row, index) => (
								<TableRow className="wrapper-countries-table-row"
									key={("" + row)}
								>
									<TableRowColumn className="wrapper-countries-table-column-index">
										{index}
									</TableRowColumn>
																		
									<TableRowColumn className="wrapper-countries-table-column-name">
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