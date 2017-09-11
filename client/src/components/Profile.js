import React from 'react';
import PropTypes from 'prop-types'; // react prop types are depecrated
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';



class Profile extends React.Component {

// changed the promise auth header is sent automatically so when the shit is completed i'll just have to extract the user from it 






  constructor(props) {
    var date = new Date();
		super(props);
		this.state = {    
                      date: date,
                      month: date.getMonth()+1,
                      cardNumber: '',
                      amount: 0,
                      balance: ''
							};
              this.onCardClick = this.onCardClick.bind(this);
              this.cc_format = this.cc_format.bind(this);
              this.onChange = this.onChange.bind(this);        
              
  }

  componentWillMount() {
    axios.get("http://localhost:3000/users/profile")
             .then( (response) => {
               console.log(response.data.user.balance);
               this.setState({balance: response.data.user.balance});

             });
        }

  
  onCardClick(e) {
    e.preventDefault();
    this.context.router.history.replace('/cardmanagement');
  }


  cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (var i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}


onChange(e){
  this.setState({ [e.target.name] : parseFloat(e.target.value) || 0 });
}


  render() {

    return (
      
      <div className="profile">
    	  <div className="ui grid stackable">

        
      	
        <div className="five wide column" >
        <Paper  zDepth={4} children={
    			    <List >
					      <ListItem primaryText={this.props.authen.name} disabled={true} secondaryText="Username" /> 
					      <ListItem primaryText={this.props.authen.email} disabled={true} secondaryText="Email"/>
					      <ListItem primaryText={this.props.authen.name} disabled={true} secondaryText="Name"/>
					 </List> } 
			  />
        </div>
       
        <div className="five wide column" >
        <Paper  zDepth={4} children={
    			    <List >
					      <ListItem primaryText="Le Mie Carte"  disabled={true}/>  
                <div className="ui grid stackable container">
                  <div className="six wide column">
                        <img src="http://paymenticons.com/img/mastercard.png" />
                  </div>   
                  <div className="ten wide column">   
                        <ListItem  primaryText={this.cc_format(this.props.authen.card)} onClick = { this.onCardClick }/>  
                  </div>
                </div>
					    </List> 
              
             
              } 
			  />
          </div>


          <div className="six wide column" >
                <div className="balance2"> Saldo disponibile al {this.state.date.getDate() + "/" + this.state.month + "/" + this.state.date.getFullYear()} </div>            
                <div className="balance"> {Math.round(this.state.balance*100)/100 } €</div>
          </div>
        
          <div className="five wide column" >
          <Paper  zDepth={4} children={
                <List >
                <ListItem primaryText="Bonifico"  disabled={true}/>  
                <TextField  hintText="Numero Di Carta"  name="cardNumber" value={this.state.cardNumber} onChange={this.onChange} /><br />
                <TextField  hintText="Quantità €" type="number" name="amount" value={this.state.amount} onChange={this.onChange} /><br />
                <RaisedButton label="Transfer !" primary={true} />
            </List> 
            
            } 
          />
          </div>



       </div>			    
  		</div>
    );
  }
}

Profile.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
    authen: state.authen
  };
}



export default connect(mapStateToProps)(Profile);
