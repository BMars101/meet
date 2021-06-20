import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    events: []
  }

  handleChange = (event) => {
    const value = event.target.value;
    if(value < 1 || value > 32){
      this.setState({
        errorText: 'Please enter a number between 1 and 32',
        numOfEvents: ''
      })
    }else {
      this.setState({
        numOfEvents: value,
        errorText: ''
      });
      this.props.updateEvents(null, value);
    }
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
        <ErrorAlert text={this.state.errorText}/>
      </div>
    )
  }
}

export default NumberOfEvents;