import {
	CLUB_GET_REQUEST,
	CLUB_GET_SUCCESS,
	CLUB_GET_FAILURE,
	CLUB_SET_CLUB,
} from '../constants/Club'


export function getClub(club_id) {

	var url = "/adminApi/club/" + club_id

	return (dispatch) => {
	
		dispatch({
	  		type: CLUB_GET_REQUEST
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
		  				type: CLUB_GET_SUCCESS,
						payload: json.result,			
					})
	
		  		} else {
		  			
		  			dispatch({
		  				type: CLUB_GET_FAILURE,
					})	  			
		  		}	  		
		   })
		  .catch((err) => {
			  	console.log(err)
		  		dispatch({
		  				type: CLUB_GET_FAILURE
					})
		  })
	}
}

export function setClub(club) {
	return {
		type: CLUB_SET_CLUB,
		payload: club,
	}
}