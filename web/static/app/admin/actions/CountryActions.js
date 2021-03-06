import {
	COUNTRY_CLUBS_GET_REQUEST,
	COUNTRY_CLUBS_GET_SUCCESS,
	COUNTRY_CLUBS_GET_FAILURE,
	INIT_COUNTRY_CLUBS_POST_REQUEST,
	INIT_COUNTRY_CLUBS_POST_SUCCESS,
	INIT_COUNTRY_CLUBS_POST_FAILURE,
	COUNTRY_CLUBS_SET_TOGGLE
} from '../constants/Country'


export function getCountryClubs(country_id, showHidden) {

	var url = "/adminApi/country/" + country_id + "?"
	if (showHidden)
		url = url.concat("&showHidden=1")

	return (dispatch) => {
	
		dispatch({
	  		type: COUNTRY_CLUBS_GET_REQUEST
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
		  				type: COUNTRY_CLUBS_GET_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: COUNTRY_CLUBS_GET_FAILURE,
						payload: [],
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: COUNTRY_CLUBS_GET_FAILURE
					})
		  })
	}
}

export function initCountryClubs(country_id) {

	var url = "/adminApi/country"

	return (dispatch) => {
	
		dispatch({
	  		type: INIT_COUNTRY_CLUBS_POST_REQUEST
		})
		
		fetch(url, {
			method: "POST",
			headers: {
	    		'Accept': 'application/json',
	    		'Content-Type': 'application/json'
	  		},
	  		body: JSON.stringify({
	  			id: country_id
	  		}),
			credentials: 'include'		
		}).then(response => response.json())
		  .then(json => {
	
		  		if (json.resultStatus === "SUCCESS"){
		  			
		  			dispatch({
		  				type: INIT_COUNTRY_CLUBS_POST_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: INIT_COUNTRY_CLUBS_POST_FAILURE,
						payload: [],
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: INIT_COUNTRY_CLUBS_POST_FAILURE
					})
		  })
	}
}

export function setToggle(checked){
	return {
		type: COUNTRY_CLUBS_SET_TOGGLE,
		payload: checked,
	}
}