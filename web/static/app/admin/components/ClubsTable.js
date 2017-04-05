import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router-dom'


export default class ClubsTable extends React.Component {
	
	render() {
		
		var that = this
		
		var rows = this.props.rows
		
		return (
				<div>
					<Table>
					
						<TableHeader
							displaySelectAll={false}
			            	adjustForCheckbox={false}
						>
							<TableRow>							
								<TableHeaderColumn>
									{'N'}
								</TableHeaderColumn>
								<TableHeaderColumn>
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
									<TableRowColumn>
										{index + 1}
									</TableRowColumn>
																		
									<TableRowColumn>
										<Link to={("/club/"+row.vsol_id)}>{row.vsol_name}</Link>
									</TableRowColumn>
								</TableRow>
			 				))}	
							
							
			        	</TableBody>
			        	
			        </Table>
			        
			    </div>
		)
	}
}