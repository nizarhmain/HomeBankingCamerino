import React from 'react'
import './secondary-sliding-navigation/secondary-sliding-navigation/css/style.css'
import './secondary-sliding-navigation/secondary-sliding-navigation/css/reset.css'

import './secondary-sliding-navigation/secondary-sliding-navigation/js/main.js'

import LoginDialog from './LoginDialog'
import {connect} from 'react-redux'



export default class NavBar extends React.Component {
    render() {
        return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="http://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet" type="text/css" />
    {/* Modernizr */}
        <header>
          <div className="cd-logo"><a href="#0"><img src="https://maxcdn.icons8.com/Share/icon/ios7/Animals//koala1600.png" height="50px"alt="Logo" /></a></div>
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">
              <li> <a> <LoginDialog  /> </a> </li>
              <li><a href="#0">Assistenza</a></li>
              <li>
                <a href="#0" className="cd-subnav-trigger"><span>Servizi Online</span></a>
                <ul>
                  <li className="go-back"><a href="#0">Menu</a></li>
                  <li><a href="#0">Bonifico</a></li>
                  <li><a href="#0">Movimenti Bancari</a></li>
                  <li><a href="#0">Le mie carte</a></li>
                  <li><a href="#0">Category 4</a></li>
                  <li><a href="#0">Category 5</a></li>
                  <li><a href="#0" className="placeholder">Placeholder</a></li>
                </ul>
              </li>
            </ul> {/* .cd-main-nav */}
          </nav> {/* .cd-main-nav-wrapper */}
          <a href="#0" className="cd-nav-trigger"><span /></a>
        </header>
        
        
      </div>
    );
          
    }
}




