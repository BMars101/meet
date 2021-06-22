import React, { Component } from 'react';


class Event extends Component {
  state = {
    active: false
  }

  handleToggleDetails = () => {
    if(this.state.active === true){
      this.setState({ active: false });
    } else {
      this.setState({ active: true })
    }
  }

  render(){
   let { event } = this.props;
      return (
        <div className='default-event-info'>
          <h2 className='event-summary'>{event.summary}</h2>
          <h4>{event.location}</h4>
          <p>{event.start.dateTime}</p>

        {this.state.active && (
          <div className='event-details'>
            <h2>About Event: </h2>
            <a href={event.htmlLink}>See Details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        )}
          <button className='details-btn' onClick={() => this.handleToggleDetails()}>{this.state.active ? 'hide details' : 'show details'}</button>
        </div>
      )
    }
  }
export default Event;