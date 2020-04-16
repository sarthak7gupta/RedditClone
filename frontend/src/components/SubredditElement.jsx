import React, { Component } from 'react';
import SubredditDP from '../images/subredditPic.jpg'

class SubredditElement extends Component {
    state = {  }

    container_style = {display:"flex",flexDirection:"column",border: "1px solid black",width:350,height:"auto",padding:5,margin:5,Height:200,alignItems:"center"};

    render() {

        const {name,title,desc} = this.props.subreddit;

        return (
            // Single User conatiner
            <div style={this.container_style} onClick={ () => this.props.goToSubreddit(name)}>
                {/* Image */}
                <div style={{width:"42px",height:"42px",margin:"10px"}}>
                    <img src={SubredditDP} style={{width:"40px",height:"40px"}} alt="dp"/>
                </div>
                {/* Name */}
                <span><h3>{name}</h3></span>
                <span><h5>{title}</h5></span>
                <span>{desc}</span>
            </div>
        );
    }
}

export default SubredditElement;
