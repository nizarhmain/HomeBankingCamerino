import React, { Component } from 'react'
import PropTypes from 'prop-types'; // react prop types are depecrated
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export class CardManagement extends React.Component {

    constructor(props) {
		super(props);
		this.state = {    
											open:false,
											username: '',
											password: '',
											errors: '',
											isLoading: false
							};
				// binding to the actual scope that we have 
		this.onCarica = this.onCarica.bind(this);
	}

onCarica(e) {
    console.log("cc");
    e.preventDefault();
    
}


    render() {
        return (
            <div className="cardmanagement">
    	  <div className="ui grid stackable">
          <div className="ten wide column" >
              <h1>Lista dei Movimenti  </h1>
          <table className="ui celled striped table unstackable">
        <thead>
          <tr><th>Data Contabile</th>
            <th>Data valuta:</th>
            <th>Addebiti (euro)</th>
            <th>Accrediti (euro)</th>
            <th>Descrizione Operazione</th>
          </tr>
          </thead>
        <tbody>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th colSpan={5}>
              <div className="ui right floated pagination menu">
                <a className="icon item">
                  <i className="left chevron icon" />
                </a>
                <a className="item">1</a>
                <a className="item">2</a>
                <a className="item">3</a>
                <a className="item">4</a>
                <a className="item">5</a>
                <a className="icon item">
                  <i className="right chevron icon" />
                </a>
              </div>
            </th>
          </tr></tfoot>
      </table>
            </div>
        
        
        <div className="cardActions six wide column" >     
    			   
                    <RaisedButton label="Carica" backgroundColor="#a4c639" labelColor="#ffffff" onTouchTap={this.onCarica} labelPosition="before" fullWidth={true}/>
				
          </div>

        
       </div>			    
  		</div>
        )
    }
}

CardManagement.contextTypes = {
    router: PropTypes.object.isRequired
  };
  
  function mapStateToProps(state){
      return {
          authen: state.authen
      };
  }
  
  
  
  export default connect(mapStateToProps)(CardManagement);
