import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


// hey i'm about to code

//h1 h2 h3 h4 h5 h6 all of these are headers => titles 
// h1 being the biggest one, so it goes from h1 til h6




export default class Julia extends Component {

    constructor(props) {
        super(props);
        this.state = {
                            userInput1: '',
                            userInput2: '',
                            background: 'juliaSquare'                       
                        };
              this.onClick = this.onClick.bind(this);        
              this.onChange = this.onChange.bind(this);        
              
      }



    onClick(){
        if(this.state.background == "juliaRedSquare"){
            this.setState( { background : "juliaSquare "});
        } else { 
            this.setState({ background: "juliaRedSquare" })
        }}
    // a blueprint generic of what would happen in case of giving two numbers
    // function_name ( parameter1, parameter2) { kwjqhdqwhj diuqhw diq d with parameters }

    onChange(e){
        this.setState({ [e.target.name] : (e.target.value) });
      }

    render() {

        return (
            // big ass square containing everything
            // strings = " " human words blablablablba => " i'm a string m y name ioand"
            // Numbers "13" => 13
            // Objects => strings + numbers + functions 

<div className={this.state.background}>


                <h1 className="ui header">i don't know what to write </h1>
                <h2 className="ui header"> {this.state.userInput1} </h2>
                <h2 className="ui header"> {this.state.userInput2} </h2>
                <h1 className="ui header"> and the result is : {parseInt(this.state.userInput1) + parseInt(this.state.userInput2) }  </h1>
                <TextField  hintText="type me" name="userInput1" value={this.state.userInput1} onChange={this.onChange} /><br />
                <TextField  hintText="type me" name="userInput2" value={this.state.userInput2} onChange={this.onChange} /><br />
                
                <RaisedButton label="i will change the background color !" primary={true} onTouchTap = {this.onClick} />


            </div>
        )
    }
}
