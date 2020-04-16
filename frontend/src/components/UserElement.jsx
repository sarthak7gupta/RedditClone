import React, { Component } from 'react';
import userDP from '../images/profilePic.jpg'

class UserElement extends Component {
    state = {  }

    container_style = {display:"flex",flexDirection:"column",border: "1px solid black",width:350,height:"auto",margin:5,Height:200,alignItems:"center"};

    render() {

        const {username,karma,bio} = this.props.user;

        return (
            // Single User conatiner
            <div style={this.container_style}>
                {/* Name */}
                <span><h3>{username}</h3></span>
                <span><h5>Karma:{karma}</h5></span>
                <span>{bio}</span>
            </div>
        );
    }
}

export default UserElement;
