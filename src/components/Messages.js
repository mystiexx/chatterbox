import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

class Messages extends Component {
    render() {
        const { username, text } = this.props
        return (
            <div>
                           <h6 className="sender-name mt-4">{username}</h6>
                           <Badge variant="primary" className="sender-text p-2">{text}</Badge>
                
            </div>
        );
    }
}

export default Messages;
