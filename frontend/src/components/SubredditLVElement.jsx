import React, { Component } from 'react';

class SubredditLVElement extends Component {
    state = {  }

    container_style = {borderRadius:5, display:"flex",flexDirection:"column",border: "1px solid black",width:"100%",height:"auto",margin:5};

    render() {

        return (
            // Single subreddit name conatiner
            <div style={this.container_style} onClick={ () => this.props.goToSubreddit(this.props.name)} >
                {/* Name */}
                <span style={{textAlign:"center"}}><h3>r/{this.props.name}</h3></span>
            </div>

        );
    }
}

export default SubredditLVElement;
