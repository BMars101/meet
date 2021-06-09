import React from 'react';
import Event from '../Event';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]}/>)
  });
  test('render default event info', () => {
    expect(EventWrapper.find('.default-event-info')).toHaveLength(1);
  });
  test('render event details', () => {
    EventWrapper.setState({ active: true });
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
  });
  test('expand event details on button click',() => {
    EventWrapper.setState({ active: false });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('active')).toBe(true);
  });
  test('collapse event details on button click', () => {
    EventWrapper.setState({ active: true });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('active')).toBe(false);
  });
})