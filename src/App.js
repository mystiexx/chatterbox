import React, { Component } from 'react';
import './App.css';
import Chatkit from '@pusher/chatkit-client'
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import NewRoomForm from './components/NewRoomForm'
import { Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {

    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e354d314-89a5-4278-82f8-a63a7d85852e/token",
    });
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:e354d314-89a5-4278-82f8-a63a7d85852e",
      userId: "roland",
      tokenProvider: tokenProvider
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
      
    })
    .catch(err=> console.log('error on connecting: ', err))
  }

  getRooms(){
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId){
    this.setState({messages: []});
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({messages: [...this.state.messages, message]})
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id,
      })
      this.getRooms()
    })
    .catch(err=> console.log('error on subscribing to room! ', err))
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text, 
      roomId: this.state.roomId
    }) 

  }

  createRoom(name){
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))

  }

  render() {
    
    return (
      <div className="container-fluid app">
        <Row>
          <Col md={4} className="rooms">
            <RoomList 
            roomId = {this.state.roomId}
            subscribeToRoom ={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
          </Col>
          <Col>
            <MessageList
            roomId={this.state.roomId} 
            messages={this.state.messages}/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <NewRoomForm createRoom={this.createRoom}/>
          </Col>
          <Col>
            <SendMessageForm 
            disabled ={!this.state.roomId}
            sendMessage={this.sendMessage}/>
          </Col>
        </Row>





      </div>
    );
  }
}

export default App;




