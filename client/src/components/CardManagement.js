import React, { Component } from 'react'
import PropTypes from 'prop-types'; // react prop types are depecrated
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { setCurrentBalance } from '../actions/financeActions'
import { changeBalance } from '../actions/financeActions'


import { setCurrentUser } from '../actions/login'
import { newCurrentBalance } from '../actions/login'


export class CardManagement extends React.Component {

    constructor(props) {
		super(props);
		this.state = {    
                    _id : this.props.authen.id,
                    amount: 0
							};
        // binding to the actual scope that we have 
        this.onChange = this.onChange.bind(this);        
		this.onCarica = this.onCarica.bind(this);
	}

  onChange(e){
    this.setState({ [e.target.name] : parseFloat(e.target.value) || 0 });
  }


onCarica(e) {
    e.preventDefault();
    this.props.changeBalance(this.state).then(
      // when login is correct we will redirect
          (response) =>     {
                      console.log(response.data);
                      this.context.router.history.replace('/profile');
                    },

          (err) => {
                      console.log("shouldnt happen");
               });   
  
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
    			   
        <TextField  hintText="Quantità €" type="number" name="amount" value={this.state.amount} onChange={this.onChange} /><br />
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
          authen: state.authen      };
  }
  
  
  
  export default connect(mapStateToProps, {changeBalance, setCurrentUser})(CardManagement);
