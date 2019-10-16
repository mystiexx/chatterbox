import React, { Component } from 'react';
import Messages from './Messages';


class MessageList extends Component {
    render() {
        const { messages, roomId } = this.props
        if (!roomId) {
            return (
                <div>
                    <div>
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list p-3 overflow-auto">
               {messages.map((message, index) => {
                   return(
                       <Messages key={index} username={message.senderId} text={message.text}/>     
                   )
               })}
                
            </div>
        );
    }
}

export default MessageList;
