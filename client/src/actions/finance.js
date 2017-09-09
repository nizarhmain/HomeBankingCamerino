import axios from 'axios';

export function setCurrentBalance(balance){
	return {
		type: 'SET_CURRENT_BALANCE',
		balance
	};
}

export function changeBalance(transactionData) {
	return dispatch => {
		return axios.put('http://localhost:3000/users/updatebalance', transactionData);
	}
}