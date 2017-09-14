import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // react prop types are depecrated
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paginator from 'react-paginate'

import { setCurrentBalance } from "../actions/financeActions";
import { changeBalance } from "../actions/financeActions";

import { setCurrentUser } from "../actions/login";
import { newCurrentBalance } from "../actions/login";


/* TODO this and that */

export class CardManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.authen.id,
	  amount: 0,
	  pageToLoad: 1,
	  totalPages: 0,
      transactions: []
    };
    // binding to the actual scope that we have
    this.onChange = this.onChange.bind(this);
    this.onCarica = this.onCarica.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
	
}

  componentDidMount() {

    axios.get("http://localhost:3000/users/profile/" + this.state.pageToLoad).then(response => {
      console.log(response.data.transactions);
      this.setState({ transactions: response.data.transactions.docs, totalPages: response.data.transactions.pages});
    });
  }

 

  onChange(e) {
	this.setState({ [e.target.name]: parseFloat(e.target.value) || 0 });
  }

  onChangePage(page) {

	  console.log(page.selected);
	  this.setState({ pageToLoad : page.selected + 1}, () => {
		axios.get("http://localhost:3000/users/profile/" + this.state.pageToLoad).then(response => {
			console.log(response.data.transactions);
			this.setState({ transactions: response.data.transactions.docs });
		  });
	  
		});
	

  }



  onCarica(e) {
    e.preventDefault();
    this.props.changeBalance(this.state).then(
      // when login is correct we will redirect
      response => {
        console.log(response.data);
        this.context.router.history.replace("/profile");
      },
      err => {
        console.log("shouldnt happen");
      }
    );
  }

  render() {
    var transactionList = (
      <tbody>
        {this.state.transactions.map(transaction => (
          <tr key={transaction._id}>
            <td>
              {new Date(transaction.date).getDate() +
                "/" +
                (new Date(transaction.date).getMonth() + 1) +
                "/" +
                new Date(transaction.date).getFullYear()}{" "}
            </td>
            <td>{transaction.senderCard}</td>
            <td>{transaction.receiverCard}</td>
            <td>{transaction.transactionBalance}</td>
          </tr>
        ))}
      </tbody>
    );

    return (
      <div className="cardmanagement">
        <div className="ui grid stackable">
          <div className="ten wide column">
            <h1>Lista dei Movimenti </h1>
            <table className="ui celled striped table unstackable">
              <thead>
                <tr>
                  <th>Data Contabile</th>
                  <th>Origine:</th>
                  <th>Destinazione(euro)</th>
                  <th>Descrizione Operazione</th>
                </tr>
              </thead>

              {transactionList}

              <tfoot>
                <tr>
                  <th colSpan={5}>
                    <div className="ui right floated pagination menu">
                                          
					  <Paginator max={5} onPageChange={this.onChangePage} pageCount={this.state.totalPages} />

                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
	

          <div className="cardActions six wide column">
            <TextField
              hintText="Quantità €"
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.onChange}
            />
            <br />
            <RaisedButton
              label="Carica"
              backgroundColor="#a4c639"
              labelColor="#ffffff"
              onTouchTap={this.onCarica}
              labelPosition="before"
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

CardManagement.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authen: state.authen
  };
}

export default connect(mapStateToProps, { changeBalance, setCurrentUser })(
  CardManagement
);
