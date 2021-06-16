import React from 'react';
import NumberOfEvents from '../NumberOfEvents';
import App from '../App';
import { shallow, mount } from 'enzyme';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  let AppWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
  })

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });
  test('renders text input correctly', () => {
    const numOfEvents = NumberOfEventsWrapper.state('numOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(numOfEvents);
  });
  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      numOfEvents: '10'
    });
    const eventObject = { target: { value: '15' }};
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numOfEvents')).toBe('15');
  });
});


