import React from 'react';
//import logo from './logo.svg';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      <NumberOfEvents />
      <EventList />
      <CitySearch />
    </div>
  );
}

export default App;
