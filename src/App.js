import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component{
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: "all"
  }

  componentDidMount(){
    const { numberOfEvents } = this.state;
    getEvents().then((events) => {
      this.setState({ events: events.slice(0, numberOfEvents), locations: extractLocations(events) });
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const { selectedLocation, numberOfEvents } = this.state;
    if(location){
      getEvents().then((events) => {
        const locationEvents = 
        (location === 'all')
        ? getEvents
        : events.filter(
          (event) => event.location === location);
        const filterEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filterEvents,
          selectedLocation: location 
      });
    });
  } else {
    getEvents().then(events => {
      const locationEvents = (selectedLocation === 'all')
      ? events
      : events.filter(event => event.location === selectedLocation);
      const filterEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: filterEvents,
        numberOfEvents: eventCount
      });
    });
  }  
}

  render(){
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents = {this.updateEvents}/>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
