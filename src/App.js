import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { WarningAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        const filterEvents = events.slice(0, this.state.numberOfEvents);
        if(this.mounted){
          this.setState({
            events: filterEvents, locations: extractLocations(events)
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

getData = () => {
  const {locations, events} = this.state;
  const data = locations.map((location) => {
    const number = events.filter((event) => event.location === location).length
    const city = location.split(', ').shift()
    return {city, number};
  })
  return data;
};

componentWillUnmount(){
  this.mounted = false;
}

  render(){
    const { locations, numberOfEvents, events, warningText } = this.state;
    if(this.state.showWelcomeScreen === undefined) return <div className="App"/>
    return (
      <div className="App">
        <div>
          <div className="header">
            <h1>Lets Meet + Code!</h1>
          </div>
          <div className="input-area">
            <CitySearch locations={locations} updateEvents={this.updateEvents}/>
            <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents}/>
          </div>
          <WarningAlert text={warningText} />
          <div className="data-vis-wrapper">
            <EventGenre events={events}/>
            <ResponsiveContainer height={400} width="100%">
            <ScatterChart 
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
            <CartesianGrid />
            <XAxis 
              type="category" 
              dataKey="city"
              name="city" 
            />
            <YAxis 
              type="number" 
              dataKey="number" 
              name="number of events" 
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3'}} />
            <Scatter data={this.getData()} fill="#505194"/>
            </ScatterChart>
          </ResponsiveContainer>
          </div>
          <EventList events={events}/>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }}/>
        </div>
      </div>
    );
  }
}

export default App;
