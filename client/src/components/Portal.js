import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Profile from "./Profile";

class Portal extends Component {
  render() {
    return (
      <div className="portal">
        <div className="ui container">
          <div className="ui grid stackable">

			

			<div className="five wide column">
				<div className ="cardActions" >
				<div className ="moduleName" >
					<div className ="moduleName"><h1> React + Redux </h1></div> 	
					<img
						src="https://cdn-images-1.medium.com/max/800/1*wjlfZatDlTnqfgYJ9iKnKQ.png"
						height="100px"
						alt="Logo"
					/>
				</div>
				<div className ="moduleName" >
					<div className ="moduleName"><h1> Node JS </h1></div> 	
					<img
						src="https://camo.githubusercontent.com/b6ba9075a54c192efc59bba53c92e7c23ec8cfe8/68747470733a2f2f63646e2e7261776769742e636f6d2f67696c626172626172612f6c6f676f732f653762316463323636366333646162653663313237366162643061373637623665626436616634332f6c6f676f732f6e6f64656a732d69636f6e2e737667"
						height="100px"
						alt="Logo"
					/>
				</div>
				<div className ="moduleName" >
					<div className ="moduleName"><h1> Babel ES6 Transpiler</h1></div> 	
					<img
						src="https://raw.githubusercontent.com/babel/logo/master/babel.png"
						height="100px"
						alt="Logo"
					/>
				</div>
				</div> 
			</div>
					<div className="five wide column">
					<div className ="moduleName" >
					<div className ="moduleName"><h1> Socket.io </h1></div> 	
					<img
						src="http://devstickers.com/assets/img/pro/rd5f.png"
						height="130px"
						alt="Logo"
					/>
				</div>
				<div className ="moduleName" >
					<div className ="moduleName"><h1> MongoDb </h1></div> 	
					<img
						src="http://www.theodo.fr/uploads/blog//2015/11/mongodb.png"
						height="150px"
						alt="Logo"
					/>
				</div>
				<div className ="moduleName" >
					<div className ="moduleName"><h1> WebPack </h1></div> 	
					<img
						src="https://jeremyrajan.gallerycdn.vsassets.io/extensions/jeremyrajan/webpack/2.0.2/1504404883575/Microsoft.VisualStudio.Services.Icons.Default"
						height="150px"
						alt="Logo"
					/>
				</div>
			
			
		</div>
		<div className="five wide column">
		<div>
			<div className ="moduleName">
			<h1>
				Progetto Programmazione Web Camerino HomeBanking :
				Nizar Hmain
            </h1>
			</div>
			<img
                src="http://elearning.unicam.it/pluginfile.php/1/theme_bcu/logo/1490695056/Logo%20Unicam3.png"
                height="146px"
                alt="Logo"
              />	
		</div>
           
		</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portal;
