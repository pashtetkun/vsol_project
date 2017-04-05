import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form';
import ReactGridLayout from 'react-grid-layout';

class ClubForm extends React.Component {

	render() {
		
		var that = this
		
		const { handleSubmit } = this.props

		var layout = [
      			{i: 'vsol_name_label',    x: 0, y: 0, w: 1, h: 1, static: true},
      			{i: 'vsol_name', 	      x: 1, y: 0, w: 1, h: 1, static: true},
      			{i: 'vsol_stadium_label', x: 0, y: 1, w: 1, h: 1, static: true},
      			{i: 'vsol_stadium', 	  x: 1, y: 1, w: 1, h: 1, static: true},
      			{i: 'submit_btn', 	      x: 6, y: 3, w: 3, h: 1, static: true}
    	];
		
		return (
				<form onSubmit={handleSubmit}>
					<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        				<div key={'vsol_name_label'}>
          					<label htmlFor="vsol_name">Название</label>
        				</div>
        				<div key={'vsol_name'}>
        					<Field name="vsol_name" component="input" type="text"/>
        				</div>
        				<div key={'vsol_stadium_label'}>
          					<label htmlFor="vsol_stadium">Стадион</label>
        				</div>
        				<div key={'vsol_stadium'}>
        					<Field name="vsol_stadium" component="input" type="text"/>
        				</div>
        				<div key={'submit_btn'}>
        					<button type="submit">Submit</button>
        				</div>
        			</ReactGridLayout>
      			</form>
		)
	}
}

// Decorate the form component
ClubForm = reduxForm({
  form: 'club' // a unique name for this form
})(ClubForm);

export default ClubForm;

