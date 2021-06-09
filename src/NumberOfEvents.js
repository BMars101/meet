import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    events: []
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      numOfEvents: value
    })
  }


  render(){
    return (
      <div>
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