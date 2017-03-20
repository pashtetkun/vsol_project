import {
	COUNTRIES_GET_REQUEST,
	COUNTRIES_GET_SUCCESS,
	COUNTRIES_GET_FAILURE,
} from '../constants/CountriesTable'


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