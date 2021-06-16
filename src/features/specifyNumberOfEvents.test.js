import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper;
  let NumberOfEventsWrapper;
  test('When a user has not specified a number of events to view, 32 events will be rendered by default', ({ given, when, then }) => {
    given('a user has opened the app', () => {
      AppWrapper = mount(<App />);
      AppWrapper.find(NumberOfEvents);
    });

    when('a user does not specify a number of events to view', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />)
    });

    then(/^(\d+) events will be rendered by default$/, (arg0) => {
      expect(NumberOfEventsWrapper.state('numOfEvents')).toBe(32);
    });
});
test('A user can choose how many events to view on page', ({ given, when, then }) => {
  given('a user is on the main page', () => {
    AppWrapper = mount(<App />);
    AppWrapper.find(NumberOfEvents);
  });

  when('a user types a number into an input', () => {
    AppWrapper.find('.number-of-events').simulate('change', { target: { value: 10 }})
  });

  then('the page will display the number specified by user', () => {
    NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    expect(NumberOfEventsWrapper.state('numOfEvents')).toBe(10);
  });
});
})