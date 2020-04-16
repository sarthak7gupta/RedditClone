import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class CreateSubreddit extends Component {
    state = {
        name : "",
        title : "",
        desc : "",
        rules : "",
        topic : "",

        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username
    }

    // To reflect immediate changes in props
    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
            this.setState({username: this.props.username});
        }
        if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({isLoggedIn: this.props.isLoggedIn});
        }
    }


    container_style = {display:"flex",alignItems:"center", flexDirection:"column", padding:5}
    title_style = {display:"flex", justifyContent:"center" }
    form_style = {border: "1px solid black",width:600,height:"auto",margin:5,minHeight:800,
    display:"flex", alignItems:"center", flexDirection:"column",padding:40,justifyContent:"space-around"};


    render() {

        const isLoggedIn = this.state.isLoggedIn;

        console.log("____IN PROFILE_____\nUsername:",this.props.username,"\nLogin Status:",this.props.isLoggedIn);

        return (
            <React.Fragment>
                {
                    !isLoggedIn ?
                    // Show that User has not logged in
                    <div>
                    <h1 className="center-screen">
                            Login to create a subreddit!
                        </h1>
                    </div>
                    :
                    // Wraper under Reactfragment to show the create post form
                    <div>

                        {/* Titke of the page */}
                        <div style={this.title_style}>
                            <h1>Create a subreddit!</h1>
                        </div>

                        {/* Main Container */}
                        <div style={this.container_style}>
                            {/* Sub Container - Actual form to post*/}
                            <div>
                                <form style={this.form_style} onSubmit={this.submitHandler}>

                                    <TextField id="name-text" variant="outlined" label="Name" fullWidth
                                    name="subreddit_name" value={this.state.name} onChange={(e) => this.handleNameChange(e.target.value)} required/>

                                    <TextField id="title-text" variant="outlined" label="Title" fullWidth
                                    name="subreddit_title" value={this.state.title} onChange={(e) => this.handleTitleChange(e.target.value)} required/>

                                    <TextField id="multiline-desc-text" variant="outlined" label="Description" fullWidth multiline
                                    rowsMax="4" rows="3" name="subreddit_desc" value={this.state.desc} onChange={(e) => this.handleDescriptionChange(e.target.value)} required/>

                                    <TextField id="multiline-rules-text" variant="outlined" label="Rules" fullWidth multiline
                                    rowsMax="4" rows="3" name="subreddit_rules" value={this.state.rules} onChange={(e) => this.handleRulesChange(e.target.value)} />

                                    <TextField id="multiline-topics-text" variant="outlined" label="Topics" fullWidth multiline
                                    rowsMax="4" rows="3" name="subreddit_topics" value={this.state.topics} onChange={(e) => this.handleTopicsChange(e.target.value)} />

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

    handleNameChange(value){
        this.setState({name: value})
    }

    handleTitleChange(value){
        this.setState({title: value})
    }

    handleDescriptionChange(value){
        this.setState({desc: value})
    }

    handleTopicsChange(value){
        this.setState({topics: value})
    }

    handleRulesChange(value){
        this.setState({rules: value})
    }

    // Submit handler send the form data as a json to the appropriate API.
    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        // temporary URL for POST request
        axios({
			method: 'PUT',
			url: `http://localhost:5000/api/subreddit`,
			data: {
				name: this.state.name,
				title: this.state.title,
				username: this.state.username,
				desc: this.state.desc,
				rules: this.state.rules,
				topic: this.state.topic,
			}
		})
            .then(response => {
                console.log(response)
				this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
				this.props.history.push('/Profile');
            })

            // Go to the post which has been uploaded
            // Or change the view in some way as the post has been created.
    }

}

export default CreateSubreddit;
