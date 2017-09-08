import React from 'react'
import './secondary-sliding-navigation/secondary-sliding-navigation/css/style.css'
import './secondary-sliding-navigation/secondary-sliding-navigation/css/reset.css'
import './secondary-sliding-navigation/secondary-sliding-navigation/js/main.js'


export default class NavBar extends React.Component {
    render() {
        return (
      <div className="container">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="http://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet" type="text/css" />
    {/* Modernizr */}
        <header>
          <div className="cd-logo"><a href="#0"><img src="img/cd-logo.svg" alt="Logo" /></a></div>
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">
              <li><a href="#0">About</a></li>
              <li><a href="#0">Projects</a></li>
              <li><a href="#0">Blog</a></li>
              <li><a href="#0">Contact</a></li>
              <li>
                <a href="#0" className="cd-subnav-trigger"><span>Categories</span></a>
                <ul>
                  <li className="go-back"><a href="#0">Menu</a></li>
                  <li><a href="#0">Category 1</a></li>
                  <li><a href="#0">Category 2</a></li>
                  <li><a href="#0">Category 3</a></li>
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


