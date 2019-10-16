import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa'
import { Form } from 'react-bootstrap';

class NewRoomForm extends Component {
    constructor(){
        super()
        this.state = {
            roomName:'', 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({roomName: ' '})
    }

    render() {
        return (
            <div className="room-form p-2">
                <div className="new-room mt-2 d-flex justify-content-between">
                   <Form onSubmit={this.handleSubmit}>
                       <Form.Control
                       value={this.state.roomName}
                       onChange={this.handleChange} 
                       type="text"
                       placeholder="New Room"
                       required/>
                   </Form>
                    <div className="icon">
                    <FaPlus/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default NewRoomForm;
