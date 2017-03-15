import {
	HIDDEN_COUNTRIES_GET_REQUEST,
	HIDDEN_COUNTRIES_GET_SUCCESS,
	HIDDEN_COUNTRIES_GET_FAILURE,
	HIDDEN_COUNTRIES_POST_REQUEST,
	HIDDEN_COUNTRIES_POST_SUCCESS,
	HIDDEN_COUNTRIES_POST_FAILURE,
} from '../constants/HiddenCountries'


export function getHiddenCountries() {

	var url = "/adminApi/hiddenCountries?"

	return (dispatch) => {
	
		dispatch({
	  		type: HIDDEN_COUNTRIES_GET_REQUEST
		})
		
		fetch(url, {
			method: "GET",
			headers: {
	    		'Accept': 'application/json',
	    		'Content-Type': 'application/json'
	  		},
			credentials: 'include'		
		}).then(response => response.json())
		  .then(json => {
	
		  		if (json.resultStatus === "SUCCESS"){
		  			
		  			dispatch({
		  				type: HIDDEN_COUNTRIES_GET_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: HIDDEN_COUNTRIES_GET_FAILURE,
						payload: [],
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: HIDDEN_COUNTRIES_GET_FAILURE
					})
		  })
	}
}

export function postHiddenCountries() {

	var url = "/adminApi/hiddenCountries?"

	return (dispatch) => {
	
		dispatch({
	  		type: HIDDEN_COUNTRIES_POST_REQUEST
		})
		
		fetch(url, {
			method: "POST",
			headers: {
	    		'Accept': 'application/json',
	    		'Content-Type': 'application/json'
	  		},
			credentials: 'include'		
		}).then(response => response.json())
		  .then(json => {
	
		  		if (json.resultStatus === "SUCCESS"){
		  			
		  			dispatch({
		  				type: HIDDEN_COUNTRIES_POST_SUCCESS,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: HIDDEN_COUNTRIES_POST_FAILURE,
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: HIDDEN_COUNTRIES_POST_FAILURE
					})
		  })
	}
}