import axios from 'axios';

/*  PASSING THAT ACTION TO REDUCERS TO UPDATE THE STORE*/ 

export function getCurrentBalance(balance){
	return {
		type: 'GET_CURRENT_BALANCE',
		balance
	};
}

/* ACTIONS  */

export function changeBalance(transactionData) {
	return dispatch => {
		return axios.put('http://localhost:3000/users/updatebalance', transactionData);
	}
}