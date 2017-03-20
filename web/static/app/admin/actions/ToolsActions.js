import {
	INITIALIZE_DATA_GET_REQUEST,
	INITIALIZE_DATA_GET_SUCCESS,
	INITIALIZE_DATA_GET_FAILURE,
} from '../constants/Tools'


export function initializedData() {

	var url = "/adminApi/initializeData"

	return (dispatch) => {
	
		dispatch({
	  		type: INITIALIZE_DATA_GET_REQUEST
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
		  				type: INITIALIZE_DATA_GET_SUCCESS,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: INITIALIZE_DATA_GET_FAILURE,
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: INITIALIZE_DATA_GET_FAILURE
					})
		  })
	}
}