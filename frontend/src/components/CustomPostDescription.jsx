import React, { Component } from 'react';

// Module still in progress.
// Need to make the logic to display only 3 lines of the description along with a read more button if the
// total number of characters exceed a certain number.

class PostDescription extends Component {

    render() {

        const html = this.props.html;
        // Modify desc if desc more than 100 chars(?) along with a read more button. Else dont modify desc.
        return (
                <p dangerouslySetInnerHTML={{__html: html}} />
        );

    }
}

export default PostDescription;
