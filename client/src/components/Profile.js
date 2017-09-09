import React from 'react';
import PropTypes from 'prop-types'; // react prop types are depecrated
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';


class Profile extends React.Component {


  constructor(props) {
    var date = new Date();
		super(props);
		this.state = {    
                      date: date,
                      month: date.getMonth()+1 
							};
              this.onCardClick = this.onCardClick.bind(this);
  }
  
  onCardClick(e) {
    e.preventDefault();
    this.context.router.history.replace('/cardmanagement');
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
                        <ListItem  primaryText={this.props.authen.card} onClick = { this.onCardClick }/>  
                  </div>
                </div>
					    </List> 
              
             
              } 
			  />
          </div>


          <div className="six wide column" >
                <div className="balance2"> Saldo disponibile al {this.state.date.getDate() + "/" + this.state.month + "/" + this.state.date.getFullYear()} </div>            
                <div className="balance"> {this.props.authen.balance } €</div>
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
