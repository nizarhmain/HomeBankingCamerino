import React, { Component } from 'react';

class Portal extends Component {
    render() {
        return (
            <div className="ui container">
            <div className="ui grid">
                <div className="four wide column"> this is a trap </div>
                <div className="four wide column"> this is a trap </div>
                <div className="four wide column"> this is a trap </div>
                <div className="four wide column"> this is a trap </div>
            </div>
            </div>
        );
    }
}

export default Portal;