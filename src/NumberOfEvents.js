import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    events: []
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({
      numOfEvents: value
    });
  }


  render(){
    return (
      <div>
        <label>Enter Number of Events to View: </label>
        <input 
          type="text"
          className="number-of-events"
          value={this.state.numOfEvents}
          placeholder='Enter number of events to view'
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default NumberOfEvents;