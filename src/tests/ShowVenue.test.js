import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import { ShowVenue } from '../home/ShowVenue.js'

const mockVenue = [{
  venue_name: 'foo bar',
  venue_address: '234 test st',
  specials: []
}]

function render(venueArr = mockVenue) {
  <ShowVenue venues={venueArr} />
}

describe('Component: ShowVenue', () => {

  it('renders without exploding', () => {
    const show = render();
  })

  it('shows correct header', () => {
    const w = render();
    const heading = w.find('.venue-name-heading');
    // expect(w.state().venue).toEqual(mockVenue)
    expect(heading.text()).toEqual("foo bar")
  })

  it('shows all specials', () => {
    // expect # of specials to be 7
  })

  it('should show loader if no venue', () => {
    const w = render(null);
    // expect loader to be on page
  })

})
