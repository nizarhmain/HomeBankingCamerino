import React, { Component } from 'react';
import logo from './logo.svg';
import Portal from './components/Portal'
import NavBar from './components/NavBar'
import './App.css';
const ReactDOM = require('react-dom');

class App extends Component {
  render() {
    const a = 5
    return (
      <div className="App">
        
         <NavBar />
         <main className="cd-main-content">
          <Portal /> 
        </main>
       
      </div>
    );
  }
}

ReactDOM.render(
  // redux provider store
  
      <App />
      ,

  document.getElementById('App')
)

export default App;
