import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;
  let EventWrapper;
  test('An element is collapsed by default', ({ given, when, then }) => {
    given('an event app', async () => {
      AppWrapper = mount(<App />);
    });
    when('a user opens the app', () => {
      EventWrapper = mount(<Event event={mockData[0]}/>);

    });

    then('event details are collapsed by default', () => {
      expect(EventWrapper.find('.default-event-info')).toHaveLength(1);
      expect(EventWrapper.state('active')).toBe(false);
    });
  });
  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('a user selects an event', () => {
      expect(EventWrapper.find('.details-btn')).toHaveLength(1);
    });

    when('a user clicks on the event\'s show details button', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event\'s details are expanded on the page for the user to read', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(1);
      expect(EventWrapper.state('active')).toBe(true);
    });
});
test('User can collapse an event to hide the event\'s details', ({ given, when, then }) => {
  given('an event\'s details are expanded', () => {
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
    expect(EventWrapper.state('active')).toBe(true);

  });

  when('a user clicks the event\'s hide details button', () => {
    EventWrapper.find('.details-btn').simulate("click");
  });

  then('the event\'s details are collapsed', () => {
    expect(EventWrapper.state('active')).toBe(false);
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
  });
});
})