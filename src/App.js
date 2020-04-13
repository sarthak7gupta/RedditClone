import React, { Component } from 'react';
import 'typeface-roboto'
import NavBar from './components/NavBar';
import MainFeed from './components/MainFeed';
import Trending from './components/Trending';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Login from './components/Login';

import {BrowserRouter, Switch,Route} from 'react-router-dom';

//App First react module. Contains the NavBar and MainFeed module in it which further contains the navbar and posts.
class App extends Component {

	state = {
		isLoggedIn:false,
		username:''
	}
	
	render() { 

		console.log("__________APP RELOADED__________ with",this.state.isLoggedIn,this.state.username);

		return (
			<React.Fragment>
				<BrowserRouter>
					<NavBar
						username={this.state.username}
						isLoggedIn={this.state.isLoggedIn}
						updateLoginState={this.updateLoginState}/>
					<Switch>
						<Route path="/" exact component={MainFeed}/>
						<Route path="/Trending/" exact component={Trending}/>
						<Route path="/CreatePost/" exact component={CreatePost}	/>
						<Route path="/Profile/" exact component={Profile}/>
						<Route path="/Login/" exact 
							render={(props) => <Login {...props}
							updateLoginState={this.updateLoginState}
							username={this.state.username}
							isLoggedIn={this.state.isLoggedIn}/> } />
						<Route component={NotFound}/>
					</Switch>			
				</BrowserRouter>
			</React.Fragment>
		);
	}

	updateLoginState = (currentUser) => {
		const isLoggedIn = this.state.isLoggedIn;
		if(isLoggedIn===false){
			this.setState({isLoggedIn:true})
			this.setState({username:currentUser})
		}
		else{
			this.setState({isLoggedIn:false})
			this.setState({username:''})
		}
		console.log("Login State in App.js:",this.state.username,this.state.isLoggedIn)
	}

}

export default App;
