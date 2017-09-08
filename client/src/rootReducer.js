import { combineReducers } from 'redux'
import authen from './reducers/authen'
import flashMessages from './reducers/flashMessages'



export default combineReducers({
	authen,
	flashMessages
})