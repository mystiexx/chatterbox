import React, { Component } from 'react';

class RoomList extends Component {
    render() {
        const { rooms, subscribeToRoom, roomId } = this.props
        const orderedRooms = [...rooms].sort((a,b)=> a.id - b.id)
        return (
            <div className="rooms p-3">
                <ul>
                    <h3>Your Rooms</h3>
                    {orderedRooms.map(room => {
                        const active = roomId === room.id ? 'active' : ' ';
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a 
                                onClick ={()=> {subscribeToRoom(room.id)}}
                                href="#">{room.name}</a>
                            </li>
                        )

                    })}
                </ul>

            </div>
        );
    }
}

export default RoomList;
