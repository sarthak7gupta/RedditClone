// import React, { Component } from 'react';
// import { NavLink, withRouter } from 'react-router-dom';
// import '../styles/navLinks.css';
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
// import logo from '../images/logo512.png';

// class NavBar extends Component {
// 	state = {
// 		query: "",
// 		isLoggedIn: this.props.isLoggedIn,
// 		username: this.props.username
// 	};

// 	// To reflect immediate changes in props
// 	componentDidUpdate(prevProps) {
// 		if (prevProps.username !== this.props.username) {
// 			this.setState({ username: this.props.username });
// 		}
// 		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
// 			this.setState({ isLoggedIn: this.props.isLoggedIn });
// 		}
// 	}

// 	render() {
// 		const username = this.state.username;
// 		const isLoggedIn = this.state.isLoggedIn;

// 		return (
// 			<Navbar bg="dark" variant="dark" sticky="top" expand="lg">
// 				<Navbar.Brand href="/">
// 					<img
// 						alt="Logo"
// 						src={logo}
// 						width="30"
// 						height="30"
// 						className="d-inline-block align-top"
// 					/>{' '}
// 					A Reddit Clone
// 				</Navbar.Brand>
// 				<Nav.Link href="/Explore">Explore</Nav.Link>
// 				<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 				<Navbar.Collapse id="basic-navbar-nav">
// 					<Form inline className="m-auto">
// 						<FormControl type="text" placeholder="Search" className=" mr-sm-2" value={this.state.query} onChange={(e) => this.handleChange(e.target.value)}/>
// 						<Button type="submit" onClick={() => this.searchQuery()}>Submit</Button>
// 					</Form>
// 					<Nav className="ml-auto">
// 						{
// 						isLoggedIn ?
// 						<>
// 							<Nav.Link href="/CreatePost">Create Post</Nav.Link>
// 							<Nav.Link href="/CreateSubreddit">Create Subreddit</Nav.Link>
// 							<Nav className="mr-auto">
// 								<NavDropdown title={`Hey, ${this.state.username}!`}id="basic-nav-dropdown">
// 									<NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
// 									<NavDropdown.Item href="/Signout" onClick={(e) => this.handleLogin()}>Log Out</NavDropdown.Item>
// 								</NavDropdown>
// 							</Nav>
// 						</>
// 						:
// 						<>
// 							<Nav.Link href="/Login" onClick={(e) => this.handleLogin()}>Login</Nav.Link>
// 							<Nav.Link href="/Signup" onClick={(e) => this.handleSignup(e.target.value)}>Signup</Nav.Link>
// 						</>
// 						}
// 					</Nav>
// 				</Navbar.Collapse>
// 			</Navbar>
// 		);
// 	}

// 	handleChange(value) {
// 		this.setState({ query: value });
// 	}

// 	handleLogin() {
// 		if (this.state.username !== '') { // Log out
// 			this.props.updateLoginState('');
// 		} else { // Log in
// 			this.props.history.push('/Login');
// 		}
// 	}

// 	handleSignup(value) {
// 		this.props.history.push('/Signup');
// 	}

// 	searchQuery() {
// 		if (this.state.query !== '') {
// 			const sendQuery = this.state.query;

// 			// Send search query to Search results page.
// 			// Call appropriate api there
// 			this.props.history.push('/SearchResults', sendQuery);
// 		}
// 	}

// }

// export default withRouter(NavBar);

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/navLinks.css';
import logo from '../images/logo512.png';

class NavBar extends Component {
    state = {
        query : "",
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username
    };

    // To reflect immediate changes in props
    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
          this.setState({username: this.props.username});
        }
        if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
          this.setState({isLoggedIn: this.props.isLoggedIn});
        }
      }


    render() {

        const username = this.state.username;
        const isLoggedIn = this.state.isLoggedIn;
		console.log("Login State in NavBar.jsx:",username,isLoggedIn)

        return (
            <nav className="navbar navbar-dark bg-dark" style={{color: "#FFFFFF"}}>


                {/* Title */}
                <NavLink to="/" className="navbar-brand text-warning">
                    {/* Reddit Logo */}
                    <img src={logo} alt="logo" style={{width:"40px",height:"40px",marginInline:"10px",backgroundColor:"transparent"}}/>
                     {`  `}A New Reddit
                </NavLink>

                <ul className="nav justify-content-end">

                    {/* Search bar and submit button as a form */}

                    <li>
                        <form className="form-inline">

                        <input className="form-control mr-sm-2" type="text"  value = {this.state.query} placeholder="Search" aria-label="Search"
                            onChange = {(e) => this.handleChange(e.target.value)} />

                        <input type="button" value="Search" onClick={() => this.searchQuery()} className="btn btn-outline-warning my-2 my-sm-0 mx-sm-2"/>
                        </form>
                    </li>

                    <h3 style={{marginInline:"10px"}}>|</h3>

                    <li className="my-2 my-sm-0 mx-sm-2">
                        { isLoggedIn ?
                        <div>
                            <div style={{marginTop:8}}>Logged In as: {username}</div>
                        </div>
                        :
                        null}
                    </li>

                    <div>
                        { isLoggedIn ?
                        <h3>|</h3>
                        :
                        null
                        }
                    </div>

                    {/* First hyperlink */}
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link text-warning" activeClassName="nav-link text-danger" exact>Home</NavLink>
                    </li>

                    {/* Second Hyperlink */}
                    <li className="nav-item">
                        <NavLink to='/CreatePost' className="nav-link text-warning" activeClassName="nav-link text-danger" exact>Create Post</NavLink>
                    </li>

                    {/* Third Hyperlink */}
                    <li className="nav-item">
                        <NavLink to='/CreateSubreddit' className="nav-link text-warning" activeClassName="nav-link text-danger" exact>Create Subreddit</NavLink>
                    </li>

                    {/* Fourth Hyperlink */}
                    <li className="nav-item">
                        <NavLink to='/Profile' className="nav-link text-warning" activeClassName="nav-link text-danger" exact>Profile</NavLink>
                    </li>

                    <div><h3>|</h3></div>

                    <li className="nav-item">
                        <input type="button" value = {!isLoggedIn ? "Login" : "Logout"} className="btn btn-outline-danger my-2 my-sm-0 mx-sm-2"
                        onClick={(e) => this.handleLogin()}/>
                    </li>
                    <li>
                        { !isLoggedIn ?
                            <input type="button" value="Signup" className="btn btn-outline-danger my-2 my-sm-0 mx-sm-1"
                            onClick={(e) => this.handleSignup(e.target.value)}/>
                        :
                        null
                        }
                    </li>
                </ul>
            </nav>
        );
    }

    handleChange(value){
        this.setState({query: value});
    }

    handleLogin(){
        // Log out
        if(this.state.username !== ''){
            this.props.updateLoginState('');
        }
        // Log in
        else{
            this.props.history.push('/Login');
        }
        // console.log("Login Status: ",!this.state.isLoggedIn);
    }

    handleSignup(value){
        this.props.history.push('/Signup');
    }


    searchQuery(){
        if (this.state.query !== ''){
            const sendQuery = this.state.query;
            console.log("Query to search is: ",sendQuery);

            // Send search query to Search results page.
            // Call appropriate api there
            this.props.history.push('/SearchResults',sendQuery);
        }
    }

}

export default withRouter(NavBar);
