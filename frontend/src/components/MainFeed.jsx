import React, { Component } from 'react';
import Posts from './Posts'
import SubredditLVElement from './SubredditLVElement';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


// MainFeed module contains <Posts>. Each post in posts is loaded further from the <Post> module.
class MainFeed extends Component {

	// Fetch entire Feed from API here
	// Called immediately after a component is mounted. Setting state here will trigger re-rendering.
	componentDidMount() {
		// Fetch user feed
		this.fetchFeed();
		setInterval(this.fetchFeed, 10000); // AJAX Periodic Refresh

		// Fetch list of subreddits
		axios.get("http://localhost:5000/api/subreddits", { crossdomain: true })
			.then(response => {
				console.log(response);
				this.setState({listOfSubreddits: response.data});
			}).catch(error => {
				console.log(error);
			})
	}

	fetchFeed = () => {
		axios.get("http://localhost:5000/api/posts", { crossdomain: true })  //Replace with appropriate API URL
			.then(response => {
				console.log(response);
				this.setState({allPosts: response.data});

				// Set this.state.allPosts to the response.
				// this.state.allPosts = response IN LIST FORMAT like the example of allPosts
			})
			.catch(error => {
				// Error recovery logic
				console.log(error);
			})
	}
	state = {
		allPosts: [
			{
				id: 1, title: "Space", description: "A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. The word galaxy is derived from the Greek galaxias, literally 'milky', a reference to the Milky Way.",
				image: "../images/test_image1.jpg", votes: 15, subreddit: "r/worldnews", author: "u/sarthak7gupta", postdate: "16-04-2020 07:08:09"
			},
		],

		listOfSubreddits: [
			{ id: 1, name: "hello" },
			{ id: 2, name: "world" }
		]

	};

	render() {
		return (
			<React.Fragment>

				<div style={{ minheight: "100vh", width: "100%", display: "flex", justifyContent: "space-between" }}>

					<div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: 5, width: "300", border: "1px solid black" }}>
						{
							this.state.listOfSubreddits.map(subreddit => (
								<SubredditLVElement key={subreddit.name}
									goToSubreddit={this.goToSubreddit}
									name={subreddit.name}
								/>
							))
						}
					</div>

					<main style={{ flexGrow: "1", display: "flex", alignItems: "center", flexDirection: "column", padding: 5 }}>
						{/* Center division for posts */}
						<Posts
							allPosts={this.state.allPosts}
							onUpvote={this.handleUpvote}
							onDownvote={this.handleDownvote}
							followSubreddit={this.followSubreddit}
							goToSubreddit={this.goToSubreddit}
							goToPost={this.goToPost}
						/>
					</main>

				</div>

			</React.Fragment>
		);
	}

	handleUpvote = currentPost => {
		console.log("Current Post: ", currentPost);
		const allPosts = [...this.state.allPosts];
		const index = allPosts.indexOf(currentPost);
		allPosts[index] = { ...currentPost };
		allPosts[index].votes++;
		console.log("Updated votes: ", allPosts[index].votes);
		this.setState({ allPosts });

		//Send updated value after upvote to DB using axios post
	}

	handleDownvote = currentPost => {
		console.log("Current Post: ", currentPost);
		const allPosts = [...this.state.allPosts];
		const index = allPosts.indexOf(currentPost);
		allPosts[index] = { ...currentPost };
		allPosts[index].votes--;
		console.log("Updated votes: ", allPosts[index].votes);
		this.setState({ allPosts })

		//Send updated value after downvote to DB using axios post
	}

	followSubreddit = currentPost => {
		console.log("Current Post: ", currentPost);
		const allPosts = [...this.state.allPosts];
		const index = allPosts.indexOf(currentPost);
		allPosts[index] = { ...currentPost };
		const subredditToFollow = allPosts[index].subreddit;
		console.log("User is following subreddit: ", subredditToFollow);

		// send "subredditToFollow" to DB add it to list of subreddits user follows using axios post.
	}

	goToSubreddit = subreddit => {
		console.log("Going to subreddit", subreddit);
		const uri = '/r?' + subreddit;
		this.props.history.push(uri, subreddit);
	}

	goToPost = currentPost => {
		console.log("Going to post", currentPost);
		const id = currentPost.id;
		const sub = currentPost.subreddit;
		const uri = '/r/post/?' + sub + '/' + id;
		this.props.history.push(uri, currentPost);
	}

}

export default withRouter(MainFeed);
