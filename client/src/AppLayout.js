import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar'
import Portal from './components/Portal'
import './App.css';

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

                       			<Portal />
                        
                        </main>
                        
			  </div>
		 </Router>
	);
  }
}
