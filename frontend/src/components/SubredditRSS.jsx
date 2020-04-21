import React, { Component } from 'react';
import profilePic from '../images/subredditPic.jpg'
import CustomPosts from './CustomPosts'
import Parser from 'rss-parser';

class SubredditRSS extends Component {

    // Fetch entire Feed from API here
    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        this.fetchFeed();
        setInterval(this.fetchFeed, 60 * 1000)
    }

    state = {
        sub: this.props.location.search ? this.props.location.search.slice(1) : 'all',
        // Fetch all posts required by user
        allPosts: [
            { id: 1, title: "Space", description: "A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. The word galaxy is derived from the Greek galaxias, literally 'milky', a reference to the Milky Way.", image: "../images/test_image1.jpg", votes: 15, subreddit: "r/space" },
        ],

        subRedditProfile: {
            name: "r/all", title: "subreddit about everything",
            description: "This is the description",
            rules: "Rules"
        }
    }

    render() {
        return (
            <React.Fragment>
                {/*  Main Container */}
                <div style={{ minheight: "100vh", width: "100%", display: "flex", justifyContent: "space-between" }}>

                    {/* Left */}
                    <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }} onClick={() => this.goToSubreddit(this.state.sub)}>
                        {/* Image */}
                        <div style={{ border: "1px solid black", width: "210px", height: "210px", margin: "10px" }}>
                            <img src={profilePic} style={{ width: "210px", height: "210px" }} alt="profile_pic" />
                        </div>
                        {/* Name */}
                        <div style={{ width: "300px", margin: "10px" }}>
                            <h2 style={{ textAlign: "center" }}>
                                {this.state.subRedditProfile.name}
                            </h2>
                        </div>
                        {/* Karma */}
                        <div style={{ width: "300px", margin: "10px" }}>
                            <h4 style={{ textAlign: "center" }}>
                                {/* Put actual Karma points here */}
                                {this.state.subRedditProfile.title}
                            </h4>
                        </div>
                        {/* Description */}
                        <div style={{ marginInline: "10px", width: "500px", height: "auto", minHeight: "100px" }}>
                            <p style={{ textAlign: "center", margin: "5px", padding: "5px" }}>
                                {/* Put actual Description here */}
                                {this.state.subRedditProfile.description}
                            </p>
                        </div>
                        {/* Rules */}
                        <div style={{ marginInline: "10px", width: "500px", height: "auto", minHeight: "100px" }}>
                            <p style={{ textAlign: "center", margin: "5px", padding: "5px" }}>
                                {/* Put actual Description here */}
                                {this.state.subRedditProfile.rules}
                            </p>
                        </div>
                    </div>

                    {/* Center */}
                    <div style={{ flexGrow: "9", display: "flex", flexDirection: "column", alignItems: "center", }}>
                        <div>
                            <h2 style={{ marginTop: "10px" }}>All posts on {this.state.subRedditProfile.name}</h2>
                        </div>
                        <CustomPosts
                            allPosts={this.state.allPosts}
                            onUpvote={this.handleUpvote}
                            onDownvote={this.handleDownvote}
                            followSubreddit={this.followSubreddit}
                            goToSubreddit={this.goToSubreddit}
                            goToPost={this.goToPost}
                        />
                    </div>

                </div>

            </React.Fragment>
        );
    }
    goToSubreddit = subreddit => {
        console.log("Going to subreddit", subreddit);
        window.location = 'https://reddit.com/r/' + subreddit;
    }

    goToPost = currentPost => {
        console.log("Going to post", currentPost);
        window.location = currentPost.link;
    }

    parseUTC = utcstr => {
        const u = new Date(utcstr);
        return u.getUTCFullYear() +
            '-' + ('0' + u.getUTCMonth()).slice(-2) +
            '-' + ('0' + u.getUTCDate()).slice(-2) +
            ' ' + ('0' + u.getUTCHours()).slice(-2) +
            ':' + ('0' + u.getUTCMinutes()).slice(-2) +
            ':' + ('0' + u.getUTCSeconds()).slice(-2)
    }

    fetchFeed = () => {

        let parser = new Parser({
            customFields: {
                feed: ['subtitle', 'category'],
                item: ['category'],
            }
        });

        parser.parseURL(`https://reddit.com/r/${this.state.sub}.rss`).then(response => {

            console.log(response);

            let profile = {
                name: `r/${this.state.sub}`,
                profilePic: "temp1.jpg",
                title: response.title,
                description: response.subtitle
            }
            this.setState({ subRedditProfile: profile });

            const posts = response.items.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    html: item.content,
                    author: item.author ? item.author.slice(3) : '',
                    link: item.link,
                    postdate: this.parseUTC(item.pubDate),
                    subreddit: item.category.$.label,
                    votes: 1,
                    flair: item.category.$.term
                }
            });

            this.setState({ allPosts: posts })

        })
            .catch(error => {
                console.log(error);
            });
    }

}

export default SubredditRSS;
