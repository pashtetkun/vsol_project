import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form';

class ClubForm extends React.Component {

	render() {
		
		var that = this
		
		const { handleSubmit } = this.props
		
		return (
				<form onSubmit={handleSubmit}>
        			<div>
          				<label htmlFor="vsol_name">Название</label>
          				<Field name="vsol_name" component="input" type="text"/>
        			</div>
        			<div>
          				<label htmlFor="vsol_stadium">Стадион</label>
          				<Field name="vsol_stadium" component="input" type="text"/>
        			</div>
        			<button type="submit">Submit</button>
      			</form>
		)
	}
}

// Decorate the form component
ClubForm = reduxForm({
  form: 'club' // a unique name for this form
})(ClubForm);

export default ClubForm;
