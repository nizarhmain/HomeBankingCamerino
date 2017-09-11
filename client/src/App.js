import React, { Component } from 'react'
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const ReactDOM = require('react-dom');
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {persistStore, autoRehydrate} from 'redux-persist'

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/login';
import AppLayout from './AppLayout';




// injection of tap even for material ui, otherwise it won't work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


//creating the redux store here
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// redux-persist
//persistStore(store)

// keep the jwt token saved in the localstorage 
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  const userInfo = jwt.decode(localStorage.jwtToken);
  // we only store the stuff we need in the redux, we don't need the rest occupying memory in the store
  store.dispatch(setCurrentUser(userInfo._doc));
}



class App extends Component {
           

  render() {
    const a = 5
    return (
      <MuiThemeProvider> 
      <AppLayout />
    </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  // redux provider store
    <Provider store = {store}>
      <App />
    </Provider>
      ,

  document.getElementById('App')
)

export default App;
