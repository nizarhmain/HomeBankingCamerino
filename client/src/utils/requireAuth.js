import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated

export default function(ComposedComponent) {

class Authenticate extends React.Component {
	componentWillMount(){
		if(!this.props.isAuthenticated) {
			this.context.router.history.push('/');
		}
	}


  render() {
    return (
     
    	<ComposedComponent {...this.props} />

    );
  }
}


Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
}



function mapStateToProps(state){
   return{
		isAuthenticated: state.authen.isAuthenticated
   };
}

Authenticate.contextTypes = {
  router: PropTypes.object.isRequired
};



return connect(mapStateToProps)(Authenticate);

}