import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class CreatePost extends Component {
	state = {
		title: "",
		body: "",
		subreddit: "",
		flair: "",

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


	container_style = { display: "flex", alignItems: "center", flexDirection: "column", padding: 5 }
	title_style = { display: "flex", justifyContent: "center" }
	form_style = {
		border: "1px solid black", width: 600, height: "auto", margin: 5, minHeight: 600,
		display: "flex", alignItems: "center", flexDirection: "column", padding: 40, justifyContent: "space-around"
	};

	render() {
		const isLoggedIn = this.state.isLoggedIn;

		console.log("____IN PROFILE_____\nUsername:", this.props.username, "\nLogin Status:", this.props.isLoggedIn);

		return (
			<React.Fragment>
				{
					!isLoggedIn ?
						// Show that User has not logged in
						<div>
							<h1 className="center-screen">
								Login to create a post!
						</h1>
						</div>
						:
						// Wraper under Reactfragment to show the create post form
						<div>
							{/* Title of the create post page */}
							<div style={this.title_style}>
								<h1>What are you thinking about?</h1>
							</div>

							{/* Main Container */}
							<div style={this.container_style}>
								{/* Sub Container - Actual form to post*/}
								<div>
									<form style={this.form_style} onSubmit={this.submitHandler}>

										<TextField id="name-text" variant="outlined" label="Title" fullWidth
											name="post_title" value={this.state.title} onChange={(e) => this.handleTitleChange(e.target.value)} required />

										<TextField id="multiline-body-text" variant="outlined" label="Body" fullWidth multiline
											rowsMax="4" rows="3" name="post_body" value={this.state.body} onChange={(e) => this.handleBodyChange(e.target.value)} />

										<TextField id="subreddit-text" variant="outlined" label="Subreddit" fullWidth
											name="post_subreddit" value={this.state.subreddit} onChange={(e) => this.handleSubredditChange(e.target.value)} required />

										<div className="mt-3">
											<button type="submit" className="btn btn-lg btn-primary">Submit</button>
										</div>

									</form>
								</div>
							</div>
						</div>
				}
			</React.Fragment>
		);
	}

	handleTitleChange(value) {
		this.setState({ title: value })
	}

	handleBodyChange(value) {
		this.setState({ body: value })
	}

	handleSubredditChange(value) {
		this.setState({ subreddit: value })
	}

	// Submit handler send the form data as a json to the appropriate API.
	submitHandler = (e) => {
		e.preventDefault()
		console.log(this.state)
		// temporary URL for POST request
		axios({
			method: 'POST',
			url: `http://localhost:5000/api/post`,
			data: {
				username: this.state.username,
				title: this.state.title,
				body: this.state.body,
				subreddit: this.state.subreddit,
				flair: this.state.flair,
			}
		})
			.then(response => {
				console.log(response)
				this.props.history.push('/Profile');
			})
			.catch(error => {
				console.log(error)
				this.props.history.push('/');

			})

		// Go to the post which has been uploaded
		// Or change the view in some way as the post has been created.
	}


}

export default CreatePost;
