import React, { Component } from 'react';
import logo from './logo.svg';
import Portal from './components/Portal'
import './App.css';
const ReactDOM = require('react-dom');

class App extends Component {
  render() {
    const a = 5
    return (
      <div className="App">
        
         
        <Portal />

       
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
