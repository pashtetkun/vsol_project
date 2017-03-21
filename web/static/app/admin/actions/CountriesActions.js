import {
	COUNTRIES_GET_REQUEST,
	COUNTRIES_GET_SUCCESS,
	COUNTRIES_GET_FAILURE,
	INIT_COUNTRIES_POST_REQUEST,
	INIT_COUNTRIES_POST_SUCCESS,
	INIT_COUNTRIES_POST_FAILURE,
} from '../constants/Countries'


export function getCountries() {

	var url = "/adminApi/countries"

	return (dispatch) => {
	
		dispatch({
	  		type: COUNTRIES_GET_REQUEST
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
		  				type: COUNTRIES_GET_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: COUNTRIES_GET_FAILURE,
						payload: [],
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: COUNTRIES_GET_FAILURE
					})
		  })
	}
}

export function initCountries() {

	var url = "/adminApi/countries"

	return (dispatch) => {
	
		dispatch({
	  		type: INIT_COUNTRIES_POST_REQUEST
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
		  				type: INIT_COUNTRIES_POST_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: INIT_COUNTRIES_POST_FAILURE,
						payload: [],
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: INIT_COUNTRIES_POST_FAILURE
					})
		  })
	}
}