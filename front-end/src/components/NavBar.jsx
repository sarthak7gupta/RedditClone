import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/navLinks.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import logo from '../images/logo512.png';

class NavBar extends Component {
	state = {
		query: "",
		isLoggedIn: this.props.isLoggedIn,
		username: this.props.username
	};

	// To reflect immediate changes in props
	componentDidUpdate(prevProps) {
		if (prevProps.username !== this.props.username) {
			this.setState({ username: this.props.username });
		}
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			this.setState({ isLoggedIn: this.props.isLoggedIn });
		}
	}

	render() {
		const username = this.state.username;
		const isLoggedIn = this.state.isLoggedIn;

		return (
			<Navbar bg="dark" variant="dark" sticky="top" expand="lg">
				<Navbar.Brand href="/">
					<img
						alt="Logo"
						src={logo}
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '}
					A Reddit Clone
				</Navbar.Brand>
				<Nav.Link href="/Explore">Explore</Nav.Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Form inline className="m-auto">
						<FormControl type="text" placeholder="Search" className=" mr-sm-2" value={this.state.query} onChange={(e) => this.handleChange(e.target.value)}/>
						<Button type="submit" onClick={() => this.searchQuery()}>Submit</Button>
					</Form>
					<Nav className="ml-auto">
						{
						isLoggedIn ?
						<>
							<Nav.Link href="/CreatePost">Create Post</Nav.Link>
							<Nav.Link href="/CreateSubreddit">Create Subreddit</Nav.Link>
							<Nav className="mr-auto">
								<NavDropdown title={`Hey, ${this.state.username}!`}id="basic-nav-dropdown">
									<NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
									<NavDropdown.Item href="/Signout" onClick={(e) => this.handleLogin()}>Log Out</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</>
						:
						<>
							<Nav.Link href="/Login" onClick={(e) => this.handleLogin()}>Login</Nav.Link>
							<Nav.Link href="/Signup" onClick={(e) => this.handleSignup(e.target.value)}>Signup</Nav.Link>
						</>
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}

	handleChange(value) {
		this.setState({ query: value });
	}

	handleLogin() {
		if (this.state.username !== '') { // Log out
			this.props.updateLoginState('');
		} else { // Log in
			this.props.history.push('/Login');
		}
	}

	handleSignup(value) {
		this.props.history.push('/Signup');
	}

	searchQuery() {
		if (this.state.query !== '') {
			const sendQuery = this.state.query;

			// Send search query to Search results page.
			// Call appropriate api there
			this.props.history.push('/SearchResults', sendQuery);
		}
	}

}

export default withRouter(NavBar);
