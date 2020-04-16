import React, { Component } from 'react';
// import Posts from './Post';
import axios from 'axios';
import UserElement from './UserElement';
import PostElement from './PostElement';
import SubredditElement from './SubredditElement';


class SearchResults extends Component {

	componentDidUpdate(prevProps) {
		if (prevProps.location.state !== this.props.location.state) {
			this.setState({ query: this.props.location.state });
		}
	}

	state = {
		query: this.props.location.state,

		// Example of search results -
		searchResults_posts: [
			{
				id: 1, title: "Space", description: "A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. The word galaxy is derived from the Greek galaxias, literally 'milky', a reference to the Milky Way.",
				image: "../images/test_image1.jpg", votes: 15, subreddit: "r/worldnews", author: "u/sarthak7gupta", postdate: "16-04-2020 07:08:09"
			},
		],

		searchResults_users: [
			{ username: "User-1", karma: 400, bio: "Hello world"}
		],

		searchResults_subreddits: [
			{ id: 1, subredditName: "r/hello", title: "Subreddit-1", description: "Hello world", image: "temp1.jpg" },
			{ id: 2, subredditName: "r/world", title: "Subreddit-2", description: "I am subreddit-2", image: "temp2.jpg" },
			{ id: 3, subredditName: "r/pics", title: "Subreddit-3", description: "I am subreddit-3", image: "temp3.jpg" }
		]

	}

	// Fetch entire Feed from API here
	// Called immediately after a component is mounted. Setting state here will trigger re-rendering.
	componentDidMount() {
		// Fetch Subreddits
		axios.get("http://localhost:5000/api/search?q=" + this.props.location.state, { crossdomain: true })  //Replace with appropriate API URL
			.then(response => {
				console.log(response);
				this.setState({
					searchResults_posts: response.data['posts'],
					searchResults_users: response.data['users'],
					searchResults_subreddits: response.data['subreddits']
				});
			})
			.catch(error => {
				// Error recovery logic
				console.log(error);
			})
	}


	render() {

		const q = this.state.query;
		console.log("Query received: ", q);
		const searchResults_users = this.state.searchResults_users;
		const searchResults_subreddits = this.state.searchResults_subreddits;
		const searchResults_posts = this.state.searchResults_posts;

		return (
			<React.Fragment>
				<div style={{ height: "auto", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-start" }}>
					<div style={{ margin: "20px" }}>
						<h2>Search Results for {q} :</h2>
					</div>
					<div style={{ margin: "20px", marginTop: "30px" }}>
						<span><h3>Users</h3></span>
						{/* List of Users */}
						<div style={{ display: "flex", height: "auto", minheight: "200px", flexWrap: "wrap", justifyContent: "left" }}>

							{searchResults_users.map(user => (
								<UserElement key={user.id}
									user={user}
								/>
							))
							}

						</div>
					</div>
					<div style={{ margin: "20px", marginTop: "30px" }}>
						<span><h3>Subreddits</h3></span>
						{/* List of Subreddits */}
						<div style={{ display: "flex", height: "auto", minheight: "200px", flexWrap: "wrap", justifyContent: "left" }}>

							{searchResults_subreddits.map(subreddit => (
								<SubredditElement key={subreddit.name}
									subreddit={subreddit}
									goToSubreddit={this.goToSubreddit}
								/>
							))
							}
						</div>
					</div>
					<div style={{ margin: "20px", marginTop: "30px" }}>
						<span><h3>Posts</h3></span>
						<div style={{ display: "flex", height: "auto", minheight: "200px", flexWrap: "wrap", justifyContent: "left" }}>

							{searchResults_posts.map(post => (
								<PostElement key={post.id}
									post={post}
									goToPost={this.goToPost}
									goToSubreddit={this.goToSubreddit}
								/>
							))
							}
						</div>
					</div>

				</div>
			</React.Fragment>
		);
	}

	goToPost = currentPost => {
		console.log("Going to post", currentPost);
		const id = currentPost.id;
		const sub = currentPost.subreddit;
		const uri = '/r/post/?' + sub + '/' + id;
		this.props.history.push(uri, currentPost);
	}

	goToSubreddit = subreddit => {
		console.log("Going to subreddit", subreddit);
		const uri = '/r?' + subreddit;
		this.props.history.push(uri, subreddit);
	}

}

export default SearchResults;
