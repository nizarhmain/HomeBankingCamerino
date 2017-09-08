import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user){
	return {
		type: 'SET_CURRENT_USER',
		user
	};
}



 export function login(data){
 	return dispatch => {
 		return axios.post('http://localhost:3000/users/authenticate', data);
 	}

 }

  export function logout(){
 	
 	return dispatch => {
 		localStorage.removeItem('jwtToken');
 		setAuthorizationToken(false);	// delete authorization header from future reqs
 		dispatch(setCurrentUser({})); // user set to empty object

 	}

 }