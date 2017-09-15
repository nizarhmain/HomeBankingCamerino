import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/NavBar'
import Portal from './components/Portal'
import Profile from './components/Profile'
import CardManagement from './components/CardManagement'

import requireAuth from './utils/requireAuth'

import './App.css'



export default class AppLayout extends React.Component {

  constructor(props) {
	super(props);
  }

  render() {
	return (
		<Router>
			  <div className ="App">
										<NavBar />
		   
                        <main className="cd-main-content">
							<Switch>
										<Route exact path="/" component={Portal} />
										<Route exact path="/profile" component={requireAuth(Profile)} />   
										<Route exact path="/cardmanagement" component={requireAuth(CardManagement)} />   										  
		  				 </Switch>
                        
                        </main>
                        
			  </div>
		 </Router>
	);
  }
}
