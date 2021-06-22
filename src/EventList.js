import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render(){
    const { events } = this.props;
    return (
      <div className="list-container">
        <div className="column">
          <ul className="EventList">
          {events.map(event =>
            <li key={event.id} className="event-li">
            <Event event={event}/>
            </li>
            )}
          </ul>
        </div> 
      </div>
    );
  }
}

export default EventList;