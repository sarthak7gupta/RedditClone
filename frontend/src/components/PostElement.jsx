import React, { Component } from 'react';
import PostDescription from './PostDescription'

class PostElement extends Component {
	state = {}

	container_style = { display: "flex", flexDirection: "column", border: "1px solid black", width: 350, height: "auto", padding: 10, margin: 5, Height: 200, alignItems: "center", borderRadius:5 };

	// container_style = {border: "1px solid black",width:600,height:"auto",margin:5,minHeight:100};
	title_votes_style = {paddingInline: 10,display:"flex",flexDirection:"row",justifyContent:"space-between"}
	vote_btn_style = {marginInline:10,marginTop:5,marginBottom:5}
	subreddit_name_style = {paddingInline: 10,display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"5px"}

	render() {

		const { author, title, description, subreddit, postdate, flair } = this.props.post;

		return (
			// <div style={this.container_style} onClick={() => this.props.goToPost(this.props.post)}>
			// 	{/* Name */}
			// 	<span><h3>{subreddit}</h3></span>
			// 	<span><h3>{author}</h3></span>
			// 	<span><h5>{title}</h5></span>
			// 	<span>{description}</span>
			// </div>
			<div style={this.container_style}>

				<div style={this.subreddit_name_style}>
					{/* Subreddit Name */}
					<div style={{ fontSize: 15 }} onClick={() => this.props.goToSubreddit(subreddit)}>
						<p style={{ margin: "5px" }}> r/{subreddit} </p>
					</div>
					<div style={{ fontSize: 15 }}>
						<p style={{ margin: "5px" }}> u/{author} </p>
					</div>
				</div>
				<div style={this.title_votes_style}>
					<div style={{ fontSize: 25, fontWeight: "bold" }} onClick={() => this.props.goToPost(this.props.post)}>
						<p> {title} </p>
					</div>
				</div>

				{/* Post Text/Description/Caption */}
				<div style={{ paddingInline: 10 }} onClick={() => this.props.goToPost(this.props.post)}>
					<PostDescription desc={description.slice(0, 256) + '...'} />
				</div>

				<div style={{display:'flex', justifyContent:'space-between'}}>
					<div style={{ padding: '10px' }}>
						{postdate}
					</div>
					<div style={{ padding: '10px' }}>
						{flair}
					</div>
				</div>
			</div>
        );
	}
}

export default PostElement;
