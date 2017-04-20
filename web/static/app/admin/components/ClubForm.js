import React from 'react';
import ReactDOM from 'react-dom';
import localizations from '../localizations/localizations'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form';
import ReactGridLayout from 'react-grid-layout';

class ClubForm extends React.Component {

	renderLogo(field) {
		return (
			<div>
				<img src={field.input.value} />
			</div>
		)
	}

	render() {
		
		var that = this
		
		const { handleSubmit } = this.props

		var layout = [
				{i: 'vsol_logo',    	  		   x: 1, y: 0, w: 5, h: 3, static: true},
				{i: 'btn_copy_logo',     		   x: 6, y: 1, w: 1, h: 1, static: true},
				{i: 'logo',    	  		  		   x: 7, y: 0, w: 5, h: 3, static: true},
      			{i: 'vsol_name_label',    		   x: 0, y: 3, w: 1, h: 1, static: true},
      			{i: 'vsol_name', 	      		   x: 1, y: 3, w: 5, h: 1, static: true},
      			{i: 'btn_copy_name_and_city',      x: 6, y: 3, w: 1, h: 1, static: true},
      			{i: 'name', 	      		   	   x: 7, y: 3, w: 4, h: 1, static: true},
      			{i: 'city', 	      		   	   x: 9, y: 3, w: 4, h: 1, static: true},
      			{i: 'vsol_stadium_label', 		   x: 0, y: 4, w: 1, h: 1, static: true},
      			{i: 'vsol_stadium', 	  		   x: 1, y: 4, w: 5, h: 1, static: true},
      			{i: 'btn_copy_stadium',     	   x: 6, y: 4, w: 1, h: 1, static: true},
      			{i: 'stadium', 	  		   		   x: 7, y: 4, w: 5, h: 1, static: true},
      			{i: 'transfermarkt_label', 	  	   x: 0, y: 6, w: 1, h: 1, static: true},
      			{i: 'transfermarkt', 	  	   	   x: 1, y: 6, w: 5, h: 1, static: true},
      			{i: 'status_label', 	  	   	   x: 5, y: 6, w: 1, h: 1, static: true},
      			{i: 'status', 	  	   	   		   x: 6, y: 6, w: 4, h: 1, static: true},
      			{i: 'notes_label', 	  		   	   x: 0, y: 7, w: 1, h: 1, static: true},
      			{i: 'notes', 	  		   		   x: 1, y: 7, w: 5, h: 3, static: true},
      			{i: 'submit_btn', 	      		   x: 6, y: 11, w: 4, h: 1, static: true}
    	];
		
		return (
				<form onSubmit={handleSubmit}>
					<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1024}>
						<div key={'vsol_logo'}>
							<Field name="vsol_logo_url" component={this.renderLogo} />
						</div>
						<div key={'btn_copy_logo'}>
							<button type="button">--></button>
						</div>
						<div key={'logo'}>
							<Field name="logo_url" component="input" type="text"/>
						</div>
        				<div key={'vsol_name_label'}>
          					<label htmlFor="vsol_name">Название</label>
        				</div>
        				<div key={'vsol_name'}>
        					<Field name="vsol_name" component="input" type="text" disabled={true}/>
        				</div>
        				<div key={'btn_copy_name_and_city'}>
							<button type="button">--></button>
						</div>
						<div key={'name'}>
        					<Field name="name" component="input" type="text"/>
        				</div>
        				<div key={'city'}>
        					<Field name="city" component="input" type="text"/>
        				</div>
        				<div key={'vsol_stadium_label'}>
          					<label htmlFor="vsol_stadium">Стадион</label>
        				</div>
        				<div key={'vsol_stadium'}>
        					<Field name="vsol_stadium" component="input" type="text" disabled={true}/>
        				</div>
        				<div key={'btn_copy_stadium'}>
							<button type="button">--></button>
						</div>
						<div key={'stadium'}>
        					<Field name="stadium" component="input" type="text"/>
        				</div>
        				<div key={'transfermarkt_label'}>
          					<label htmlFor="transfermarkt_url">Трансфермаркт</label>
        				</div>
        				<div key={'transfermarkt'}>
        					<Field name="transfermarkt_url" component="input" type="text"/>
        				</div>
        				<div key={'notes_label'}>
          					<label htmlFor="notes">Заметки</label>
        				</div>
        				<div key={'notes'}>
        					<Field name="notes" component="input" type="textarea"/>
        				</div>
        				<div key={'status_label'}>
          					<label htmlFor="status">Статус</label>
        				</div>
        				<div key={'status'}>
        					<Field name="status" component="input" type="text"/>
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

