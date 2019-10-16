import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class SendMessageForm extends Component {
    constructor(){
        super()
        this.state = {
            message: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
        
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({ message: ''})
        
    }
    render() {
        return (
            <div className="message-form p-2">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Control type="text"
                    disabled={this.props.disabled}
                    onChange={this.handleChange} 
                    value={this.state.message}
                    placeholder="Type a message and hit ENTER" 
                    className="messageForm"/>
                </Form>
                
            </div>
        );
    }
}

export default SendMessageForm;
