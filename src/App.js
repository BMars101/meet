import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

class App extends Component{
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: "all",
    showWelcomeScreen: undefined
  }

  async componentDidMount(){
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({
      showWelcomeScreen: !(code || isTokenValid) 
    });
    if((code || isTokenValid) && this.mounted){
      getEvents().then(events => {
        if(this.mounted){
          this.setState({
            events, locations: extractLocations(events)
          });
        }
      })
    }

    if(!navigator.onLine){
      this.setState({
        warningText: 'App is offline. Events may not be up to date.'
      });
    }else {
      this.setState({
        warningText: ''
      })
    }

    const { numberOfEvents } = this.state;
    getEvents().then((events) => {
      if(this.mounted){
        this.setState({ events: events.slice(0, numberOfEvents), locations: extractLocations(events) });
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  updateEvents = (location, eventCount) => {
    const { selectedLocation, numberOfEvents } = this.state;
    if(location){
      getEvents().then((events) => {
        const locationEvents = 
        (location === 'all')
        ? events
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

componentWillUnmount(){
  this.mounted = false;
}

  render(){
    if(this.state.showWelcomeScreen === undefined) return <div className="App"/>
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
        <WarningAlert text={this.state.warningText} />
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }}/>
      </div>
    );
  }
}

export default App;
